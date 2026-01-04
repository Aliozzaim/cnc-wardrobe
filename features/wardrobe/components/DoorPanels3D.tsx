'use client';

import React from 'react';
import { useDoorPanels } from '../context/DoorPanelContext';
import { useWardrobe } from '../hooks/useWardrobe';

export function DoorPanels3D() {
    const { doorPanels } = useDoorPanels();
    const { input } = useWardrobe();

    return (
        <>
            {doorPanels.map((panel) => {
                const panelHeight = panel.endYCm - panel.startYCm;
                const panelWidth = panel.widthCm;

                // Calculate position for 3D model
                const yPos = (panel.startYCm - input.heightCm / 2) * 1.5; // Center and scale
                const xPos = panel.doorType === 'left' ? -input.widthCm * 0.4 :
                    panel.doorType === 'right' ? input.widthCm * 0.4 : 0;

                return (
                    <div
                        key={panel.id}
                        style={{
                            position: 'absolute',
                            width: `${Math.max(80, panelWidth * 1.5)}px`,
                            height: `${Math.max(80, panelHeight * 1.5)}px`,
                            background: 'linear-gradient(145deg, #654321, #8B4513)',
                            transform: `translateZ(${input.depthCm * 0.8 + 1}px) translateY(${yPos}px) translateX(${xPos}px)`,
                            left: '50%',
                            top: '50%',
                            marginLeft: `${-Math.max(40, panelWidth * 0.75)}px`,
                            marginTop: `${-Math.max(40, panelHeight * 0.75)}px`,
                            border: '2px solid #333',
                            opacity: 0.95,
                        }}
                    ></div>
                );
            })}
        </>
    );
}
