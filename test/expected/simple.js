var simple = function(s){
return function(){
    var _obj = s.group();
_obj.add(s.path("M167.558,240c-29.792-49.22,28.572-127.83,80.272-117.626S347.15,203.885,309.735,240C272.32,276.115,187.285,272.592,167.558,240z").attr({fill:"#3D77F9", stroke:"#000000"}));
return _obj;
}; // private-functional-closure
}; // close factory
window.simple = simple;