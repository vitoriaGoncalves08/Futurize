export function loadLists() {
  return [
      { 
          title: 'Backlog', 
          creatable: true,
          cards: [],
      },
      { 
          title: 'Sprint Backlog', 
          creatable: false,
          cards: []
      },
      { 
          title: 'Development', 
          creatable: false,
          cards: []
      },
      { 
          title: 'Done Development', 
          creatable: false,
          cards: []
      },
      { 
          title: 'Test', 
          creatable: false,
          cards: []
      },
      { 
          title: 'Done Test', 
          creatable: false,
          cards: []
      },
      { 
          title: 'Rework', 
          creatable: false,
          cards: []
      },
      { 
          title: 'DONE', 
          creatable: false,
          done: true,
          cards: []
      },
  ];
}
