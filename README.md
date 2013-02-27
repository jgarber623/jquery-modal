# jquery-modal

Yet another jQuery plugin that creates and launches a modal.

## Requirements

- [jQuery](http://jquery.com/) (1.9.1 or greater)
- A web browser

## Usage

### Markup

	<a href="#sample-modal" id="sample-modal-anchor">Click here to launch modal</a>
	
	<div id="sample-modal">
		<p>Hi, I'm a modal!</p>
	</div>

### JavaScript

	var $markup = $( '#sample-modal' ).clone( true ),
		options = {
			animationDuration: 250,
			callbacks: {
				post: function() {
					console.log( 'I run after the modal is closed!' );
				},
				pre: function() {
					console.log( 'I run when the modal is opened!' );
				}
			},
			classes: {
				closeButton: 'modal-close-button',
				contentWrapper: 'modal-content-wrapper',
				curtain: 'modal-curtain',
				loaded: 'modal-loaded'
			}
		};
	
	$( '#sample-modal-anchor' ).on( 'click', function( event ) {
		event.preventDefault();
		
		var modal = new Modal( $markup, options );
		
		modal.show();
	});