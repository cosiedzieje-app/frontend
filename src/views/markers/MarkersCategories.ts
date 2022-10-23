import type { ListingCategory, MarkerCategory } from "@/types";

const markersCategories: Record<ListingCategory, MarkerCategory> = {
    'NeighborHelp':  {
        name: 'Pomoc sąsiedzka',
        icon: 'fa-solid fa-handshake',
        lightColor: 'green-400',
        darkColor: 'green-700',
        darkHoverColor: 'green-800',
    },
    'Charity': {
        name: 'Akcje charytatywne',
        icon: 'fa-solid fa-hand-holding-heart',
        lightColor: 'red-400',
        darkColor: 'red-700',
        darkHoverColor: 'red-800',
    },
    'MassEvent': {
        name: 'Imprezy masowe',
        icon: 'fa-solid fa-star',
        lightColor: 'yellow-400',
        darkColor: 'yellow-700',
        darkHoverColor: 'yellow-800',
    },
    'Happening': {
        name: 'Happeningi',
        icon: 'fa-solid fa-hand-point-up',
        lightColor: 'violet-400',
        darkColor: 'violet-700',
        darkHoverColor: 'violet-800',
    },
};

export default markersCategories;
