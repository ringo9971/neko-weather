import data from '../assets/130000.json';
import area from '../assets/area.json';

interface AreaWeather {
  area: { name: string; code: string };
  weatherCodes?: string[];
  weathers?: string[];
  winds?: string[];
  waves?: string[];
  pops?: string[];
  temps?: string[];
  reliabilities?: string[];
  tempsMin?: string[];
  tempsMinUpper?: string[];
  tempsMinLower?: string[];
  tempsMax?: string[];
  tempsMaxUpper?: string[];
  tempsMaxLower?: string[];
}

interface TimeSeriazeData {
  timeDefines: string[];
  areas: AreaWeather[];
}

interface WeatherReport {
  publishingOffice: string;
  reportDatetime: string;
  timeSeries: TimeSeriazeData[];
}

interface CenterArea {
  name: string;
  enName: string;
  officeName: string;
  children: string[];
}
interface OfficesArea {
  name: string;
  enName: string;
  officeName: string;
  parent: string;
  children: string[];
}
interface Class10sArea {
  name: string;
  enName: string;
  parent: string;
  children: string[];
}
interface Class15sArea {
  name: string;
  enName: string;
  parent: string;
  children: string[];
}
interface Class20sArea {
  name: string;
  enName: string;
  kana: string;
  parent: string;
}

interface Area {
  centers: Record<string, CenterArea>;
  offices: Record<string, OfficesArea>;
  class10s: Record<string, Class10sArea>;
  class15s: Record<string, Class15sArea>;
  class20s: Record<string, Class20sArea>;
}

const getOfficeIdById = (id: string) => {
  const areaData: Area = area;
  const a = areaData.class20s[id] ?? '';
  const b = areaData.class15s[a.parent] ?? '';
  const c = areaData.class10s[b.parent];
  return c?.parent;
};

export const weather = async (id: string) => {
  const officeId = getOfficeIdById(id);
  if (!officeId) return;

  const res: WeatherReport[] = data;
  console.log(res[1].timeSeries[1].areas);
};
