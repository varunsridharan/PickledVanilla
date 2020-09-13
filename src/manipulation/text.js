import { fn } from "../setup";
import { isElement, isUndefined } from "../core/typechecking";

fn.text         = function( text ) {
	if( isUndefined( text ) ) {
		return this[ 0 ] ? this[ 0 ].textContent : '';
	}

	return this.each( ( i, ele ) => {
		if( !isElement( ele ) ) {
			return;
		}
		ele.textContent = text;
	} );

};
