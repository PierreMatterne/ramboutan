/* jshint esversion: 6 */



// Start of the whole vue app
var app = new Vue({
	el: '#app',
	data: {
		// bool
		modalThemeOpened: false,
		displayInfoPanel: false,
		isThereError: false,
		isButtonInfoActive:false,
		isButtonDlActive:false,
		isButtonDeleteActive:false,
		// String
		currentPage: "pageAlbums",
		currentAlbum: "",
		currentTheme: 'themeLight',
		errorMsg: "There is no error, for now…",
		// dictionary object
		currentPhotoInfos: {},		
	},

	// Initialisation
	created(){
		this.albums = albums; 
		this.photos = photos;
	},

	methods: {

		/**
		 * Change the theme and close the modale
		 *
		 * @param {String} theme The name of the new theme to use
		 */
		 setThemeRight: function(theme){
		 	this.currentTheme = theme;
		 	this.modalThemeOpened = false;
		 },

		/**
		 * Open the Photos page and display the content of an album
		 *
		 * @param {String} aName The name of the album to display
		 */
		 openAlbum: function(aName){
		 	this.currentPage = "pagePhotos";
		 	this.currentAlbum = aName;
		 },

		/**
 		* Gets back to the albums page.
 		*/
 		getBackToAlbums: function(){
 			this.currentPage = "pageAlbums";
			// désactiver les images ouvertes
		},

		/**
		 * Opens and display a photo.
		 *
		 * @param {integer}  anId  An identifier
		 */
		 openPhoto: function(anId){
		 	document.getElementById('mask').classList.add('active');
			// Remplaçable par un v-if ou v-show ? avec transition ?
			// this.currentPhotoUrl = getUrlFromId(anId) ;
			let	width = window.innerWidth || document.body.clientWidth;
			let height = window.innerHeight || document.body.clientHeight;

			document.getElementById('thePhoto').style.maxWidth=width-30 + 'px';
			document.getElementById('thePhoto').style.maxHeight=height-200 + 'px';

			this.currentPhotoInfos = this.getAllinfos(anId);

		},

		/**
		 * Remove the mask and close the displayed photo
		 */
		 unMask: function(){
		 	document.getElementById('mask').classList.remove('active');
			// Remplacer la ligne ci-dessus par un v-show + animation.
			this.displayInfoPanel = false;
		},

		/**
 		* Opens the modal to choose a theme.
 		*/
 		openModalTheme: function(){
 			this.modalThemeOpened = true;
 		},

 		/**
 		 * Gets all the infos for a photo.
 		 *
 		 * @param {integer} id The identifier
 		 * @return {list} All the data about one photo.
 		 */
 		 getAllinfos: function(id){
 		 	for (let photo of app.photos){
 		 		if (photo.id === id){ return photo;}
 		 	}
 		 }


 		},

 		computed: {
 		/**
 		 * Return the number of albums in total
 		 *
 		 * @return {integer} the number of albums
 		 */
 		 nbrAlbums(){
 		 	return this.albums.length;
 		 },

 		/**
 		 * Return the number of photos in the current openend album
 		 *
 		 * @return {integer} the number of photo
 		 */
 		 nbrPhotosInAlbum(){
 		 	let nbrPhotos = 0;
 		 	for (let photo of app.photos){
 		 		if (photo.inAlbum === this.currentAlbum){ 
 		 			nbrPhotos += 1;
 		 		}
 		 	}
 		 	return nbrPhotos;
 		 }

 		}
 	}); 

