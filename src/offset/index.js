import { docEle, win } from "../core/vars";
import { computeStyleInt, computeStyle } from "../css/helper";
import { isElement } from "../core/typechecking";
import core from "../global-var";

export function offset() {
	const ele = this[ 0 ];

	if( !ele ) {
		return;
	}

	const rect = ele.getBoundingClientRect();
	return {
		top: rect.top + win.pageYOffset,
		left: rect.left + win.pageXOffset
	};
}

export function offsetParent() {
	return this.map( ( i, ele ) => {
		let offsetParent = ele.offsetParent;
		while( offsetParent && computeStyle( offsetParent, 'position' ) === 'static' ) {
			offsetParent = offsetParent.offsetParent;
		}
		return offsetParent || docEle;
	} );
}

export function position() {
	const ele = this[ 0 ];
	if( !ele ) {
		return;
	}

	const isFixed = ( computeStyle( ele, 'position' ) === 'fixed' ),
		  offset  = isFixed ? ele.getBoundingClientRect() : this.offset();

	if( !isFixed ) {
		const doc        = ele.ownerDocument;
		let offsetParent = ele.offsetParent || doc.documentElement;
		while( ( offsetParent === doc.body || offsetParent === doc.documentElement ) && computeStyle( offsetParent, 'position' ) === 'static' ) {
			offsetParent = offsetParent.parentNode;
		}

		if( offsetParent !== ele && isElement( offsetParent ) ) {
			const parentOffset = core( offsetParent ).offset();
			offset.top -= parentOffset.top + computeStyleInt( offsetParent, 'borderTopWidth' );
			offset.left -= parentOffset.left + computeStyleInt( offsetParent, 'borderLeftWidth' );
		}
	}

	return {
		top: offset.top - computeStyleInt( ele, 'marginTop' ),
		left: offset.left - computeStyleInt( ele, 'marginLeft' )
	};

}