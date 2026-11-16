// Inhalte der Webseite: Kontakt, Trainingszeiten und Athleten.
// Termine, News, Fotos und Instagram-Posts werden im Admin-Bereich (/admin.html) verwaltet.
//
// EINHEITLICHES SYSTEM FÜR ATHLETEN (bitte bei jedem neuen Eintrag genau so einhalten)
//
//   name, club     Wie in der Umfrage angegeben. Vereinsnamen immer gleich schreiben.
//   groups         ['Sprint'] oder ['Sprung'] (Hürden und Mittelstrecke gehören zu Sprint)
//   photo          'img/vorname-nachname.jpg', Hochformat 4:5, 560×700 (optional)
//   wa             World-Athletics-Kürzel aus der Profiladresse (optional)
//   bio            Zwei bis drei Sätze in Ich-Form (optional)
//
//   pbs            Bestleistungen, wichtigste zuerst, höchstens drei: ['Disziplin', 'Leistung']
//                  Disziplin:  '100 m', '400 m Hürden', 'Hochsprung', 'Weitsprung'
//                              Zusatz in Klammern: '(Halle)', '(U18)', '(UBS Kids Cup)'
//                  Leistung:   Zeiten ohne Einheit: '11.59', '2:11.48'
//                              Höhen und Weiten mit Einheit: '1.80 m'
//
//   wins           Erfolge, neuste zuerst: [Jahr, 'Wettkampf', 'Resultat']
//                  Jahr:       Zahl, oder null wenn unbekannt
//                  Wettkampf:  ausgeschrieben, Kategorie hinten:
//                              'Schweizer Meisterschaft U18', 'Schweizer Hallenmeisterschaft U16',
//                              'Kantonalmeisterschaft U18', 'Europameisterschaft U18, Rieti'
//                  Resultat:   'Gold' / 'Silber' / 'Bronze' an Meisterschaften, sonst '2. Rang',
//                              'Final', 'Qualifikation', 'Teilnahme'; Disziplin nach Komma: 'Bronze, 400 m'
//
// Die Reihenfolge der Athleten hier ist egal: Die Seite sortiert selbst (mit Foto zuerst, dann nach Nachname).

window.SITE = {
  // Trainingsgruppen: Sprint (inkl. Hürden und Mittelstrecke) und Sprung
  groups: ['Sprint', 'Sprung'],

  contact: {
    email: 'kontakt@usserschwyz-athletics.com',
    instagram: 'ua_sprint_team'
  },

  // Link zur Umfrage, über die Athleten ihr Profil einreichen
  profileForm: 'https://tally.so/r/EqdJ0o',

  trainers: [
    { name: 'Arsene Formaz', role: 'Sprung' }
  ],

  // map (optional): Suchbegriff für den Kartenlink neben dem Ort
  training: [
    { day: 'Montag', time: '18:00–20:00', place: 'Weid, Pfäffikon', map: 'Sportanlage Weid, Pfäffikon SZ' },
    { day: 'Mittwoch', time: '18:00–20:00', place: 'Chrummen', map: 'Sportanlage Chrummen, Freienbach' },
    { day: 'Samstag', time: '10:30–13:00', place: 'Alte Kanti, Pfäffikon' }
  ],

  // Termine werden im Admin-Bereich (/admin.html) erfasst. Hier nur als Reserve.
  events: [
  ],

  athletes: [
    { name: 'Livia Casagrande', club: 'TSV Steinen', groups: ['Sprint'], wa: 'livia-casagrande-15098340',
      photo: 'img/livia-casagrande.jpg',
      pbs: [['400 m', '56.96'], ['800 m', '2:11.48'], ['1000 m', '2:53']],
      wins: [
        [2026, 'Europameisterschaft U18, Rieti', 'Teilnahme'],
        [null, 'Schweizer Meisterschaft U18', 'Bronze, 400 m'],
        [null, 'Schweizer Meisterschaft U16', '2× Gold, 600 m'],
        [null, 'Schweizer Hallenmeisterschaft U16', 'Bronze, 1000 m'],
        [null, 'Kantonalrekorde', 'in mehreren Disziplinen']
      ],
      bio: 'Ich mache seit neun Jahren Leichtathletik. Mir macht das Rennen Spass, und ich mag harte Trainings. Nächstes Jahr will ich ein gutes Resultat am EYOF 2027 und Gold an der Schweizer Meisterschaft.' },
    { name: 'Pauline Vial', club: 'ETV Schindellegi', groups: ['Sprint'], wa: 'pauline-vial-15197227',
      photo: 'img/pauline-vial.jpg',
      pbs: [['100 m Hürden (U18)', '14.54'], ['100 m', '12.62'], ['200 m', '27.15']],
      wins: [
        [2026, 'Schweizer Meisterschaft', '12. Rang'],
        [null, 'Regionenmeisterschaft', 'Medaille']
      ],
      bio: 'Ich mache seit 2023 Leichtathletik und mag besonders die Mischung aus Sprint und Hürden. In Zukunft möchte ich weiterhin Spass am Sport haben und eine Medaille an den Schweizer Meisterschaften gewinnen.' },
    { name: 'Elis Schönbächler', club: 'STV Einsiedeln', groups: ['Sprint'], wa: 'elis-schonbachler-15257093',
      photo: 'img/elis-schoenbaechler.jpg',
      pbs: [['400 m', '49.63'], ['200 m', '22.73'], ['100 m', '11.35']],
      wins: [
        [2026, 'Schweizer Meisterschaft U20', 'Final'],
        [2026, 'Schweizer Meisterschaft Aktive', 'Teilnahme'],
        [2025, 'Schweizer Meisterschaft U18', 'Bronze, 400 m']
      ],
      bio: 'Ich mache seit 2024 Leichtathletik und mag die Kombination aus Geschwindigkeit und Ausdauer. Mein Ziel ist eine weitere Medaille an einer Schweizer Meisterschaft und neue persönliche Bestleistungen.' },
    { name: 'Eleni Harakopidis', club: 'STV Wollerau-Bäch', groups: ['Sprung'],
      photo: 'img/eleni-harakopidis.jpg',
      pbs: [['Hochsprung', '1.60 m'], ['Weitsprung', '5.02 m']],
      wins: [
        [2026, 'Kantonalmeisterschaft U18', 'Gold, Hochsprung'],
        [2026, 'Schweizer Meisterschaft U18', 'Qualifikation, Hochsprung']
      ],
      bio: 'Ich betreibe seit acht Jahren Leichtathletik und habe mich 2025 auf den Hochsprung spezialisiert. Mir gefällt besonders die Herausforderung, immer grössere Höhen zu schaffen und meine Technik zu verbessern.' },
    { name: 'Tim Bürgi', club: 'STV Pfäffikon-Freienbach', groups: ['Sprung'],
      photo: 'img/tim-buergi.jpg',
      pbs: [['Hochsprung', '1.75 m'], ['Weitsprung', '5.98 m'], ['100 m', '11.59']],
      bio: 'Ich mache seit rund acht Jahren Leichtathletik. Mir gefällt es zu sehen, wie sich das Training auf die Leistung auswirkt. Es ist zwar eine Einzelsportart, aber ohne die lustigen Trainings in der Gruppe würde es nicht gehen. Mein Ziel ist es, mich mit viel Training weiter zu verbessern und möglichst viele neue Bestleistungen zu erzielen.' },
    { name: 'Jana Vogt', club: 'STV Wangen SZ', groups: ['Sprung'],
      photo: 'img/jana-vogt.jpg',
      pbs: [['Hochsprung', '1.56 m'], ['Weitsprung (UBS Kids Cup)', '4.89 m']],
      wins: [
        [2026, 'Kantonalrekord U14', '']
      ],
      bio: 'Ich mache seit 2023 Leichtathletik. Die netten Leute, die Bewegung und die verschiedenen Disziplinen gefallen mir sehr. Mein Ziel: mich immer weiter verbessern und den Spass nicht verlieren.' },
    { name: 'Moses Thomas', club: 'TV Küssnacht', groups: ['Sprung'],
      photo: 'img/moses-thomas.jpg',
      pbs: [['Hochsprung', '1.80 m']],
      wins: [
        [2026, 'Hochdorfer Mehrkampfmeisterschaft', '2. Rang, Fünfkampf'],
        [2026, 'EKM', '3. Rang, Hochsprung'],
        [2026, 'Bettagsmeeting Zug', '2. Rang, Hochsprung'],
        [2026, 'Kader', 'Mitglied']
      ],
      bio: 'Ich mache seit 2023 Leichtathletik. Mir gefällt, wie vielfältig die Sportart ist. Mein Ziel ist ein Podest an der SM in den nächsten zwei Saisons.' },
    { name: 'Gian Cavegn', club: 'STV Wollerau-Bäch', groups: ['Sprint'],
      pbs: [['100 m', '11.17']] },
    { name: 'Matteo Faggi', club: 'STV Wollerau-Bäch', groups: ['Sprint'], wa: 'matteo-faggi-15331627',
      pbs: [['200 m', '23.15'], ['100 m', '11.51']] },
    { name: 'Lia Flattich', club: 'TV Pfäffikon', groups: ['Sprint'], wa: 'lia-flattich-14709244',
      pbs: [['400 m Hürden', '1:01.29'], ['400 m', '56.50'], ['100 m', '12.22']] },
    { name: 'Miro Flattich', club: 'TV Pfäffikon', groups: ['Sprint'], wa: 'miro-joel-flattich-14810916',
      pbs: [['800 m', '1:52.63'], ['600 m', '1:19.94'], ['1000 m (Halle)', '2:33.42']] },
    { name: 'Marco Harder', club: 'STV Wollerau-Bäch', groups: ['Sprint'], wa: 'marco-harder-15064887',
      pbs: [['100 m', '10.80'], ['60 m (Halle)', '7.04'], ['200 m (Halle)', '22.94']] },
    { name: 'Lara Laager', club: 'LAV Glarus', groups: ['Sprint'], wa: 'lara-laager-15154530',
      pbs: [['200 m', '25.48'], ['100 m', '12.73'], ['150 m', '19.14']] },
    { name: 'Jana Schneider', club: 'STV Wangen SZ', groups: ['Sprint'],
      pbs: [['100 m Hürden (U18)', '15.68'], ['200 m', '26.72'], ['100 m', '13.08']] }
  ]
};
