import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PublicShell } from "@/components/layout/PublicShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Scale, HeartHandshake, Info, Search } from "lucide-react";

export const Route = createFileRoute("/directory")({
  head: () => ({
    meta: [
      { title: "Pflegedienste und Rechtsberatung in Ihrer Naehe | Klara" },
      {
        name: "description",
        content:
          "Pflegedienste, Pflegeheime, Alltagsunterstuetzung und Rechtsberatung fuer Familien mit Pflegebedarf.",
      },
      { property: "og:title", content: "Hilfe finden — Klara" },
      {
        property: "og:description",
        content: "Pflegedienste und Rechtsberatung fuer Familien mit Pflegebedarf.",
      },
    ],
  }),
  component: DirectoryPage,
});

type Caregiver = {name: string;
  type: string;
  address: string;
  plz: string;
  distanceKm: number;
  phone: string;
  email?: string;
  website?: string;
  price?: string;
  rating?: string;
};

const PROVIDER_TYPES = [
  "Alle",
  "Pflegeheim",
  "Pflegedienst",
  "Tages-/Nachtpflege",
  "Alltagsunterstuetzung",
  "Haushaltshilfe",
  "Pflegeberatung",
];

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
    price: "ab 2.724,80 Euro (Eigenanteil/Monat)",
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
  },{
    name: "Senioren-Zentrum Pfarrkirchen",
    type: "Pflegeheim",
    address: "Robert-Erbertseder-Weg 1, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "08561 235080",
    email: "pfarrkirchen@pichlmayr.de",
    website: "https://www.pichlmayr.de",
    price: "ab 2.646,34 Euro (Eigenanteil/Monat)",
  },
  {
    name: "Seniorenassistenz Christine Hohlweg",
    type: "Alltagsunterstuetzung",
    address: "Duschlstrasse 40, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "08561 5555",
    email: "info@senioren-pan.de",
    website: "https://www.senioren-pan.de",
    price: "49,00 Euro / Stunde",
  },
  {
    name: "Praxis PANda — Alltagsbegleitung",
    type: "Alltagsunterstuetzung",
    address: "Stadtplatz 4, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "0176 36233673",
    email: "kontakt@panda-heilpaedagogik.de",
    website: "https://www.panda-heilpaedagogik.de",
    price: "51,00 Euro / Stunde",
  },
  {
    name: "Praxis PANda — Haushalt",
    type: "Haushaltshilfe",
    address: "Stadtplatz 4, 84347 Pfarrkirchen",
    plz: "84347",
    distanceKm: 2,
    phone: "0176 36233673",
    email: "kontakt@panda-heilpaedagogik.de",
    website: "https://www.panda-heilpaedagogik.de",
    price: "39,00 Euro / Stunde",
  },
  {
    name: "Korbis Pflegeteam — Alltagsunterstuetzung",
    type: "Alltagsunterstuetzung",
    address: "Rottauenweg 9, 84389 Postmuenster",
    plz: "84389",
    distanceKm: 4,
    phone: "+49 85619835854",
    email: "info@korbis-pflegeteam.de",
    website: "https://www.korbis-pflegeteam.de",
  },
  {
    name: "Korbis Pflegeteam — Pflegedienst",
    type: "Pflegedienst",
    address: "Rottauenweg 9, 84389 Postmuenster",
    plz: "84389",
    distanceKm: 4,
    phone: "+49 85619835854",
    email: "info@korbis-pflegeteam.de",
    website: "https://www.korbis-pflegeteam.de",
    rating: "1,0 (sehr gut)",
  },
  {
    name: "Christanger Pflegeheim Postmuenster",
    type: "Pflegeheim",
    address: "Christanger 1-8, 84389 Postmuenster",
    plz: "84389",
    distanceKm: 4,
    phone: "08561 3090",
    email: "info@christanger.de",
    website: "https://www.christanger.de",
    price: "ab 2.802,36 Euro (Eigenanteil/Monat)",
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
    name: "BRK Lebenszentrum Graefin Arco Bad Birnbach",
    type: "Pflegeheim",
    address: "Braeugasse 10, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "+49 8563977330",
    email: "info.ri-bir@brk.de",
    website: "https://www.lebenszentrum-graefin-arco.de",
    price: "ab 2.795,73 Euro (Eigenanteil/Monat)",
  },{
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
    name: "Haushaltsnahe Dienstleistungen Oliver Haider",
    type: "Haushaltshilfe",
    address: "Stogmeierweg 9, 84364 Bad Birnbach",
    plz: "84364",
    distanceKm: 9,
    phone: "08563 9775656",
    email: "info.haushaltsnahe-dienstleitung@web.de",
    price: "28,08 Euro / Stunde",
  },
];

function DirectoryPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"caregivers" | "legal">("caregivers");
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("Alle");

  const filtered = useMemo(() => {
    return CAREGIVERS.filter((c) => {
      const matchesType = activeType === "Alle" || c.type === activeType;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.plz.includes(q) ||
        c.type.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [search, activeType]);

  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Hilfe finden
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Pflegedienste, Pflegeheime und Alltagsunterstuetzung in Ihrer Naehe.
          </p>
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-secondary/50 p-3 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              Dieses Verzeichnis dient ausschliesslich zur Information. Klara ist nicht mit den aufgefuehrten Anbietern verbunden und erhaelt keine Provision oder Verguetung.
            </span>
          </div>
        </header>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "caregivers" | "legal")}>
          <TabsList className="grid w-full grid-cols-2 md:max-w-md">
            <TabsTrigger value="caregivers" className="gap-2">
              <HeartHandshake className="h-4 w-4" />
              Pflegeanbieter
            </TabsTrigger>
            <TabsTrigger value="legal" className="gap-2">
              <Scale className="h-4 w-4" />
              Rechtsberatung
            </TabsTrigger>
          </TabsList>

          <TabsContent value="caregivers" className="mt-6">
            {/* Search + filter bar */}
            <div className="mb-5 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="PLZ, Ort oder Name suchen..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {PROVIDER_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
                      (activeType === type
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground")
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {filtered.length} Anbieter gefunden
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((c) => (
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
                      <span>{c.address} · ca. {c.distanceKm} km</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0" />
                      <a href={"tel:" + c.phone.replace(/\s+/g, "")} className="hover:text-foreground">
                        {c.phone}
                      </a>
                    </p>
                    {c.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 shrink-0" />
                        <a href={"mailto:" + c.email} className="hover:text-foreground break-all">
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
              {filtered.length === 0 && (
                <div className="col-span-2 rounded-xl border border-border bg-secondary/30 px-6 py-12 text-center text-sm text-muted-foreground">
                  Keine Anbieter fuer diese Suche gefunden. Versuchen Sie eine andere PLZ oder entfernen Sie den Filter.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="legal" className="mt-6">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 mb-6">
              Dieser Bereich ist noch im Aufbau. Die Eintraege werden nach Pruefung durch qualifizierte Sozialrechtsanwaelte befuellt. Bitte schauen Sie spaeter wieder vorbei oder wenden Sie sich direkt an den VdK oder die Verbraucherzentrale.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">VdK Deutschland</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Sozialverband · Beratung bei Pflegegrad-Widerspruch</p>
                  <p className="flex items-center gap-2">
                    <Globe className="h-4 w-4 shrink-0" />
                    <a href="https://www.vdk.de" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">
                      www.vdk.de
                    </a>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Verbraucherzentrale Bayern</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Pflegerechtliche Beratung und Unterstuetzung</p>
                  <p className="flex items-center gap-2">
                    <Globe className="h-4 w-4 shrink-0" />
                    <a href="https://www.verbraucherzentrale-bayern.de" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">
                      verbraucherzentrale-bayern.de
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </PublicShell>
  );
}
