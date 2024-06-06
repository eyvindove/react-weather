import GeocodingSearch from "@src/components/geocoding-search/GeocodingSearch";
import Favorite from "@src/components/favorite/Favorite";
import AppDataDeclaration from "@src/components/app/AppDataSourceDeclaration";

export default function HomePage() {
  return (
    <>
      <GeocodingSearch />
      <Favorite />
      <AppDataDeclaration />
    </>
  );
}
