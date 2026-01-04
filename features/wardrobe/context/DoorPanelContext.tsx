'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SimpleDoorPanel {
    id: string;
    name: string;
    startYCm: number; // Distance from bottom
    endYCm: number; // Distance from bottom
    widthCm: number;
    heightCm: number;
    doorType: 'full' | 'left' | 'right';
}

interface DoorPanelContextType {
    doorPanels: SimpleDoorPanel[];
    addDoorPanel: (doorType: 'full' | 'left' | 'right', wardrobeWidth: number, wardrobeHeight: number) => void;
    removeDoorPanel: (panelId: string) => void;
    updateDoorPanel: (panelId: string, updates: Partial<SimpleDoorPanel>) => void;
    clearDoorPanels: () => void;
}

const DoorPanelContext = createContext<DoorPanelContextType | undefined>(undefined);

export function DoorPanelProvider({ children }: { children: ReactNode }) {
    const [doorPanels, setDoorPanels] = useState<SimpleDoorPanel[]>([]);

    const addDoorPanel = (doorType: 'full' | 'left' | 'right', wardrobeWidth: number, wardrobeHeight: number) => {
        const newPanel: SimpleDoorPanel = {
            id: `door-${Date.now()}`,
            name: `Door ${doorPanels.length + 1}`,
            startYCm: 0,
            endYCm: wardrobeHeight,
            widthCm: doorType === 'full' ? wardrobeWidth : wardrobeWidth / 2,
            heightCm: wardrobeHeight,
            doorType
        };

        setDoorPanels(prev => [...prev, newPanel]);
    };

    const removeDoorPanel = (panelId: string) => {
        setDoorPanels(prev => prev.filter(panel => panel.id !== panelId));
    };

    const updateDoorPanel = (panelId: string, updates: Partial<SimpleDoorPanel>) => {
        setDoorPanels(prev => prev.map(panel =>
            panel.id === panelId ? { ...panel, ...updates } : panel
        ));
    };

    const clearDoorPanels = () => {
        setDoorPanels([]);
    };

    return (
        <DoorPanelContext.Provider value={{
            doorPanels,
            addDoorPanel,
            removeDoorPanel,
            updateDoorPanel,
            clearDoorPanels
        }}>
            {children}
        </DoorPanelContext.Provider>
    );
}

export function useDoorPanels() {
    const context = useContext(DoorPanelContext);
    if (context === undefined) {
        throw new Error('useDoorPanels must be used within a DoorPanelProvider');
    }
    return context;
}
