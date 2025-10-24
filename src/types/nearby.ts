export type Routes = {
  lat: number;
  lng: number;
};

export type NearbyRequestDTO = {
  start: Routes;
  end: Routes;
  polyline: Routes[];
  routeName: string;
  radiusMeters?: number;
  categoryIds?: number[];
  startName: string;
  startJibunAddress: string;
  startBuildingName?: string;
  endName: string;
  endJibunAddress: string;
  endBuildingName?: string;
};

//경로 상세조회
export type NearbyResponseDto = {
  routeId: number;
  routeName: string;
  start: Routes;
  end: Routes;
  polyline: Routes[];
  radiusMeters: 0;
  categoryIds: number[];
};
