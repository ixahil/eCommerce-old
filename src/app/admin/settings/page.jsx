import Section from "@/components/layouts/Section";
import SettingsForm from "./SettingsForm";
import { getData } from "@/lib/fetcher-server";

const SettingsPage = async ({ searchParams }) => {
  const { data, error } = await getData({
    endpoint: "users/me",
  });

  return (
    <Section heading={"Settings"} className={"py-0"}>
      <SettingsForm data={data} />
    </Section>
  );
};

export default SettingsPage;
