// Inhalte der Webseite: Kontakt, Trainer, Trainingszeiten und Athleten.
// News und Instagram-Posts werden im Admin-Bereich (/admin.html) verwaltet.
// Optional pro Athlet: photo: 'img/vorname-nachname.jpg', bio: 'Text…', wins: ['2026 – …']

window.SITE = {
  // Trainingsgruppen: Sprint (inkl. Hürden und Mittelstrecke) und Sprung
  groups: ['Sprint', 'Sprung'],

  contact: {
    name: 'Egon Flattich',
    email: 'kontakt@usserschwyz-athletics.com',
    instagram: 'ua_sprint_team'
  },

  trainers: [
    { name: 'Egon Flattich', role: 'Sprint, Lauf und Hürden · Kontaktperson' },
    { name: 'Arsene Formaz', role: 'Sprung' }
  ],

  training: [
    { day: 'Montag', time: '18:00–20:00', place: 'Weid, Pfäffikon' },
    { day: 'Mittwoch', time: '18:00–20:00', place: 'Chrummen' },
    { day: 'Samstag', time: '10:30–13:00', place: 'Alte Kanti, Pfäffikon' }
  ],

  // Termine werden im Admin-Bereich (/admin.html) erfasst. Hier nur als Reserve.
  events: [
  ],

  athletes: [
    { name: 'Livia Casagrande', club: 'TSV Steinen', groups: ['Sprint'], wa: 'livia-casagrande-15098340',
      photo: 'img/livia-casagrande.jpg',
      pbs: [['400 m', '56.96'], ['800 m', '2:11.48'], ['1000 m', '2:53']],
      wins: ['Teilnahme U18-Europameisterschaften Rieti', '2× Gold an der Schweizer Meisterschaft U16 über 600 m', 'Bronze an der Schweizer Meisterschaft U18 über 400 m', 'Bronze an der Hallen-SM U16 über 1000 m', 'Mehrere Kantonalrekorde in verschiedenen Disziplinen'],
      bio: 'Ich mache seit neun Jahren Leichtathletik. Mir macht das Rennen Spass, und ich mag harte Trainings. Nächstes Jahr will ich ein gutes Resultat am EYOF 2027 und Gold an der Schweizer Meisterschaft.' },
    { name: 'Pauline Vial', club: 'ETV Schindellegi', groups: ['Sprint'], wa: 'pauline-vial-15197227',
      pbs: [['100 m Hürden (U18)', '14.54'], ['100 m', '12.62'], ['200 m', '27.15']] },
    { name: 'Elis Schönbächler', club: 'STV Einsiedeln', groups: ['Sprint'], wa: 'elis-schonbachler-15257093',
      photo: 'img/elis-schoenbaechler.jpg',
      pbs: [['400 m', '49.63'], ['200 m', '22.73'], ['100 m', '11.35']],
      wins: ['2026 Final an der U20-SM', '2026 Teilnahme an der SM Aktive', '2025 Bronze an der U18-SM über 400 m'],
      bio: 'Ich mache seit 2024 Leichtathletik und mag die Kombination aus Geschwindigkeit und Ausdauer. Mein Ziel ist eine weitere Medaille an einer Schweizer Meisterschaft und neue persönliche Bestleistungen.' },
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
