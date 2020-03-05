/* jshint esversion: 6 */



// Start of the whole vue app
var app = new Vue({
	el: '#app',
	data: {
		// bool
		modalThemeOpened: false,
		displayInfoPanel: false,
		isThereError: false,
		isButtonInfoActive: false,
		isButtonDlActive: false,
		isButtonDeleteActive: false,
		isMaskActive: false,
		// String
		currentPage: "pageAlbums",
		currentAlbum: "",
		currentTheme: 'themeLight',
		errorMsg: "There is no error, for now…",
		activeSorting: '',
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
		 * The buttons on the photo display panel must be deactivated when leaving the panel.
		 */
		 inactiveAllButtons : function(){
		 	this.isButtonInfoActive = false;
		 	this.isButtonDlActive = false;
		 	this.isButtonDeleteActive = false;
		 },

		/**
		 * sort on key values
		 *
		 * @param      {String}  key The key to be examined
		 * @return     {number}  The series of numbers to make the sorting
		 */
		 keysrt : function(key){	
		 	return function(a,b){
		 		if (a[key] < b[key]) return -1;
		 		else if (a[key] > b[key]) return 0;
		 	};
		 },

		/**
		 * Engage the sorting function and refresh the app
		 *
		 * @param {String} criterion The criterion for the sorting
		 */
		 sortBy: function(criterion){
		 	this.activeSorting = criterion;
		 	this.photos.sort(this.keysrt(criterion));
			app.$forceUpdate(); // refresh page
		},

		/**
		 * Change the theme and close the modale
		 *
		 * @param {String} theme The name of the new theme to use
		 */
		 setThemeRight: function(theme){
		 	this.currentTheme = theme;
		 	// this.modalThemeOpened = false;
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
 			this.isMaskActive = false;
 			this.currentPhotoInfos = {};
 		},

		/**
		 * Opens and display a photo.
		 *
		 * @param {integer}  anId  An identifier
		 */
		 openPhoto: function(anId){
		 	this.isMaskActive = true;

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
		 	this.isMaskActive = false;
		 	this.displayInfoPanel = false;
		 	this.inactiveAllButtons();
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
