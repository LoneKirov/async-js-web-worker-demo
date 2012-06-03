define(['uglify-js'], function(uglify) {
    var jsp = uglify.parser;
    var pro = uglify.uglify;
    var curry = jsp.curry;
    var MAP = pro.MAP;

    return function(data) {
        var ast = jsp.parse(data);
        var w = pro.ast_walker(), walk = w.walk;
        var vars = {};

        var scope;

        function with_scope(s, cont) {
            var save = scope, ret;
            scope = s;
            ret = cont();
            scope = save;
            return ret;
        };
        function _lambda(name, args, body) {
            return [ this[0], name, args, with_scope(body.scope, curry(MAP, body, walk)) ];
        };

        w.with_walkers({
            'toplevel': function(body) {
                return [ this[0], with_scope(this.scope, curry(MAP, body, walk)) ];
            },
            'function': _lambda,
            'defun': _lambda,
            'name': function(exp, args) {
                var literals = {
                    'true' : true,
                    'false' : true,
                    'null' : true,
                    'this' : true
                };
                if (!literals[exp] && w.parent()[0] !== "new" && w.parent()[0] !== "call" && !scope.has(exp)) {
                    vars[exp] = true;
                }
            }
        }, function() { return walk(pro.ast_add_scope(ast)); });
        return vars;
    };
});
