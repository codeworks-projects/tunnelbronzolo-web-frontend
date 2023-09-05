<template>
  <div>
    <Header />
    <main>
      <div class="center terms-ct">
        <div v-if="locale === 'it'">
          <h1>Informativa sulla privacy</h1>

          <h2>Titolare del Trattamento dei Dati</h2>
          <p>
            Il titolare del trattamento dei dati personali su questo sito web è:
          </p>
          <p>
            {{ legalName }}<br />
            Indirizzo: {{ $t("contacts.legalStreet") }}<br />
            Email: {{ $t("contacts.email", { at: "@" }) }}<br />
            Telefono: {{ $t("contacts.phone") }}
          </p>

          <h2>Responsabile della Protezione dei Dati (RPD)</h2>
          <p>
            Il Responsabile della Protezione dei Dati (RPD) per
            {{ websiteName }} è:
          </p>
          <p>
            {{ legalName }}<br />
            Indirizzo: {{ $t("contacts.legalStreet") }}<br />
            Email: {{ $t("contacts.email", { at: "@" }) }}<br />
            Telefono: {{ $t("contacts.phone") }}
          </p>

          <h2>Raccolta e Utilizzo dei Dati Personali</h2>
          <p>
            {{ websiteName }} potrebbe raccogliere e utilizzare i seguenti tipi
            di dati personali:
          </p>
          <ul>
            <li>Nome e cognome tramite modulo di contatto</li>
            <li>Email tramite modulo di contatto</li>
          </ul>

          <h2>Utilizzo dei Cookie</h2>
          <p>
            Questo sito web non utilizza cookie di profilazione e utilizza un
            singolo cookie tecnico chiamato "i18n_redirected". Lo scopo di
            questo cookie è ricordare la preferenza di lingua dell'utente e
            reindirizzarlo alla versione appropriata del sito web.
          </p>

          <h2>Siti Web di Terze Parti</h2>
          <p>
            Questo sito web potrebbe contenere collegamenti a siti web di terze
            parti. {{ websiteName }} non è responsabile delle pratiche sulla
            privacy o dei contenuti di questi siti di terze parti. Incoraggiamo
            gli utenti a leggere le informative sulla privacy di eventuali siti
            esterni che visitano.
          </p>

          <h2>Misure di Sicurezza</h2>
          <p>
            {{ websiteName }} adotta adeguate misure di sicurezza per proteggere
            da accessi non autorizzati, alterazioni, divulgazioni o distruzioni
            dei dati personali. Tuttavia, nessuna trasmissione di dati su
            Internet o sistema di archiviazione può essere garantita al 100%
            sicura.
          </p>

          <h2>Modifiche a questa Informativa sulla Privacy</h2>
          <p>
            {{ websiteName }} si riserva il diritto di aggiornare o modificare
            questa informativa sulla privacy in qualsiasi momento. Eventuali
            modifiche saranno pubblicate su questa pagina con una data revisata.
          </p>

          <h2>Informazioni di Contatto</h2>
          <p>
            Se hai domande o dubbi su questa informativa sulla privacy, ti
            preghiamo di contattarci:
          </p>
          <p>
            {{ legalName }}<br />
            Indirizzo: {{ $t("contacts.legalStreet") }}<br />
            Email: {{ $t("contacts.email", { at: "@" }) }}<br />
            Telefono: {{ $t("contacts.phone") }}
          </p>
        </div>
        <div v-else-if="locale === 'de'">
          <h1>Datenschutzerklärung</h1>

          <h2>Datenverantwortlicher</h2>
          <p>Der Datenverantwortliche für diese Website ist:</p>
          <p>
            {{ legalName }}<br />
            Adresse: {{ $t("contacts.legalStreet") }}<br />
            E-Mail: {{ $t("contacts.email", { at: "@" }) }}<br />
            Telefon: {{ $t("contacts.phone") }}
          </p>

          <h2>Datenschutzbeauftragter (DSB)</h2>
          <p>Der Datenschutzbeauftragte (DSB) für {{ websiteName }} ist:</p>
          <p>
            {{ legalName }}<br />
            Adresse: {{ $t("contacts.legalStreet") }}<br />
            E-Mail: {{ $t("contacts.email", { at: "@" }) }}<br />
            Telefon: {{ $t("contacts.phone") }}
          </p>

          <h2>Erhebung und Verwendung personenbezogener Daten</h2>
          <p>
            {{ websiteName }} kann folgende Arten personenbezogener Daten
            erheben und verwenden:
          </p>
          <ul>
            <li>Vor- und Nachname über das Kontaktformular</li>
            <li>E-Mail über das Kontaktformular</li>
          </ul>

          <h2>Verwendung von Cookies</h2>
          <p>
            Diese Website verwendet keine Profiling-Cookies und nur ein
            technisches Cookie namens "i18n_redirected". Der Zweck dieses
            Cookies besteht darin, die Spracheinstellung des Benutzers zu
            speichern und ihn zur entsprechenden Version der Website
            weiterzuleiten.
          </p>

          <h2>Websites von Drittanbietern</h2>
          <p>
            Diese Website kann Links zu Websites von Drittanbietern enthalten.
            {{ websiteName }} ist nicht verantwortlich für die
            Datenschutzpraktiken oder Inhalte dieser Drittanbieter-Websites. Wir
            empfehlen den Benutzern, die Datenschutzerklärungen der besuchten
            externen Websites zu lesen.
          </p>

          <h2>Sicherheitsmaßnahmen</h2>
          <p>
            {{ websiteName }} ergreift angemessene Sicherheitsmaßnahmen, um
            unbefugten Zugriff, Änderungen, Offenlegungen oder Zerstörung von
            personenbezogenen Daten zu schützen. Dennoch kann keine
            Datenübertragung über das Internet oder ein Datenspeichersystem zu
            100 % sicher sein.
          </p>

          <h2>Änderungen dieser Datenschutzerklärung</h2>
          <p>
            {{ websiteName }} behält sich das Recht vor, diese
            Datenschutzerklärung jederzeit zu aktualisieren oder zu ändern. Alle
            Änderungen werden auf dieser Seite mit einem überarbeiteten Datum
            veröffentlicht.
          </p>

          <h2>Kontaktinformationen</h2>
          <p>
            Bei Fragen oder Bedenken zu dieser Datenschutzerklärung kontaktieren
            Sie uns bitte:
          </p>
          <p>
            {{ legalName }}<br />
            Adresse: {{ $t("contacts.legalStreet") }}<br />
            E-Mail: {{ $t("contacts.email", { at: "@" }) }}<br />
            Telefon: {{ $t("contacts.phone") }}
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const websiteName = "gruppolega.com";
const legalName = "Lega Salvini Alto Adige Südtirol Lega";
</script>

<style lang="postcss" scoped>
.terms-ct {
  @apply pt-6 pb-12;

  & h1 {
    @apply text-4xl py-4 font-black;
  }

  & h2 {
    @apply text-xl mt-6 font-black;
  }
}
</style>
