import isWpopv from "./typechecking/isWpopv";
import isString from "./typechecking/isString";
import isFunction from "./typechecking/isFunction";
import { rsplitValues } from "./core/regex";

export function getCompareFunction( comparator ) {
	return isString( comparator ) ? ( i, ele ) => matches( ele, comparator ) : isFunction( comparator ) ? comparator : isWpopv( comparator ) ? ( i, ele ) => comparator.is( ele ) : !comparator ? () => false : ( i, ele ) => ele === comparator;
}

export function getSplitValues( str ) {
	return isString( str ) ? str.match( rsplitValues ) || [] : [];
}

export function matches( ele, selector ) {
	const matches = ele && ( ele[ 'matches' ] || ele[ 'webkitMatchesSelector' ] || ele[ 'msMatchesSelector' ] );
	return !!matches && !!selector && matches.call( ele, selector );
}
