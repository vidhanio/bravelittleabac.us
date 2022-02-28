import H1 from "components/elements/h1";
import PageSEO from "components/page-seo";
import { Section } from "layouts/section";

export default function IndexPage() {
  return (
    <>
      <PageSEO />

      <H1>brave little abac.us</H1>

      <Section title="who are brave little abacus?">
        brave little abacus was an emo band, made up of vocalist adam demirjian,
        bassist andrew ryan, and keyboardist zach kelly onett. over their time
        active, they produced two albums, as well as an ep, a split, and a demo.
        they are considered a quintessential part of the math rock/midwest emo
        genre.
      </Section>
    </>
  );
}
