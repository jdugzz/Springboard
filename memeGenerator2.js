#divHolder {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

#meme {
   position: relative ;
   background-color: red ; 
   width: 500px;
   height: 1000px;
   padding-bottom: 40px;
   margin-left: 10px;
   margin-right: 10px;
   margin-bottom: 10px;
   overflow: hidden;
}

#mainContainer {
    background-color: red;
    margin-bottom: 10px;
}

.topText {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
}

.bottomText {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 50px;
    text-align: center;
}

.remove {
    margin-top: 10px;
    margin-bottom: 10px;
}

.memeImg {
    width: 500px;
    height: 500px;
    border-radius: 10px;
}

.memeImg:hover {
    filter: grayscale(1);
    transition: 0.5s ease-in-out;
}

#memeForm {
    border-width: 2px;
    border-color: black;
    border-style: solid; 
    background-color: #FAF9F6;
    width: 50vw;
    margin: auto;

}

#image {
    margin-left: 35px;
    margin-bottom: 1em;
    width: 25vw;
}

#topText {
    margin-left: 23px;
    margin-bottom: 1em;
    width: 25vw;
}

#bT {
    margin-bottom: 1em;
    width: 25vw;
}

h1 {
    margin: auto;
    text-align: center;
}

h3 {
    margin: auto;
    text-align: center;
}

/* .delete {
    z-index: 100;
    display: flex;
    background-color: green;
    position: absolute;
    width: 500px;
    height: 500px;
    bottom: 40px;
    align-items: center;
    justify-content: center;
    
    
} */

.delete:hover {
    visibility: hidden;
}

/* .deleteText {
    z-index: 101;
    position: relative;
    margin: auto;
    text-align: center;
    bottom: 250px;
    margin-bottom: auto;
    margin-top: auto;
} */