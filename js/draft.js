foo(4, 8, 'POPO');
function foo() {
    console.log('Foo!', arguments);
}
sum(17, 21, 98);
// Variadic Function - unknown params count
function sum() {
    var res = 0;
    for (var i=0; i < arguments.length; i++){
        res += arguments[i]
    }
    console.log('SUm is:', res)
}
