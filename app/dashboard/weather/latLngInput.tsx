'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const LatLngInput = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLatLng = (formData: FormData) => {
    console.log("Button Clicked!!!")
    const _longitude = formData.get('longitude');
    const _latitude = formData.get('latitude');

    debugger;

    if (_latitude && _longitude) {
      replace(`${pathname}?longitude=${_longitude}&latitude=${_latitude}`)
    }
  }

  console.log(`lat lng rendering`)

  return (
    <div>
      <form action={handleLatLng}>
        <div>
          <label htmlFor="longitude">Longitude</label>
          <input name="longitude" id="longitude" defaultValue={searchParams.get('longitude')?.toString()} />
        </div>

        <div>
          <label htmlFor="latitude">Latitude</label>
          <input name="latitude" id="latitude" defaultValue={searchParams.get('latitude')?.toString()} />
        </div>

        <button type="submit" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">Show Temperatures</button>
      </form>
    </div>

  );
};

export { LatLngInput };


