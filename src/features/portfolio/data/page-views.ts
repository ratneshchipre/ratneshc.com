import { UTM_PARAMS } from "@/config/site";

export async function getPageViews() {
  const res = await fetch(
    `https://page-views-api.ratneshc.com/api/v1/views?site=${UTM_PARAMS.utm_source}&path=/`
  );
  const data = (await res.json()) as { views: number };

  return data.views;
}
