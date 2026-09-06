'use client';

import { useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/workpress-types';

// ── Brand colors — customize per project ─────────────────────────────────────
// These are the only values you need to change to match the project's palette.
const PIN_COLOR = '#614A1B';           // Pin fill — brand brown
const PIN_STROKE = '#EFCD36';          // Pin stroke — brand CTA yellow
const POPUP_TITLE_COLOR = '#614A1B';   // Popup title — brand brown
const POPUP_LINK_COLOR = '#9A6F28';    // "View Project" link — brand gold
const POPUP_TEXT_COLOR = '#e6e5e0';    // Popup body text — adjust for map style

// Common Mapbox styles:
//   mapbox://styles/mapbox/dark-v11
//   mapbox://styles/mapbox/light-v11
//   mapbox://styles/mapbox/streets-v12
//   mapbox://styles/mapbox/satellite-streets-v12
//   mapbox://styles/mapbox/outdoors-v12
interface ServiceAreaMapProps {
  projects: Project[];
  mapStyle?: string;
}

export default function ServiceAreaMap({ projects, mapStyle = 'mapbox://styles/mapbox/dark-v11' }: ServiceAreaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute centroid of all projects that have coordinates.
  // Returns null if no coordinates exist — map will show an error requiring the dev to act.
  const getCenter = (): [number, number] | null => {
    const withCoords = projects.filter(p => p.coordinates);
    if (withCoords.length === 0) return null;
    const avgLat = withCoords.reduce((sum, p) => sum + (typeof p.coordinates!.lat === 'string' ? parseFloat(p.coordinates!.lat) : p.coordinates!.lat), 0) / withCoords.length;
    const avgLon = withCoords.reduce((sum, p) => sum + (typeof p.coordinates!.lon === 'string' ? parseFloat(p.coordinates!.lon) : p.coordinates!.lon), 0) / withCoords.length;
    return [avgLon, avgLat];
  };

  useEffect(() => {
    if (!mounted || !mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token || token === 'your_mapbox_token') {
      setError('Mapbox token not configured');
      return;
    }

    const center = getCenter();
    if (!center) {
      setError('No project coordinates found. Add coordinates to projects in the WorkPress dashboard, or set a manual center on this component.');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.async = true;

    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    link.rel = 'stylesheet';

    document.head.appendChild(link);

    script.onload = () => {
      const mapboxgl = (window as any).mapboxgl;

      if (!mapboxgl) {
        setError('Mapbox GL JS failed to load');
        return;
      }

      try {
        mapboxgl.accessToken = token;

        if (mapContainer.current && !map.current) {
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center,
            zoom: 8,
            minZoom: 7,
            maxZoom: 15,   // Keep ≤ 15; 10–13 recommended to avoid street-level detail
            pitch: 0,
            bearing: 0,
          });

          map.current.on('style.load', () => {

            // ── Pin SVGs ───────────────────────────────────────────────────────
            // Shape and size are standardized. Color is controlled by PIN_COLOR above.

            const createSinglePinSVG = () => {
              const svg = `<svg width="30" height="38" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.71 0 0 6.71 0 15c0 8.25 15 23 15 23s15-14.75 15-23C30 6.71 23.29 0 15 0z" fill="${PIN_COLOR}" stroke="${PIN_STROKE}" stroke-width="1"/>
                <circle cx="15" cy="15" r="4" fill="#fff"/>
              </svg>`;
              return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            };

            const createClusterPinSVG = (count: number) => {
              const svg = `<svg width="50" height="62" viewBox="0 0 50 62" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 0C10.67 0 0 10.67 0 25c0 13.75 25 37.5 25 37.5s25-23.75 25-37.5C50 10.67 39.33 0 25 0z" fill="${PIN_COLOR}" stroke="${PIN_STROKE}" stroke-width="1"/>
                <circle cx="25" cy="25" r="11" fill="#fff"/>
                <text x="25" y="30" font-size="13" font-weight="bold" text-anchor="middle" fill="${PIN_COLOR}">${count}</text>
              </svg>`;
              return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            };

            // ── GeoJSON source ─────────────────────────────────────────────────

            const geojson = {
              type: 'FeatureCollection',
              features: projects
                .filter(project => project.coordinates)
                .map(project => {
                  const lat = typeof project.coordinates!.lat === 'string'
                    ? parseFloat(project.coordinates!.lat)
                    : project.coordinates!.lat;
                  const lon = typeof project.coordinates!.lon === 'string'
                    ? parseFloat(project.coordinates!.lon)
                    : project.coordinates!.lon;

                  return {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [lon, lat] },
                    properties: {
                      id: project.id,
                      title: project.seoTitle,
                      city: project.address.city,
                      state: project.address.state,
                      slug: project.slug,
                    },
                  };
                }),
            } as any;

            map.current.addSource('projects', {
              type: 'geojson',
              data: geojson,
              cluster: true,
              clusterMaxZoom: 13,   // Clusters break apart at zoom 13
              clusterRadius: 50,    // Pins within 50px merge into a cluster
            });

            // ── Load pin images ────────────────────────────────────────────────

            const singlePinImg = new Image();
            singlePinImg.onload = () => {
              if (!map.current.hasImage('single-pin')) {
                map.current.addImage('single-pin', singlePinImg);
              }
            };
            singlePinImg.src = createSinglePinSVG();

            const loadClusterPin = (count: number) => {
              const imageId = `cluster-pin-${count}`;
              if (map.current.hasImage(imageId)) return;
              const img = new Image();
              img.onload = () => {
                if (!map.current.hasImage(imageId)) {
                  map.current.addImage(imageId, img);
                }
              };
              img.src = createClusterPinSVG(count);
            };

            for (let i = 2; i <= 20; i++) loadClusterPin(i);

            const loadedClusters = new Set<number>();
            map.current.on('data', () => {
              if (!map.current.isSourceLoaded('projects')) return;
              map.current.querySourceFeatures('projects', {
                filter: ['has', 'point_count'],
              }).forEach((feature: any) => {
                const count = feature.properties.point_count;
                if (!loadedClusters.has(count)) {
                  loadClusterPin(count);
                  loadedClusters.add(count);
                }
              });
            });

            // ── Layers ─────────────────────────────────────────────────────────

            map.current.addLayer({
              id: 'clusters',
              type: 'symbol',
              source: 'projects',
              filter: ['has', 'point_count'],
              layout: {
                'icon-image': 'cluster-pin-{point_count}',
                'icon-size': 1,
                'icon-allow-overlap': true,
              },
            });

            map.current.addLayer({
              id: 'unclustered-point',
              type: 'symbol',
              source: 'projects',
              filter: ['!', ['has', 'point_count']],
              layout: {
                'icon-image': 'single-pin',
                'icon-size': 1,
                'icon-allow-overlap': true,
              },
            });

            // ── Cluster click → zoom in ────────────────────────────────────────

            map.current.on('click', 'clusters', (e: any) => {
              const features = map.current.querySourceFeatures('projects', {
                sourceLayer: null,
                filter: ['has', 'point_count'],
              });
              if (features.length === 0) return;
              const clusteredSource = map.current.getSource('projects');
              const clusterID = features[0].properties.cluster_id;
              clusteredSource.getClusterExpansionZoom(clusterID, (err: any, zoom: number) => {
                if (err) return;
                map.current.easeTo({ center: features[0].geometry.coordinates, zoom });
              });
            });

            // ── Individual pin click → popup with project link ─────────────────

            map.current.on('click', 'unclustered-point', (e: any) => {
              if (!e.features || e.features.length === 0) return;
              const props = e.features[0].properties;
              const coordinates = e.features[0].geometry.coordinates.slice();
              new mapboxgl.Popup()
                .setLngLat(coordinates as [number, number])
                .setHTML(
                  `<div style="font-family: sans-serif; color: ${POPUP_TEXT_COLOR}; padding: 8px;">
                    <strong style="color: ${POPUP_TITLE_COLOR}; display: block; margin-bottom: 8px;">${props.title}</strong>
                    <p style="margin: 0 0 8px 0; font-size: 14px;">${props.city}, ${props.state}</p>
                    <a href="/projects/${props.slug}"
                       style="color: ${POPUP_LINK_COLOR}; text-decoration: none; font-weight: 500; font-size: 13px;">
                      View Project →
                    </a>
                  </div>`
                )
                .addTo(map.current);
            });

            // ── Cursor ────────────────────────────────────────────────────────

            ['clusters', 'unclustered-point'].forEach(layer => {
              map.current.on('mouseenter', layer, () => {
                map.current.getCanvas().style.cursor = 'pointer';
              });
              map.current.on('mouseleave', layer, () => {
                map.current.getCanvas().style.cursor = '';
              });
            });
          });
        }
      } catch (err) {
        console.error('Mapbox error:', err);
        setError('Failed to initialize map');
      }
    };

    script.onerror = () => setError('Failed to load Mapbox GL JS');
    document.head.appendChild(script);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mounted, projects]);

  if (!mounted) {
    return (
      <div style={{ width: '100%', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading map...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: '100%', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ fontWeight: 'bold' }}>Map Error</p>
        <p style={{ fontSize: '0.875rem' }}>{error}</p>
        {error.includes('token') && (
          <p style={{ fontSize: '0.75rem' }}>Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local</p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '600px', borderRadius: '4px', overflow: 'hidden' }}
    />
  );
}
