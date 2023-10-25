export function loadLists() {
    return [
      { 
        title: 'Backlog', 
        creatable: true,
        cards: [
          {
            id: 1,
            content: 'Criar Documento',
            descricao: 'Criar documento .dock da maté...',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            user: 'https://gravatar.com/avatar/7087488912ef4c8e9322a93564dd0116?s=400&d=robohash&r=x'
          },   
          {
            id: 2,
            content: 'Criar vídeo para o Youtube ensinando a recriar a interface do Pipefy,',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
            user: 'https://gravatar.com/avatar/7087488912ef4c8e9322a93564dd0116?s=400&d=robohash&r=x'
          },
          {
            id: 3,
            content: 'Estudar módulo 03 de React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
            user: 'https://gravatar.com/avatar/7087488912ef4c8e9322a93564dd0116?s=400&d=robohash&r=x'
          },
        ]
      },
      { 
        title: 'Sprint Backlog', 
        creatable: false,
        isEmpty: true,
        cards: [
          {
            id: 6,
            content: 'Recriando clone do Pipefy',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
           user: 'https://gravatar.com/avatar/7087488912ef4c8e9322a93564dd0116?s=400&d=robohash&r=x'
          }
        ]
      },
      { 
        title: 'Development', 
        creatable: false,
        cards: [
          {
            id: 7,
            content: 'Gravar sobre Geolocalização e mapas com React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
            user: 'https://gravatar.com/avatar/7087488912ef4c8e9322a93564dd0116?s=400&d=robohash&r=x'
          },
          {
            id: 8,
            content: 'Gravar testes e deploy ReactJS',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#54e1f'],
            user: 'https://gravatar.com/avatar/7087488912ef4c8e9322a93564dd0116?s=400&d=robohash&r=x'
          },
          {
            id: 9,
            content: 'Ajustes na biblioteca unform',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
         }
        ]
      },
      { 
        title: 'Done Development', 
        creatable: false,
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
         },
          {
            id: 12,
            content: 'Gravar testes e deploy ReactJS',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#54e1f'],
          },
          {
            id: 13,
            content: 'Gravar Aula "Internacionalização de aplicações Node.js, ReactJS e React Native"',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
          }
        ]
      },
      { 
        title: 'Test', 
        creatable: false,
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
         },
          {
            id: 12,
            content: 'Gravar testes e deploy ReactJS',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#54e1f'],
          },
        ]
      },
      { 
        title: 'Done Test', 
        creatable: false,
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
         },
          {
            id: 12,
            content: 'Gravar testes e deploy ReactJS',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#54e1f'],
          },
        ]
      },
      { 
        title: 'Rework', 
        creatable: false,
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
         },
        ]
      },
      { 
        title: 'DONE', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
         },
          {
            id: 12,
            content: 'Gravar testes e deploy ReactJS',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#54e1f'],
          },
          {
            id: 13,
            content: 'Gravar Aula "Internacionalização de aplicações Node.js, ReactJS e React Native"',
            data: '30-06-2023',
            prioridade: 3,
            labels: ['#ff0000'],
            tempo: '00:00:00',
            labels2: ['#2d9c18'],
          }
        ]
      },
    ];
  }