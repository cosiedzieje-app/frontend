import type { MarkerCategory } from "@/types";
import { ListingCategory } from "@/types";

const markersCategories: Record<ListingCategory, MarkerCategory> = {
    [ListingCategory.NeighborHelp]:  {
        name: 'Pomoc sąsiedzka',
        type: ListingCategory.NeighborHelp,
        icon: 'fa-solid fa-handshake',
        lightColor: 'green-400',
        darkColor: 'green-700'
    },
    [ListingCategory.Charity]: {
        name: 'Akcje charytatywne',
        type: ListingCategory.Charity,
        icon: 'fa-solid fa-hand-holding-heart',
        lightColor: 'red-400',
        darkColor: 'red-700'
    },
    [ListingCategory.MassEvent]: {
        name: 'Imprezy masowe',
        type: ListingCategory.MassEvent,
        icon: 'fa-solid fa-star',
        lightColor: 'yellow-400',
        darkColor: 'yellow-700'
    },
    [ListingCategory.Happening]: {
        name: 'Happeningi',
        type: ListingCategory.Happening,
        icon: 'fa-solid fa-hand-point-up',
        lightColor: 'violet-400',
        darkColor: 'violet-700'
    },
};

export default markersCategories;
