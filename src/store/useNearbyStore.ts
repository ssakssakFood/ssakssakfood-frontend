import { create } from "zustand";

interface Routes {
  lat: number;
  lng: number;
}

interface nearbyState {
  start?: Routes;
  end?: Routes;
  polyline?: Routes[];
  routeName: string;
  //   radiusMeters: number;
  //   categoryIds: number[];
  //   startName: string;
  startJibunAddress: string;
  //   startBuildingName: string;
  //   endName: string;
  endJibunAddress: string;
  //   endBuildingName: string;
  setTemp: (field: Partial<nearbyState>) => void;
  reset: () => void;
}

export const useNearbyUiState = create<nearbyState>((set) => ({
  start: undefined,
  end: undefined,
  polyline: undefined,
  routeName: "",
  //   startName: "",
  //   radiusMeters: 0,
  //   categoryIds: [],
  startJibunAddress: "",
  //   startBuildingName: "",
  //   endName: "",
  endJibunAddress: "",
  //   endBuildingName: "",
  setTemp: (field) => set((state) => ({ ...state, ...field })),
  reset: () =>
    set({
      //   startName: "",
      //   radiusMeters: 0,
      //   categoryIds: [],
      //   startBuildingName: "",
      //   endName: "",
      startJibunAddress: "",
      endJibunAddress: "",
      start: undefined,
      end: undefined,
      polyline: undefined,
      routeName: "",
    }),
}));

// type LatLng = { lat: number; lng: number };
// type RouteDraft = {
//   routeName?: string;
//   start?: LatLng;
//   end?: LatLng;
//   startJibunAddress?: string;
//   endJibunAddress?: string;
// };

// type UiState = {
//   drafts: Record<number, RouteDraft>; // ★ routeId -> draft
//   setDraft: (id: number, patch: Partial<RouteDraft>) => void;
//   resetDraft: (id: number) => void;
//   resetAll: () => void;
// };

// // store
// import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

// export const useNearbyUiState = create<UiState>()(
//   immer((set) => ({
//     drafts: {},
//     setDraft: (id, patch) =>
//       set((s) => {
//         const prev = s.drafts[id] ?? {};
//         s.drafts[id] = { ...prev, ...patch }; // ★ 해당 id만 병합
//       }),
//     resetDraft: (id) =>
//       set((s) => {
//         delete s.drafts[id]; // ★ 해당 id만 초기화
//       }),
//     resetAll: () => set(() => ({ drafts: {} })),
//   }))
// );
