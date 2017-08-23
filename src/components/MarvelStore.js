import { computed, observable, action, extendObservable } from 'mobx';
import axios from 'axios';
import React from 'react';
import { getTimeStamp, PUBLIC_KEY, getHash } from './constants';

const MarvelCharacter = (id, name, desc) => {
  return {
    id: id,
    name: name,
    desc: desc,
  }
}

const Comic = (title, desc, id, imgUrl) => {
  return {
    title: title,
    desc: desc,
    id,
    showImg: () => {
      return imgUrl + "/portrait_uncanny.jpg"
    }
  }
}

 export class MarvelStore {
   constructor() {
     extendObservable(this, {
       searchInput: "",
       characterRes: [],
       first: true,
       comicRes: ['Loading'],
       showComics: false,

       getCharacters: action(function() {
         if (this.searchInput.length > 0)
             axios.get(this.characterUrl)
                  .then(res => this.characterRes = res.data.data.results)
                  .catch(err => console.log('Probably have no search input.'));
       }),

       changeSearch: action(function(value) {
         if (!this.showComics){
           this.searchInput = value;
           this.getCharacters();
         }
         else {
           this.reset();
         }
       }),

       getComics: action(function(charId) {
         let url = 'https://gateway.marvel.com/v1/public/characters/'+ charId +'/comics?hasDigitalIssue=true&orderBy=onsaleDate&ts='+ getTimeStamp() +'&apikey='+ PUBLIC_KEY +'&hash='+ getHash();
           axios.get(url)
                .then(res => this.comicRes = res.data.data.results)
                .catch((err) => console.log(err));
       }),
       reset: action(function() {
         this.searchInput = "";
         this.comicRes = ['Loading'];
         this.showComics = false;
       }),
       get characterUrl() {
         return 'https://gateway.marvel.com/v1/public/characters?orderBy=name&nameStartsWith='+this.searchInput+'&ts='+ getTimeStamp() +'&apikey='+ PUBLIC_KEY +'&hash='+ getHash();
       },

       get characterList() {
         return this.characterRes.map(obj => MarvelCharacter(obj.id, obj.name, obj.description));
       },

       get comicList() {
           if (this.comicRes[0] === 'Loading') {
             return 'Loading';
           } else {
             return this.comicRes.map(obj => {
               const desc = (obj.textObjects[0] !== undefined) ? obj.textObjects[0].text : 'No description.';
               const imgPath = (obj.images[0] !== undefined) ? obj.images[0].path : 'No Image.';
               return Comic(obj.title, desc, obj.id, imgPath);
             })
           }
       },
       get displayComics() {
         let Display;

         if (this.comicList === 'Loading')
           Display = <h2>Loading...</h2>;
         else
           Display = this.comicList.length < 1 ? <p>No Comics</p> : this.comicList.map((comic, i) =>{
             return (
               <div key={comic.id} className="ComicHolder">
                <p className={"desc" + i +' descText'}>{comic.desc}</p>
                <img key={comic.id} alt={comic.title} src={comic.showImg()} className={"comic" + i} />
               </div>
             );
           });

         return Display;
       }

   })
 }
}

export default new MarvelStore();
