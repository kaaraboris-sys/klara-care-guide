import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Scale, HeartHandshake, Info } from "lucide-react";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Find help — caregivers & legal aid near you | Klara" },
      {
        name: "description",
        content:
          "Browse vetted caregivers and legal experts in the Pfarrkirchen area who can help with Pflegegrad assessments and appeals.",
      },
      { property: "og:title", content: "Find help — Klara" },
      {
        property: "og:description",
        content: "Caregivers and legal aid for German long-term care families.",
      },
    ],
  }),
  component: DirectoryPage,
});

type Caregiver = {
  name: string;
  type: string;
  address: string;
  plz: string;
  distanceKm: number;
  phone: string;
  email?: string;
  website?: string;
  price?: string;
  rating?: string;
  serviceForm?: string;
};

const CAREGIVERS: Caregiver[] = [
  {
    name: "Caritas Alten- und Pflegeheim St. Vinzenz von Paul",
    type: "Pflegeheim",
    address: "Konrad-Wirnhier-Str. 13, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "08561 989100",
    email: "cwikc@altenheim-pfarrkirchen.de",
    website: "https://www.caritas-rottal-inn.de",
    price: "ab 2.724,80 € (Eigenanteil/Monat)",
  },
  {
    name: "BRK-Sozialstation Pfarrkirchen-Simbach",
    type: "Pflegedienst",
    address: "Arno-Jacoby-Str. 7, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "+49 8561233950",
    email: "hauspflege.ri@brk.de",
    website: "https://www.brk-rottal-inn.de",
    rating: "1,1 (sehr gut)",
  },
  {
    name: "Caritas Sozialstation Pfarrkirchen",
    type: "Pflegedienst",
    address: "Ringstr. 3, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "+49 8561987826",
    email: "sst-pfarrkirchen@caritas-rottal-inn.de",
    website: "https://www.caritas-rottal-inn.de",
    rating: "2,0 (gut)",
  },
  {
    name: "Senioren-Zentrum Pfarrkirchen",
    type: "Pflegeheim",
    address: "Robert-Erbertseder-Weg 1, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "08561 235080",
    email: "pfarrkirchen@pichlmayr.de",
    website: "https://www.pichlmayr.de",
    price: "ab 2.646,34 € (Eigenanteil/Monat)",
  },
  {
    name: "Seniorenassistenz Christine Hohlweg — Alltagsbegleitung",
    type: "Alltagsunterstützung",
    address: "Duschlstraße 40, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "08561 5555",
    email: "info@senioren-pan.de",
    website: "https://www.senioren-pan.de",
    price: "49,00 € / Stunde",
  },
  {
    name: "Praxis PANda — Alltagsbegleitung",
    type: "Alltagsunterstützung",
    address: "Stadtplatz 4, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "0176 36233673",
    email: "kontakt@panda-heilpaedagogik.de",
    website: "https://www.panda-heilpaedagogik.de",
    price: "51,00 € / Stunde",
  },
  {
    name: "Praxis PANda — Haushaltsnahe Dienstleistungen",
    type: "Haushaltshilfe",
    address: "Stadtplatz 4, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "0176 36233673",
    email: "kontakt@panda-heilpaedagogik.de",
    website: "https://www.panda-heilpaedagogik.de",
    price: "39,00 € / Stunde",
  },
  {
    name: "Korbis Pflegeteam (Sedlmeier) — Alltagsunterstützung",
    type: "Alltagsunterstützung",
    address: "Rottauenweg 9, 84389 Postmünster",
    plz: "84389",
    distanceKm: 4,
    phone: "+49 85619835854",
    email: "info@korbis-pflegeteam.de",
    website: "https://www.korbis-pflegeteam.de",
  },
  {
    name: "Korbis Pflegeteam (Sedlmeier) — Pflegedienst",
    type: "Pflegedienst",
    address: "Rottauenweg 9, 84389 Postmünster",
    plz: "84389",
    distanceKm: 4,
    phone: "+49 85619835854",
    email: "info@korbis-pflegeteam.de",
    website: "https://www.korbis-pflegeteam.de",
    rating: "1,0 (sehr gut)",
  },
  {
    name: "Christanger Pflegeheim Postmünster",
    type: "Pflegeheim",
    address: "Christanger 1-8, 84389 Postmünster",
    plz: "84389",
    distanceKm: 4,
    phone: "08561 3090",
    email: "info@christanger.de",
    website: "https://www.christanger.de",
    price: "ab 2.802,36 € (Eigenanteil/Monat)",
  },
  {
    name: "Berufsverband sozialer Fachkräfte — Alltagsbegleitung",
    type: "Alltagsunterstützung",
    address: "84378 Dietersburg",
    plz: "84378",
    distanceKm: 7,
    phone: "0151 290 372 29",
    email: "info@berufsverband-bayern.de",
    price: "53,04 € / Stunde",
  },
  {
    name: "Kienle ambulanter Pflegedienst",
    type: "Pflegedienst",
    address: "Marktplatz 7, 84371 Triftern",
    plz: "84371",
    distanceKm: 7,
    phone: "+49 8562962756",
    email: "kienle.heidi@gmx.de",
    website: "https://www.ergotherpie-kienle.de",
    rating: "1,8 (gut)",
  },
  {
    name: "BRK Lebenszentrum Gräfin Arco Bad Birnbach",
    type: "Pflegeheim",
    address: "Bräugasse 10, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "+49 8563977330",
    email: "info.ri-bir@brk.de",
    website: "https://www.lebenszentrum-graefin-arco.de",
    price: "ab 2.795,73 € (Eigenanteil/Monat)",
  },
  {
    name: "pro aktiv Tagespflege GmbH",
    type: "Tages-/Nachtpflege",
    address: "Breindoblweg 5, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "08563 9774040",
    email: "pflege@pro-aktiv-pflege.de",
    website: "https://www.pro-aktiv-pflege.de",
  },
  {
    name: "Haushaltsnahe Dienstleistungen Oliver Haider",
    type: "Haushaltshilfe",
    address: "Stögmeierweg 9, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "08563 9775656",
    email: "info.haushaltsnahe-dienstleitung@web.de",
    website: "https://www.oliver-haider-haushaltsnahe-dienstleistung.de",
    price: "28,08 € / Stunde",
  },
  {
    name: "ZauDir — Pflegeberatung Christian Zauner",
    type: "Pflegeberatung",
    address: "Haberling 10, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "08565 964435",
  },
  {
    name: "MediVital Tagespflege GmbH",
    type: "Tages-/Nachtpflege",
    address: "Aichner-Schmied-Str. 3, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "+49 8563975171",
    email: "info@medivital-tagespflege.de",
    website: "https://www.medivital-tagespflege.de",
  },
  {
    name: "MyHelp — Haushaltsnahe Dienstleistungen",
    type: "Haushaltshilfe",
    address: "Hollkronöd 1, 84332 Hebertsfelden",
    plz: "84332",
    distanceKm: 9,
    phone: "01637355588",
    email: "info.myhelp@web.de",
    price: "40,56 € / Stunde",
  },
  {
    name: "MyHelp — Alltagsbegleitung",
    type: "Alltagsunterstützung",
    address: "Hollkronöd 1, 84332 Hebertsfelden",
    plz: "84332",
    distanceKm: 9,
    phone: "01637355588",
    email: "info.myhelp@web.de",
    price: "53,04 € / Stunde",
  },
  {
    name: "Reinigung und Haushaltshilfe — am Service",
    type: "Haushaltshilfe",
    address: "Birnbacher Straße 6, 84364 Bad Birnbach / Brombach",
    plz: "84364",
    distanceKm: 9,
    phone: "0152 35898829",
    email: "info.am-service@web.de",
    website: "https://am-service-de8.webnode.at/",
    price: "30,00 € – 39,00 € / Stunde",
  },
];

type Lawyer = {
  name: string;
  focus: string;
  city: string;
};

const LAWYERS: Lawyer[] = [
  { name: "Boris Kaara", focus: "Sozialrecht · Pflegegrad-Widerspruch", city: "Pfarrkirchen" },
  { name: "Wilson Onyenemezu", focus: "Sozialrecht · MDK-Begutachtung", city: "Pfarrkirchen" },
  { name: "Abel Yeboah", focus: "Sozialrecht · Pflegekassen", city: "Pfarrkirchen" },
  { name: "Nada Abdelhalim", focus: "Sozialrecht · Widerspruch & Klage", city: "Pfarrkirchen" },
];

function DirectoryPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"caregivers" | "legal">("caregivers");

  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("nav.directory")}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Caregivers and legal experts in the Pfarrkirchen area who can support
            you with Pflegegrad applications, appeals, and daily care.
          </p>
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              This directory is provided for information only. Klara is not
              affiliated with the listed providers and does not receive
              commissions.
            </span>
          </div>
        </header>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "caregivers" | "legal")}>
          <TabsList className="grid w-full grid-cols-2 md:max-w-md">
            <TabsTrigger value="caregivers" className="gap-2">
              <HeartHandshake className="h-4 w-4" />
              Caregivers
            </TabsTrigger>
            <TabsTrigger value="legal" className="gap-2">
              <Scale className="h-4 w-4" />
              Legal help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="caregivers" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {CAREGIVERS.map((c) => (
                <Card key={c.name} className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base leading-snug">
                        {c.name}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {c.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        {c.address} · ca. {c.distanceKm} km
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <a href={`tel:${c.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
                        {c.phone}
                      </a>
                    </p>
                    {c.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0" />
                        <a href={`mailto:${c.email}`} className="hover:text-foreground break-all">
                          {c.email}
                        </a>
                      </p>
                    )}
                    {c.website && (
                      <p className="flex items-center gap-2">
                        <Globe className="h-4 w-4 shrink-0" />
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hover:text-foreground break-all"
                        >
                          {c.website.replace(/^https?:\/\//, "")}
                        </a>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {c.price && (
                        <Badge variant="outline" className="font-normal">
                          {c.price}
                        </Badge>
                      )}
                      {c.rating && (
                        <Badge variant="outline" className="font-normal">
                          Note: {c.rating}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="legal" className="mt-6">
            <div className="mb-4 rounded-xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
              Specialists in Sozialrecht who handle Pflegegrad applications,
              MDK assessment objections, and appeals against pension/care
              insurance decisions.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {LAWYERS.map((l) => (
                <Card key={l.name}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base">{l.name}</CardTitle>
                      <Badge variant="secondary">Rechtsanwalt</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>{l.focus}</p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {l.city}
                    </p>
                    <p className="pt-2 text-xs italic">
                      Contact details available on request — placeholder listing.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </PublicShell>
  );
}
