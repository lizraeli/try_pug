export interface CodeEntry {
  pug: string;
  json: string;
}

interface CodeLibrary {
  [key: string]: CodeEntry;
}

const codeLibrary: CodeLibrary = {
  hello: {
    pug: `
    doctype html
    html(lang="en")
      head
        title Hello World
      body
        h1 Pug
        div(class="container")
          h2 Hello #{name}`,
    json: `
    {
      "name":"Mike"
    }`
  },
  puppy: {
    pug: `
    div(class='ui fluid')
    div(class='content')
      a(class='header') #{puppy.name}
      div breed: #{puppy.breed}
      div sex: #{puppy.sex}
      div age: #{puppy.age}
    `,
    json: `
    { "puppy" : {
        "id": 1,
        "name": "Tyler",
        "breed": "Retriever",
        "sex": "M",
        "age": 3
      }
    }`
  },
  "simple tags": {
    pug: `
      div
        p Hello!
        p World!`,
    json: `{}`
  },
  attributes: {
    pug: `
      a(class='button' href='google.com') Google
      br
      button(type='button' class=\`btn-\${btnType}\`) click`,
    json: `
    {
      "btnType": "info"
    }`
  },
  iteration: {
    pug: `
      ul
        each animal in animals
          li #{animal}`,
    json: `
    {
      "animals": ["dog", "cat", "giraffe"]
    }`
  },
  object_iteration: {
    pug: `
      each laureate in laureates
        p
          div First Name: #{ laureate.firstName }
          div Last Name: #{ laureate.lastName }
    `,
    json: `
      {
        "laureates": [
          {
            "firstName": "Hendrik Antoon",
            "lastName": "Lorentz"
          },
          {
            "firstName": "Pieter",
            "lastName": "Zeeman"
          },
          {
            "firstName": "Antoine Henri",
            "lastName": "Becquerel"
          },
          {
            "firstName": "Marie",
            "lastName": "Curie, née Sklodowska"
          }
        ]
      }`
  },
  mixins_1: {
    pug: `
      //- Declaration
      mixin list
        ul
          li foo
          li bar
          li baz
      //- Use
      +list
      +list`,
    json: `{}`
  },
  mixins_arguments: {
    pug: `
      mixin list(arr)
        ul
          each elem in arr
            li #{elem}
    
      +list(pets)
      +list(colors)`,
    json: `
      {
        "pets": ["dog", "cat"],
        "colors": ["blue", "green", "red"]
      }`
  },
  all_together: {
    pug: `
      mixin animalDetails(animal)
        - const { name, species } = animal
        div name: #{name}
        div species: #{species}
  
      ul
        each animal in animals
          li
            +animalDetails(animal)`,
    json: `
      { 
        "animals": [
          { 
            "name": "Pluto", 
            "species": "dog"
          },
          {
            "name": "Whiskers",
            "species": "Cat"
          },
          {
            "name": "Gino",
            "species": "Jiraffe"
          }
        ]
      }`
  }
};

export default codeLibrary;
