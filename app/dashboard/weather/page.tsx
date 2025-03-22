import { LatLngInput } from "./latLngInput";

export default async function Page (props: {
  searchParams? : Promise <{
    longitude?: string;
    latitude?: string;
  }>
}) {
  const searchParams = await props.searchParams;

  console.log(` Weather Page running`)

  const longitude = searchParams?.longitude || "";
  const latitude = searchParams?.latitude || "";

  let temperatureData : { 
    hourly: {time: string[], 
    temperature_2m: number []}, 
    hourly_units: { temperature_2m: string}} | null = null;
  
  let units = "";

  if (longitude && latitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        temperatureData = await response.json();
      }
      console.log(`Invoked API using url: ${url}`);
    }
    catch(error) {
      console.log(error);
    }

    units = temperatureData?.hourly_units.temperature_2m || "";

  }


    return (
      <div>

        <LatLngInput />

        {!temperatureData && (
          <div>
            Please enter the required longitude and latitude for your location 
          </div>
        )}

        {temperatureData && (
          <div>
            {
              temperatureData?.hourly.time.map((time, index) => {
                return (
                  <div key={time}>
                    {time} :: {`${temperatureData?.hourly.temperature_2m[index]} ${units}`}
                  </div>
                )
              }
              )
            }
          </div>
        )}

      </div>
    )




}