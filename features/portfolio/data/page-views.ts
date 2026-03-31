import { UTM_PARAMS } from "@/config/site";

export async function getPageViews() {
  const res = await fetch(
    `https://page-views-api.ratneshc.com/api/v1/views?site=${UTM_PARAMS}&path=/`
  );
  const data = (await res.json()) as { views: number };
  console.log(data);

  return data.views;
}
