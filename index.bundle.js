var index = (function (exports) {
  'use strict';

  var out_of_memory = /* tuple */[
    "Out_of_memory",
    0
  ];

  var sys_error = /* tuple */[
    "Sys_error",
    -1
  ];

  var failure = /* tuple */[
    "Failure",
    -2
  ];

  var invalid_argument = /* tuple */[
    "Invalid_argument",
    -3
  ];

  var end_of_file = /* tuple */[
    "End_of_file",
    -4
  ];

  var division_by_zero = /* tuple */[
    "Division_by_zero",
    -5
  ];

  var not_found = /* tuple */[
    "Not_found",
    -6
  ];

  var match_failure = /* tuple */[
    "Match_failure",
    -7
  ];

  var stack_overflow = /* tuple */[
    "Stack_overflow",
    -8
  ];

  var sys_blocked_io = /* tuple */[
    "Sys_blocked_io",
    -9
  ];

  var assert_failure = /* tuple */[
    "Assert_failure",
    -10
  ];

  var undefined_recursive_module = /* tuple */[
    "Undefined_recursive_module",
    -11
  ];

  out_of_memory.tag = 248;

  sys_error.tag = 248;

  failure.tag = 248;

  invalid_argument.tag = 248;

  end_of_file.tag = 248;

  division_by_zero.tag = 248;

  not_found.tag = 248;

  match_failure.tag = 248;

  stack_overflow.tag = 248;

  sys_blocked_io.tag = 248;

  assert_failure.tag = 248;

  undefined_recursive_module.tag = 248;
  /*  Not a pure module */

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }

  function caml_array_set(xs, index, newval) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      xs[index] = newval;
      return /* () */0;
    }
  }

  function caml_array_get(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return xs[index];
    }
  }

  function caml_make_vect(len, init) {
    var b = new Array(len);
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      b[i] = init;
    }
    return b;
  }

  function caml_array_blit(a1, i1, a2, i2, len) {
    if (i2 <= i1) {
      for(var j = 0 ,j_finish = len - 1 | 0; j <= j_finish; ++j){
        a2[j + i2 | 0] = a1[j + i1 | 0];
      }
      return /* () */0;
    } else {
      for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
        a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
      }
      return /* () */0;
    }
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var arity = f.length;
      var arity$1 = arity === 0 ? 1 : arity;
      var len = args.length;
      var d = arity$1 - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      } else if (d < 0) {
        _args = caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity$1));
        continue ;
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    }}

  function curry_1(o, a0, arity) {
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[a0]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            return o(a0);
        case 2 : 
            return (function (param) {
                return o(a0, param);
              });
        case 3 : 
            return (function (param, param$1) {
                return o(a0, param, param$1);
              });
        case 4 : 
            return (function (param, param$1, param$2) {
                return o(a0, param, param$1, param$2);
              });
        case 5 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, param, param$1, param$2, param$3);
              });
        case 6 : 
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, param, param$1, param$2, param$3, param$4);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3, param$4, param$5) {
                return o(a0, param, param$1, param$2, param$3, param$4, param$5);
              });
        
      }
    }
  }

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      return curry_1(o, a0, arity);
    }
  }

  function curry_2(o, a0, a1, arity) {
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            return app(o(a0), /* array */[a1]);
        case 2 : 
            return o(a0, a1);
        case 3 : 
            return (function (param) {
                return o(a0, a1, param);
              });
        case 4 : 
            return (function (param, param$1) {
                return o(a0, a1, param, param$1);
              });
        case 5 : 
            return (function (param, param$1, param$2) {
                return o(a0, a1, param, param$1, param$2);
              });
        case 6 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, a1, param, param$1, param$2, param$3);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3, param$4) {
                return o(a0, a1, param, param$1, param$2, param$3, param$4);
              });
        
      }
    }
  }

  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      return curry_2(o, a0, a1, arity);
    }
  }

  function curry_3(o, a0, a1, a2, arity) {
    var exit = 0;
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1,
                  a2
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            exit = 1;
            break;
        case 2 : 
            return app(o(a0, a1), /* array */[a2]);
        case 3 : 
            return o(a0, a1, a2);
        case 4 : 
            return (function (param) {
                return o(a0, a1, a2, param);
              });
        case 5 : 
            return (function (param, param$1) {
                return o(a0, a1, a2, param, param$1);
              });
        case 6 : 
            return (function (param, param$1, param$2) {
                return o(a0, a1, a2, param, param$1, param$2);
              });
        case 7 : 
            return (function (param, param$1, param$2, param$3) {
                return o(a0, a1, a2, param, param$1, param$2, param$3);
              });
        
      }
    }
    if (exit === 1) {
      return app(o(a0), /* array */[
                  a1,
                  a2
                ]);
    }
    
  }

  function _3(o, a0, a1, a2) {
    var arity = o.length;
    if (arity === 3) {
      return o(a0, a1, a2);
    } else {
      return curry_3(o, a0, a1, a2, arity);
    }
  }

  function curry_4(o, a0, a1, a2, a3, arity) {
    var exit = 0;
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            exit = 1;
            break;
        case 2 : 
            return app(o(a0, a1), /* array */[
                        a2,
                        a3
                      ]);
        case 3 : 
            return app(o(a0, a1, a2), /* array */[a3]);
        case 4 : 
            return o(a0, a1, a2, a3);
        case 5 : 
            return (function (param) {
                return o(a0, a1, a2, a3, param);
              });
        case 6 : 
            return (function (param, param$1) {
                return o(a0, a1, a2, a3, param, param$1);
              });
        case 7 : 
            return (function (param, param$1, param$2) {
                return o(a0, a1, a2, a3, param, param$1, param$2);
              });
        
      }
    }
    if (exit === 1) {
      return app(o(a0), /* array */[
                  a1,
                  a2,
                  a3
                ]);
    }
    
  }

  function _4(o, a0, a1, a2, a3) {
    var arity = o.length;
    if (arity === 4) {
      return o(a0, a1, a2, a3);
    } else {
      return curry_4(o, a0, a1, a2, a3, arity);
    }
  }

  function curry_5(o, a0, a1, a2, a3, a4, arity) {
    var exit = 0;
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3,
                  a4
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            exit = 1;
            break;
        case 2 : 
            return app(o(a0, a1), /* array */[
                        a2,
                        a3,
                        a4
                      ]);
        case 3 : 
            return app(o(a0, a1, a2), /* array */[
                        a3,
                        a4
                      ]);
        case 4 : 
            return app(o(a0, a1, a2, a3), /* array */[a4]);
        case 5 : 
            return o(a0, a1, a2, a3, a4);
        case 6 : 
            return (function (param) {
                return o(a0, a1, a2, a3, a4, param);
              });
        case 7 : 
            return (function (param, param$1) {
                return o(a0, a1, a2, a3, a4, param, param$1);
              });
        
      }
    }
    if (exit === 1) {
      return app(o(a0), /* array */[
                  a1,
                  a2,
                  a3,
                  a4
                ]);
    }
    
  }

  function _5(o, a0, a1, a2, a3, a4) {
    var arity = o.length;
    if (arity === 5) {
      return o(a0, a1, a2, a3, a4);
    } else {
      return curry_5(o, a0, a1, a2, a3, a4, arity);
    }
  }

  function curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity) {
    var exit = 0;
    if (arity > 7 || arity < 0) {
      return app(o, /* array */[
                  a0,
                  a1,
                  a2,
                  a3,
                  a4,
                  a5,
                  a6
                ]);
    } else {
      switch (arity) {
        case 0 : 
        case 1 : 
            exit = 1;
            break;
        case 2 : 
            return app(o(a0, a1), /* array */[
                        a2,
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 3 : 
            return app(o(a0, a1, a2), /* array */[
                        a3,
                        a4,
                        a5,
                        a6
                      ]);
        case 4 : 
            return app(o(a0, a1, a2, a3), /* array */[
                        a4,
                        a5,
                        a6
                      ]);
        case 5 : 
            return app(o(a0, a1, a2, a3, a4), /* array */[
                        a5,
                        a6
                      ]);
        case 6 : 
            return app(o(a0, a1, a2, a3, a4, a5), /* array */[a6]);
        case 7 : 
            return o(a0, a1, a2, a3, a4, a5, a6);
        
      }
    }
    if (exit === 1) {
      return app(o(a0), /* array */[
                  a1,
                  a2,
                  a3,
                  a4,
                  a5,
                  a6
                ]);
    }
    
  }

  function _7(o, a0, a1, a2, a3, a4, a5, a6) {
    var arity = o.length;
    if (arity === 7) {
      return o(a0, a1, a2, a3, a4, a5, a6);
    } else {
      return curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity);
    }
  }
  /* No side effect */

  function __(tag, block) {
    block.tag = tag;
    return block;
  }
  /* No side effect */

  function caml_int_compare(x, y) {
    if (x < y) {
      return -1;
    } else if (x === y) {
      return 0;
    } else {
      return 1;
    }
  }

  function caml_string_compare(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else if (s1 < s2) {
      return -1;
    } else {
      return 1;
    }
  }

  function caml_float_min(x, y) {
    if (x < y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_int_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  function caml_float_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }
  /* No side effect */

  var for_in = (function (o, foo) {
          for (var x in o) { foo(x); }
        }
      );

  function caml_compare(_a, _b) {
    while(true) {
      var b = _b;
      var a = _a;
      if (a === b) {
        return 0;
      } else {
        var a_type = typeof a;
        var b_type = typeof b;
        if (a_type === "string") {
          return caml_string_compare(a, b);
        } else {
          var is_a_number = +(a_type === "number");
          var is_b_number = +(b_type === "number");
          if (is_a_number) {
            if (is_b_number) {
              return caml_int_compare(a, b);
            } else {
              return -1;
            }
          } else if (is_b_number) {
            return 1;
          } else if (a_type === "boolean" || a_type === "undefined" || a === null) {
            var x = a;
            var y = b;
            if (x === y) {
              return 0;
            } else if (x < y) {
              return -1;
            } else {
              return 1;
            }
          } else if (a_type === "function" || b_type === "function") {
            throw [
                  invalid_argument,
                  "compare: functional value"
                ];
          } else {
            var tag_a = a.tag | 0;
            var tag_b = b.tag | 0;
            if (tag_a === 250) {
              _a = a[0];
              continue ;
            } else if (tag_b === 250) {
              _b = b[0];
              continue ;
            } else if (tag_a === 248) {
              return caml_int_compare(a[1], b[1]);
            } else if (tag_a === 251) {
              throw [
                    invalid_argument,
                    "equal: abstract value"
                  ];
            } else if (tag_a !== tag_b) {
              if (tag_a < tag_b) {
                return -1;
              } else {
                return 1;
              }
            } else {
              var len_a = a.length | 0;
              var len_b = b.length | 0;
              if (len_a === len_b) {
                if (Array.isArray(a)) {
                  var a$1 = a;
                  var b$1 = b;
                  var _i = 0;
                  var same_length = len_a;
                  while(true) {
                    var i = _i;
                    if (i === same_length) {
                      return 0;
                    } else {
                      var res = caml_compare(a$1[i], b$1[i]);
                      if (res !== 0) {
                        return res;
                      } else {
                        _i = i + 1 | 0;
                        continue ;
                      }
                    }
                  }              } else {
                  var a$2 = a;
                  var b$2 = b;
                  var min_key_lhs = [/* None */0];
                  var min_key_rhs = [/* None */0];
                  var do_key = function (param, key) {
                    var min_key = param[2];
                    var b = param[1];
                    if (!b.hasOwnProperty(key) || caml_compare(param[0][key], b[key]) > 0) {
                      var match = min_key[0];
                      if (match) {
                        if (key < match[0]) {
                          min_key[0] = /* Some */[key];
                          return /* () */0;
                        } else {
                          return 0;
                        }
                      } else {
                        min_key[0] = /* Some */[key];
                        return /* () */0;
                      }
                    } else {
                      return 0;
                    }
                  };
                  var partial_arg = /* tuple */[
                    a$2,
                    b$2,
                    min_key_rhs
                  ];
                  var do_key_a = (function(partial_arg){
                  return function do_key_a(param) {
                    return do_key(partial_arg, param);
                  }
                  }(partial_arg));
                  var partial_arg$1 = /* tuple */[
                    b$2,
                    a$2,
                    min_key_lhs
                  ];
                  var do_key_b = (function(partial_arg$1){
                  return function do_key_b(param) {
                    return do_key(partial_arg$1, param);
                  }
                  }(partial_arg$1));
                  for_in(a$2, do_key_a);
                  for_in(b$2, do_key_b);
                  var match = min_key_lhs[0];
                  var match$1 = min_key_rhs[0];
                  if (match) {
                    if (match$1) {
                      return caml_string_compare(match[0], match$1[0]);
                    } else {
                      return -1;
                    }
                  } else if (match$1) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              } else if (len_a < len_b) {
                var a$3 = a;
                var b$3 = b;
                var _i$1 = 0;
                var short_length = len_a;
                while(true) {
                  var i$1 = _i$1;
                  if (i$1 === short_length) {
                    return -1;
                  } else {
                    var res$1 = caml_compare(a$3[i$1], b$3[i$1]);
                    if (res$1 !== 0) {
                      return res$1;
                    } else {
                      _i$1 = i$1 + 1 | 0;
                      continue ;
                    }
                  }
                }            } else {
                var a$4 = a;
                var b$4 = b;
                var _i$2 = 0;
                var short_length$1 = len_b;
                while(true) {
                  var i$2 = _i$2;
                  if (i$2 === short_length$1) {
                    return 1;
                  } else {
                    var res$2 = caml_compare(a$4[i$2], b$4[i$2]);
                    if (res$2 !== 0) {
                      return res$2;
                    } else {
                      _i$2 = i$2 + 1 | 0;
                      continue ;
                    }
                  }
                }            }
            }
          }
        }
      }
    }}

  function caml_equal(_a, _b) {
    while(true) {
      var b = _b;
      var a = _a;
      if (a === b) {
        return /* boolean */1;
      } else {
        var a_type = typeof a;
        if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
          return /* boolean */0;
        } else {
          var b_type = typeof b;
          if (a_type === "function" || b_type === "function") {
            throw [
                  invalid_argument,
                  "equal: functional value"
                ];
          } else if (b_type === "number" || b_type === "undefined" || b === null) {
            return /* boolean */0;
          } else {
            var tag_a = a.tag | 0;
            var tag_b = b.tag | 0;
            if (tag_a === 250) {
              _a = a[0];
              continue ;
            } else if (tag_b === 250) {
              _b = b[0];
              continue ;
            } else if (tag_a === 248) {
              return +(a[1] === b[1]);
            } else if (tag_a === 251) {
              throw [
                    invalid_argument,
                    "equal: abstract value"
                  ];
            } else if (tag_a !== tag_b) {
              return /* boolean */0;
            } else {
              var len_a = a.length | 0;
              var len_b = b.length | 0;
              if (len_a === len_b) {
                if (Array.isArray(a)) {
                  var a$1 = a;
                  var b$1 = b;
                  var _i = 0;
                  var same_length = len_a;
                  while(true) {
                    var i = _i;
                    if (i === same_length) {
                      return /* boolean */1;
                    } else if (caml_equal(a$1[i], b$1[i])) {
                      _i = i + 1 | 0;
                      continue ;
                    } else {
                      return /* false */0;
                    }
                  }              } else {
                  var a$2 = a;
                  var b$2 = b;
                  var result = [/* boolean */1];
                  var do_key_a = (function(b$2,result){
                  return function do_key_a(key) {
                    if (b$2.hasOwnProperty(key)) {
                      return 0;
                    } else {
                      result[0] = /* boolean */0;
                      return /* () */0;
                    }
                  }
                  }(b$2,result));
                  var do_key_b = (function(a$2,b$2,result){
                  return function do_key_b(key) {
                    if (!a$2.hasOwnProperty(key) || !caml_equal(b$2[key], a$2[key])) {
                      result[0] = /* boolean */0;
                      return /* () */0;
                    } else {
                      return 0;
                    }
                  }
                  }(a$2,b$2,result));
                  for_in(a$2, do_key_a);
                  if (result[0]) {
                    for_in(b$2, do_key_b);
                  }
                  return result[0];
                }
              } else {
                return /* boolean */0;
              }
            }
          }
        }
      }
    }}

  function caml_notequal(a, b) {
    return 1 - caml_equal(a, b);
  }

  function caml_min(x, y) {
    if (caml_compare(x, y) <= 0) {
      return x;
    } else {
      return y;
    }
  }

  function caml_max(x, y) {
    if (caml_compare(x, y) >= 0) {
      return x;
    } else {
      return y;
    }
  }
  /* for_in Not a pure module */

  var stdout = /* record */[
    /* buffer */"",
    /* output */(function (_, s) {
        var v = s.length - 1 | 0;
        if (( (typeof process !== "undefined") && process.stdout && process.stdout.write)) {
          return ( process.stdout.write )(s);
        } else if (s[v] === "\n") {
          console.log(s.slice(0, v));
          return /* () */0;
        } else {
          console.log(s);
          return /* () */0;
        }
      })
  ];

  var stderr = /* record */[
    /* buffer */"",
    /* output */(function (_, s) {
        var v = s.length - 1 | 0;
        if (s[v] === "\n") {
          console.log(s.slice(0, v));
          return /* () */0;
        } else {
          console.log(s);
          return /* () */0;
        }
      })
  ];

  function caml_ml_flush(oc) {
    if (oc[/* buffer */0] !== "") {
      _2(oc[/* output */1], oc, oc[/* buffer */0]);
      oc[/* buffer */0] = "";
      return /* () */0;
    } else {
      return 0;
    }
  }

  function caml_ml_output(oc, str, offset, len) {
    var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);
    if (( (typeof process !== "undefined") && process.stdout && process.stdout.write ) && oc === stdout) {
      return ( process.stdout.write )(str$1);
    } else {
      var id = str$1.lastIndexOf("\n");
      if (id < 0) {
        oc[/* buffer */0] = oc[/* buffer */0] + str$1;
        return /* () */0;
      } else {
        oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(0, id + 1 | 0);
        caml_ml_flush(oc);
        oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(id + 1 | 0);
        return /* () */0;
      }
    }
  }

  var stdin = undefined;
  /* node_std_output Not a pure module */

  function caml_sys_getenv(s) {
    var match = typeof (process) === "undefined" ? undefined : (process);
    if (match !== undefined) {
      var match$1 = match.env[s];
      if (match$1 !== undefined) {
        return match$1;
      } else {
        throw not_found;
      }
    } else {
      throw not_found;
    }
  }

  function caml_sys_random_seed() {
    return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
  }

  function caml_sys_get_argv() {
    var match = typeof (process) === "undefined" ? undefined : (process);
    if (match !== undefined) {
      if (match.argv == null) {
        return /* tuple */[
                "",
                /* array */[""]
              ];
      } else {
        return /* tuple */[
                match.argv[0],
                match.argv
              ];
      }
    } else {
      return /* tuple */[
              "",
              /* array */[""]
            ];
    }
  }
  /* No side effect */

  function div(x, y) {
    if (y === 0) {
      throw division_by_zero;
    } else {
      return x / y | 0;
    }
  }

  var imul = ( Math.imul || function (x,y) {
    y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
  }
  );
  /* imul Not a pure module */

  var repeat = ( (String.prototype.repeat && function (count,self){return self.repeat(count)}) ||
                                                    function(count , self) {
          if (self.length == 0 || count == 0) {
              return '';
          }
          // Ensuring count is a 31-bit integer allows us to heavily optimize the
          // main part. But anyway, most current (August 2014) browsers can't handle
          // strings 1 << 28 chars or longer, so:
          if (self.length * count >= 1 << 28) {
              throw new RangeError('repeat count must not overflow maximum string size');
          }
          var rpt = '';
          for (;;) {
              if ((count & 1) == 1) {
                  rpt += self;
              }
              count >>>= 1;
              if (count == 0) {
                  break;
              }
              self += self;
          }
          return rpt;
      }
  );
  /* repeat Not a pure module */

  var min_int = /* record */[
    /* hi */-2147483648,
    /* lo */0
  ];

  var max_int = /* record */[
    /* hi */2147483647,
    /* lo */1
  ];

  var one = /* record */[
    /* hi */0,
    /* lo */1
  ];

  var zero = /* record */[
    /* hi */0,
    /* lo */0
  ];

  var neg_one = /* record */[
    /* hi */-1,
    /* lo */4294967295
  ];

  function neg_signed(x) {
    return +((x & 2147483648) !== 0);
  }

  function add(param, param$1) {
    var other_low_ = param$1[/* lo */1];
    var this_low_ = param[/* lo */1];
    var lo = this_low_ + other_low_ & 4294967295;
    var overflow = neg_signed(this_low_) && (neg_signed(other_low_) || !neg_signed(lo)) || neg_signed(other_low_) && !neg_signed(lo) ? 1 : 0;
    var hi = param[/* hi */0] + param$1[/* hi */0] + overflow & 4294967295;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }

  function not(param) {
    var hi = param[/* hi */0] ^ -1;
    var lo = param[/* lo */1] ^ -1;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }

  function eq(x, y) {
    if (x[/* hi */0] === y[/* hi */0]) {
      return +(x[/* lo */1] === y[/* lo */1]);
    } else {
      return /* false */0;
    }
  }

  function neg(x) {
    if (eq(x, min_int)) {
      return min_int;
    } else {
      return add(not(x), one);
    }
  }

  function sub(x, y) {
    return add(x, neg(y));
  }

  function lsl_(x, numBits) {
    if (numBits === 0) {
      return x;
    } else {
      var lo = x[/* lo */1];
      if (numBits >= 32) {
        return /* record */[
                /* hi */(lo << (numBits - 32 | 0)),
                /* lo */0
              ];
      } else {
        var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
        return /* record */[
                /* hi */hi,
                /* lo */((lo << numBits) >>> 0)
              ];
      }
    }
  }

  function asr_(x, numBits) {
    if (numBits === 0) {
      return x;
    } else {
      var hi = x[/* hi */0];
      if (numBits < 32) {
        var hi$1 = (hi >> numBits);
        var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
        return /* record */[
                /* hi */hi$1,
                /* lo */(lo >>> 0)
              ];
      } else {
        var lo$1 = (hi >> (numBits - 32 | 0));
        return /* record */[
                /* hi */hi >= 0 ? 0 : -1,
                /* lo */(lo$1 >>> 0)
              ];
      }
    }
  }

  function is_zero(param) {
    if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
      return /* boolean */0;
    } else {
      return /* boolean */1;
    }
  }

  function mul(_this, _other) {
    while(true) {
      var other = _other;
      var $$this = _this;
      var exit = 0;
      var lo;
      var this_hi = $$this[/* hi */0];
      var exit$1 = 0;
      var exit$2 = 0;
      var exit$3 = 0;
      if (this_hi !== 0 || $$this[/* lo */1] !== 0) {
        exit$3 = 4;
      } else {
        return zero;
      }
      if (exit$3 === 4) {
        if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
          exit$2 = 3;
        } else {
          return zero;
        }
      }
      if (exit$2 === 3) {
        if (this_hi !== -2147483648 || $$this[/* lo */1] !== 0) {
          exit$1 = 2;
        } else {
          lo = other[/* lo */1];
          exit = 1;
        }
      }
      if (exit$1 === 2) {
        var other_hi = other[/* hi */0];
        var lo$1 = $$this[/* lo */1];
        var exit$4 = 0;
        if (other_hi !== -2147483648 || other[/* lo */1] !== 0) {
          exit$4 = 3;
        } else {
          lo = lo$1;
          exit = 1;
        }
        if (exit$4 === 3) {
          var other_lo = other[/* lo */1];
          if (this_hi < 0) {
            if (other_hi < 0) {
              _other = neg(other);
              _this = neg($$this);
              continue ;
            } else {
              return neg(mul(neg($$this), other));
            }
          } else if (other_hi < 0) {
            return neg(mul($$this, neg(other)));
          } else {
            var a48 = (this_hi >>> 16);
            var a32 = this_hi & 65535;
            var a16 = (lo$1 >>> 16);
            var a00 = lo$1 & 65535;
            var b48 = (other_hi >>> 16);
            var b32 = other_hi & 65535;
            var b16 = (other_lo >>> 16);
            var b00 = other_lo & 65535;
            var c48 = 0;
            var c32 = 0;
            var c16 = 0;
            var c00 = a00 * b00;
            c16 = (c00 >>> 16) + a16 * b00;
            c32 = (c16 >>> 16);
            c16 = (c16 & 65535) + a00 * b16;
            c32 = c32 + (c16 >>> 16) + a32 * b00;
            c48 = (c32 >>> 16);
            c32 = (c32 & 65535) + a16 * b16;
            c48 += (c32 >>> 16);
            c32 = (c32 & 65535) + a00 * b32;
            c48 += (c32 >>> 16);
            c32 = c32 & 65535;
            c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
            var hi = c32 | (c48 << 16);
            var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
            return /* record */[
                    /* hi */hi,
                    /* lo */(lo$2 >>> 0)
                  ];
          }
        }
        
      }
      if (exit === 1) {
        if ((lo & 1) === 0) {
          return zero;
        } else {
          return min_int;
        }
      }
      
    }}

  function or_(param, param$1) {
    return /* record */[
            /* hi */param[/* hi */0] | param$1[/* hi */0],
            /* lo */((param[/* lo */1] | param$1[/* lo */1]) >>> 0)
          ];
  }

  function ge(param, param$1) {
    var other_hi = param$1[/* hi */0];
    var hi = param[/* hi */0];
    if (hi > other_hi) {
      return /* boolean */1;
    } else if (hi < other_hi) {
      return /* boolean */0;
    } else {
      return +(param[/* lo */1] >= param$1[/* lo */1]);
    }
  }

  function neq(x, y) {
    return 1 - eq(x, y);
  }

  function lt(x, y) {
    return 1 - ge(x, y);
  }

  function gt(x, y) {
    if (x[/* hi */0] > y[/* hi */0]) {
      return /* boolean */1;
    } else if (x[/* hi */0] < y[/* hi */0]) {
      return /* boolean */0;
    } else {
      return +(x[/* lo */1] > y[/* lo */1]);
    }
  }

  function le(x, y) {
    return 1 - gt(x, y);
  }

  function to_float(param) {
    return param[/* hi */0] * (0x100000000) + param[/* lo */1];
  }

  var two_ptr_32_dbl = Math.pow(2, 32);

  var two_ptr_63_dbl = Math.pow(2, 63);

  var neg_two_ptr_63 = -Math.pow(2, 63);

  function of_float(x) {
    if (isNaN(x) || !isFinite(x)) {
      return zero;
    } else if (x <= neg_two_ptr_63) {
      return min_int;
    } else if (x + 1 >= two_ptr_63_dbl) {
      return max_int;
    } else if (x < 0) {
      return neg(of_float(-x));
    } else {
      var hi = x / two_ptr_32_dbl | 0;
      var lo = x % two_ptr_32_dbl | 0;
      return /* record */[
              /* hi */hi,
              /* lo */(lo >>> 0)
            ];
    }
  }

  function div$1(_self, _other) {
    while(true) {
      var other = _other;
      var self = _self;
      var self_hi = self[/* hi */0];
      var exit = 0;
      var exit$1 = 0;
      if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
        exit$1 = 2;
      } else {
        throw division_by_zero;
      }
      if (exit$1 === 2) {
        if (self_hi !== -2147483648) {
          if (self_hi !== 0 || self[/* lo */1] !== 0) {
            exit = 1;
          } else {
            return zero;
          }
        } else if (self[/* lo */1] !== 0) {
          exit = 1;
        } else if (eq(other, one) || eq(other, neg_one)) {
          return self;
        } else if (eq(other, min_int)) {
          return one;
        } else {
          var other_hi = other[/* hi */0];
          var half_this = asr_(self, 1);
          var approx = lsl_(div$1(half_this, other), 1);
          var exit$2 = 0;
          if (approx[/* hi */0] !== 0 || approx[/* lo */1] !== 0) {
            exit$2 = 3;
          } else if (other_hi < 0) {
            return one;
          } else {
            return neg(one);
          }
          if (exit$2 === 3) {
            var y = mul(other, approx);
            var rem = add(self, neg(y));
            return add(approx, div$1(rem, other));
          }
          
        }
      }
      if (exit === 1) {
        var other_hi$1 = other[/* hi */0];
        var exit$3 = 0;
        if (other_hi$1 !== -2147483648 || other[/* lo */1] !== 0) {
          exit$3 = 2;
        } else {
          return zero;
        }
        if (exit$3 === 2) {
          if (self_hi < 0) {
            if (other_hi$1 < 0) {
              _other = neg(other);
              _self = neg(self);
              continue ;
            } else {
              return neg(div$1(neg(self), other));
            }
          } else if (other_hi$1 < 0) {
            return neg(div$1(self, neg(other)));
          } else {
            var res = zero;
            var rem$1 = self;
            while(ge(rem$1, other)) {
              var approx$1 = caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
              var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
              var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
              var approxRes = of_float(approx$1);
              var approxRem = mul(approxRes, other);
              while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
                approx$1 -= delta;
                approxRes = of_float(approx$1);
                approxRem = mul(approxRes, other);
              }            if (is_zero(approxRes)) {
                approxRes = one;
              }
              res = add(res, approxRes);
              rem$1 = add(rem$1, neg(approxRem));
            }          return res;
          }
        }
        
      }
      
    }}

  function mod_$1(self, other) {
    var y = mul(div$1(self, other), other);
    return add(self, neg(y));
  }

  function div_mod(self, other) {
    var quotient = div$1(self, other);
    var y = mul(quotient, other);
    return /* tuple */[
            quotient,
            add(self, neg(y))
          ];
  }

  function of_int32(lo) {
    return /* record */[
            /* hi */lo < 0 ? -1 : 0,
            /* lo */(lo >>> 0)
          ];
  }

  function to_hex(x) {
    var aux = function (v) {
      return (v >>> 0).toString(16);
    };
    var match = x[/* hi */0];
    var match$1 = x[/* lo */1];
    var exit = 0;
    if (match !== 0 || match$1 !== 0) {
      exit = 1;
    } else {
      return "0";
    }
    if (exit === 1) {
      if (match$1 !== 0) {
        if (match !== 0) {
          var lo = aux(x[/* lo */1]);
          var pad = 8 - lo.length | 0;
          if (pad <= 0) {
            return aux(x[/* hi */0]) + lo;
          } else {
            return aux(x[/* hi */0]) + (repeat(pad, "0") + lo);
          }
        } else {
          return aux(x[/* lo */1]);
        }
      } else {
        return aux(x[/* hi */0]) + "00000000";
      }
    }
    
  }

  function discard_sign(x) {
    return /* record */[
            /* hi */2147483647 & x[/* hi */0],
            /* lo */x[/* lo */1]
          ];
  }
  /* two_ptr_32_dbl Not a pure module */

  function caml_failwith(s) {
    throw [
          failure,
          s
        ];
  }

  function parse_digit(c) {
    if (c >= 65) {
      if (c >= 97) {
        if (c >= 123) {
          return -1;
        } else {
          return c - 87 | 0;
        }
      } else if (c >= 91) {
        return -1;
      } else {
        return c - 55 | 0;
      }
    } else if (c > 57 || c < 48) {
      return -1;
    } else {
      return c - /* "0" */48 | 0;
    }
  }

  function int_of_string_base(param) {
    switch (param) {
      case 0 : 
          return 8;
      case 1 : 
          return 16;
      case 2 : 
          return 10;
      case 3 : 
          return 2;
      
    }
  }

  function parse_sign_and_base(s) {
    var sign = 1;
    var base = /* Dec */2;
    var i = 0;
    if (s[i] === "-") {
      sign = -1;
      i = i + 1 | 0;
    }
    var match = s.charCodeAt(i);
    var match$1 = s.charCodeAt(i + 1 | 0);
    if (match === 48) {
      if (match$1 >= 89) {
        if (match$1 !== 98) {
          if (match$1 !== 111) {
            if (match$1 === 120) {
              base = /* Hex */1;
              i = i + 2 | 0;
            }
            
          } else {
            base = /* Oct */0;
            i = i + 2 | 0;
          }
        } else {
          base = /* Bin */3;
          i = i + 2 | 0;
        }
      } else if (match$1 !== 66) {
        if (match$1 !== 79) {
          if (match$1 >= 88) {
            base = /* Hex */1;
            i = i + 2 | 0;
          }
          
        } else {
          base = /* Oct */0;
          i = i + 2 | 0;
        }
      } else {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
    }
    return /* tuple */[
            i,
            sign,
            base
          ];
  }

  function caml_int_of_string(s) {
    var match = parse_sign_and_base(s);
    var i = match[0];
    var base = int_of_string_base(match[2]);
    var threshold = 4294967295;
    var len = s.length;
    var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
    var d = parse_digit(c);
    if (d < 0 || d >= base) {
      throw [
            failure,
            "int_of_string"
          ];
    }
    var aux = function (_acc, _k) {
      while(true) {
        var k = _k;
        var acc = _acc;
        if (k === len) {
          return acc;
        } else {
          var a = s.charCodeAt(k);
          if (a === /* "_" */95) {
            _k = k + 1 | 0;
            continue ;
          } else {
            var v = parse_digit(a);
            if (v < 0 || v >= base) {
              throw [
                    failure,
                    "int_of_string"
                  ];
            } else {
              var acc$1 = base * acc + v;
              if (acc$1 > threshold) {
                throw [
                      failure,
                      "int_of_string"
                    ];
              } else {
                _k = k + 1 | 0;
                _acc = acc$1;
                continue ;
              }
            }
          }
        }
      }  };
    var res = match[1] * aux(d, i + 1 | 0);
    var or_res = res | 0;
    if (base === 10 && res !== or_res) {
      throw [
            failure,
            "int_of_string"
          ];
    }
    return or_res;
  }

  function caml_int64_of_string(s) {
    var match = parse_sign_and_base(s);
    var hbase = match[2];
    var i = match[0];
    var base = of_int32(int_of_string_base(hbase));
    var sign = of_int32(match[1]);
    var threshold;
    switch (hbase) {
      case 0 : 
          threshold = /* int64 */[
            /* hi */536870911,
            /* lo */4294967295
          ];
          break;
      case 1 : 
          threshold = /* int64 */[
            /* hi */268435455,
            /* lo */4294967295
          ];
          break;
      case 2 : 
          threshold = /* int64 */[
            /* hi */429496729,
            /* lo */2576980377
          ];
          break;
      case 3 : 
          threshold = /* int64 */[
            /* hi */2147483647,
            /* lo */4294967295
          ];
          break;
      
    }
    var len = s.length;
    var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
    var d = of_int32(parse_digit(c));
    if (lt(d, /* int64 */[
            /* hi */0,
            /* lo */0
          ]) || ge(d, base)) {
      throw [
            failure,
            "int64_of_string"
          ];
    }
    var aux = function (_acc, _k) {
      while(true) {
        var k = _k;
        var acc = _acc;
        if (k === len) {
          return acc;
        } else {
          var a = s.charCodeAt(k);
          if (a === /* "_" */95) {
            _k = k + 1 | 0;
            continue ;
          } else {
            var v = of_int32(parse_digit(a));
            if (lt(v, /* int64 */[
                    /* hi */0,
                    /* lo */0
                  ]) || ge(v, base) || gt(acc, threshold)) {
              throw [
                    failure,
                    "int64_of_string"
                  ];
            } else {
              var acc$1 = add(mul(base, acc), v);
              _k = k + 1 | 0;
              _acc = acc$1;
              continue ;
            }
          }
        }
      }  };
    var res = mul(sign, aux(d, i + 1 | 0));
    var or_res = or_(res, /* int64 */[
          /* hi */0,
          /* lo */0
        ]);
    if (eq(base, /* int64 */[
            /* hi */0,
            /* lo */10
          ]) && neq(res, or_res)) {
      throw [
            failure,
            "int64_of_string"
          ];
    }
    return or_res;
  }

  function int_of_base(param) {
    switch (param) {
      case 0 : 
          return 8;
      case 1 : 
          return 16;
      case 2 : 
          return 10;
      
    }
  }

  function lowercase(c) {
    if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
      return c + 32 | 0;
    } else {
      return c;
    }
  }

  function parse_format(fmt) {
    var len = fmt.length;
    if (len > 31) {
      throw [
            invalid_argument,
            "format_int: format too long"
          ];
    }
    var f = /* record */[
      /* justify */"+",
      /* signstyle */"-",
      /* filter */" ",
      /* alternate : boolean */0,
      /* base : Dec */2,
      /* signedconv : boolean */0,
      /* width */0,
      /* uppercase : boolean */0,
      /* sign */1,
      /* prec */-1,
      /* conv */"f"
    ];
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= len) {
        return f;
      } else {
        var c = fmt.charCodeAt(i);
        var exit = 0;
        if (c >= 69) {
          if (c >= 88) {
            if (c >= 121) {
              exit = 1;
            } else {
              switch (c - 88 | 0) {
                case 0 : 
                    f[/* base */4] = /* Hex */1;
                    f[/* uppercase */7] = /* boolean */1;
                    _i = i + 1 | 0;
                    continue ;
                case 13 : 
                case 14 : 
                case 15 : 
                    exit = 5;
                    break;
                case 12 : 
                case 17 : 
                    exit = 4;
                    break;
                case 23 : 
                    f[/* base */4] = /* Oct */0;
                    _i = i + 1 | 0;
                    continue ;
                case 29 : 
                    f[/* base */4] = /* Dec */2;
                    _i = i + 1 | 0;
                    continue ;
                case 1 : 
                case 2 : 
                case 3 : 
                case 4 : 
                case 5 : 
                case 6 : 
                case 7 : 
                case 8 : 
                case 9 : 
                case 10 : 
                case 11 : 
                case 16 : 
                case 18 : 
                case 19 : 
                case 20 : 
                case 21 : 
                case 22 : 
                case 24 : 
                case 25 : 
                case 26 : 
                case 27 : 
                case 28 : 
                case 30 : 
                case 31 : 
                    exit = 1;
                    break;
                case 32 : 
                    f[/* base */4] = /* Hex */1;
                    _i = i + 1 | 0;
                    continue ;
                
              }
            }
          } else if (c >= 72) {
            exit = 1;
          } else {
            f[/* signedconv */5] = /* boolean */1;
            f[/* uppercase */7] = /* boolean */1;
            f[/* conv */10] = String.fromCharCode(lowercase(c));
            _i = i + 1 | 0;
            continue ;
          }
        } else {
          var switcher = c - 32 | 0;
          if (switcher > 25 || switcher < 0) {
            exit = 1;
          } else {
            switch (switcher) {
              case 3 : 
                  f[/* alternate */3] = /* boolean */1;
                  _i = i + 1 | 0;
                  continue ;
              case 0 : 
              case 11 : 
                  exit = 2;
                  break;
              case 13 : 
                  f[/* justify */0] = "-";
                  _i = i + 1 | 0;
                  continue ;
              case 14 : 
                  f[/* prec */9] = 0;
                  var j = i + 1 | 0;
                  while((function(j){
                      return function () {
                        var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                        return +(w >= 0 && w <= 9);
                      }
                      }(j))()) {
                    f[/* prec */9] = (imul(f[/* prec */9], 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                    j = j + 1 | 0;
                  }                _i = j;
                  continue ;
              case 1 : 
              case 2 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 12 : 
              case 15 : 
                  exit = 1;
                  break;
              case 16 : 
                  f[/* filter */2] = "0";
                  _i = i + 1 | 0;
                  continue ;
              case 17 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 23 : 
              case 24 : 
              case 25 : 
                  exit = 3;
                  break;
              
            }
          }
        }
        switch (exit) {
          case 1 : 
              _i = i + 1 | 0;
              continue ;
          case 2 : 
              f[/* signstyle */1] = String.fromCharCode(c);
              _i = i + 1 | 0;
              continue ;
          case 3 : 
              f[/* width */6] = 0;
              var j$1 = i;
              while((function(j$1){
                  return function () {
                    var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                    return +(w >= 0 && w <= 9);
                  }
                  }(j$1))()) {
                f[/* width */6] = (imul(f[/* width */6], 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
                j$1 = j$1 + 1 | 0;
              }            _i = j$1;
              continue ;
          case 4 : 
              f[/* signedconv */5] = /* boolean */1;
              f[/* base */4] = /* Dec */2;
              _i = i + 1 | 0;
              continue ;
          case 5 : 
              f[/* signedconv */5] = /* boolean */1;
              f[/* conv */10] = String.fromCharCode(c);
              _i = i + 1 | 0;
              continue ;
          
        }
      }
    }}

  function finish_formatting(param, rawbuffer) {
    var justify = param[/* justify */0];
    var signstyle = param[/* signstyle */1];
    var filter = param[/* filter */2];
    var alternate = param[/* alternate */3];
    var base = param[/* base */4];
    var signedconv = param[/* signedconv */5];
    var width = param[/* width */6];
    var uppercase = param[/* uppercase */7];
    var sign = param[/* sign */8];
    var len = rawbuffer.length;
    if (signedconv && (sign < 0 || signstyle !== "-")) {
      len = len + 1 | 0;
    }
    if (alternate) {
      if (base === /* Oct */0) {
        len = len + 1 | 0;
      } else if (base === /* Hex */1) {
        len = len + 2 | 0;
      }
      
    }
    var buffer = "";
    if (justify === "+" && filter === " ") {
      for(var i = len ,i_finish = width - 1 | 0; i <= i_finish; ++i){
        buffer = buffer + filter;
      }
    }
    if (signedconv) {
      if (sign < 0) {
        buffer = buffer + "-";
      } else if (signstyle !== "-") {
        buffer = buffer + signstyle;
      }
      
    }
    if (alternate && base === /* Oct */0) {
      buffer = buffer + "0";
    }
    if (alternate && base === /* Hex */1) {
      buffer = buffer + "0x";
    }
    if (justify === "+" && filter === "0") {
      for(var i$1 = len ,i_finish$1 = width - 1 | 0; i$1 <= i_finish$1; ++i$1){
        buffer = buffer + filter;
      }
    }
    buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
    if (justify === "-") {
      for(var i$2 = len ,i_finish$2 = width - 1 | 0; i$2 <= i_finish$2; ++i$2){
        buffer = buffer + " ";
      }
    }
    return buffer;
  }

  function caml_format_int(fmt, i) {
    if (fmt === "%d") {
      return String(i);
    } else {
      var f = parse_format(fmt);
      var f$1 = f;
      var i$1 = i;
      var i$2 = i$1 < 0 ? (
          f$1[/* signedconv */5] ? (f$1[/* sign */8] = -1, -i$1) : (i$1 >>> 0)
        ) : i$1;
      var s = i$2.toString(int_of_base(f$1[/* base */4]));
      if (f$1[/* prec */9] >= 0) {
        f$1[/* filter */2] = " ";
        var n = f$1[/* prec */9] - s.length | 0;
        if (n > 0) {
          s = repeat(n, "0") + s;
        }
        
      }
      return finish_formatting(f$1, s);
    }
  }

  function caml_int64_format(fmt, x) {
    var f = parse_format(fmt);
    var x$1 = f[/* signedconv */5] && lt(x, /* int64 */[
          /* hi */0,
          /* lo */0
        ]) ? (f[/* sign */8] = -1, neg(x)) : x;
    var s = "";
    var match = f[/* base */4];
    switch (match) {
      case 0 : 
          var wbase = /* int64 */[
            /* hi */0,
            /* lo */8
          ];
          var cvtbl = "01234567";
          if (lt(x$1, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var y = discard_sign(x$1);
            var match$1 = div_mod(y, wbase);
            var quotient = add(/* int64 */[
                  /* hi */268435456,
                  /* lo */0
                ], match$1[0]);
            var modulus = match$1[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
            while(neq(quotient, /* int64 */[
                    /* hi */0,
                    /* lo */0
                  ])) {
              var match$2 = div_mod(quotient, wbase);
              quotient = match$2[0];
              modulus = match$2[1];
              s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
            }        } else {
            var match$3 = div_mod(x$1, wbase);
            var quotient$1 = match$3[0];
            var modulus$1 = match$3[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
            while(neq(quotient$1, /* int64 */[
                    /* hi */0,
                    /* lo */0
                  ])) {
              var match$4 = div_mod(quotient$1, wbase);
              quotient$1 = match$4[0];
              modulus$1 = match$4[1];
              s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
            }        }
          break;
      case 1 : 
          s = to_hex(x$1) + s;
          break;
      case 2 : 
          var wbase$1 = /* int64 */[
            /* hi */0,
            /* lo */10
          ];
          var cvtbl$1 = "0123456789";
          if (lt(x$1, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var y$1 = discard_sign(x$1);
            var match$5 = div_mod(y$1, wbase$1);
            var match$6 = div_mod(add(/* int64 */[
                      /* hi */0,
                      /* lo */8
                    ], match$5[1]), wbase$1);
            var quotient$2 = add(add(/* int64 */[
                      /* hi */214748364,
                      /* lo */3435973836
                    ], match$5[0]), match$6[0]);
            var modulus$2 = match$6[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
            while(neq(quotient$2, /* int64 */[
                    /* hi */0,
                    /* lo */0
                  ])) {
              var match$7 = div_mod(quotient$2, wbase$1);
              quotient$2 = match$7[0];
              modulus$2 = match$7[1];
              s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
            }        } else {
            var match$8 = div_mod(x$1, wbase$1);
            var quotient$3 = match$8[0];
            var modulus$3 = match$8[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
            while(neq(quotient$3, /* int64 */[
                    /* hi */0,
                    /* lo */0
                  ])) {
              var match$9 = div_mod(quotient$3, wbase$1);
              quotient$3 = match$9[0];
              modulus$3 = match$9[1];
              s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
            }        }
          break;
      
    }
    if (f[/* prec */9] >= 0) {
      f[/* filter */2] = " ";
      var n = f[/* prec */9] - s.length | 0;
      if (n > 0) {
        s = repeat(n, "0") + s;
      }
      
    }
    return finish_formatting(f, s);
  }

  function caml_format_float(fmt, x) {
    var f = parse_format(fmt);
    var prec = f[/* prec */9] < 0 ? 6 : f[/* prec */9];
    var x$1 = x < 0 ? (f[/* sign */8] = -1, -x) : x;
    var s = "";
    if (isNaN(x$1)) {
      s = "nan";
      f[/* filter */2] = " ";
    } else if (isFinite(x$1)) {
      var match = f[/* conv */10];
      switch (match) {
        case "e" : 
            s = x$1.toExponential(prec);
            var i = s.length;
            if (s[i - 3 | 0] === "e") {
              s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
            }
            break;
        case "f" : 
            s = x$1.toFixed(prec);
            break;
        case "g" : 
            var prec$1 = prec !== 0 ? prec : 1;
            s = x$1.toExponential(prec$1 - 1 | 0);
            var j = s.indexOf("e");
            var exp = Number(s.slice(j + 1 | 0)) | 0;
            if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
              var i$1 = j - 1 | 0;
              while(s[i$1] === "0") {
                i$1 = i$1 - 1 | 0;
              }            if (s[i$1] === ".") {
                i$1 = i$1 - 1 | 0;
              }
              s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
              var i$2 = s.length;
              if (s[i$2 - 3 | 0] === "e") {
                s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
              }
              
            } else {
              var p = prec$1;
              if (exp < 0) {
                p = p - (exp + 1 | 0) | 0;
                s = x$1.toFixed(p);
              } else {
                while((function () {
                        s = x$1.toFixed(p);
                        return +(s.length > (prec$1 + 1 | 0));
                      })()) {
                  p = p - 1 | 0;
                }            }
              if (p !== 0) {
                var k = s.length - 1 | 0;
                while(s[k] === "0") {
                  k = k - 1 | 0;
                }              if (s[k] === ".") {
                  k = k - 1 | 0;
                }
                s = s.slice(0, k + 1 | 0);
              }
              
            }
            break;
        default:
          
      }
    } else {
      s = "inf";
      f[/* filter */2] = " ";
    }
    return finish_formatting(f, s);
  }

  var float_of_string = (
    function (s, caml_failwith) {
      var res = +s;
      if ((s.length > 0) && (res === res))
          return res;
      s = s.replace(/_/g, "");
      res = +s;
      if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) {
          return res;
      }
      if (/^ *0x[0-9a-f_]+p[+-]?[0-9_]+/i.test(s)) {
          var pidx = s.indexOf('p');
          pidx = (pidx == -1) ? s.indexOf('P') : pidx;
          var exp = +s.substring(pidx + 1);
          res = +s.substring(0, pidx);
          return res * Math.pow(2, exp);
      }
      if (/^\+?inf(inity)?$/i.test(s))
          return Infinity;
      if (/^-inf(inity)?$/i.test(s))
          return -Infinity;
      caml_failwith("float_of_string");
  }

  );

  function caml_float_of_string(s) {
    return _2(float_of_string, s, caml_failwith);
  }

  var caml_nativeint_format = caml_format_int;

  var caml_int32_format = caml_format_int;

  var caml_int32_of_string = caml_int_of_string;

  var caml_nativeint_of_string = caml_int_of_string;
  /* float_of_string Not a pure module */

  function caml_create_string(len) {
    if (len < 0) {
      throw [
            invalid_argument,
            "String.create"
          ];
    } else {
      var result = new Array(len);
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        result[i] = /* "\000" */0;
      }
      return result;
    }
  }

  function caml_fill_string(s, i, l, c) {
    if (l > 0) {
      for(var k = i ,k_finish = (l + i | 0) - 1 | 0; k <= k_finish; ++k){
        s[k] = c;
      }
      return /* () */0;
    } else {
      return 0;
    }
  }

  function caml_blit_string(s1, i1, s2, i2, len) {
    if (len > 0) {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    } else {
      return 0;
    }
  }

  function caml_blit_bytes(s1, i1, s2, i2, len) {
    if (len > 0) {
      if (s1 === s2) {
        var s1$1 = s1;
        var i1$1 = i1;
        var i2$1 = i2;
        var len$1 = len;
        if (i1$1 < i2$1) {
          var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
          var range_b = len$1 - 1 | 0;
          var range = range_a > range_b ? range_b : range_a;
          for(var j = range; j >= 0; --j){
            s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
          }
          return /* () */0;
        } else if (i1$1 > i2$1) {
          var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
          var range_b$1 = len$1 - 1 | 0;
          var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
          for(var k = 0; k <= range$1; ++k){
            s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
          }
          return /* () */0;
        } else {
          return 0;
        }
      } else {
        var off1 = s1.length - i1 | 0;
        if (len <= off1) {
          for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
            s2[i2 + i | 0] = s1[i1 + i | 0];
          }
          return /* () */0;
        } else {
          for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
            s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
          }
          for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
            s2[i2 + i$2 | 0] = /* "\000" */0;
          }
          return /* () */0;
        }
      }
    } else {
      return 0;
    }
  }

  function bytes_of_string(s) {
    var len = s.length;
    var res = new Array(len);
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      res[i] = s.charCodeAt(i);
    }
    return res;
  }

  function bytes_to_string(a) {
    var bytes = a;
    var i = 0;
    var len = a.length;
    var s = "";
    var s_len = len;
    if (i === 0 && len <= 4096 && len === bytes.length) {
      return String.fromCharCode.apply(null,bytes);
    } else {
      var offset = 0;
      while(s_len > 0) {
        var next = s_len < 1024 ? s_len : 1024;
        var tmp_bytes = new Array(next);
        caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
        s = s + String.fromCharCode.apply(null,tmp_bytes);
        s_len = s_len - next | 0;
        offset = offset + next | 0;
      }    return s;
    }
  }

  function get(s, i) {
    if (i < 0 || i >= s.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return s.charCodeAt(i);
    }
  }
  /* No side effect */

  var id = [0];

  function get_id() {
    id[0] += 1;
    return id[0];
  }

  function create(str) {
    var v_001 = get_id(/* () */0);
    var v = /* tuple */[
      str,
      v_001
    ];
    v.tag = 248;
    return v;
  }

  function isCamlExceptionOrOpenVariant(e) {
    if (e === undefined) {
      return /* boolean */0;
    } else if (e.tag === 248) {
      return /* true */1;
    } else {
      var slot = e[0];
      if (slot !== undefined) {
        return +(slot.tag === 248);
      } else {
        return /* false */0;
      }
    }
  }
  /* No side effect */

  var not_implemented = (function (s){ throw new Error(s)});
  /* not_implemented Not a pure module */

  function erase_rel(param) {
    if (typeof param === "number") {
      return /* End_of_fmtty */0;
    } else {
      switch (param.tag | 0) {
        case 0 : 
            return /* Char_ty */__(0, [erase_rel(param[0])]);
        case 1 : 
            return /* String_ty */__(1, [erase_rel(param[0])]);
        case 2 : 
            return /* Int_ty */__(2, [erase_rel(param[0])]);
        case 3 : 
            return /* Int32_ty */__(3, [erase_rel(param[0])]);
        case 4 : 
            return /* Nativeint_ty */__(4, [erase_rel(param[0])]);
        case 5 : 
            return /* Int64_ty */__(5, [erase_rel(param[0])]);
        case 6 : 
            return /* Float_ty */__(6, [erase_rel(param[0])]);
        case 7 : 
            return /* Bool_ty */__(7, [erase_rel(param[0])]);
        case 8 : 
            return /* Format_arg_ty */__(8, [
                      param[0],
                      erase_rel(param[1])
                    ]);
        case 9 : 
            var ty1 = param[0];
            return /* Format_subst_ty */__(9, [
                      ty1,
                      ty1,
                      erase_rel(param[2])
                    ]);
        case 10 : 
            return /* Alpha_ty */__(10, [erase_rel(param[0])]);
        case 11 : 
            return /* Theta_ty */__(11, [erase_rel(param[0])]);
        case 12 : 
            return /* Any_ty */__(12, [erase_rel(param[0])]);
        case 13 : 
            return /* Reader_ty */__(13, [erase_rel(param[0])]);
        case 14 : 
            return /* Ignored_reader_ty */__(14, [erase_rel(param[0])]);
        
      }
    }
  }

  function concat_fmtty(fmtty1, fmtty2) {
    if (typeof fmtty1 === "number") {
      return fmtty2;
    } else {
      switch (fmtty1.tag | 0) {
        case 0 : 
            return /* Char_ty */__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 1 : 
            return /* String_ty */__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 2 : 
            return /* Int_ty */__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 3 : 
            return /* Int32_ty */__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 4 : 
            return /* Nativeint_ty */__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 5 : 
            return /* Int64_ty */__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 6 : 
            return /* Float_ty */__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 7 : 
            return /* Bool_ty */__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 8 : 
            return /* Format_arg_ty */__(8, [
                      fmtty1[0],
                      concat_fmtty(fmtty1[1], fmtty2)
                    ]);
        case 9 : 
            return /* Format_subst_ty */__(9, [
                      fmtty1[0],
                      fmtty1[1],
                      concat_fmtty(fmtty1[2], fmtty2)
                    ]);
        case 10 : 
            return /* Alpha_ty */__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 11 : 
            return /* Theta_ty */__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 12 : 
            return /* Any_ty */__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 13 : 
            return /* Reader_ty */__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
        case 14 : 
            return /* Ignored_reader_ty */__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
        
      }
    }
  }

  function concat_fmt(fmt1, fmt2) {
    if (typeof fmt1 === "number") {
      return fmt2;
    } else {
      switch (fmt1.tag | 0) {
        case 0 : 
            return /* Char */__(0, [concat_fmt(fmt1[0], fmt2)]);
        case 1 : 
            return /* Caml_char */__(1, [concat_fmt(fmt1[0], fmt2)]);
        case 2 : 
            return /* String */__(2, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 3 : 
            return /* Caml_string */__(3, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 4 : 
            return /* Int */__(4, [
                      fmt1[0],
                      fmt1[1],
                      fmt1[2],
                      concat_fmt(fmt1[3], fmt2)
                    ]);
        case 5 : 
            return /* Int32 */__(5, [
                      fmt1[0],
                      fmt1[1],
                      fmt1[2],
                      concat_fmt(fmt1[3], fmt2)
                    ]);
        case 6 : 
            return /* Nativeint */__(6, [
                      fmt1[0],
                      fmt1[1],
                      fmt1[2],
                      concat_fmt(fmt1[3], fmt2)
                    ]);
        case 7 : 
            return /* Int64 */__(7, [
                      fmt1[0],
                      fmt1[1],
                      fmt1[2],
                      concat_fmt(fmt1[3], fmt2)
                    ]);
        case 8 : 
            return /* Float */__(8, [
                      fmt1[0],
                      fmt1[1],
                      fmt1[2],
                      concat_fmt(fmt1[3], fmt2)
                    ]);
        case 9 : 
            return /* Bool */__(9, [concat_fmt(fmt1[0], fmt2)]);
        case 10 : 
            return /* Flush */__(10, [concat_fmt(fmt1[0], fmt2)]);
        case 11 : 
            return /* String_literal */__(11, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 12 : 
            return /* Char_literal */__(12, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 13 : 
            return /* Format_arg */__(13, [
                      fmt1[0],
                      fmt1[1],
                      concat_fmt(fmt1[2], fmt2)
                    ]);
        case 14 : 
            return /* Format_subst */__(14, [
                      fmt1[0],
                      fmt1[1],
                      concat_fmt(fmt1[2], fmt2)
                    ]);
        case 15 : 
            return /* Alpha */__(15, [concat_fmt(fmt1[0], fmt2)]);
        case 16 : 
            return /* Theta */__(16, [concat_fmt(fmt1[0], fmt2)]);
        case 17 : 
            return /* Formatting_lit */__(17, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 18 : 
            return /* Formatting_gen */__(18, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 19 : 
            return /* Reader */__(19, [concat_fmt(fmt1[0], fmt2)]);
        case 20 : 
            return /* Scan_char_set */__(20, [
                      fmt1[0],
                      fmt1[1],
                      concat_fmt(fmt1[2], fmt2)
                    ]);
        case 21 : 
            return /* Scan_get_counter */__(21, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 22 : 
            return /* Scan_next_char */__(22, [concat_fmt(fmt1[0], fmt2)]);
        case 23 : 
            return /* Ignored_param */__(23, [
                      fmt1[0],
                      concat_fmt(fmt1[1], fmt2)
                    ]);
        case 24 : 
            return /* Custom */__(24, [
                      fmt1[0],
                      fmt1[1],
                      concat_fmt(fmt1[2], fmt2)
                    ]);
        
      }
    }
  }
  /* No side effect */

  function failwith(s) {
    throw [
          failure,
          s
        ];
  }

  var Exit = create("Pervasives.Exit");

  function abs(x) {
    if (x >= 0) {
      return x;
    } else {
      return -x | 0;
    }
  }

  function char_of_int(n) {
    if (n < 0 || n > 255) {
      throw [
            invalid_argument,
            "char_of_int"
          ];
    } else {
      return n;
    }
  }

  function $at(l1, l2) {
    if (l1) {
      return /* :: */[
              l1[0],
              $at(l1[1], l2)
            ];
    } else {
      return l2;
    }
  }

  var stdin$1 = stdin;

  var stderr$1 = stderr;

  function output_string(oc, s) {
    return caml_ml_output(oc, s, 0, s.length);
  }

  function input(_, s, ofs, len) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw [
            invalid_argument,
            "input"
          ];
    } else {
      return not_implemented("caml_ml_input not implemented by bucklescript yet\n");
    }
  }

  function prerr_string(s) {
    return output_string(stderr$1, s);
  }

  var max_int$1 = 2147483647;
  /* No side effect */

  function length(l) {
    var _len = 0;
    var _param = l;
    while(true) {
      var param = _param;
      var len = _len;
      if (param) {
        _param = param[1];
        _len = len + 1 | 0;
        continue ;
      } else {
        return len;
      }
    }}

  function hd(param) {
    if (param) {
      return param[0];
    } else {
      throw [
            failure,
            "hd"
          ];
    }
  }

  function tl(param) {
    if (param) {
      return param[1];
    } else {
      throw [
            failure,
            "tl"
          ];
    }
  }

  function nth(l, n) {
    if (n < 0) {
      throw [
            invalid_argument,
            "List.nth"
          ];
    } else {
      var _l = l;
      var _n = n;
      while(true) {
        var n$1 = _n;
        var l$1 = _l;
        if (l$1) {
          if (n$1 === 0) {
            return l$1[0];
          } else {
            _n = n$1 - 1 | 0;
            _l = l$1[1];
            continue ;
          }
        } else {
          throw [
                failure,
                "nth"
              ];
        }
      }  }
  }

  function rev_append(_l1, _l2) {
    while(true) {
      var l2 = _l2;
      var l1 = _l1;
      if (l1) {
        _l2 = /* :: */[
          l1[0],
          l2
        ];
        _l1 = l1[1];
        continue ;
      } else {
        return l2;
      }
    }}

  function rev(l) {
    return rev_append(l, /* [] */0);
  }

  function flatten(param) {
    if (param) {
      return $at(param[0], flatten(param[1]));
    } else {
      return /* [] */0;
    }
  }

  function map(f, param) {
    if (param) {
      var r = _1(f, param[0]);
      return /* :: */[
              r,
              map(f, param[1])
            ];
    } else {
      return /* [] */0;
    }
  }

  function iter(f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        _1(f, param[0]);
        _param = param[1];
        continue ;
      } else {
        return /* () */0;
      }
    }}

  function iteri(f, l) {
    var _i = 0;
    var f$1 = f;
    var _param = l;
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        _2(f$1, i, param[0]);
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return /* () */0;
      }
    }}

  function fold_left(f, _accu, _l) {
    while(true) {
      var l = _l;
      var accu = _accu;
      if (l) {
        _l = l[1];
        _accu = _2(f, accu, l[0]);
        continue ;
      } else {
        return accu;
      }
    }}

  function exists(p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (_1(p, param[0])) {
          return /* true */1;
        } else {
          _param = param[1];
          continue ;
        }
      } else {
        return /* boolean */0;
      }
    }}

  function assoc(x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var match = param[0];
        if (caml_equal(match[0], x)) {
          return match[1];
        } else {
          _param = param[1];
          continue ;
        }
      } else {
        throw not_found;
      }
    }}

  function find(p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var x = param[0];
        if (_1(p, x)) {
          return x;
        } else {
          _param = param[1];
          continue ;
        }
      } else {
        throw not_found;
      }
    }}

  function find_all(p) {
    return (function (param) {
        var _accu = /* [] */0;
        var _param = param;
        while(true) {
          var param$1 = _param;
          var accu = _accu;
          if (param$1) {
            var l = param$1[1];
            var x = param$1[0];
            if (_1(p, x)) {
              _param = l;
              _accu = /* :: */[
                x,
                accu
              ];
              continue ;
            } else {
              _param = l;
              continue ;
            }
          } else {
            return rev_append(accu, /* [] */0);
          }
        }    });
  }

  function chop(_k, _l) {
    while(true) {
      var l = _l;
      var k = _k;
      if (k === 0) {
        return l;
      } else if (l) {
        _l = l[1];
        _k = k - 1 | 0;
        continue ;
      } else {
        throw [
              assert_failure,
              [
                "list.ml",
                223,
                11
              ]
            ];
      }
    }}

  function stable_sort(cmp, l) {
    var sort = function (n, l) {
      var exit$$1 = 0;
      if (n !== 2) {
        if (n !== 3 || !l) {
          exit$$1 = 1;
        } else {
          var match = l[1];
          if (match) {
            var match$1 = match[1];
            if (match$1) {
              var x3 = match$1[0];
              var x2 = match[0];
              var x1 = l[0];
              if (_2(cmp, x1, x2) <= 0) {
                if (_2(cmp, x2, x3) <= 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else if (_2(cmp, x1, x3) <= 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              } else if (_2(cmp, x1, x3) <= 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (_2(cmp, x2, x3) <= 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else {
              exit$$1 = 1;
            }
          } else {
            exit$$1 = 1;
          }
        }
      } else if (l) {
        var match$2 = l[1];
        if (match$2) {
          var x2$1 = match$2[0];
          var x1$1 = l[0];
          if (_2(cmp, x1$1, x2$1) <= 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
      if (exit$$1 === 1) {
        var n1 = (n >> 1);
        var n2 = n - n1 | 0;
        var l2 = chop(n1, l);
        var s1 = rev_sort(n1, l);
        var s2 = rev_sort(n2, l2);
        var _l1 = s1;
        var _l2 = s2;
        var _accu = /* [] */0;
        while(true) {
          var accu = _accu;
          var l2$1 = _l2;
          var l1 = _l1;
          if (l1) {
            if (l2$1) {
              var h2 = l2$1[0];
              var h1 = l1[0];
              if (_2(cmp, h1, h2) > 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = l1[1];
                continue ;
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = l2$1[1];
                continue ;
              }
            } else {
              return rev_append(l1, accu);
            }
          } else {
            return rev_append(l2$1, accu);
          }
        }    }
      
    };
    var rev_sort = function (n, l) {
      var exit$$1 = 0;
      if (n !== 2) {
        if (n !== 3 || !l) {
          exit$$1 = 1;
        } else {
          var match = l[1];
          if (match) {
            var match$1 = match[1];
            if (match$1) {
              var x3 = match$1[0];
              var x2 = match[0];
              var x1 = l[0];
              if (_2(cmp, x1, x2) > 0) {
                if (_2(cmp, x2, x3) > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else if (_2(cmp, x1, x3) > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ]
                        ];
                }
              } else if (_2(cmp, x1, x3) > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (_2(cmp, x2, x3) > 0) {
                return /* :: */[
                        x2,
                        /* :: */[
                          x3,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else {
              exit$$1 = 1;
            }
          } else {
            exit$$1 = 1;
          }
        }
      } else if (l) {
        var match$2 = l[1];
        if (match$2) {
          var x2$1 = match$2[0];
          var x1$1 = l[0];
          if (_2(cmp, x1$1, x2$1) > 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
      if (exit$$1 === 1) {
        var n1 = (n >> 1);
        var n2 = n - n1 | 0;
        var l2 = chop(n1, l);
        var s1 = sort(n1, l);
        var s2 = sort(n2, l2);
        var _l1 = s1;
        var _l2 = s2;
        var _accu = /* [] */0;
        while(true) {
          var accu = _accu;
          var l2$1 = _l2;
          var l1 = _l1;
          if (l1) {
            if (l2$1) {
              var h2 = l2$1[0];
              var h1 = l1[0];
              if (_2(cmp, h1, h2) <= 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = l1[1];
                continue ;
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = l2$1[1];
                continue ;
              }
            } else {
              return rev_append(l1, accu);
            }
          } else {
            return rev_append(l2$1, accu);
          }
        }    }
      
    };
    var len = length(l);
    if (len < 2) {
      return l;
    } else {
      return sort(len, l);
    }
  }

  function sort_uniq(cmp, l) {
    var sort = function (n, l) {
      var exit$$1 = 0;
      if (n !== 2) {
        if (n !== 3 || !l) {
          exit$$1 = 1;
        } else {
          var match = l[1];
          if (match) {
            var match$1 = match[1];
            if (match$1) {
              var x3 = match$1[0];
              var x2 = match[0];
              var x1 = l[0];
              var c = _2(cmp, x1, x2);
              if (c === 0) {
                var c$1 = _2(cmp, x2, x3);
                if (c$1 === 0) {
                  return /* :: */[
                          x2,
                          /* [] */0
                        ];
                } else if (c$1 < 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else if (c < 0) {
                var c$2 = _2(cmp, x2, x3);
                if (c$2 === 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                } else if (c$2 < 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  var c$3 = _2(cmp, x1, x3);
                  if (c$3 === 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ];
                  } else if (c$3 < 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x3,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    return /* :: */[
                            x3,
                            /* :: */[
                              x1,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ]
                          ];
                  }
                }
              } else {
                var c$4 = _2(cmp, x1, x3);
                if (c$4 === 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                } else if (c$4 < 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  var c$5 = _2(cmp, x2, x3);
                  if (c$5 === 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ];
                  } else if (c$5 < 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    return /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ]
                          ];
                  }
                }
              }
            } else {
              exit$$1 = 1;
            }
          } else {
            exit$$1 = 1;
          }
        }
      } else if (l) {
        var match$2 = l[1];
        if (match$2) {
          var x2$1 = match$2[0];
          var x1$1 = l[0];
          var c$6 = _2(cmp, x1$1, x2$1);
          if (c$6 === 0) {
            return /* :: */[
                    x1$1,
                    /* [] */0
                  ];
          } else if (c$6 < 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
      if (exit$$1 === 1) {
        var n1 = (n >> 1);
        var n2 = n - n1 | 0;
        var l2 = chop(n1, l);
        var s1 = rev_sort(n1, l);
        var s2 = rev_sort(n2, l2);
        var _l1 = s1;
        var _l2 = s2;
        var _accu = /* [] */0;
        while(true) {
          var accu = _accu;
          var l2$1 = _l2;
          var l1 = _l1;
          if (l1) {
            if (l2$1) {
              var t2 = l2$1[1];
              var h2 = l2$1[0];
              var t1 = l1[1];
              var h1 = l1[0];
              var c$7 = _2(cmp, h1, h2);
              if (c$7 === 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l2 = t2;
                _l1 = t1;
                continue ;
              } else if (c$7 > 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = t1;
                continue ;
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = t2;
                continue ;
              }
            } else {
              return rev_append(l1, accu);
            }
          } else {
            return rev_append(l2$1, accu);
          }
        }    }
      
    };
    var rev_sort = function (n, l) {
      var exit$$1 = 0;
      if (n !== 2) {
        if (n !== 3 || !l) {
          exit$$1 = 1;
        } else {
          var match = l[1];
          if (match) {
            var match$1 = match[1];
            if (match$1) {
              var x3 = match$1[0];
              var x2 = match[0];
              var x1 = l[0];
              var c = _2(cmp, x1, x2);
              if (c === 0) {
                var c$1 = _2(cmp, x2, x3);
                if (c$1 === 0) {
                  return /* :: */[
                          x2,
                          /* [] */0
                        ];
                } else if (c$1 > 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else if (c > 0) {
                var c$2 = _2(cmp, x2, x3);
                if (c$2 === 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                } else if (c$2 > 0) {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  var c$3 = _2(cmp, x1, x3);
                  if (c$3 === 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* [] */0
                            ]
                          ];
                  } else if (c$3 > 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x3,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    return /* :: */[
                            x3,
                            /* :: */[
                              x1,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ]
                          ];
                  }
                }
              } else {
                var c$4 = _2(cmp, x1, x3);
                if (c$4 === 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                } else if (c$4 > 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* :: */[
                              x3,
                              /* [] */0
                            ]
                          ]
                        ];
                } else {
                  var c$5 = _2(cmp, x2, x3);
                  if (c$5 === 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* [] */0
                            ]
                          ];
                  } else if (c$5 > 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x3,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    return /* :: */[
                            x3,
                            /* :: */[
                              x2,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ]
                          ];
                  }
                }
              }
            } else {
              exit$$1 = 1;
            }
          } else {
            exit$$1 = 1;
          }
        }
      } else if (l) {
        var match$2 = l[1];
        if (match$2) {
          var x2$1 = match$2[0];
          var x1$1 = l[0];
          var c$6 = _2(cmp, x1$1, x2$1);
          if (c$6 === 0) {
            return /* :: */[
                    x1$1,
                    /* [] */0
                  ];
          } else if (c$6 > 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
      if (exit$$1 === 1) {
        var n1 = (n >> 1);
        var n2 = n - n1 | 0;
        var l2 = chop(n1, l);
        var s1 = sort(n1, l);
        var s2 = sort(n2, l2);
        var _l1 = s1;
        var _l2 = s2;
        var _accu = /* [] */0;
        while(true) {
          var accu = _accu;
          var l2$1 = _l2;
          var l1 = _l1;
          if (l1) {
            if (l2$1) {
              var t2 = l2$1[1];
              var h2 = l2$1[0];
              var t1 = l1[1];
              var h1 = l1[0];
              var c$7 = _2(cmp, h1, h2);
              if (c$7 === 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l2 = t2;
                _l1 = t1;
                continue ;
              } else if (c$7 < 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = t1;
                continue ;
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = t2;
                continue ;
              }
            } else {
              return rev_append(l1, accu);
            }
          } else {
            return rev_append(l2$1, accu);
          }
        }    }
      
    };
    var len = length(l);
    if (len < 2) {
      return l;
    } else {
      return sort(len, l);
    }
  }

  var concat = flatten;

  var filter = find_all;

  var sort = stable_sort;
  /* No side effect */

  function escaped(c) {
    var exit = 0;
    if (c >= 40) {
      if (c !== 92) {
        exit = c >= 127 ? 1 : 2;
      } else {
        return "\\\\";
      }
    } else if (c >= 32) {
      if (c >= 39) {
        return "\\'";
      } else {
        exit = 2;
      }
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8 : 
            return "\\b";
        case 9 : 
            return "\\t";
        case 10 : 
            return "\\n";
        case 0 : 
        case 1 : 
        case 2 : 
        case 3 : 
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 11 : 
        case 12 : 
            exit = 1;
            break;
        case 13 : 
            return "\\r";
        
      }
    }
    switch (exit) {
      case 1 : 
          var s = caml_create_string(4);
          s[0] = /* "\\" */92;
          s[1] = 48 + (c / 100 | 0) | 0;
          s[2] = 48 + (c / 10 | 0) % 10 | 0;
          s[3] = 48 + c % 10 | 0;
          return bytes_to_string(s);
      case 2 : 
          var s$1 = caml_create_string(1);
          s$1[0] = c;
          return bytes_to_string(s$1);
      
    }
  }
  /* No side effect */

  function make(n, c) {
    var s = caml_create_string(n);
    caml_fill_string(s, 0, n, c);
    return s;
  }

  var empty = [];

  function copy(s) {
    var len = s.length;
    var r = caml_create_string(len);
    caml_blit_bytes(s, 0, r, 0, len);
    return r;
  }

  function to_string(b) {
    return bytes_to_string(copy(b));
  }

  function sub$1(s, ofs, len) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw [
            invalid_argument,
            "String.sub / Bytes.sub"
          ];
    } else {
      var r = caml_create_string(len);
      caml_blit_bytes(s, ofs, r, 0, len);
      return r;
    }
  }

  function sub_string(b, ofs, len) {
    return bytes_to_string(sub$1(b, ofs, len));
  }

  function blit(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw [
            invalid_argument,
            "Bytes.blit"
          ];
    } else {
      return caml_blit_bytes(s1, ofs1, s2, ofs2, len);
    }
  }

  function blit_string(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw [
            invalid_argument,
            "String.blit / Bytes.blit_string"
          ];
    } else {
      return caml_blit_string(s1, ofs1, s2, ofs2, len);
    }
  }

  function iter$1(f, a) {
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      _1(f, a[i]);
    }
    return /* () */0;
  }

  function iteri$1(f, a) {
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      _2(f, i, a[i]);
    }
    return /* () */0;
  }

  function is_space(param) {
    var switcher = param - 9 | 0;
    if (switcher > 4 || switcher < 0) {
      if (switcher !== 23) {
        return /* boolean */0;
      } else {
        return /* boolean */1;
      }
    } else if (switcher !== 2) {
      return /* boolean */1;
    } else {
      return /* boolean */0;
    }
  }

  function trim(s) {
    var len = s.length;
    var i = 0;
    while(i < len && is_space(s[i])) {
      i = i + 1 | 0;
    }  var j = len - 1 | 0;
    while(j >= i && is_space(s[j])) {
      j = j - 1 | 0;
    }  if (j >= i) {
      return sub$1(s, i, (j - i | 0) + 1 | 0);
    } else {
      return empty;
    }
  }

  function escaped$1(s) {
    var n = 0;
    for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
      var match = s[i];
      var tmp;
      if (match >= 32) {
        var switcher = match - 34 | 0;
        tmp = switcher > 58 || switcher < 0 ? (
            switcher >= 93 ? 4 : 1
          ) : (
            switcher > 57 || switcher < 1 ? 2 : 1
          );
      } else {
        tmp = match >= 11 ? (
            match !== 13 ? 4 : 2
          ) : (
            match >= 8 ? 2 : 4
          );
      }
      n = n + tmp | 0;
    }
    if (n === s.length) {
      return copy(s);
    } else {
      var s$prime = caml_create_string(n);
      n = 0;
      for(var i$1 = 0 ,i_finish$1 = s.length - 1 | 0; i$1 <= i_finish$1; ++i$1){
        var c = s[i$1];
        var exit = 0;
        if (c >= 35) {
          if (c !== 92) {
            if (c >= 127) {
              exit = 1;
            } else {
              s$prime[n] = c;
            }
          } else {
            exit = 2;
          }
        } else if (c >= 32) {
          if (c >= 34) {
            exit = 2;
          } else {
            s$prime[n] = c;
          }
        } else if (c >= 14) {
          exit = 1;
        } else {
          switch (c) {
            case 8 : 
                s$prime[n] = /* "\\" */92;
                n = n + 1 | 0;
                s$prime[n] = /* "b" */98;
                break;
            case 9 : 
                s$prime[n] = /* "\\" */92;
                n = n + 1 | 0;
                s$prime[n] = /* "t" */116;
                break;
            case 10 : 
                s$prime[n] = /* "\\" */92;
                n = n + 1 | 0;
                s$prime[n] = /* "n" */110;
                break;
            case 0 : 
            case 1 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 11 : 
            case 12 : 
                exit = 1;
                break;
            case 13 : 
                s$prime[n] = /* "\\" */92;
                n = n + 1 | 0;
                s$prime[n] = /* "r" */114;
                break;
            
          }
        }
        switch (exit) {
          case 1 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = 48 + (c / 100 | 0) | 0;
              n = n + 1 | 0;
              s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
              n = n + 1 | 0;
              s$prime[n] = 48 + c % 10 | 0;
              break;
          case 2 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = c;
              break;
          
        }
        n = n + 1 | 0;
      }
      return s$prime;
    }
  }

  function index_rec(s, lim, _i, c) {
    while(true) {
      var i = _i;
      if (i >= lim) {
        throw not_found;
      } else if (s[i] === c) {
        return i;
      } else {
        _i = i + 1 | 0;
        continue ;
      }
    }}

  function index_from(s, i, c) {
    var l = s.length;
    if (i < 0 || i > l) {
      throw [
            invalid_argument,
            "String.index_from / Bytes.index_from"
          ];
    } else {
      return index_rec(s, l, i, c);
    }
  }
  /* No side effect */

  function make$1(n, c) {
    return bytes_to_string(make(n, c));
  }

  function sub$2(s, ofs, len) {
    return bytes_to_string(sub$1(bytes_of_string(s), ofs, len));
  }

  function concat$2(sep, l) {
    if (l) {
      var hd$$1 = l[0];
      var num = [0];
      var len = [0];
      iter((function (s) {
              num[0] = num[0] + 1 | 0;
              len[0] = len[0] + s.length | 0;
              return /* () */0;
            }), l);
      var r = caml_create_string(len[0] + imul(sep.length, num[0] - 1 | 0) | 0);
      caml_blit_string(hd$$1, 0, r, 0, hd$$1.length);
      var pos = [hd$$1.length];
      iter((function (s) {
              caml_blit_string(sep, 0, r, pos[0], sep.length);
              pos[0] = pos[0] + sep.length | 0;
              caml_blit_string(s, 0, r, pos[0], s.length);
              pos[0] = pos[0] + s.length | 0;
              return /* () */0;
            }), l[1]);
      return bytes_to_string(r);
    } else {
      return "";
    }
  }

  function iter$2(f, s) {
    return iter$1(f, bytes_of_string(s));
  }

  function iteri$2(f, s) {
    return iteri$1(f, bytes_of_string(s));
  }

  function is_space$1(param) {
    var switcher = param - 9 | 0;
    if (switcher > 4 || switcher < 0) {
      if (switcher !== 23) {
        return /* boolean */0;
      } else {
        return /* boolean */1;
      }
    } else if (switcher !== 2) {
      return /* boolean */1;
    } else {
      return /* boolean */0;
    }
  }

  function trim$1(s) {
    if (s === "" || !(is_space$1(s.charCodeAt(0)) || is_space$1(s.charCodeAt(s.length - 1 | 0)))) {
      return s;
    } else {
      return bytes_to_string(trim(bytes_of_string(s)));
    }
  }

  function escaped$2(s) {
    var needs_escape = function (_i) {
      while(true) {
        var i = _i;
        if (i >= s.length) {
          return /* boolean */0;
        } else {
          var match = s.charCodeAt(i);
          if (match >= 32) {
            var switcher = match - 34 | 0;
            if (switcher > 58 || switcher < 0) {
              if (switcher >= 93) {
                return /* boolean */1;
              } else {
                _i = i + 1 | 0;
                continue ;
              }
            } else if (switcher > 57 || switcher < 1) {
              return /* boolean */1;
            } else {
              _i = i + 1 | 0;
              continue ;
            }
          } else {
            return /* boolean */1;
          }
        }
      }  };
    if (needs_escape(0)) {
      return bytes_to_string(escaped$1(bytes_of_string(s)));
    } else {
      return s;
    }
  }

  function index_from$1(s, i, c) {
    return index_from(bytes_of_string(s), i, c);
  }

  var compare$3 = caml_string_compare;

  var blit$1 = blit_string;
  /* No side effect */

  function create$1(n) {
    var n$1 = n < 1 ? 1 : n;
    var s = caml_create_string(n$1);
    return /* record */[
            /* buffer */s,
            /* position */0,
            /* length */n$1,
            /* initial_buffer */s
          ];
  }

  function contents(b) {
    return sub_string(b[/* buffer */0], 0, b[/* position */1]);
  }

  function reset(b) {
    b[/* position */1] = 0;
    b[/* buffer */0] = b[/* initial_buffer */3];
    b[/* length */2] = b[/* buffer */0].length;
    return /* () */0;
  }

  function resize(b, more) {
    var len = b[/* length */2];
    var new_len = len;
    while((b[/* position */1] + more | 0) > new_len) {
      new_len = (new_len << 1);
    }  var new_buffer = caml_create_string(new_len);
    blit(b[/* buffer */0], 0, new_buffer, 0, b[/* position */1]);
    b[/* buffer */0] = new_buffer;
    b[/* length */2] = new_len;
    return /* () */0;
  }

  function add_char(b, c) {
    var pos = b[/* position */1];
    if (pos >= b[/* length */2]) {
      resize(b, 1);
    }
    b[/* buffer */0][pos] = c;
    b[/* position */1] = pos + 1 | 0;
    return /* () */0;
  }

  function add_string(b, s) {
    var len = s.length;
    var new_position = b[/* position */1] + len | 0;
    if (new_position > b[/* length */2]) {
      resize(b, len);
    }
    blit_string(s, 0, b[/* buffer */0], b[/* position */1], len);
    b[/* position */1] = new_position;
    return /* () */0;
  }
  /* No side effect */

  var $$Error = create("Js_exn.Error");

  function internalToOCamlException(e) {
    if (isCamlExceptionOrOpenVariant(e)) {
      return e;
    } else {
      return [
              $$Error,
              e
            ];
    }
  }
  /* No side effect */

  function get$1(s, i) {
    if (i < 0 || i >= s.length) {
      throw [
            invalid_argument,
            "index out of bounds"
          ];
    } else {
      return s[i];
    }
  }
  /* No side effect */

  function caml_classify_float(x) {
    if (isFinite(x)) {
      if (Math.abs(x) >= 2.2250738585072014e-308) {
        return /* FP_normal */0;
      } else if (x !== 0) {
        return /* FP_subnormal */1;
      } else {
        return /* FP_zero */2;
      }
    } else if (isNaN(x)) {
      return /* FP_nan */4;
    } else {
      return /* FP_infinite */3;
    }
  }
  /* No side effect */

  function add_in_char_set(char_set, c) {
    var str_ind = (c >>> 3);
    var mask = (1 << (c & 7));
    char_set[str_ind] = char_of_int(get$1(char_set, str_ind) | mask);
    return /* () */0;
  }

  function rev_char_set(char_set) {
    var char_set$prime = make(32, /* "\000" */0);
    for(var i = 0; i <= 31; ++i){
      char_set$prime[i] = char_of_int(get(char_set, i) ^ 255);
    }
    return bytes_to_string(char_set$prime);
  }

  function is_in_char_set(char_set, c) {
    var str_ind = (c >>> 3);
    var mask = (1 << (c & 7));
    return +((get(char_set, str_ind) & mask) !== 0);
  }

  function pad_of_pad_opt(pad_opt) {
    if (pad_opt) {
      return /* Lit_padding */__(0, [
                /* Right */1,
                pad_opt[0]
              ]);
    } else {
      return /* No_padding */0;
    }
  }

  function prec_of_prec_opt(prec_opt) {
    if (prec_opt) {
      return /* Lit_precision */[prec_opt[0]];
    } else {
      return /* No_precision */0;
    }
  }

  function param_format_of_ignored_format(ign, fmt) {
    if (typeof ign === "number") {
      switch (ign) {
        case 0 : 
            return /* Param_format_EBB */[/* Char */__(0, [fmt])];
        case 1 : 
            return /* Param_format_EBB */[/* Caml_char */__(1, [fmt])];
        case 2 : 
            return /* Param_format_EBB */[/* Bool */__(9, [fmt])];
        case 3 : 
            return /* Param_format_EBB */[/* Reader */__(19, [fmt])];
        case 4 : 
            return /* Param_format_EBB */[/* Scan_next_char */__(22, [fmt])];
        
      }
    } else {
      switch (ign.tag | 0) {
        case 0 : 
            return /* Param_format_EBB */[/* String */__(2, [
                        pad_of_pad_opt(ign[0]),
                        fmt
                      ])];
        case 1 : 
            return /* Param_format_EBB */[/* Caml_string */__(3, [
                        pad_of_pad_opt(ign[0]),
                        fmt
                      ])];
        case 2 : 
            return /* Param_format_EBB */[/* Int */__(4, [
                        ign[0],
                        pad_of_pad_opt(ign[1]),
                        /* No_precision */0,
                        fmt
                      ])];
        case 3 : 
            return /* Param_format_EBB */[/* Int32 */__(5, [
                        ign[0],
                        pad_of_pad_opt(ign[1]),
                        /* No_precision */0,
                        fmt
                      ])];
        case 4 : 
            return /* Param_format_EBB */[/* Nativeint */__(6, [
                        ign[0],
                        pad_of_pad_opt(ign[1]),
                        /* No_precision */0,
                        fmt
                      ])];
        case 5 : 
            return /* Param_format_EBB */[/* Int64 */__(7, [
                        ign[0],
                        pad_of_pad_opt(ign[1]),
                        /* No_precision */0,
                        fmt
                      ])];
        case 6 : 
            return /* Param_format_EBB */[/* Float */__(8, [
                        /* Float_f */0,
                        pad_of_pad_opt(ign[0]),
                        prec_of_prec_opt(ign[1]),
                        fmt
                      ])];
        case 7 : 
            return /* Param_format_EBB */[/* Format_arg */__(13, [
                        ign[0],
                        ign[1],
                        fmt
                      ])];
        case 8 : 
            return /* Param_format_EBB */[/* Format_subst */__(14, [
                        ign[0],
                        ign[1],
                        fmt
                      ])];
        case 9 : 
            return /* Param_format_EBB */[/* Scan_char_set */__(20, [
                        ign[0],
                        ign[1],
                        fmt
                      ])];
        case 10 : 
            return /* Param_format_EBB */[/* Scan_get_counter */__(21, [
                        ign[0],
                        fmt
                      ])];
        
      }
    }
  }

  function buffer_check_size(buf, overhead) {
    var len = buf[/* bytes */1].length;
    var min_len = buf[/* ind */0] + overhead | 0;
    if (min_len > len) {
      var new_len = caml_int_max((len << 1), min_len);
      var new_str = caml_create_string(new_len);
      blit(buf[/* bytes */1], 0, new_str, 0, len);
      buf[/* bytes */1] = new_str;
      return /* () */0;
    } else {
      return 0;
    }
  }

  function buffer_add_char(buf, c) {
    buffer_check_size(buf, 1);
    buf[/* bytes */1][buf[/* ind */0]] = c;
    buf[/* ind */0] = buf[/* ind */0] + 1 | 0;
    return /* () */0;
  }

  function buffer_add_string(buf, s) {
    var str_len = s.length;
    buffer_check_size(buf, str_len);
    blit$1(s, 0, buf[/* bytes */1], buf[/* ind */0], str_len);
    buf[/* ind */0] = buf[/* ind */0] + str_len | 0;
    return /* () */0;
  }

  function buffer_contents(buf) {
    return sub_string(buf[/* bytes */1], 0, buf[/* ind */0]);
  }

  function char_of_iconv(iconv) {
    switch (iconv) {
      case 0 : 
      case 1 : 
      case 2 : 
          return /* "d" */100;
      case 3 : 
      case 4 : 
      case 5 : 
          return /* "i" */105;
      case 6 : 
      case 7 : 
          return /* "x" */120;
      case 8 : 
      case 9 : 
          return /* "X" */88;
      case 10 : 
      case 11 : 
          return /* "o" */111;
      case 12 : 
          return /* "u" */117;
      
    }
  }

  function char_of_fconv(fconv) {
    switch (fconv) {
      case 0 : 
      case 1 : 
      case 2 : 
          return /* "f" */102;
      case 3 : 
      case 4 : 
      case 5 : 
          return /* "e" */101;
      case 6 : 
      case 7 : 
      case 8 : 
          return /* "E" */69;
      case 9 : 
      case 10 : 
      case 11 : 
          return /* "g" */103;
      case 12 : 
      case 13 : 
      case 14 : 
          return /* "G" */71;
      case 15 : 
          return /* "F" */70;
      
    }
  }

  function bprint_fconv_flag(buf, fconv) {
    switch (fconv) {
      case 1 : 
      case 4 : 
      case 7 : 
      case 10 : 
      case 13 : 
          return buffer_add_char(buf, /* "+" */43);
      case 2 : 
      case 5 : 
      case 8 : 
      case 11 : 
      case 14 : 
          return buffer_add_char(buf, /* " " */32);
      case 0 : 
      case 3 : 
      case 6 : 
      case 9 : 
      case 12 : 
      case 15 : 
          return /* () */0;
      
    }
  }

  function string_of_formatting_lit(formatting_lit) {
    if (typeof formatting_lit === "number") {
      switch (formatting_lit) {
        case 0 : 
            return "@]";
        case 1 : 
            return "@}";
        case 2 : 
            return "@?";
        case 3 : 
            return "@\n";
        case 4 : 
            return "@.";
        case 5 : 
            return "@@";
        case 6 : 
            return "@%";
        
      }
    } else {
      switch (formatting_lit.tag | 0) {
        case 0 : 
        case 1 : 
            return formatting_lit[0];
        case 2 : 
            return "@" + bytes_to_string(make(1, formatting_lit[0]));
        
      }
    }
  }

  function bprint_fmtty(buf, _fmtty) {
    while(true) {
      var fmtty = _fmtty;
      if (typeof fmtty === "number") {
        return /* () */0;
      } else {
        switch (fmtty.tag | 0) {
          case 0 : 
              buffer_add_string(buf, "%c");
              _fmtty = fmtty[0];
              continue ;
          case 1 : 
              buffer_add_string(buf, "%s");
              _fmtty = fmtty[0];
              continue ;
          case 2 : 
              buffer_add_string(buf, "%i");
              _fmtty = fmtty[0];
              continue ;
          case 3 : 
              buffer_add_string(buf, "%li");
              _fmtty = fmtty[0];
              continue ;
          case 4 : 
              buffer_add_string(buf, "%ni");
              _fmtty = fmtty[0];
              continue ;
          case 5 : 
              buffer_add_string(buf, "%Li");
              _fmtty = fmtty[0];
              continue ;
          case 6 : 
              buffer_add_string(buf, "%f");
              _fmtty = fmtty[0];
              continue ;
          case 7 : 
              buffer_add_string(buf, "%B");
              _fmtty = fmtty[0];
              continue ;
          case 8 : 
              buffer_add_string(buf, "%{");
              bprint_fmtty(buf, fmtty[0]);
              buffer_add_string(buf, "%}");
              _fmtty = fmtty[1];
              continue ;
          case 9 : 
              buffer_add_string(buf, "%(");
              bprint_fmtty(buf, fmtty[0]);
              buffer_add_string(buf, "%)");
              _fmtty = fmtty[2];
              continue ;
          case 10 : 
              buffer_add_string(buf, "%a");
              _fmtty = fmtty[0];
              continue ;
          case 11 : 
              buffer_add_string(buf, "%t");
              _fmtty = fmtty[0];
              continue ;
          case 12 : 
              buffer_add_string(buf, "%?");
              _fmtty = fmtty[0];
              continue ;
          case 13 : 
              buffer_add_string(buf, "%r");
              _fmtty = fmtty[0];
              continue ;
          case 14 : 
              buffer_add_string(buf, "%_r");
              _fmtty = fmtty[0];
              continue ;
          
        }
      }
    }}

  function symm(param) {
    if (typeof param === "number") {
      return /* End_of_fmtty */0;
    } else {
      switch (param.tag | 0) {
        case 0 : 
            return /* Char_ty */__(0, [symm(param[0])]);
        case 1 : 
            return /* String_ty */__(1, [symm(param[0])]);
        case 2 : 
            return /* Int_ty */__(2, [symm(param[0])]);
        case 3 : 
            return /* Int32_ty */__(3, [symm(param[0])]);
        case 4 : 
            return /* Nativeint_ty */__(4, [symm(param[0])]);
        case 5 : 
            return /* Int64_ty */__(5, [symm(param[0])]);
        case 6 : 
            return /* Float_ty */__(6, [symm(param[0])]);
        case 7 : 
            return /* Bool_ty */__(7, [symm(param[0])]);
        case 8 : 
            return /* Format_arg_ty */__(8, [
                      param[0],
                      symm(param[1])
                    ]);
        case 9 : 
            return /* Format_subst_ty */__(9, [
                      param[1],
                      param[0],
                      symm(param[2])
                    ]);
        case 10 : 
            return /* Alpha_ty */__(10, [symm(param[0])]);
        case 11 : 
            return /* Theta_ty */__(11, [symm(param[0])]);
        case 12 : 
            return /* Any_ty */__(12, [symm(param[0])]);
        case 13 : 
            return /* Reader_ty */__(13, [symm(param[0])]);
        case 14 : 
            return /* Ignored_reader_ty */__(14, [symm(param[0])]);
        
      }
    }
  }

  function fmtty_rel_det(param) {
    if (typeof param === "number") {
      return /* tuple */[
              (function () {
                  return /* Refl */0;
                }),
              (function () {
                  return /* Refl */0;
                }),
              (function () {
                  return /* Refl */0;
                }),
              (function () {
                  return /* Refl */0;
                })
            ];
    } else {
      switch (param.tag | 0) {
        case 0 : 
            var match = fmtty_rel_det(param[0]);
            var af = match[1];
            var fa = match[0];
            return /* tuple */[
                    (function () {
                        _1(fa, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match[2],
                    match[3]
                  ];
        case 1 : 
            var match$1 = fmtty_rel_det(param[0]);
            var af$1 = match$1[1];
            var fa$1 = match$1[0];
            return /* tuple */[
                    (function () {
                        _1(fa$1, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$1, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$1[2],
                    match$1[3]
                  ];
        case 2 : 
            var match$2 = fmtty_rel_det(param[0]);
            var af$2 = match$2[1];
            var fa$2 = match$2[0];
            return /* tuple */[
                    (function () {
                        _1(fa$2, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$2, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$2[2],
                    match$2[3]
                  ];
        case 3 : 
            var match$3 = fmtty_rel_det(param[0]);
            var af$3 = match$3[1];
            var fa$3 = match$3[0];
            return /* tuple */[
                    (function () {
                        _1(fa$3, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$3, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$3[2],
                    match$3[3]
                  ];
        case 4 : 
            var match$4 = fmtty_rel_det(param[0]);
            var af$4 = match$4[1];
            var fa$4 = match$4[0];
            return /* tuple */[
                    (function () {
                        _1(fa$4, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$4, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$4[2],
                    match$4[3]
                  ];
        case 5 : 
            var match$5 = fmtty_rel_det(param[0]);
            var af$5 = match$5[1];
            var fa$5 = match$5[0];
            return /* tuple */[
                    (function () {
                        _1(fa$5, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$5, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$5[2],
                    match$5[3]
                  ];
        case 6 : 
            var match$6 = fmtty_rel_det(param[0]);
            var af$6 = match$6[1];
            var fa$6 = match$6[0];
            return /* tuple */[
                    (function () {
                        _1(fa$6, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$6, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$6[2],
                    match$6[3]
                  ];
        case 7 : 
            var match$7 = fmtty_rel_det(param[0]);
            var af$7 = match$7[1];
            var fa$7 = match$7[0];
            return /* tuple */[
                    (function () {
                        _1(fa$7, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$7, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$7[2],
                    match$7[3]
                  ];
        case 8 : 
            var match$8 = fmtty_rel_det(param[1]);
            var af$8 = match$8[1];
            var fa$8 = match$8[0];
            return /* tuple */[
                    (function () {
                        _1(fa$8, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$8, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$8[2],
                    match$8[3]
                  ];
        case 9 : 
            var match$9 = fmtty_rel_det(param[2]);
            var de = match$9[3];
            var ed = match$9[2];
            var af$9 = match$9[1];
            var fa$9 = match$9[0];
            var ty = trans(symm(param[0]), param[1]);
            var match$10 = fmtty_rel_det(ty);
            var jd = match$10[3];
            var dj = match$10[2];
            var ga = match$10[1];
            var ag = match$10[0];
            return /* tuple */[
                    (function () {
                        _1(fa$9, /* Refl */0);
                        _1(ag, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(ga, /* Refl */0);
                        _1(af$9, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(ed, /* Refl */0);
                        _1(dj, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(jd, /* Refl */0);
                        _1(de, /* Refl */0);
                        return /* Refl */0;
                      })
                  ];
        case 10 : 
            var match$11 = fmtty_rel_det(param[0]);
            var af$10 = match$11[1];
            var fa$10 = match$11[0];
            return /* tuple */[
                    (function () {
                        _1(fa$10, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$10, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$11[2],
                    match$11[3]
                  ];
        case 11 : 
            var match$12 = fmtty_rel_det(param[0]);
            var af$11 = match$12[1];
            var fa$11 = match$12[0];
            return /* tuple */[
                    (function () {
                        _1(fa$11, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$11, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$12[2],
                    match$12[3]
                  ];
        case 12 : 
            var match$13 = fmtty_rel_det(param[0]);
            var af$12 = match$13[1];
            var fa$12 = match$13[0];
            return /* tuple */[
                    (function () {
                        _1(fa$12, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$12, /* Refl */0);
                        return /* Refl */0;
                      }),
                    match$13[2],
                    match$13[3]
                  ];
        case 13 : 
            var match$14 = fmtty_rel_det(param[0]);
            var de$1 = match$14[3];
            var ed$1 = match$14[2];
            var af$13 = match$14[1];
            var fa$13 = match$14[0];
            return /* tuple */[
                    (function () {
                        _1(fa$13, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$13, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(ed$1, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(de$1, /* Refl */0);
                        return /* Refl */0;
                      })
                  ];
        case 14 : 
            var match$15 = fmtty_rel_det(param[0]);
            var de$2 = match$15[3];
            var ed$2 = match$15[2];
            var af$14 = match$15[1];
            var fa$14 = match$15[0];
            return /* tuple */[
                    (function () {
                        _1(fa$14, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(af$14, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(ed$2, /* Refl */0);
                        return /* Refl */0;
                      }),
                    (function () {
                        _1(de$2, /* Refl */0);
                        return /* Refl */0;
                      })
                  ];
        
      }
    }
  }

  function trans(ty1, ty2) {
    var exit$$1 = 0;
    if (typeof ty1 === "number") {
      if (typeof ty2 === "number") {
        return /* End_of_fmtty */0;
      } else {
        switch (ty2.tag | 0) {
          case 8 : 
              exit$$1 = 6;
              break;
          case 9 : 
              exit$$1 = 7;
              break;
          case 10 : 
              exit$$1 = 1;
              break;
          case 11 : 
              exit$$1 = 2;
              break;
          case 12 : 
              exit$$1 = 3;
              break;
          case 13 : 
              exit$$1 = 4;
              break;
          case 14 : 
              exit$$1 = 5;
              break;
          default:
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    816,
                    23
                  ]
                ];
        }
      }
    } else {
      switch (ty1.tag | 0) {
        case 0 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 0 : 
                    return /* Char_ty */__(0, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 1 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 1 : 
                    return /* String_ty */__(1, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 2 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 2 : 
                    return /* Int_ty */__(2, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 3 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 3 : 
                    return /* Int32_ty */__(3, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 4 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 4 : 
                    return /* Nativeint_ty */__(4, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 5 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 5 : 
                    return /* Int64_ty */__(5, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 6 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 6 : 
                    return /* Float_ty */__(6, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 7 : 
            if (typeof ty2 === "number") {
              exit$$1 = 8;
            } else {
              switch (ty2.tag | 0) {
                case 7 : 
                    return /* Bool_ty */__(7, [trans(ty1[0], ty2[0])]);
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    exit$$1 = 7;
                    break;
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                
              }
            }
            break;
        case 8 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      802,
                      26
                    ]
                  ];
            } else {
              switch (ty2.tag | 0) {
                case 8 : 
                    return /* Format_arg_ty */__(8, [
                              trans(ty1[0], ty2[0]),
                              trans(ty1[1], ty2[1])
                            ]);
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                default:
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          802,
                          26
                        ]
                      ];
              }
            }
            break;
        case 9 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      812,
                      28
                    ]
                  ];
            } else {
              switch (ty2.tag | 0) {
                case 8 : 
                    exit$$1 = 6;
                    break;
                case 9 : 
                    var ty = trans(symm(ty1[1]), ty2[0]);
                    var match = fmtty_rel_det(ty);
                    _1(match[1], /* Refl */0);
                    _1(match[3], /* Refl */0);
                    return /* Format_subst_ty */__(9, [
                              ty1[0],
                              ty2[1],
                              trans(ty1[2], ty2[2])
                            ]);
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    exit$$1 = 5;
                    break;
                default:
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          812,
                          28
                        ]
                      ];
              }
            }
            break;
        case 10 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      780,
                      21
                    ]
                  ];
            } else if (ty2.tag === 10) {
              return /* Alpha_ty */__(10, [trans(ty1[0], ty2[0])]);
            } else {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      780,
                      21
                    ]
                  ];
            }
        case 11 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      784,
                      21
                    ]
                  ];
            } else {
              switch (ty2.tag | 0) {
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    return /* Theta_ty */__(11, [trans(ty1[0], ty2[0])]);
                default:
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          784,
                          21
                        ]
                      ];
              }
            }
            break;
        case 12 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      788,
                      19
                    ]
                  ];
            } else {
              switch (ty2.tag | 0) {
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    return /* Any_ty */__(12, [trans(ty1[0], ty2[0])]);
                default:
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          788,
                          19
                        ]
                      ];
              }
            }
            break;
        case 13 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      792,
                      22
                    ]
                  ];
            } else {
              switch (ty2.tag | 0) {
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    return /* Reader_ty */__(13, [trans(ty1[0], ty2[0])]);
                default:
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          792,
                          22
                        ]
                      ];
              }
            }
            break;
        case 14 : 
            if (typeof ty2 === "number") {
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      797,
                      30
                    ]
                  ];
            } else {
              switch (ty2.tag | 0) {
                case 10 : 
                    exit$$1 = 1;
                    break;
                case 11 : 
                    exit$$1 = 2;
                    break;
                case 12 : 
                    exit$$1 = 3;
                    break;
                case 13 : 
                    exit$$1 = 4;
                    break;
                case 14 : 
                    return /* Ignored_reader_ty */__(14, [trans(ty1[0], ty2[0])]);
                default:
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          797,
                          30
                        ]
                      ];
              }
            }
            break;
        
      }
    }
    switch (exit$$1) {
      case 1 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  781,
                  21
                ]
              ];
      case 2 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  785,
                  21
                ]
              ];
      case 3 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  789,
                  19
                ]
              ];
      case 4 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  793,
                  22
                ]
              ];
      case 5 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  798,
                  30
                ]
              ];
      case 6 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  803,
                  26
                ]
              ];
      case 7 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  813,
                  28
                ]
              ];
      case 8 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  817,
                  23
                ]
              ];
      
    }
  }

  function fmtty_of_formatting_gen(formatting_gen) {
    return fmtty_of_fmt(formatting_gen[0][0]);
  }

  function fmtty_of_fmt(_fmtty) {
    while(true) {
      var fmtty = _fmtty;
      var exit$$1 = 0;
      if (typeof fmtty === "number") {
        return /* End_of_fmtty */0;
      } else {
        switch (fmtty.tag | 0) {
          case 2 : 
          case 3 : 
              exit$$1 = 1;
              break;
          case 4 : 
              var ty_rest = fmtty_of_fmt(fmtty[3]);
              var prec_ty = fmtty_of_precision_fmtty(fmtty[2], /* Int_ty */__(2, [ty_rest]));
              return fmtty_of_padding_fmtty(fmtty[1], prec_ty);
          case 5 : 
              var ty_rest$1 = fmtty_of_fmt(fmtty[3]);
              var prec_ty$1 = fmtty_of_precision_fmtty(fmtty[2], /* Int32_ty */__(3, [ty_rest$1]));
              return fmtty_of_padding_fmtty(fmtty[1], prec_ty$1);
          case 6 : 
              var ty_rest$2 = fmtty_of_fmt(fmtty[3]);
              var prec_ty$2 = fmtty_of_precision_fmtty(fmtty[2], /* Nativeint_ty */__(4, [ty_rest$2]));
              return fmtty_of_padding_fmtty(fmtty[1], prec_ty$2);
          case 7 : 
              var ty_rest$3 = fmtty_of_fmt(fmtty[3]);
              var prec_ty$3 = fmtty_of_precision_fmtty(fmtty[2], /* Int64_ty */__(5, [ty_rest$3]));
              return fmtty_of_padding_fmtty(fmtty[1], prec_ty$3);
          case 8 : 
              var ty_rest$4 = fmtty_of_fmt(fmtty[3]);
              var prec_ty$4 = fmtty_of_precision_fmtty(fmtty[2], /* Float_ty */__(6, [ty_rest$4]));
              return fmtty_of_padding_fmtty(fmtty[1], prec_ty$4);
          case 9 : 
              return /* Bool_ty */__(7, [fmtty_of_fmt(fmtty[0])]);
          case 10 : 
              _fmtty = fmtty[0];
              continue ;
          case 13 : 
              return /* Format_arg_ty */__(8, [
                        fmtty[1],
                        fmtty_of_fmt(fmtty[2])
                      ]);
          case 14 : 
              var ty = fmtty[1];
              return /* Format_subst_ty */__(9, [
                        ty,
                        ty,
                        fmtty_of_fmt(fmtty[2])
                      ]);
          case 15 : 
              return /* Alpha_ty */__(10, [fmtty_of_fmt(fmtty[0])]);
          case 16 : 
              return /* Theta_ty */__(11, [fmtty_of_fmt(fmtty[0])]);
          case 18 : 
              return concat_fmtty(fmtty_of_formatting_gen(fmtty[0]), fmtty_of_fmt(fmtty[1]));
          case 19 : 
              return /* Reader_ty */__(13, [fmtty_of_fmt(fmtty[0])]);
          case 20 : 
              return /* String_ty */__(1, [fmtty_of_fmt(fmtty[2])]);
          case 21 : 
              return /* Int_ty */__(2, [fmtty_of_fmt(fmtty[1])]);
          case 0 : 
          case 1 : 
          case 22 : 
              return /* Char_ty */__(0, [fmtty_of_fmt(fmtty[0])]);
          case 23 : 
              var ign = fmtty[0];
              var fmt = fmtty[1];
              if (typeof ign === "number") {
                if (ign === 3) {
                  return /* Ignored_reader_ty */__(14, [fmtty_of_fmt(fmt)]);
                } else {
                  return fmtty_of_fmt(fmt);
                }
              } else if (ign.tag === 8) {
                return concat_fmtty(ign[1], fmtty_of_fmt(fmt));
              } else {
                return fmtty_of_fmt(fmt);
              }
          case 24 : 
              return fmtty_of_custom(fmtty[0], fmtty_of_fmt(fmtty[2]));
          default:
            _fmtty = fmtty[1];
            continue ;
        }
      }
      if (exit$$1 === 1) {
        return fmtty_of_padding_fmtty(fmtty[0], /* String_ty */__(1, [fmtty_of_fmt(fmtty[1])]));
      }
      
    }}

  function fmtty_of_custom(arity, fmtty) {
    if (arity) {
      return /* Any_ty */__(12, [fmtty_of_custom(arity[0], fmtty)]);
    } else {
      return fmtty;
    }
  }

  function fmtty_of_padding_fmtty(pad, fmtty) {
    if (typeof pad === "number" || !pad.tag) {
      return fmtty;
    } else {
      return /* Int_ty */__(2, [fmtty]);
    }
  }

  function fmtty_of_precision_fmtty(prec, fmtty) {
    if (typeof prec === "number" && prec !== 0) {
      return /* Int_ty */__(2, [fmtty]);
    } else {
      return fmtty;
    }
  }

  var Type_mismatch = create("CamlinternalFormat.Type_mismatch");

  function type_padding(pad, fmtty) {
    if (typeof pad === "number") {
      return /* Padding_fmtty_EBB */[
              /* No_padding */0,
              fmtty
            ];
    } else if (pad.tag) {
      if (typeof fmtty === "number") {
        throw Type_mismatch;
      } else if (fmtty.tag === 2) {
        return /* Padding_fmtty_EBB */[
                /* Arg_padding */__(1, [pad[0]]),
                fmtty[0]
              ];
      } else {
        throw Type_mismatch;
      }
    } else {
      return /* Padding_fmtty_EBB */[
              /* Lit_padding */__(0, [
                  pad[0],
                  pad[1]
                ]),
              fmtty
            ];
    }
  }

  function type_padprec(pad, prec, fmtty) {
    var match = type_padding(pad, fmtty);
    if (typeof prec === "number") {
      if (prec !== 0) {
        var match$1 = match[1];
        if (typeof match$1 === "number") {
          throw Type_mismatch;
        } else if (match$1.tag === 2) {
          return /* Padprec_fmtty_EBB */[
                  match[0],
                  /* Arg_precision */1,
                  match$1[0]
                ];
        } else {
          throw Type_mismatch;
        }
      } else {
        return /* Padprec_fmtty_EBB */[
                match[0],
                /* No_precision */0,
                match[1]
              ];
      }
    } else {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* Lit_precision */[prec[0]],
              match[1]
            ];
    }
  }

  function type_ignored_param_one(ign, fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    return /* Fmt_fmtty_EBB */[
            /* Ignored_param */__(23, [
                ign,
                match[0]
              ]),
            match[1]
          ];
  }

  function type_format_gen(fmt, fmtty) {
    if (typeof fmt === "number") {
      return /* Fmt_fmtty_EBB */[
              /* End_of_format */0,
              fmtty
            ];
    } else {
      switch (fmt.tag | 0) {
        case 0 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag) {
              throw Type_mismatch;
            } else {
              var match = type_format_gen(fmt[0], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Char */__(0, [match[0]]),
                      match[1]
                    ];
            }
        case 1 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag) {
              throw Type_mismatch;
            } else {
              var match$1 = type_format_gen(fmt[0], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Caml_char */__(1, [match$1[0]]),
                      match$1[1]
                    ];
            }
        case 2 : 
            var match$2 = type_padding(fmt[0], fmtty);
            var match$3 = match$2[1];
            if (typeof match$3 === "number") {
              throw Type_mismatch;
            } else if (match$3.tag === 1) {
              var match$4 = type_format_gen(fmt[1], match$3[0]);
              return /* Fmt_fmtty_EBB */[
                      /* String */__(2, [
                          match$2[0],
                          match$4[0]
                        ]),
                      match$4[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 3 : 
            var match$5 = type_padding(fmt[0], fmtty);
            var match$6 = match$5[1];
            if (typeof match$6 === "number") {
              throw Type_mismatch;
            } else if (match$6.tag === 1) {
              var match$7 = type_format_gen(fmt[1], match$6[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Caml_string */__(3, [
                          match$5[0],
                          match$7[0]
                        ]),
                      match$7[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 4 : 
            var match$8 = type_padprec(fmt[1], fmt[2], fmtty);
            var match$9 = match$8[2];
            if (typeof match$9 === "number") {
              throw Type_mismatch;
            } else if (match$9.tag === 2) {
              var match$10 = type_format_gen(fmt[3], match$9[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Int */__(4, [
                          fmt[0],
                          match$8[0],
                          match$8[1],
                          match$10[0]
                        ]),
                      match$10[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 5 : 
            var match$11 = type_padprec(fmt[1], fmt[2], fmtty);
            var match$12 = match$11[2];
            if (typeof match$12 === "number") {
              throw Type_mismatch;
            } else if (match$12.tag === 3) {
              var match$13 = type_format_gen(fmt[3], match$12[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Int32 */__(5, [
                          fmt[0],
                          match$11[0],
                          match$11[1],
                          match$13[0]
                        ]),
                      match$13[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 6 : 
            var match$14 = type_padprec(fmt[1], fmt[2], fmtty);
            var match$15 = match$14[2];
            if (typeof match$15 === "number") {
              throw Type_mismatch;
            } else if (match$15.tag === 4) {
              var match$16 = type_format_gen(fmt[3], match$15[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Nativeint */__(6, [
                          fmt[0],
                          match$14[0],
                          match$14[1],
                          match$16[0]
                        ]),
                      match$16[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 7 : 
            var match$17 = type_padprec(fmt[1], fmt[2], fmtty);
            var match$18 = match$17[2];
            if (typeof match$18 === "number") {
              throw Type_mismatch;
            } else if (match$18.tag === 5) {
              var match$19 = type_format_gen(fmt[3], match$18[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Int64 */__(7, [
                          fmt[0],
                          match$17[0],
                          match$17[1],
                          match$19[0]
                        ]),
                      match$19[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 8 : 
            var match$20 = type_padprec(fmt[1], fmt[2], fmtty);
            var match$21 = match$20[2];
            if (typeof match$21 === "number") {
              throw Type_mismatch;
            } else if (match$21.tag === 6) {
              var match$22 = type_format_gen(fmt[3], match$21[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Float */__(8, [
                          fmt[0],
                          match$20[0],
                          match$20[1],
                          match$22[0]
                        ]),
                      match$22[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 9 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 7) {
              var match$23 = type_format_gen(fmt[0], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Bool */__(9, [match$23[0]]),
                      match$23[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 10 : 
            var match$24 = type_format_gen(fmt[0], fmtty);
            return /* Fmt_fmtty_EBB */[
                    /* Flush */__(10, [match$24[0]]),
                    match$24[1]
                  ];
        case 11 : 
            var match$25 = type_format_gen(fmt[1], fmtty);
            return /* Fmt_fmtty_EBB */[
                    /* String_literal */__(11, [
                        fmt[0],
                        match$25[0]
                      ]),
                    match$25[1]
                  ];
        case 12 : 
            var match$26 = type_format_gen(fmt[1], fmtty);
            return /* Fmt_fmtty_EBB */[
                    /* Char_literal */__(12, [
                        fmt[0],
                        match$26[0]
                      ]),
                    match$26[1]
                  ];
        case 13 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 8) {
              var sub_fmtty$prime = fmtty[0];
              if (caml_notequal(/* Fmtty_EBB */[fmt[1]], /* Fmtty_EBB */[sub_fmtty$prime])) {
                throw Type_mismatch;
              }
              var match$27 = type_format_gen(fmt[2], fmtty[1]);
              return /* Fmt_fmtty_EBB */[
                      /* Format_arg */__(13, [
                          fmt[0],
                          sub_fmtty$prime,
                          match$27[0]
                        ]),
                      match$27[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 14 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 9) {
              var sub_fmtty1 = fmtty[0];
              if (caml_notequal(/* Fmtty_EBB */[erase_rel(fmt[1])], /* Fmtty_EBB */[erase_rel(sub_fmtty1)])) {
                throw Type_mismatch;
              }
              var match$28 = type_format_gen(fmt[2], erase_rel(fmtty[2]));
              return /* Fmt_fmtty_EBB */[
                      /* Format_subst */__(14, [
                          fmt[0],
                          sub_fmtty1,
                          match$28[0]
                        ]),
                      match$28[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 15 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 10) {
              var match$29 = type_format_gen(fmt[0], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Alpha */__(15, [match$29[0]]),
                      match$29[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 16 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 11) {
              var match$30 = type_format_gen(fmt[0], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Theta */__(16, [match$30[0]]),
                      match$30[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 17 : 
            var match$31 = type_format_gen(fmt[1], fmtty);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_lit */__(17, [
                        fmt[0],
                        match$31[0]
                      ]),
                    match$31[1]
                  ];
        case 18 : 
            var formatting_gen = fmt[0];
            var fmt0 = fmt[1];
            var fmtty0 = fmtty;
            if (formatting_gen.tag) {
              var match$32 = formatting_gen[0];
              var match$33 = type_format_gen(match$32[0], fmtty0);
              var match$34 = type_format_gen(fmt0, match$33[1]);
              return /* Fmt_fmtty_EBB */[
                      /* Formatting_gen */__(18, [
                          /* Open_box */__(1, [/* Format */[
                                match$33[0],
                                match$32[1]
                              ]]),
                          match$34[0]
                        ]),
                      match$34[1]
                    ];
            } else {
              var match$35 = formatting_gen[0];
              var match$36 = type_format_gen(match$35[0], fmtty0);
              var match$37 = type_format_gen(fmt0, match$36[1]);
              return /* Fmt_fmtty_EBB */[
                      /* Formatting_gen */__(18, [
                          /* Open_tag */__(0, [/* Format */[
                                match$36[0],
                                match$35[1]
                              ]]),
                          match$37[0]
                        ]),
                      match$37[1]
                    ];
            }
        case 19 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 13) {
              var match$38 = type_format_gen(fmt[0], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Reader */__(19, [match$38[0]]),
                      match$38[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 20 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 1) {
              var match$39 = type_format_gen(fmt[2], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Scan_char_set */__(20, [
                          fmt[0],
                          fmt[1],
                          match$39[0]
                        ]),
                      match$39[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 21 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 2) {
              var match$40 = type_format_gen(fmt[1], fmtty[0]);
              return /* Fmt_fmtty_EBB */[
                      /* Scan_get_counter */__(21, [
                          fmt[0],
                          match$40[0]
                        ]),
                      match$40[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 23 : 
            var ign = fmt[0];
            var fmt$1 = fmt[1];
            var fmtty$1 = fmtty;
            if (typeof ign === "number") {
              if (ign === 3) {
                if (typeof fmtty$1 === "number") {
                  throw Type_mismatch;
                } else if (fmtty$1.tag === 14) {
                  var match$41 = type_format_gen(fmt$1, fmtty$1[0]);
                  return /* Fmt_fmtty_EBB */[
                          /* Ignored_param */__(23, [
                              /* Ignored_reader */3,
                              match$41[0]
                            ]),
                          match$41[1]
                        ];
                } else {
                  throw Type_mismatch;
                }
              } else {
                return type_ignored_param_one(ign, fmt$1, fmtty$1);
              }
            } else {
              switch (ign.tag | 0) {
                case 7 : 
                    return type_ignored_param_one(/* Ignored_format_arg */__(7, [
                                  ign[0],
                                  ign[1]
                                ]), fmt$1, fmtty$1);
                case 8 : 
                    var match$42 = type_ignored_format_substitution(ign[1], fmt$1, fmtty$1);
                    var match$43 = match$42[1];
                    return /* Fmt_fmtty_EBB */[
                            /* Ignored_param */__(23, [
                                /* Ignored_format_subst */__(8, [
                                    ign[0],
                                    match$42[0]
                                  ]),
                                match$43[0]
                              ]),
                            match$43[1]
                          ];
                default:
                  return type_ignored_param_one(ign, fmt$1, fmtty$1);
              }
            }
        case 22 : 
        case 24 : 
            throw Type_mismatch;
        
      }
    }
  }

  function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
    if (typeof sub_fmtty === "number") {
      return /* Fmtty_fmt_EBB */[
              /* End_of_fmtty */0,
              type_format_gen(fmt, fmtty)
            ];
    } else {
      switch (sub_fmtty.tag | 0) {
        case 0 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag) {
              throw Type_mismatch;
            } else {
              var match = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Char_ty */__(0, [match[0]]),
                      match[1]
                    ];
            }
        case 1 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 1) {
              var match$1 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* String_ty */__(1, [match$1[0]]),
                      match$1[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 2 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 2) {
              var match$2 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Int_ty */__(2, [match$2[0]]),
                      match$2[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 3 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 3) {
              var match$3 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Int32_ty */__(3, [match$3[0]]),
                      match$3[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 4 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 4) {
              var match$4 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Nativeint_ty */__(4, [match$4[0]]),
                      match$4[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 5 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 5) {
              var match$5 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Int64_ty */__(5, [match$5[0]]),
                      match$5[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 6 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 6) {
              var match$6 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Float_ty */__(6, [match$6[0]]),
                      match$6[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 7 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 7) {
              var match$7 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Bool_ty */__(7, [match$7[0]]),
                      match$7[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 8 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 8) {
              var sub2_fmtty$prime = fmtty[0];
              if (caml_notequal(/* Fmtty_EBB */[sub_fmtty[0]], /* Fmtty_EBB */[sub2_fmtty$prime])) {
                throw Type_mismatch;
              }
              var match$8 = type_ignored_format_substitution(sub_fmtty[1], fmt, fmtty[1]);
              return /* Fmtty_fmt_EBB */[
                      /* Format_arg_ty */__(8, [
                          sub2_fmtty$prime,
                          match$8[0]
                        ]),
                      match$8[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 9 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 9) {
              var sub2_fmtty$prime$1 = fmtty[1];
              var sub1_fmtty$prime = fmtty[0];
              if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[0])], /* Fmtty_EBB */[erase_rel(sub1_fmtty$prime)])) {
                throw Type_mismatch;
              }
              if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[1])], /* Fmtty_EBB */[erase_rel(sub2_fmtty$prime$1)])) {
                throw Type_mismatch;
              }
              var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
              var match$9 = fmtty_rel_det(sub_fmtty$prime);
              _1(match$9[1], /* Refl */0);
              _1(match$9[3], /* Refl */0);
              var match$10 = type_ignored_format_substitution(erase_rel(sub_fmtty[2]), fmt, fmtty[2]);
              return /* Fmtty_fmt_EBB */[
                      /* Format_subst_ty */__(9, [
                          sub1_fmtty$prime,
                          sub2_fmtty$prime$1,
                          symm(match$10[0])
                        ]),
                      match$10[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 10 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 10) {
              var match$11 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Alpha_ty */__(10, [match$11[0]]),
                      match$11[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 11 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 11) {
              var match$12 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Theta_ty */__(11, [match$12[0]]),
                      match$12[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 12 : 
            throw Type_mismatch;
        case 13 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 13) {
              var match$13 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Reader_ty */__(13, [match$13[0]]),
                      match$13[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        case 14 : 
            if (typeof fmtty === "number") {
              throw Type_mismatch;
            } else if (fmtty.tag === 14) {
              var match$14 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
              return /* Fmtty_fmt_EBB */[
                      /* Ignored_reader_ty */__(14, [match$14[0]]),
                      match$14[1]
                    ];
            } else {
              throw Type_mismatch;
            }
        
      }
    }
  }

  function type_format(fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    if (typeof match[1] === "number") {
      return match[0];
    } else {
      throw Type_mismatch;
    }
  }

  function recast(fmt, fmtty) {
    return type_format(fmt, erase_rel(symm(fmtty)));
  }

  function fix_padding(padty, width, str) {
    var len = str.length;
    var width$1 = abs(width);
    var padty$1 = width < 0 ? /* Left */0 : padty;
    if (width$1 <= len) {
      return str;
    } else {
      var res = make(width$1, padty$1 === /* Zeros */2 ? /* "0" */48 : /* " " */32);
      switch (padty$1) {
        case 0 : 
            blit$1(str, 0, res, 0, len);
            break;
        case 1 : 
            blit$1(str, 0, res, width$1 - len | 0, len);
            break;
        case 2 : 
            if (len > 0 && (get(str, 0) === /* "+" */43 || get(str, 0) === /* "-" */45 || get(str, 0) === /* " " */32)) {
              res[0] = get(str, 0);
              blit$1(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
            } else if (len > 1 && get(str, 0) === /* "0" */48 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
              res[1] = get(str, 1);
              blit$1(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
            } else {
              blit$1(str, 0, res, width$1 - len | 0, len);
            }
            break;
        
      }
      return bytes_to_string(res);
    }
  }

  function fix_int_precision(prec, str) {
    var prec$1 = abs(prec);
    var len = str.length;
    var c = get(str, 0);
    var exit$$1 = 0;
    if (c >= 58) {
      if (c >= 71) {
        if (c > 102 || c < 97) {
          return str;
        } else {
          exit$$1 = 2;
        }
      } else if (c >= 65) {
        exit$$1 = 2;
      } else {
        return str;
      }
    } else if (c !== 32) {
      if (c >= 43) {
        switch (c - 43 | 0) {
          case 0 : 
          case 2 : 
              exit$$1 = 1;
              break;
          case 1 : 
          case 3 : 
          case 4 : 
              return str;
          case 5 : 
              if ((prec$1 + 2 | 0) > len && len > 1 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
                var res = make(prec$1 + 2 | 0, /* "0" */48);
                res[1] = get(str, 1);
                blit$1(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
                return bytes_to_string(res);
              } else {
                exit$$1 = 2;
              }
              break;
          case 6 : 
          case 7 : 
          case 8 : 
          case 9 : 
          case 10 : 
          case 11 : 
          case 12 : 
          case 13 : 
          case 14 : 
              exit$$1 = 2;
              break;
          
        }
      } else {
        return str;
      }
    } else {
      exit$$1 = 1;
    }
    switch (exit$$1) {
      case 1 : 
          if ((prec$1 + 1 | 0) > len) {
            var res$1 = make(prec$1 + 1 | 0, /* "0" */48);
            res$1[0] = c;
            blit$1(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
            return bytes_to_string(res$1);
          } else {
            return str;
          }
      case 2 : 
          if (prec$1 > len) {
            var res$2 = make(prec$1, /* "0" */48);
            blit$1(str, 0, res$2, prec$1 - len | 0, len);
            return bytes_to_string(res$2);
          } else {
            return str;
          }
      
    }
  }

  function string_to_caml_string(str) {
    return concat$2(escaped$2(str), /* :: */[
                "\"",
                /* :: */[
                  "\"",
                  /* [] */0
                ]
              ]);
  }

  function format_of_iconv(iconv) {
    switch (iconv) {
      case 0 : 
          return "%d";
      case 1 : 
          return "%+d";
      case 2 : 
          return "% d";
      case 3 : 
          return "%i";
      case 4 : 
          return "%+i";
      case 5 : 
          return "% i";
      case 6 : 
          return "%x";
      case 7 : 
          return "%#x";
      case 8 : 
          return "%X";
      case 9 : 
          return "%#X";
      case 10 : 
          return "%o";
      case 11 : 
          return "%#o";
      case 12 : 
          return "%u";
      
    }
  }

  function format_of_aconv(iconv, c) {
    var seps;
    switch (iconv) {
      case 0 : 
          seps = /* :: */[
            "%",
            /* :: */[
              "d",
              /* [] */0
            ]
          ];
          break;
      case 1 : 
          seps = /* :: */[
            "%+",
            /* :: */[
              "d",
              /* [] */0
            ]
          ];
          break;
      case 2 : 
          seps = /* :: */[
            "% ",
            /* :: */[
              "d",
              /* [] */0
            ]
          ];
          break;
      case 3 : 
          seps = /* :: */[
            "%",
            /* :: */[
              "i",
              /* [] */0
            ]
          ];
          break;
      case 4 : 
          seps = /* :: */[
            "%+",
            /* :: */[
              "i",
              /* [] */0
            ]
          ];
          break;
      case 5 : 
          seps = /* :: */[
            "% ",
            /* :: */[
              "i",
              /* [] */0
            ]
          ];
          break;
      case 6 : 
          seps = /* :: */[
            "%",
            /* :: */[
              "x",
              /* [] */0
            ]
          ];
          break;
      case 7 : 
          seps = /* :: */[
            "%#",
            /* :: */[
              "x",
              /* [] */0
            ]
          ];
          break;
      case 8 : 
          seps = /* :: */[
            "%",
            /* :: */[
              "X",
              /* [] */0
            ]
          ];
          break;
      case 9 : 
          seps = /* :: */[
            "%#",
            /* :: */[
              "X",
              /* [] */0
            ]
          ];
          break;
      case 10 : 
          seps = /* :: */[
            "%",
            /* :: */[
              "o",
              /* [] */0
            ]
          ];
          break;
      case 11 : 
          seps = /* :: */[
            "%#",
            /* :: */[
              "o",
              /* [] */0
            ]
          ];
          break;
      case 12 : 
          seps = /* :: */[
            "%",
            /* :: */[
              "u",
              /* [] */0
            ]
          ];
          break;
      
    }
    return concat$2(bytes_to_string(make(1, c)), seps);
  }

  function format_of_fconv(fconv, prec) {
    if (fconv === /* Float_F */15) {
      return "%.12g";
    } else {
      var prec$1 = abs(prec);
      var symb = char_of_fconv(fconv);
      var buf = /* record */[
        /* ind */0,
        /* bytes */caml_create_string(16)
      ];
      buffer_add_char(buf, /* "%" */37);
      bprint_fconv_flag(buf, fconv);
      buffer_add_char(buf, /* "." */46);
      buffer_add_string(buf, String(prec$1));
      buffer_add_char(buf, symb);
      return buffer_contents(buf);
    }
  }

  function convert_int(iconv, n) {
    return caml_format_int(format_of_iconv(iconv), n);
  }

  function convert_int32(iconv, n) {
    return caml_int32_format(format_of_aconv(iconv, /* "l" */108), n);
  }

  function convert_nativeint(iconv, n) {
    return caml_nativeint_format(format_of_aconv(iconv, /* "n" */110), n);
  }

  function convert_int64(iconv, n) {
    return caml_int64_format(format_of_aconv(iconv, /* "L" */76), n);
  }

  function convert_float(fconv, prec, x) {
    var prec$1 = abs(prec);
    var str = caml_format_float(format_of_fconv(fconv, prec$1), x);
    if (fconv !== /* Float_F */15) {
      return str;
    } else {
      var len = str.length;
      var is_valid = function (_i) {
        while(true) {
          var i = _i;
          if (i === len) {
            return /* boolean */0;
          } else {
            var match = get(str, i);
            var switcher = match - 46 | 0;
            if (switcher > 23 || switcher < 0) {
              if (switcher !== 55) {
                _i = i + 1 | 0;
                continue ;
              } else {
                return /* boolean */1;
              }
            } else if (switcher > 22 || switcher < 1) {
              return /* boolean */1;
            } else {
              _i = i + 1 | 0;
              continue ;
            }
          }
        }    };
      var match = caml_classify_float(x);
      if (match !== 3) {
        if (match >= 4) {
          return "nan";
        } else if (is_valid(0)) {
          return str;
        } else {
          return str + ".";
        }
      } else if (x < 0.0) {
        return "neg_infinity";
      } else {
        return "infinity";
      }
    }
  }

  function format_caml_char(c) {
    return concat$2(escaped(c), /* :: */[
                "'",
                /* :: */[
                  "'",
                  /* [] */0
                ]
              ]);
  }

  function string_of_fmtty(fmtty) {
    var buf = /* record */[
      /* ind */0,
      /* bytes */caml_create_string(16)
    ];
    bprint_fmtty(buf, fmtty);
    return buffer_contents(buf);
  }

  function make_printf(_k, o, _acc, _fmt) {
    while(true) {
      var fmt = _fmt;
      var acc = _acc;
      var k = _k;
      if (typeof fmt === "number") {
        return _2(k, o, acc);
      } else {
        switch (fmt.tag | 0) {
          case 0 : 
              var rest = fmt[0];
              return (function(k,acc,rest){
              return function (c) {
                var new_acc = /* Acc_data_char */__(5, [
                    acc,
                    c
                  ]);
                return make_printf(k, o, new_acc, rest);
              }
              }(k,acc,rest));
          case 1 : 
              var rest$1 = fmt[0];
              return (function(k,acc,rest$1){
              return function (c) {
                var new_acc_001 = format_caml_char(c);
                var new_acc = /* Acc_data_string */__(4, [
                    acc,
                    new_acc_001
                  ]);
                return make_printf(k, o, new_acc, rest$1);
              }
              }(k,acc,rest$1));
          case 2 : 
              return make_string_padding(k, o, acc, fmt[1], fmt[0], (function (str) {
                            return str;
                          }));
          case 3 : 
              return make_string_padding(k, o, acc, fmt[1], fmt[0], string_to_caml_string);
          case 4 : 
              return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int, fmt[0]);
          case 5 : 
              return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int32, fmt[0]);
          case 6 : 
              return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_nativeint, fmt[0]);
          case 7 : 
              return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int64, fmt[0]);
          case 8 : 
              var k$1 = k;
              var o$1 = o;
              var acc$1 = acc;
              var fmt$1 = fmt[3];
              var pad = fmt[1];
              var prec = fmt[2];
              var fconv = fmt[0];
              if (typeof pad === "number") {
                if (typeof prec === "number") {
                  if (prec !== 0) {
                    return (function(k$1,o$1,acc$1,fmt$1,fconv){
                    return function (p, x) {
                      var str = convert_float(fconv, p, x);
                      return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                    acc$1,
                                    str
                                  ]), fmt$1);
                    }
                    }(k$1,o$1,acc$1,fmt$1,fconv));
                  } else {
                    return (function(k$1,o$1,acc$1,fmt$1,fconv){
                    return function (x) {
                      var str = convert_float(fconv, 6, x);
                      return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                    acc$1,
                                    str
                                  ]), fmt$1);
                    }
                    }(k$1,o$1,acc$1,fmt$1,fconv));
                  }
                } else {
                  var p = prec[0];
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,p){
                  return function (x) {
                    var str = convert_float(fconv, p, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,p));
                }
              } else if (pad.tag) {
                var padty = pad[0];
                if (typeof prec === "number") {
                  if (prec !== 0) {
                    return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                    return function (w, p, x) {
                      var str = fix_padding(padty, w, convert_float(fconv, p, x));
                      return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                    acc$1,
                                    str
                                  ]), fmt$1);
                    }
                    }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                  } else {
                    return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                    return function (w, x) {
                      var str = convert_float(fconv, 6, x);
                      var str$prime = fix_padding(padty, w, str);
                      return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                    acc$1,
                                    str$prime
                                  ]), fmt$1);
                    }
                    }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                  }
                } else {
                  var p$1 = prec[0];
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1){
                  return function (w, x) {
                    var str = fix_padding(padty, w, convert_float(fconv, p$1, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1));
                }
              } else {
                var w = pad[1];
                var padty$1 = pad[0];
                if (typeof prec === "number") {
                  if (prec !== 0) {
                    return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                    return function (p, x) {
                      var str = fix_padding(padty$1, w, convert_float(fconv, p, x));
                      return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                    acc$1,
                                    str
                                  ]), fmt$1);
                    }
                    }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                  } else {
                    return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                    return function (x) {
                      var str = convert_float(fconv, 6, x);
                      var str$prime = fix_padding(padty$1, w, str);
                      return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                    acc$1,
                                    str$prime
                                  ]), fmt$1);
                    }
                    }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                  }
                } else {
                  var p$2 = prec[0];
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2){
                  return function (x) {
                    var str = fix_padding(padty$1, w, convert_float(fconv, p$2, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2));
                }
              }
          case 9 : 
              var rest$2 = fmt[0];
              return (function(k,acc,rest$2){
              return function (b) {
                return make_printf(k, o, /* Acc_data_string */__(4, [
                              acc,
                              b ? "true" : "false"
                            ]), rest$2);
              }
              }(k,acc,rest$2));
          case 10 : 
              _fmt = fmt[0];
              _acc = /* Acc_flush */__(7, [acc]);
              continue ;
          case 11 : 
              _fmt = fmt[1];
              _acc = /* Acc_string_literal */__(2, [
                  acc,
                  fmt[0]
                ]);
              continue ;
          case 12 : 
              _fmt = fmt[1];
              _acc = /* Acc_char_literal */__(3, [
                  acc,
                  fmt[0]
                ]);
              continue ;
          case 13 : 
              var rest$3 = fmt[2];
              var ty = string_of_fmtty(fmt[1]);
              return (function(k,acc,rest$3,ty){
              return function () {
                return make_printf(k, o, /* Acc_data_string */__(4, [
                              acc,
                              ty
                            ]), rest$3);
              }
              }(k,acc,rest$3,ty));
          case 14 : 
              var rest$4 = fmt[2];
              var fmtty = fmt[1];
              return (function(k,acc,fmtty,rest$4){
              return function (param) {
                return make_printf(k, o, acc, concat_fmt(recast(param[0], fmtty), rest$4));
              }
              }(k,acc,fmtty,rest$4));
          case 15 : 
              var rest$5 = fmt[0];
              return (function(k,acc,rest$5){
              return function (f, x) {
                return make_printf(k, o, /* Acc_delay */__(6, [
                              acc,
                              (function (o) {
                                  return _2(f, o, x);
                                })
                            ]), rest$5);
              }
              }(k,acc,rest$5));
          case 16 : 
              var rest$6 = fmt[0];
              return (function(k,acc,rest$6){
              return function (f) {
                return make_printf(k, o, /* Acc_delay */__(6, [
                              acc,
                              f
                            ]), rest$6);
              }
              }(k,acc,rest$6));
          case 17 : 
              _fmt = fmt[1];
              _acc = /* Acc_formatting_lit */__(0, [
                  acc,
                  fmt[0]
                ]);
              continue ;
          case 18 : 
              var match = fmt[0];
              if (match.tag) {
                var rest$7 = fmt[1];
                var k$prime = (function(k,acc,rest$7){
                return function k$prime(koc, kacc) {
                  return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                                acc,
                                /* Acc_open_box */__(1, [kacc])
                              ]), rest$7);
                }
                }(k,acc,rest$7));
                _fmt = match[0][0];
                _acc = /* End_of_acc */0;
                _k = k$prime;
                continue ;
              } else {
                var rest$8 = fmt[1];
                var k$prime$1 = (function(k,acc,rest$8){
                return function k$prime$1(koc, kacc) {
                  return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                                acc,
                                /* Acc_open_tag */__(0, [kacc])
                              ]), rest$8);
                }
                }(k,acc,rest$8));
                _fmt = match[0][0];
                _acc = /* End_of_acc */0;
                _k = k$prime$1;
                continue ;
              }
          case 19 : 
              throw [
                    assert_failure,
                    [
                      "camlinternalFormat.ml",
                      1449,
                      4
                    ]
                  ];
          case 20 : 
              var rest$9 = fmt[2];
              var new_acc = /* Acc_invalid_arg */__(8, [
                  acc,
                  "Printf: bad conversion %["
                ]);
              return (function(k,rest$9,new_acc){
              return function () {
                return make_printf(k, o, new_acc, rest$9);
              }
              }(k,rest$9,new_acc));
          case 21 : 
              var rest$10 = fmt[1];
              return (function(k,acc,rest$10){
              return function (n) {
                var new_acc_001 = caml_format_int("%u", n);
                var new_acc = /* Acc_data_string */__(4, [
                    acc,
                    new_acc_001
                  ]);
                return make_printf(k, o, new_acc, rest$10);
              }
              }(k,acc,rest$10));
          case 22 : 
              var rest$11 = fmt[0];
              return (function(k,acc,rest$11){
              return function (c) {
                var new_acc = /* Acc_data_char */__(5, [
                    acc,
                    c
                  ]);
                return make_printf(k, o, new_acc, rest$11);
              }
              }(k,acc,rest$11));
          case 23 : 
              var k$2 = k;
              var o$2 = o;
              var acc$2 = acc;
              var ign = fmt[0];
              var fmt$2 = fmt[1];
              if (typeof ign === "number") {
                if (ign === 3) {
                  throw [
                        assert_failure,
                        [
                          "camlinternalFormat.ml",
                          1517,
                          39
                        ]
                      ];
                } else {
                  return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
                }
              } else if (ign.tag === 8) {
                return make_from_fmtty(k$2, o$2, acc$2, ign[1], fmt$2);
              } else {
                return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
              }
          case 24 : 
              return make_custom(k, o, acc, fmt[2], fmt[0], _1(fmt[1], /* () */0));
          
        }
      }
    }}

  function make_from_fmtty(k, o, acc, fmtty, fmt) {
    if (typeof fmtty === "number") {
      return make_invalid_arg(k, o, acc, fmt);
    } else {
      switch (fmtty.tag | 0) {
        case 0 : 
            var rest = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest, fmt);
              });
        case 1 : 
            var rest$1 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$1, fmt);
              });
        case 2 : 
            var rest$2 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$2, fmt);
              });
        case 3 : 
            var rest$3 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$3, fmt);
              });
        case 4 : 
            var rest$4 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$4, fmt);
              });
        case 5 : 
            var rest$5 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$5, fmt);
              });
        case 6 : 
            var rest$6 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$6, fmt);
              });
        case 7 : 
            var rest$7 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$7, fmt);
              });
        case 8 : 
            var rest$8 = fmtty[1];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$8, fmt);
              });
        case 9 : 
            var rest$9 = fmtty[2];
            var ty = trans(symm(fmtty[0]), fmtty[1]);
            return (function () {
                return make_from_fmtty(k, o, acc, concat_fmtty(ty, rest$9), fmt);
              });
        case 10 : 
            var rest$10 = fmtty[0];
            return (function (_, _$1) {
                return make_from_fmtty(k, o, acc, rest$10, fmt);
              });
        case 11 : 
            var rest$11 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$11, fmt);
              });
        case 12 : 
            var rest$12 = fmtty[0];
            return (function () {
                return make_from_fmtty(k, o, acc, rest$12, fmt);
              });
        case 13 : 
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    1540,
                    31
                  ]
                ];
        case 14 : 
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    1541,
                    31
                  ]
                ];
        
      }
    }
  }

  function make_invalid_arg(k, o, acc, fmt) {
    return make_printf(k, o, /* Acc_invalid_arg */__(8, [
                  acc,
                  "Printf: bad conversion %_"
                ]), fmt);
  }

  function make_string_padding(k, o, acc, fmt, pad, trans) {
    if (typeof pad === "number") {
      return (function (x) {
          var new_acc_001 = _1(trans, x);
          var new_acc = /* Acc_data_string */__(4, [
              acc,
              new_acc_001
            ]);
          return make_printf(k, o, new_acc, fmt);
        });
    } else if (pad.tag) {
      var padty = pad[0];
      return (function (w, x) {
          var new_acc_001 = fix_padding(padty, w, _1(trans, x));
          var new_acc = /* Acc_data_string */__(4, [
              acc,
              new_acc_001
            ]);
          return make_printf(k, o, new_acc, fmt);
        });
    } else {
      var width = pad[1];
      var padty$1 = pad[0];
      return (function (x) {
          var new_acc_001 = fix_padding(padty$1, width, _1(trans, x));
          var new_acc = /* Acc_data_string */__(4, [
              acc,
              new_acc_001
            ]);
          return make_printf(k, o, new_acc, fmt);
        });
    }
  }

  function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans, iconv) {
    if (typeof pad === "number") {
      if (typeof prec === "number") {
        if (prec !== 0) {
          return (function (p, x) {
              var str = fix_int_precision(p, _2(trans, iconv, x));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        } else {
          return (function (x) {
              var str = _2(trans, iconv, x);
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        }
      } else {
        var p = prec[0];
        return (function (x) {
            var str = fix_int_precision(p, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else if (pad.tag) {
      var padty = pad[0];
      if (typeof prec === "number") {
        if (prec !== 0) {
          return (function (w, p, x) {
              var str = fix_padding(padty, w, fix_int_precision(p, _2(trans, iconv, x)));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        } else {
          return (function (w, x) {
              var str = fix_padding(padty, w, _2(trans, iconv, x));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        }
      } else {
        var p$1 = prec[0];
        return (function (w, x) {
            var str = fix_padding(padty, w, fix_int_precision(p$1, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var w = pad[1];
      var padty$1 = pad[0];
      if (typeof prec === "number") {
        if (prec !== 0) {
          return (function (p, x) {
              var str = fix_padding(padty$1, w, fix_int_precision(p, _2(trans, iconv, x)));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        } else {
          return (function (x) {
              var str = fix_padding(padty$1, w, _2(trans, iconv, x));
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            str
                          ]), fmt);
            });
        }
      } else {
        var p$2 = prec[0];
        return (function (x) {
            var str = fix_padding(padty$1, w, fix_int_precision(p$2, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    }
  }

  function make_custom(k, o, acc, rest, arity, f) {
    if (arity) {
      var arity$1 = arity[0];
      return (function (x) {
          return make_custom(k, o, acc, rest, arity$1, _1(f, x));
        });
    } else {
      return make_printf(k, o, /* Acc_data_string */__(4, [
                    acc,
                    f
                  ]), rest);
    }
  }

  function strput_acc(b, _acc) {
    while(true) {
      var acc = _acc;
      var exit$$1 = 0;
      if (typeof acc === "number") {
        return /* () */0;
      } else {
        switch (acc.tag | 0) {
          case 0 : 
              var s = string_of_formatting_lit(acc[1]);
              strput_acc(b, acc[0]);
              return add_string(b, s);
          case 1 : 
              var match = acc[1];
              var p = acc[0];
              strput_acc(b, p);
              if (match.tag) {
                add_string(b, "@[");
                _acc = match[0];
                continue ;
              } else {
                add_string(b, "@{");
                _acc = match[0];
                continue ;
              }
          case 2 : 
          case 4 : 
              exit$$1 = 1;
              break;
          case 3 : 
          case 5 : 
              exit$$1 = 2;
              break;
          case 6 : 
              strput_acc(b, acc[0]);
              return add_string(b, _1(acc[1], /* () */0));
          case 7 : 
              _acc = acc[0];
              continue ;
          case 8 : 
              strput_acc(b, acc[0]);
              throw [
                    invalid_argument,
                    acc[1]
                  ];
          
        }
      }
      switch (exit$$1) {
        case 1 : 
            strput_acc(b, acc[0]);
            return add_string(b, acc[1]);
        case 2 : 
            strput_acc(b, acc[0]);
            return add_char(b, acc[1]);
        
      }
    }}

  function failwith_message(param) {
    var buf = create$1(256);
    var k = function (_, acc) {
      strput_acc(buf, acc);
      var s = contents(buf);
      throw [
            failure,
            s
          ];
    };
    return make_printf(k, /* () */0, /* End_of_acc */0, param[0]);
  }

  function open_box_of_string(str) {
    if (str === "") {
      return /* tuple */[
              0,
              /* Pp_box */4
            ];
    } else {
      var len = str.length;
      var invalid_box = function () {
        return _1(failwith_message(/* Format */[
                        /* String_literal */__(11, [
                            "invalid box description ",
                            /* Caml_string */__(3, [
                                /* No_padding */0,
                                /* End_of_format */0
                              ])
                          ]),
                        "invalid box description %S"
                      ]), str);
      };
      var parse_spaces = function (_i) {
        while(true) {
          var i = _i;
          if (i === len) {
            return i;
          } else {
            var match = get(str, i);
            if (match !== 9) {
              if (match !== 32) {
                return i;
              } else {
                _i = i + 1 | 0;
                continue ;
              }
            } else {
              _i = i + 1 | 0;
              continue ;
            }
          }
        }    };
      var parse_lword = function (_, _j) {
        while(true) {
          var j = _j;
          if (j === len) {
            return j;
          } else {
            var match = get(str, j);
            if (match > 122 || match < 97) {
              return j;
            } else {
              _j = j + 1 | 0;
              continue ;
            }
          }
        }    };
      var parse_int = function (_, _j) {
        while(true) {
          var j = _j;
          if (j === len) {
            return j;
          } else {
            var match = get(str, j);
            if (match >= 48) {
              if (match >= 58) {
                return j;
              } else {
                _j = j + 1 | 0;
                continue ;
              }
            } else if (match !== 45) {
              return j;
            } else {
              _j = j + 1 | 0;
              continue ;
            }
          }
        }    };
      var wstart = parse_spaces(0);
      var wend = parse_lword(wstart, wstart);
      var box_name = sub$2(str, wstart, wend - wstart | 0);
      var nstart = parse_spaces(wend);
      var nend = parse_int(nstart, nstart);
      var indent;
      if (nstart === nend) {
        indent = 0;
      } else {
        try {
          indent = caml_int_of_string(sub$2(str, nstart, nend - nstart | 0));
        }
        catch (raw_exn){
          var exn = internalToOCamlException(raw_exn);
          if (exn[0] === failure) {
            indent = invalid_box(/* () */0);
          } else {
            throw exn;
          }
        }
      }
      var exp_end = parse_spaces(nend);
      if (exp_end !== len) {
        invalid_box(/* () */0);
      }
      var box_type;
      switch (box_name) {
        case "" : 
        case "b" : 
            box_type = /* Pp_box */4;
            break;
        case "h" : 
            box_type = /* Pp_hbox */0;
            break;
        case "hov" : 
            box_type = /* Pp_hovbox */3;
            break;
        case "hv" : 
            box_type = /* Pp_hvbox */2;
            break;
        case "v" : 
            box_type = /* Pp_vbox */1;
            break;
        default:
          box_type = invalid_box(/* () */0);
      }
      return /* tuple */[
              indent,
              box_type
            ];
    }
  }

  function make_padding_fmt_ebb(pad, fmt) {
    if (typeof pad === "number") {
      return /* Padding_fmt_EBB */[
              /* No_padding */0,
              fmt
            ];
    } else if (pad.tag) {
      return /* Padding_fmt_EBB */[
              /* Arg_padding */__(1, [pad[0]]),
              fmt
            ];
    } else {
      return /* Padding_fmt_EBB */[
              /* Lit_padding */__(0, [
                  pad[0],
                  pad[1]
                ]),
              fmt
            ];
    }
  }

  function make_precision_fmt_ebb(prec, fmt) {
    if (typeof prec === "number") {
      if (prec !== 0) {
        return /* Precision_fmt_EBB */[
                /* Arg_precision */1,
                fmt
              ];
      } else {
        return /* Precision_fmt_EBB */[
                /* No_precision */0,
                fmt
              ];
      }
    } else {
      return /* Precision_fmt_EBB */[
              /* Lit_precision */[prec[0]],
              fmt
            ];
    }
  }

  function make_padprec_fmt_ebb(pad, prec, fmt) {
    var match = make_precision_fmt_ebb(prec, fmt);
    var fmt$prime = match[1];
    var prec$1 = match[0];
    if (typeof pad === "number") {
      return /* Padprec_fmt_EBB */[
              /* No_padding */0,
              prec$1,
              fmt$prime
            ];
    } else if (pad.tag) {
      return /* Padprec_fmt_EBB */[
              /* Arg_padding */__(1, [pad[0]]),
              prec$1,
              fmt$prime
            ];
    } else {
      return /* Padprec_fmt_EBB */[
              /* Lit_padding */__(0, [
                  pad[0],
                  pad[1]
                ]),
              prec$1,
              fmt$prime
            ];
    }
  }

  function fmt_ebb_of_string(legacy_behavior, str) {
    var legacy_behavior$1 = legacy_behavior ? legacy_behavior[0] : /* boolean */1;
    var invalid_format_message = function (str_ind, msg) {
      return _3(failwith_message(/* Format */[
                      /* String_literal */__(11, [
                          "invalid format ",
                          /* Caml_string */__(3, [
                              /* No_padding */0,
                              /* String_literal */__(11, [
                                  ": at character number ",
                                  /* Int */__(4, [
                                      /* Int_d */0,
                                      /* No_padding */0,
                                      /* No_precision */0,
                                      /* String_literal */__(11, [
                                          ", ",
                                          /* String */__(2, [
                                              /* No_padding */0,
                                              /* End_of_format */0
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "invalid format %S: at character number %d, %s"
                    ]), str, str_ind, msg);
    };
    var invalid_format_without = function (str_ind, c, s) {
      return _4(failwith_message(/* Format */[
                      /* String_literal */__(11, [
                          "invalid format ",
                          /* Caml_string */__(3, [
                              /* No_padding */0,
                              /* String_literal */__(11, [
                                  ": at character number ",
                                  /* Int */__(4, [
                                      /* Int_d */0,
                                      /* No_padding */0,
                                      /* No_precision */0,
                                      /* String_literal */__(11, [
                                          ", '",
                                          /* Char */__(0, [/* String_literal */__(11, [
                                                  "' without ",
                                                  /* String */__(2, [
                                                      /* No_padding */0,
                                                      /* End_of_format */0
                                                    ])
                                                ])])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "invalid format %S: at character number %d, '%c' without %s"
                    ]), str, str_ind, c, s);
    };
    var expected_character = function (str_ind, expected, read) {
      return _4(failwith_message(/* Format */[
                      /* String_literal */__(11, [
                          "invalid format ",
                          /* Caml_string */__(3, [
                              /* No_padding */0,
                              /* String_literal */__(11, [
                                  ": at character number ",
                                  /* Int */__(4, [
                                      /* Int_d */0,
                                      /* No_padding */0,
                                      /* No_precision */0,
                                      /* String_literal */__(11, [
                                          ", ",
                                          /* String */__(2, [
                                              /* No_padding */0,
                                              /* String_literal */__(11, [
                                                  " expected, read ",
                                                  /* Caml_char */__(1, [/* End_of_format */0])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "invalid format %S: at character number %d, %s expected, read %C"
                    ]), str, str_ind, expected, read);
    };
    var compute_int_conv = function (pct_ind, str_ind, _plus, _sharp, _space, symb) {
      while(true) {
        var space = _space;
        var sharp = _sharp;
        var plus = _plus;
        var exit$$1 = 0;
        var exit$1 = 0;
        if (plus) {
          if (sharp) {
            exit$1 = 2;
          } else if (space) {
            exit$$1 = 1;
          } else if (symb !== 100) {
            if (symb !== 105) {
              exit$$1 = 1;
            } else {
              return /* Int_pi */4;
            }
          } else {
            return /* Int_pd */1;
          }
        } else if (sharp) {
          if (space) {
            exit$1 = 2;
          } else if (symb !== 88) {
            if (symb !== 111) {
              if (symb !== 120) {
                exit$1 = 2;
              } else {
                return /* Int_Cx */7;
              }
            } else {
              return /* Int_Co */11;
            }
          } else {
            return /* Int_CX */9;
          }
        } else if (space) {
          if (symb !== 100) {
            if (symb !== 105) {
              exit$$1 = 1;
            } else {
              return /* Int_si */5;
            }
          } else {
            return /* Int_sd */2;
          }
        } else {
          var switcher = symb - 88 | 0;
          if (switcher > 32 || switcher < 0) {
            exit$$1 = 1;
          } else {
            switch (switcher) {
              case 0 : 
                  return /* Int_X */8;
              case 12 : 
                  return /* Int_d */0;
              case 17 : 
                  return /* Int_i */3;
              case 23 : 
                  return /* Int_o */10;
              case 29 : 
                  return /* Int_u */12;
              case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 13 : 
              case 14 : 
              case 15 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit$$1 = 1;
                  break;
              case 32 : 
                  return /* Int_x */6;
              
            }
          }
        }
        if (exit$1 === 2) {
          var exit$2 = 0;
          var switcher$1 = symb - 88 | 0;
          if (switcher$1 > 32 || switcher$1 < 0) {
            exit$$1 = 1;
          } else {
            switch (switcher$1) {
              case 0 : 
                  if (legacy_behavior$1) {
                    return /* Int_CX */9;
                  } else {
                    exit$$1 = 1;
                  }
                  break;
              case 23 : 
                  if (legacy_behavior$1) {
                    return /* Int_Co */11;
                  } else {
                    exit$$1 = 1;
                  }
                  break;
              case 12 : 
              case 17 : 
              case 29 : 
                  exit$2 = 3;
                  break;
              case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 13 : 
              case 14 : 
              case 15 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit$$1 = 1;
                  break;
              case 32 : 
                  if (legacy_behavior$1) {
                    return /* Int_Cx */7;
                  } else {
                    exit$$1 = 1;
                  }
                  break;
              
            }
          }
          if (exit$2 === 3) {
            if (legacy_behavior$1) {
              _sharp = /* boolean */0;
              continue ;
            } else {
              return incompatible_flag(pct_ind, str_ind, symb, "'#'");
            }
          }
          
        }
        if (exit$$1 === 1) {
          if (plus) {
            if (space) {
              if (legacy_behavior$1) {
                _space = /* boolean */0;
                continue ;
              } else {
                return incompatible_flag(pct_ind, str_ind, /* " " */32, "'+'");
              }
            } else if (legacy_behavior$1) {
              _plus = /* boolean */0;
              continue ;
            } else {
              return incompatible_flag(pct_ind, str_ind, symb, "'+'");
            }
          } else if (space) {
            if (legacy_behavior$1) {
              _space = /* boolean */0;
              continue ;
            } else {
              return incompatible_flag(pct_ind, str_ind, symb, "' '");
            }
          } else {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    2719,
                    28
                  ]
                ];
          }
        }
        
      }  };
    var incompatible_flag = function (pct_ind, str_ind, symb, option) {
      var subfmt = sub$2(str, pct_ind, str_ind - pct_ind | 0);
      return _5(failwith_message(/* Format */[
                      /* String_literal */__(11, [
                          "invalid format ",
                          /* Caml_string */__(3, [
                              /* No_padding */0,
                              /* String_literal */__(11, [
                                  ": at character number ",
                                  /* Int */__(4, [
                                      /* Int_d */0,
                                      /* No_padding */0,
                                      /* No_precision */0,
                                      /* String_literal */__(11, [
                                          ", ",
                                          /* String */__(2, [
                                              /* No_padding */0,
                                              /* String_literal */__(11, [
                                                  " is incompatible with '",
                                                  /* Char */__(0, [/* String_literal */__(11, [
                                                          "' in sub-format ",
                                                          /* Caml_string */__(3, [
                                                              /* No_padding */0,
                                                              /* End_of_format */0
                                                            ])
                                                        ])])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "invalid format %S: at character number %d, %s is incompatible with '%c' in sub-format %S"
                    ]), str, pct_ind, option, symb, subfmt);
    };
    var parse_positive = function (_str_ind, end_ind, _acc) {
      while(true) {
        var acc = _acc;
        var str_ind = _str_ind;
        if (str_ind === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        var c = get(str, str_ind);
        if (c > 57 || c < 48) {
          return /* tuple */[
                  str_ind,
                  acc
                ];
        } else {
          var new_acc = imul(acc, 10) + (c - /* "0" */48 | 0) | 0;
          _acc = new_acc;
          _str_ind = str_ind + 1 | 0;
          continue ;
        }
      }  };
    var parse_after_precision = function (pct_ind, str_ind, end_ind, minus, plus, sharp, space, ign, pad, prec) {
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var parse_conv = function (padprec) {
        return parse_conversion(pct_ind, str_ind + 1 | 0, end_ind, plus, sharp, space, ign, pad, prec, padprec, get(str, str_ind));
      };
      if (typeof pad === "number") {
        var exit$$1 = 0;
        if (typeof prec === "number" && prec === 0) {
          return parse_conv(/* No_padding */0);
        } else {
          exit$$1 = 1;
        }
        if (exit$$1 === 1) {
          if (minus) {
            if (typeof prec === "number") {
              return parse_conv(/* Arg_padding */__(1, [/* Left */0]));
            } else {
              return parse_conv(/* Lit_padding */__(0, [
                            /* Left */0,
                            prec[0]
                          ]));
            }
          } else if (typeof prec === "number") {
            return parse_conv(/* Arg_padding */__(1, [/* Right */1]));
          } else {
            return parse_conv(/* Lit_padding */__(0, [
                          /* Right */1,
                          prec[0]
                        ]));
          }
        }
        
      } else {
        return parse_conv(pad);
      }
    };
    var parse_after_padding = function (pct_ind, str_ind, end_ind, minus, plus, sharp, space, ign, pad) {
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var symb = get(str, str_ind);
      if (symb !== 46) {
        return parse_conversion(pct_ind, str_ind + 1 | 0, end_ind, plus, sharp, space, ign, pad, /* No_precision */0, pad, symb);
      } else {
        var pct_ind$1 = pct_ind;
        var str_ind$1 = str_ind + 1 | 0;
        var end_ind$1 = end_ind;
        var minus$1 = minus;
        var plus$1 = plus;
        var sharp$1 = sharp;
        var space$1 = space;
        var ign$1 = ign;
        var pad$1 = pad;
        if (str_ind$1 === end_ind$1) {
          invalid_format_message(end_ind$1, "unexpected end of format");
        }
        var parse_literal = function (minus, str_ind) {
          var match = parse_positive(str_ind, end_ind$1, 0);
          return parse_after_precision(pct_ind$1, match[0], end_ind$1, minus, plus$1, sharp$1, space$1, ign$1, pad$1, /* Lit_precision */[match[1]]);
        };
        var symb$1 = get(str, str_ind$1);
        var exit$$1 = 0;
        var exit$1 = 0;
        if (symb$1 >= 48) {
          if (symb$1 >= 58) {
            exit$$1 = 1;
          } else {
            return parse_literal(minus$1, str_ind$1);
          }
        } else if (symb$1 >= 42) {
          switch (symb$1 - 42 | 0) {
            case 0 : 
                return parse_after_precision(pct_ind$1, str_ind$1 + 1 | 0, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, pad$1, /* Arg_precision */1);
            case 1 : 
            case 3 : 
                exit$1 = 2;
                break;
            case 2 : 
            case 4 : 
            case 5 : 
                exit$$1 = 1;
                break;
            
          }
        } else {
          exit$$1 = 1;
        }
        if (exit$1 === 2) {
          if (legacy_behavior$1) {
            return parse_literal(minus$1 || +(symb$1 === /* "-" */45), str_ind$1 + 1 | 0);
          } else {
            exit$$1 = 1;
          }
        }
        if (exit$$1 === 1) {
          if (legacy_behavior$1) {
            return parse_after_precision(pct_ind$1, str_ind$1, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, pad$1, /* Lit_precision */[0]);
          } else {
            return invalid_format_without(str_ind$1 - 1 | 0, /* "." */46, "precision");
          }
        }
        
      }
    };
    var parse_literal = function (lit_start, _str_ind, end_ind) {
      while(true) {
        var str_ind = _str_ind;
        if (str_ind === end_ind) {
          return add_literal(lit_start, str_ind, /* End_of_format */0);
        } else {
          var match = get(str, str_ind);
          if (match !== 37) {
            if (match !== 64) {
              _str_ind = str_ind + 1 | 0;
              continue ;
            } else {
              var match$1 = parse_after_at(str_ind + 1 | 0, end_ind);
              return add_literal(lit_start, str_ind, match$1[0]);
            }
          } else {
            var match$2 = parse_format(str_ind, end_ind);
            return add_literal(lit_start, str_ind, match$2[0]);
          }
        }
      }  };
    var parse_format = function (pct_ind, end_ind) {
      var pct_ind$1 = pct_ind;
      var str_ind = pct_ind + 1 | 0;
      var end_ind$1 = end_ind;
      if (str_ind === end_ind$1) {
        invalid_format_message(end_ind$1, "unexpected end of format");
      }
      var match = get(str, str_ind);
      if (match !== 95) {
        return parse_flags(pct_ind$1, str_ind, end_ind$1, /* boolean */0);
      } else {
        return parse_flags(pct_ind$1, str_ind + 1 | 0, end_ind$1, /* boolean */1);
      }
    };
    var parse_after_at = function (str_ind, end_ind) {
      if (str_ind === end_ind) {
        return /* Fmt_EBB */[/* Char_literal */__(12, [
                    /* "@" */64,
                    /* End_of_format */0
                  ])];
      } else {
        var c = get(str, str_ind);
        var exit$$1 = 0;
        if (c >= 65) {
          if (c >= 94) {
            var switcher = c - 123 | 0;
            if (switcher > 2 || switcher < 0) {
              exit$$1 = 1;
            } else {
              switch (switcher) {
                case 0 : 
                    return parse_tag(/* boolean */1, str_ind + 1 | 0, end_ind);
                case 1 : 
                    exit$$1 = 1;
                    break;
                case 2 : 
                    var beg_ind = str_ind + 1 | 0;
                    var match = parse_literal(beg_ind, beg_ind, end_ind);
                    return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                                /* Close_tag */1,
                                match[0]
                              ])];
                
              }
            }
          } else if (c >= 91) {
            switch (c - 91 | 0) {
              case 0 : 
                  return parse_tag(/* boolean */0, str_ind + 1 | 0, end_ind);
              case 1 : 
                  exit$$1 = 1;
                  break;
              case 2 : 
                  var beg_ind$1 = str_ind + 1 | 0;
                  var match$1 = parse_literal(beg_ind$1, beg_ind$1, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              /* Close_box */0,
                              match$1[0]
                            ])];
              
            }
          } else {
            exit$$1 = 1;
          }
        } else if (c !== 10) {
          if (c >= 32) {
            switch (c - 32 | 0) {
              case 0 : 
                  var beg_ind$2 = str_ind + 1 | 0;
                  var match$2 = parse_literal(beg_ind$2, beg_ind$2, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              /* Break */__(0, [
                                  "@ ",
                                  1,
                                  0
                                ]),
                              match$2[0]
                            ])];
              case 5 : 
                  if ((str_ind + 1 | 0) < end_ind && get(str, str_ind + 1 | 0) === /* "%" */37) {
                    var beg_ind$3 = str_ind + 2 | 0;
                    var match$3 = parse_literal(beg_ind$3, beg_ind$3, end_ind);
                    return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                                /* Escaped_percent */6,
                                match$3[0]
                              ])];
                  } else {
                    var match$4 = parse_literal(str_ind, str_ind, end_ind);
                    return /* Fmt_EBB */[/* Char_literal */__(12, [
                                /* "@" */64,
                                match$4[0]
                              ])];
                  }
              case 12 : 
                  var beg_ind$4 = str_ind + 1 | 0;
                  var match$5 = parse_literal(beg_ind$4, beg_ind$4, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              /* Break */__(0, [
                                  "@,",
                                  0,
                                  0
                                ]),
                              match$5[0]
                            ])];
              case 14 : 
                  var beg_ind$5 = str_ind + 1 | 0;
                  var match$6 = parse_literal(beg_ind$5, beg_ind$5, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              /* Flush_newline */4,
                              match$6[0]
                            ])];
              case 27 : 
                  var str_ind$1 = str_ind + 1 | 0;
                  var end_ind$1 = end_ind;
                  var match$7;
                  try {
                    if (str_ind$1 === end_ind$1 || get(str, str_ind$1) !== /* "<" */60) {
                      throw not_found;
                    }
                    var str_ind_1 = parse_spaces(str_ind$1 + 1 | 0, end_ind$1);
                    var match$8 = get(str, str_ind_1);
                    var exit$1 = 0;
                    if (match$8 >= 48) {
                      if (match$8 >= 58) {
                        throw not_found;
                      } else {
                        exit$1 = 1;
                      }
                    } else if (match$8 !== 45) {
                      throw not_found;
                    } else {
                      exit$1 = 1;
                    }
                    if (exit$1 === 1) {
                      var match$9 = parse_integer(str_ind_1, end_ind$1);
                      var width = match$9[1];
                      var str_ind_3 = parse_spaces(match$9[0], end_ind$1);
                      var match$10 = get(str, str_ind_3);
                      var switcher$1 = match$10 - 45 | 0;
                      if (switcher$1 > 12 || switcher$1 < 0) {
                        if (switcher$1 !== 17) {
                          throw not_found;
                        } else {
                          var s = sub$2(str, str_ind$1 - 2 | 0, (str_ind_3 - str_ind$1 | 0) + 3 | 0);
                          match$7 = /* tuple */[
                            str_ind_3 + 1 | 0,
                            /* Break */__(0, [
                                s,
                                width,
                                0
                              ])
                          ];
                        }
                      } else if (switcher$1 === 2 || switcher$1 === 1) {
                        throw not_found;
                      } else {
                        var match$11 = parse_integer(str_ind_3, end_ind$1);
                        var str_ind_5 = parse_spaces(match$11[0], end_ind$1);
                        if (get(str, str_ind_5) !== /* ">" */62) {
                          throw not_found;
                        }
                        var s$1 = sub$2(str, str_ind$1 - 2 | 0, (str_ind_5 - str_ind$1 | 0) + 3 | 0);
                        match$7 = /* tuple */[
                          str_ind_5 + 1 | 0,
                          /* Break */__(0, [
                              s$1,
                              width,
                              match$11[1]
                            ])
                        ];
                      }
                    }
                    
                  }
                  catch (raw_exn){
                    var exn = internalToOCamlException(raw_exn);
                    if (exn === not_found) {
                      match$7 = /* tuple */[
                        str_ind$1,
                        /* Break */__(0, [
                            "@;",
                            1,
                            0
                          ])
                      ];
                    } else if (exn[0] === failure) {
                      match$7 = /* tuple */[
                        str_ind$1,
                        /* Break */__(0, [
                            "@;",
                            1,
                            0
                          ])
                      ];
                    } else {
                      throw exn;
                    }
                  }
                  var next_ind = match$7[0];
                  var match$12 = parse_literal(next_ind, next_ind, end_ind$1);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              match$7[1],
                              match$12[0]
                            ])];
              case 28 : 
                  var str_ind$2 = str_ind + 1 | 0;
                  var end_ind$2 = end_ind;
                  var match$13;
                  try {
                    var str_ind_1$1 = parse_spaces(str_ind$2, end_ind$2);
                    var match$14 = get(str, str_ind_1$1);
                    var exit$2 = 0;
                    if (match$14 >= 48) {
                      if (match$14 >= 58) {
                        match$13 = /* None */0;
                      } else {
                        exit$2 = 1;
                      }
                    } else if (match$14 !== 45) {
                      match$13 = /* None */0;
                    } else {
                      exit$2 = 1;
                    }
                    if (exit$2 === 1) {
                      var match$15 = parse_integer(str_ind_1$1, end_ind$2);
                      var str_ind_3$1 = parse_spaces(match$15[0], end_ind$2);
                      if (get(str, str_ind_3$1) !== /* ">" */62) {
                        throw not_found;
                      }
                      var s$2 = sub$2(str, str_ind$2 - 2 | 0, (str_ind_3$1 - str_ind$2 | 0) + 3 | 0);
                      match$13 = /* Some */[/* tuple */[
                          str_ind_3$1 + 1 | 0,
                          /* Magic_size */__(1, [
                              s$2,
                              match$15[1]
                            ])
                        ]];
                    }
                    
                  }
                  catch (raw_exn$1){
                    var exn$1 = internalToOCamlException(raw_exn$1);
                    if (exn$1 === not_found || exn$1[0] === failure) {
                      match$13 = /* None */0;
                    } else {
                      throw exn$1;
                    }
                  }
                  if (match$13) {
                    var match$16 = match$13[0];
                    var next_ind$1 = match$16[0];
                    var match$17 = parse_literal(next_ind$1, next_ind$1, end_ind$2);
                    return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                                match$16[1],
                                match$17[0]
                              ])];
                  } else {
                    var match$18 = parse_literal(str_ind$2, str_ind$2, end_ind$2);
                    return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                                /* Scan_indic */__(2, [/* "<" */60]),
                                match$18[0]
                              ])];
                  }
              case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 13 : 
              case 15 : 
              case 16 : 
              case 17 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 23 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 29 : 
              case 30 : 
                  exit$$1 = 1;
                  break;
              case 31 : 
                  var beg_ind$6 = str_ind + 1 | 0;
                  var match$19 = parse_literal(beg_ind$6, beg_ind$6, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              /* FFlush */2,
                              match$19[0]
                            ])];
              case 32 : 
                  var beg_ind$7 = str_ind + 1 | 0;
                  var match$20 = parse_literal(beg_ind$7, beg_ind$7, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                              /* Escaped_at */5,
                              match$20[0]
                            ])];
              
            }
          } else {
            exit$$1 = 1;
          }
        } else {
          var beg_ind$8 = str_ind + 1 | 0;
          var match$21 = parse_literal(beg_ind$8, beg_ind$8, end_ind);
          return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                      /* Force_newline */3,
                      match$21[0]
                    ])];
        }
        if (exit$$1 === 1) {
          var beg_ind$9 = str_ind + 1 | 0;
          var match$22 = parse_literal(beg_ind$9, beg_ind$9, end_ind);
          return /* Fmt_EBB */[/* Formatting_lit */__(17, [
                      /* Scan_indic */__(2, [c]),
                      match$22[0]
                    ])];
        }
        
      }
    };
    var add_literal = function (lit_start, str_ind, fmt) {
      var size = str_ind - lit_start | 0;
      if (size !== 0) {
        if (size !== 1) {
          return /* Fmt_EBB */[/* String_literal */__(11, [
                      sub$2(str, lit_start, size),
                      fmt
                    ])];
        } else {
          return /* Fmt_EBB */[/* Char_literal */__(12, [
                      get(str, lit_start),
                      fmt
                    ])];
        }
      } else {
        return /* Fmt_EBB */[fmt];
      }
    };
    var parse_spaces = function (_str_ind, end_ind) {
      while(true) {
        var str_ind = _str_ind;
        if (str_ind === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        if (get(str, str_ind) === /* " " */32) {
          _str_ind = str_ind + 1 | 0;
          continue ;
        } else {
          return str_ind;
        }
      }  };
    var parse_integer = function (str_ind, end_ind) {
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var match = get(str, str_ind);
      if (match >= 48) {
        if (match >= 58) {
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  2624,
                  11
                ]
              ];
        } else {
          return parse_positive(str_ind, end_ind, 0);
        }
      } else if (match !== 45) {
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                2624,
                11
              ]
            ];
      } else {
        if ((str_ind + 1 | 0) === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        var c = get(str, str_ind + 1 | 0);
        if (c > 57 || c < 48) {
          return expected_character(str_ind + 1 | 0, "digit", c);
        } else {
          var match$1 = parse_positive(str_ind + 1 | 0, end_ind, 0);
          return /* tuple */[
                  match$1[0],
                  -match$1[1] | 0
                ];
        }
      }
    };
    var compute_float_conv = function (pct_ind, str_ind, _plus, _space, symb) {
      while(true) {
        var space = _space;
        var plus = _plus;
        if (plus) {
          if (space) {
            if (legacy_behavior$1) {
              _space = /* boolean */0;
              continue ;
            } else {
              return incompatible_flag(pct_ind, str_ind, /* " " */32, "'+'");
            }
          } else {
            var exit$$1 = 0;
            if (symb >= 72) {
              var switcher = symb - 101 | 0;
              if (switcher > 2 || switcher < 0) {
                exit$$1 = 1;
              } else {
                switch (switcher) {
                  case 0 : 
                      return /* Float_pe */4;
                  case 1 : 
                      return /* Float_pf */1;
                  case 2 : 
                      return /* Float_pg */10;
                  
                }
              }
            } else if (symb >= 69) {
              switch (symb - 69 | 0) {
                case 0 : 
                    return /* Float_pE */7;
                case 1 : 
                    exit$$1 = 1;
                    break;
                case 2 : 
                    return /* Float_pG */13;
                
              }
            } else {
              exit$$1 = 1;
            }
            if (exit$$1 === 1) {
              if (legacy_behavior$1) {
                _plus = /* boolean */0;
                continue ;
              } else {
                return incompatible_flag(pct_ind, str_ind, symb, "'+'");
              }
            }
            
          }
        } else if (space) {
          var exit$1 = 0;
          if (symb >= 72) {
            var switcher$1 = symb - 101 | 0;
            if (switcher$1 > 2 || switcher$1 < 0) {
              exit$1 = 1;
            } else {
              switch (switcher$1) {
                case 0 : 
                    return /* Float_se */5;
                case 1 : 
                    return /* Float_sf */2;
                case 2 : 
                    return /* Float_sg */11;
                
              }
            }
          } else if (symb >= 69) {
            switch (symb - 69 | 0) {
              case 0 : 
                  return /* Float_sE */8;
              case 1 : 
                  exit$1 = 1;
                  break;
              case 2 : 
                  return /* Float_sG */14;
              
            }
          } else {
            exit$1 = 1;
          }
          if (exit$1 === 1) {
            if (legacy_behavior$1) {
              _space = /* boolean */0;
              continue ;
            } else {
              return incompatible_flag(pct_ind, str_ind, symb, "' '");
            }
          }
          
        } else if (symb >= 72) {
          var switcher$2 = symb - 101 | 0;
          if (switcher$2 > 2 || switcher$2 < 0) {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    2747,
                    25
                  ]
                ];
          } else {
            switch (switcher$2) {
              case 0 : 
                  return /* Float_e */3;
              case 1 : 
                  return /* Float_f */0;
              case 2 : 
                  return /* Float_g */9;
              
            }
          }
        } else if (symb >= 69) {
          switch (symb - 69 | 0) {
            case 0 : 
                return /* Float_E */6;
            case 1 : 
                return /* Float_F */15;
            case 2 : 
                return /* Float_G */12;
            
          }
        } else {
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  2747,
                  25
                ]
              ];
        }
      }  };
    var search_subformat_end = function (_str_ind, end_ind, c) {
      while(true) {
        var str_ind = _str_ind;
        if (str_ind === end_ind) {
          _3(failwith_message(/* Format */[
                    /* String_literal */__(11, [
                        "invalid format ",
                        /* Caml_string */__(3, [
                            /* No_padding */0,
                            /* String_literal */__(11, [
                                ": unclosed sub-format, expected \"",
                                /* Char_literal */__(12, [
                                    /* "%" */37,
                                    /* Char */__(0, [/* String_literal */__(11, [
                                            "\" at character number ",
                                            /* Int */__(4, [
                                                /* Int_d */0,
                                                /* No_padding */0,
                                                /* No_precision */0,
                                                /* End_of_format */0
                                              ])
                                          ])])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: unclosed sub-format, expected \"%%%c\" at character number %d"
                  ]), str, c, end_ind);
        }
        var match = get(str, str_ind);
        if (match !== 37) {
          _str_ind = str_ind + 1 | 0;
          continue ;
        } else {
          if ((str_ind + 1 | 0) === end_ind) {
            invalid_format_message(end_ind, "unexpected end of format");
          }
          if (get(str, str_ind + 1 | 0) === c) {
            return str_ind;
          } else {
            var match$1 = get(str, str_ind + 1 | 0);
            var exit$$1 = 0;
            if (match$1 >= 95) {
              if (match$1 >= 123) {
                if (match$1 >= 126) {
                  exit$$1 = 1;
                } else {
                  switch (match$1 - 123 | 0) {
                    case 0 : 
                        var sub_end = search_subformat_end(str_ind + 2 | 0, end_ind, /* "}" */125);
                        _str_ind = sub_end + 2 | 0;
                        continue ;
                    case 1 : 
                        exit$$1 = 1;
                        break;
                    case 2 : 
                        return expected_character(str_ind + 1 | 0, "character ')'", /* "}" */125);
                    
                  }
                }
              } else if (match$1 >= 96) {
                exit$$1 = 1;
              } else {
                if ((str_ind + 2 | 0) === end_ind) {
                  invalid_format_message(end_ind, "unexpected end of format");
                }
                var match$2 = get(str, str_ind + 2 | 0);
                if (match$2 !== 40) {
                  if (match$2 !== 123) {
                    _str_ind = str_ind + 3 | 0;
                    continue ;
                  } else {
                    var sub_end$1 = search_subformat_end(str_ind + 3 | 0, end_ind, /* "}" */125);
                    _str_ind = sub_end$1 + 2 | 0;
                    continue ;
                  }
                } else {
                  var sub_end$2 = search_subformat_end(str_ind + 3 | 0, end_ind, /* ")" */41);
                  _str_ind = sub_end$2 + 2 | 0;
                  continue ;
                }
              }
            } else if (match$1 !== 40) {
              if (match$1 !== 41) {
                exit$$1 = 1;
              } else {
                return expected_character(str_ind + 1 | 0, "character '}'", /* ")" */41);
              }
            } else {
              var sub_end$3 = search_subformat_end(str_ind + 2 | 0, end_ind, /* ")" */41);
              _str_ind = sub_end$3 + 2 | 0;
              continue ;
            }
            if (exit$$1 === 1) {
              _str_ind = str_ind + 2 | 0;
              continue ;
            }
            
          }
        }
      }  };
    var parse_conversion = function (pct_ind, str_ind, end_ind, plus, sharp, space, ign, pad, prec, padprec, symb) {
      var plus_used = /* boolean */0;
      var sharp_used = /* boolean */0;
      var space_used = /* boolean */0;
      var ign_used = [/* boolean */0];
      var pad_used = /* boolean */0;
      var prec_used = [/* boolean */0];
      var check_no_0 = function (symb, pad) {
        if (typeof pad === "number") {
          return pad;
        } else if (pad.tag) {
          if (pad[0] >= 2) {
            if (legacy_behavior$1) {
              return /* Arg_padding */__(1, [/* Right */1]);
            } else {
              return incompatible_flag(pct_ind, str_ind, symb, "0");
            }
          } else {
            return pad;
          }
        } else if (pad[0] >= 2) {
          if (legacy_behavior$1) {
            return /* Lit_padding */__(0, [
                      /* Right */1,
                      pad[1]
                    ]);
          } else {
            return incompatible_flag(pct_ind, str_ind, symb, "0");
          }
        } else {
          return pad;
        }
      };
      var opt_of_pad = function (c, pad) {
        if (typeof pad === "number") {
          return /* None */0;
        } else if (pad.tag) {
          return incompatible_flag(pct_ind, str_ind, c, "'*'");
        } else {
          switch (pad[0]) {
            case 0 : 
                if (legacy_behavior$1) {
                  return /* Some */[pad[1]];
                } else {
                  return incompatible_flag(pct_ind, str_ind, c, "'-'");
                }
            case 1 : 
                return /* Some */[pad[1]];
            case 2 : 
                if (legacy_behavior$1) {
                  return /* Some */[pad[1]];
                } else {
                  return incompatible_flag(pct_ind, str_ind, c, "'0'");
                }
            
          }
        }
      };
      var get_prec_opt = function () {
        prec_used[0] = /* boolean */1;
        if (typeof prec === "number") {
          if (prec !== 0) {
            return incompatible_flag(pct_ind, str_ind, /* "_" */95, "'*'");
          } else {
            return /* None */0;
          }
        } else {
          return /* Some */[prec[0]];
        }
      };
      var fmt_result;
      var exit$$1 = 0;
      var exit$1 = 0;
      var exit$2 = 0;
      if (symb >= 124) {
        exit$1 = 6;
      } else {
        switch (symb) {
          case 33 : 
              var match = parse_literal(str_ind, str_ind, end_ind);
              fmt_result = /* Fmt_EBB */[/* Flush */__(10, [match[0]])];
              break;
          case 40 : 
              var sub_end = search_subformat_end(str_ind, end_ind, /* ")" */41);
              var beg_ind = sub_end + 2 | 0;
              var match$1 = parse_literal(beg_ind, beg_ind, end_ind);
              var fmt_rest = match$1[0];
              var match$2 = parse_literal(str_ind, str_ind, sub_end);
              var sub_fmtty = fmtty_of_fmt(match$2[0]);
              if (ign_used[0] = /* boolean */1, ign) {
                pad_used = /* boolean */1;
                var ignored_000 = opt_of_pad(/* "_" */95, pad);
                var ignored = /* Ignored_format_subst */__(8, [
                    ignored_000,
                    sub_fmtty
                  ]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored,
                      fmt_rest
                    ])];
              } else {
                pad_used = /* boolean */1;
                fmt_result = /* Fmt_EBB */[/* Format_subst */__(14, [
                      opt_of_pad(/* "(" */40, pad),
                      sub_fmtty,
                      fmt_rest
                    ])];
              }
              break;
          case 44 : 
              fmt_result = parse_literal(str_ind, str_ind, end_ind);
              break;
          case 37 : 
          case 64 : 
              exit$1 = 4;
              break;
          case 67 : 
              var match$3 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$1 = match$3[0];
              fmt_result = (ign_used[0] = /* boolean */1, ign) ? /* Fmt_EBB */[/* Ignored_param */__(23, [
                      /* Ignored_caml_char */1,
                      fmt_rest$1
                    ])] : /* Fmt_EBB */[/* Caml_char */__(1, [fmt_rest$1])];
              break;
          case 78 : 
              var match$4 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$2 = match$4[0];
              if (ign_used[0] = /* boolean */1, ign) {
                var ignored$1 = /* Ignored_scan_get_counter */__(10, [/* Token_counter */2]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$1,
                      fmt_rest$2
                    ])];
              } else {
                fmt_result = /* Fmt_EBB */[/* Scan_get_counter */__(21, [
                      /* Token_counter */2,
                      fmt_rest$2
                    ])];
              }
              break;
          case 83 : 
              pad_used = /* boolean */1;
              var pad$1 = check_no_0(symb, padprec);
              var match$5 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$3 = match$5[0];
              if (ign_used[0] = /* boolean */1, ign) {
                pad_used = /* boolean */1;
                var ignored$2 = /* Ignored_caml_string */__(1, [opt_of_pad(/* "_" */95, padprec)]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$2,
                      fmt_rest$3
                    ])];
              } else {
                var match$6 = make_padding_fmt_ebb(pad$1, fmt_rest$3);
                fmt_result = /* Fmt_EBB */[/* Caml_string */__(3, [
                      match$6[0],
                      match$6[1]
                    ])];
              }
              break;
          case 91 : 
              var match$7 = parse_char_set(str_ind, end_ind);
              var char_set = match$7[1];
              var next_ind = match$7[0];
              var match$8 = parse_literal(next_ind, next_ind, end_ind);
              var fmt_rest$4 = match$8[0];
              if (ign_used[0] = /* boolean */1, ign) {
                pad_used = /* boolean */1;
                var ignored_000$1 = opt_of_pad(/* "_" */95, pad);
                var ignored$3 = /* Ignored_scan_char_set */__(9, [
                    ignored_000$1,
                    char_set
                  ]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$3,
                      fmt_rest$4
                    ])];
              } else {
                pad_used = /* boolean */1;
                fmt_result = /* Fmt_EBB */[/* Scan_char_set */__(20, [
                      opt_of_pad(/* "[" */91, pad),
                      char_set,
                      fmt_rest$4
                    ])];
              }
              break;
          case 32 : 
          case 35 : 
          case 43 : 
          case 45 : 
          case 95 : 
              exit$1 = 5;
              break;
          case 97 : 
              var match$9 = parse_literal(str_ind, str_ind, end_ind);
              fmt_result = /* Fmt_EBB */[/* Alpha */__(15, [match$9[0]])];
              break;
          case 66 : 
          case 98 : 
              exit$1 = 3;
              break;
          case 99 : 
              var char_format = function (fmt_rest) {
                if (ign_used[0] = /* boolean */1, ign) {
                  return /* Fmt_EBB */[/* Ignored_param */__(23, [
                              /* Ignored_char */0,
                              fmt_rest
                            ])];
                } else {
                  return /* Fmt_EBB */[/* Char */__(0, [fmt_rest])];
                }
              };
              var scan_format = function (fmt_rest) {
                if (ign_used[0] = /* boolean */1, ign) {
                  return /* Fmt_EBB */[/* Ignored_param */__(23, [
                              /* Ignored_scan_next_char */4,
                              fmt_rest
                            ])];
                } else {
                  return /* Fmt_EBB */[/* Scan_next_char */__(22, [fmt_rest])];
                }
              };
              var match$10 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$5 = match$10[0];
              pad_used = /* boolean */1;
              var match$11 = opt_of_pad(/* "c" */99, pad);
              fmt_result = match$11 ? (
                  match$11[0] !== 0 ? (
                      legacy_behavior$1 ? char_format(fmt_rest$5) : invalid_format_message(str_ind, "non-zero widths are unsupported for %c conversions")
                    ) : scan_format(fmt_rest$5)
                ) : char_format(fmt_rest$5);
              break;
          case 69 : 
          case 70 : 
          case 71 : 
          case 101 : 
          case 102 : 
          case 103 : 
              exit$1 = 2;
              break;
          case 76 : 
          case 108 : 
          case 110 : 
              exit$2 = 8;
              break;
          case 114 : 
              var match$12 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$6 = match$12[0];
              fmt_result = (ign_used[0] = /* boolean */1, ign) ? /* Fmt_EBB */[/* Ignored_param */__(23, [
                      /* Ignored_reader */3,
                      fmt_rest$6
                    ])] : /* Fmt_EBB */[/* Reader */__(19, [fmt_rest$6])];
              break;
          case 115 : 
              pad_used = /* boolean */1;
              var pad$2 = check_no_0(symb, padprec);
              var match$13 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$7 = match$13[0];
              if (ign_used[0] = /* boolean */1, ign) {
                pad_used = /* boolean */1;
                var ignored$4 = /* Ignored_string */__(0, [opt_of_pad(/* "_" */95, padprec)]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$4,
                      fmt_rest$7
                    ])];
              } else {
                var match$14 = make_padding_fmt_ebb(pad$2, fmt_rest$7);
                fmt_result = /* Fmt_EBB */[/* String */__(2, [
                      match$14[0],
                      match$14[1]
                    ])];
              }
              break;
          case 116 : 
              var match$15 = parse_literal(str_ind, str_ind, end_ind);
              fmt_result = /* Fmt_EBB */[/* Theta */__(16, [match$15[0]])];
              break;
          case 88 : 
          case 100 : 
          case 105 : 
          case 111 : 
          case 117 : 
          case 120 : 
              exit$2 = 7;
              break;
          case 0 : 
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 8 : 
          case 9 : 
          case 10 : 
          case 11 : 
          case 12 : 
          case 13 : 
          case 14 : 
          case 15 : 
          case 16 : 
          case 17 : 
          case 18 : 
          case 19 : 
          case 20 : 
          case 21 : 
          case 22 : 
          case 23 : 
          case 24 : 
          case 25 : 
          case 26 : 
          case 27 : 
          case 28 : 
          case 29 : 
          case 30 : 
          case 31 : 
          case 34 : 
          case 36 : 
          case 38 : 
          case 39 : 
          case 41 : 
          case 42 : 
          case 46 : 
          case 47 : 
          case 48 : 
          case 49 : 
          case 50 : 
          case 51 : 
          case 52 : 
          case 53 : 
          case 54 : 
          case 55 : 
          case 56 : 
          case 57 : 
          case 58 : 
          case 59 : 
          case 60 : 
          case 61 : 
          case 62 : 
          case 63 : 
          case 65 : 
          case 68 : 
          case 72 : 
          case 73 : 
          case 74 : 
          case 75 : 
          case 77 : 
          case 79 : 
          case 80 : 
          case 81 : 
          case 82 : 
          case 84 : 
          case 85 : 
          case 86 : 
          case 87 : 
          case 89 : 
          case 90 : 
          case 92 : 
          case 93 : 
          case 94 : 
          case 96 : 
          case 104 : 
          case 106 : 
          case 107 : 
          case 109 : 
          case 112 : 
          case 113 : 
          case 118 : 
          case 119 : 
          case 121 : 
          case 122 : 
              exit$1 = 6;
              break;
          case 123 : 
              var sub_end$1 = search_subformat_end(str_ind, end_ind, /* "}" */125);
              var match$16 = parse_literal(str_ind, str_ind, sub_end$1);
              var beg_ind$1 = sub_end$1 + 2 | 0;
              var match$17 = parse_literal(beg_ind$1, beg_ind$1, end_ind);
              var fmt_rest$8 = match$17[0];
              var sub_fmtty$1 = fmtty_of_fmt(match$16[0]);
              if (ign_used[0] = /* boolean */1, ign) {
                pad_used = /* boolean */1;
                var ignored_000$2 = opt_of_pad(/* "_" */95, pad);
                var ignored$5 = /* Ignored_format_arg */__(7, [
                    ignored_000$2,
                    sub_fmtty$1
                  ]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$5,
                      fmt_rest$8
                    ])];
              } else {
                pad_used = /* boolean */1;
                fmt_result = /* Fmt_EBB */[/* Format_arg */__(13, [
                      opt_of_pad(/* "{" */123, pad),
                      sub_fmtty$1,
                      fmt_rest$8
                    ])];
              }
              break;
          
        }
      }
      switch (exit$2) {
        case 7 : 
            plus_used = /* boolean */1;
            sharp_used = /* boolean */1;
            space_used = /* boolean */1;
            var iconv = compute_int_conv(pct_ind, str_ind, plus, sharp, space, symb);
            var match$18 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$9 = match$18[0];
            if (ign_used[0] = /* boolean */1, ign) {
              pad_used = /* boolean */1;
              var ignored_001 = opt_of_pad(/* "_" */95, pad);
              var ignored$6 = /* Ignored_int */__(2, [
                  iconv,
                  ignored_001
                ]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                    ignored$6,
                    fmt_rest$9
                  ])];
            } else {
              pad_used = /* boolean */1;
              prec_used[0] = /* boolean */1;
              var pad$3;
              var exit$3 = 0;
              if (typeof prec === "number" && prec === 0) {
                pad$3 = pad;
              } else {
                exit$3 = 9;
              }
              if (exit$3 === 9) {
                pad$3 = typeof pad === "number" ? /* No_padding */0 : (
                    pad.tag ? (
                        pad[0] >= 2 ? (
                            legacy_behavior$1 ? /* Arg_padding */__(1, [/* Right */1]) : incompatible_flag(pct_ind, str_ind, /* "0" */48, "precision")
                          ) : pad
                      ) : (
                        pad[0] >= 2 ? (
                            legacy_behavior$1 ? /* Lit_padding */__(0, [
                                  /* Right */1,
                                  pad[1]
                                ]) : incompatible_flag(pct_ind, str_ind, /* "0" */48, "precision")
                          ) : pad
                      )
                  );
              }
              var match$19 = make_padprec_fmt_ebb(pad$3, (prec_used[0] = /* boolean */1, prec), fmt_rest$9);
              fmt_result = /* Fmt_EBB */[/* Int */__(4, [
                    iconv,
                    match$19[0],
                    match$19[1],
                    match$19[2]
                  ])];
            }
            break;
        case 8 : 
            if (str_ind === end_ind || !is_int_base(get(str, str_ind))) {
              var match$20 = parse_literal(str_ind, str_ind, end_ind);
              var fmt_rest$10 = match$20[0];
              var counter = counter_of_char(symb);
              if (ign_used[0] = /* boolean */1, ign) {
                var ignored$7 = /* Ignored_scan_get_counter */__(10, [counter]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$7,
                      fmt_rest$10
                    ])];
              } else {
                fmt_result = /* Fmt_EBB */[/* Scan_get_counter */__(21, [
                      counter,
                      fmt_rest$10
                    ])];
              }
            } else {
              exit$1 = 6;
            }
            break;
        
      }
      switch (exit$1) {
        case 2 : 
            plus_used = /* boolean */1;
            space_used = /* boolean */1;
            var fconv = compute_float_conv(pct_ind, str_ind, plus, space, symb);
            var match$21 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$11 = match$21[0];
            if (ign_used[0] = /* boolean */1, ign) {
              pad_used = /* boolean */1;
              var ignored_000$3 = opt_of_pad(/* "_" */95, pad);
              var ignored_001$1 = get_prec_opt(/* () */0);
              var ignored$8 = /* Ignored_float */__(6, [
                  ignored_000$3,
                  ignored_001$1
                ]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                    ignored$8,
                    fmt_rest$11
                  ])];
            } else {
              pad_used = /* boolean */1;
              var match$22 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* boolean */1, prec), fmt_rest$11);
              fmt_result = /* Fmt_EBB */[/* Float */__(8, [
                    fconv,
                    match$22[0],
                    match$22[1],
                    match$22[2]
                  ])];
            }
            break;
        case 3 : 
            var match$23 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$12 = match$23[0];
            fmt_result = (ign_used[0] = /* boolean */1, ign) ? /* Fmt_EBB */[/* Ignored_param */__(23, [
                    /* Ignored_bool */2,
                    fmt_rest$12
                  ])] : /* Fmt_EBB */[/* Bool */__(9, [fmt_rest$12])];
            break;
        case 4 : 
            var match$24 = parse_literal(str_ind, str_ind, end_ind);
            fmt_result = /* Fmt_EBB */[/* Char_literal */__(12, [
                  symb,
                  match$24[0]
                ])];
            break;
        case 5 : 
            fmt_result = _3(failwith_message(/* Format */[
                      /* String_literal */__(11, [
                          "invalid format ",
                          /* Caml_string */__(3, [
                              /* No_padding */0,
                              /* String_literal */__(11, [
                                  ": at character number ",
                                  /* Int */__(4, [
                                      /* Int_d */0,
                                      /* No_padding */0,
                                      /* No_precision */0,
                                      /* String_literal */__(11, [
                                          ", flag ",
                                          /* Caml_char */__(1, [/* String_literal */__(11, [
                                                  " is only allowed after the '",
                                                  /* Char_literal */__(12, [
                                                      /* "%" */37,
                                                      /* String_literal */__(11, [
                                                          "', before padding and precision",
                                                          /* End_of_format */0
                                                        ])
                                                    ])
                                                ])])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "invalid format %S: at character number %d, flag %C is only allowed after the '%%', before padding and precision"
                    ]), str, pct_ind, symb);
            break;
        case 6 : 
            if (symb >= 108) {
              if (symb >= 111) {
                exit$$1 = 1;
              } else {
                switch (symb - 108 | 0) {
                  case 0 : 
                      plus_used = /* boolean */1;
                      sharp_used = /* boolean */1;
                      space_used = /* boolean */1;
                      var iconv$1 = compute_int_conv(pct_ind, str_ind + 1 | 0, plus, sharp, space, get(str, str_ind));
                      var beg_ind$2 = str_ind + 1 | 0;
                      var match$25 = parse_literal(beg_ind$2, beg_ind$2, end_ind);
                      var fmt_rest$13 = match$25[0];
                      if (ign_used[0] = /* boolean */1, ign) {
                        pad_used = /* boolean */1;
                        var ignored_001$2 = opt_of_pad(/* "_" */95, pad);
                        var ignored$9 = /* Ignored_int32 */__(3, [
                            iconv$1,
                            ignored_001$2
                          ]);
                        fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                              ignored$9,
                              fmt_rest$13
                            ])];
                      } else {
                        pad_used = /* boolean */1;
                        var match$26 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* boolean */1, prec), fmt_rest$13);
                        fmt_result = /* Fmt_EBB */[/* Int32 */__(5, [
                              iconv$1,
                              match$26[0],
                              match$26[1],
                              match$26[2]
                            ])];
                      }
                      break;
                  case 1 : 
                      exit$$1 = 1;
                      break;
                  case 2 : 
                      plus_used = /* boolean */1;
                      sharp_used = /* boolean */1;
                      space_used = /* boolean */1;
                      var iconv$2 = compute_int_conv(pct_ind, str_ind + 1 | 0, plus, sharp, space, get(str, str_ind));
                      var beg_ind$3 = str_ind + 1 | 0;
                      var match$27 = parse_literal(beg_ind$3, beg_ind$3, end_ind);
                      var fmt_rest$14 = match$27[0];
                      if (ign_used[0] = /* boolean */1, ign) {
                        pad_used = /* boolean */1;
                        var ignored_001$3 = opt_of_pad(/* "_" */95, pad);
                        var ignored$10 = /* Ignored_nativeint */__(4, [
                            iconv$2,
                            ignored_001$3
                          ]);
                        fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                              ignored$10,
                              fmt_rest$14
                            ])];
                      } else {
                        pad_used = /* boolean */1;
                        var match$28 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* boolean */1, prec), fmt_rest$14);
                        fmt_result = /* Fmt_EBB */[/* Nativeint */__(6, [
                              iconv$2,
                              match$28[0],
                              match$28[1],
                              match$28[2]
                            ])];
                      }
                      break;
                  
                }
              }
            } else if (symb !== 76) {
              exit$$1 = 1;
            } else {
              plus_used = /* boolean */1;
              sharp_used = /* boolean */1;
              space_used = /* boolean */1;
              var iconv$3 = compute_int_conv(pct_ind, str_ind + 1 | 0, plus, sharp, space, get(str, str_ind));
              var beg_ind$4 = str_ind + 1 | 0;
              var match$29 = parse_literal(beg_ind$4, beg_ind$4, end_ind);
              var fmt_rest$15 = match$29[0];
              if (ign_used[0] = /* boolean */1, ign) {
                pad_used = /* boolean */1;
                var ignored_001$4 = opt_of_pad(/* "_" */95, pad);
                var ignored$11 = /* Ignored_int64 */__(5, [
                    iconv$3,
                    ignored_001$4
                  ]);
                fmt_result = /* Fmt_EBB */[/* Ignored_param */__(23, [
                      ignored$11,
                      fmt_rest$15
                    ])];
              } else {
                pad_used = /* boolean */1;
                var match$30 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* boolean */1, prec), fmt_rest$15);
                fmt_result = /* Fmt_EBB */[/* Int64 */__(7, [
                      iconv$3,
                      match$30[0],
                      match$30[1],
                      match$30[2]
                    ])];
              }
            }
            break;
        
      }
      if (exit$$1 === 1) {
        fmt_result = _3(failwith_message(/* Format */[
                  /* String_literal */__(11, [
                      "invalid format ",
                      /* Caml_string */__(3, [
                          /* No_padding */0,
                          /* String_literal */__(11, [
                              ": at character number ",
                              /* Int */__(4, [
                                  /* Int_d */0,
                                  /* No_padding */0,
                                  /* No_precision */0,
                                  /* String_literal */__(11, [
                                      ", invalid conversion \"",
                                      /* Char_literal */__(12, [
                                          /* "%" */37,
                                          /* Char */__(0, [/* Char_literal */__(12, [
                                                  /* "\"" */34,
                                                  /* End_of_format */0
                                                ])])
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "invalid format %S: at character number %d, invalid conversion \"%%%c\""
                ]), str, str_ind - 1 | 0, symb);
      }
      if (!legacy_behavior$1) {
        if (!plus_used && plus) {
          incompatible_flag(pct_ind, str_ind, symb, "'+'");
        }
        if (!sharp_used && sharp) {
          incompatible_flag(pct_ind, str_ind, symb, "'#'");
        }
        if (!space_used && space) {
          incompatible_flag(pct_ind, str_ind, symb, "' '");
        }
        if (!pad_used && caml_notequal(/* Padding_EBB */[pad], /* Padding_EBB */[/* No_padding */0])) {
          incompatible_flag(pct_ind, str_ind, symb, "`padding'");
        }
        if (!prec_used[0] && caml_notequal(/* Precision_EBB */[prec], /* Precision_EBB */[/* No_precision */0])) {
          incompatible_flag(pct_ind, str_ind, ign ? /* "_" */95 : symb, "`precision'");
        }
        if (ign && plus) {
          incompatible_flag(pct_ind, str_ind, /* "_" */95, "'+'");
        }
        
      }
      if (!ign_used[0] && ign) {
        var exit$4 = 0;
        if (symb >= 38) {
          if (symb !== 44) {
            if (symb !== 64) {
              exit$4 = 1;
            } else if (!legacy_behavior$1) {
              exit$4 = 1;
            }
            
          } else if (!legacy_behavior$1) {
            exit$4 = 1;
          }
          
        } else if (symb !== 33) {
          if (symb >= 37) {
            if (!legacy_behavior$1) {
              exit$4 = 1;
            }
            
          } else {
            exit$4 = 1;
          }
        } else if (!legacy_behavior$1) {
          exit$4 = 1;
        }
        if (exit$4 === 1) {
          incompatible_flag(pct_ind, str_ind, symb, "'_'");
        }
        
      }
      return fmt_result;
    };
    var parse_flags = function (pct_ind, str_ind, end_ind, ign) {
      var zero = [/* boolean */0];
      var minus = [/* boolean */0];
      var plus = [/* boolean */0];
      var space = [/* boolean */0];
      var sharp = [/* boolean */0];
      var set_flag = function (str_ind, flag) {
        if (flag[0] && !legacy_behavior$1) {
          _3(failwith_message(/* Format */[
                    /* String_literal */__(11, [
                        "invalid format ",
                        /* Caml_string */__(3, [
                            /* No_padding */0,
                            /* String_literal */__(11, [
                                ": at character number ",
                                /* Int */__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* String_literal */__(11, [
                                        ", duplicate flag ",
                                        /* Caml_char */__(1, [/* End_of_format */0])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: at character number %d, duplicate flag %C"
                  ]), str, str_ind, get(str, str_ind));
        }
        flag[0] = /* boolean */1;
        return /* () */0;
      };
      var _str_ind = str_ind;
      while(true) {
        var str_ind$1 = _str_ind;
        if (str_ind$1 === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        var match = get(str, str_ind$1);
        var exit$$1 = 0;
        var switcher = match - 32 | 0;
        if (switcher > 16 || switcher < 0) {
          exit$$1 = 1;
        } else {
          switch (switcher) {
            case 0 : 
                set_flag(str_ind$1, space);
                _str_ind = str_ind$1 + 1 | 0;
                continue ;
            case 3 : 
                set_flag(str_ind$1, sharp);
                _str_ind = str_ind$1 + 1 | 0;
                continue ;
            case 11 : 
                set_flag(str_ind$1, plus);
                _str_ind = str_ind$1 + 1 | 0;
                continue ;
            case 13 : 
                set_flag(str_ind$1, minus);
                _str_ind = str_ind$1 + 1 | 0;
                continue ;
            case 1 : 
            case 2 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 12 : 
            case 14 : 
            case 15 : 
                exit$$1 = 1;
                break;
            case 16 : 
                set_flag(str_ind$1, zero);
                _str_ind = str_ind$1 + 1 | 0;
                continue ;
            
          }
        }
        if (exit$$1 === 1) {
          var pct_ind$1 = pct_ind;
          var str_ind$2 = str_ind$1;
          var end_ind$1 = end_ind;
          var zero$1 = zero[0];
          var minus$1 = minus[0];
          var plus$1 = plus[0];
          var sharp$1 = sharp[0];
          var space$1 = space[0];
          var ign$1 = ign;
          if (str_ind$2 === end_ind$1) {
            invalid_format_message(end_ind$1, "unexpected end of format");
          }
          var padty = zero$1 ? (
              minus$1 ? (
                  legacy_behavior$1 ? /* Left */0 : incompatible_flag(pct_ind$1, str_ind$2, /* "-" */45, "0")
                ) : /* Zeros */2
            ) : (
              minus$1 ? /* Left */0 : /* Right */1
            );
          var match$1 = get(str, str_ind$2);
          var exit$1 = 0;
          if (match$1 >= 48) {
            if (match$1 >= 58) {
              exit$1 = 1;
            } else {
              var match$2 = parse_positive(str_ind$2, end_ind$1, 0);
              return parse_after_padding(pct_ind$1, match$2[0], end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* Lit_padding */__(0, [
                            padty,
                            match$2[1]
                          ]));
            }
          } else if (match$1 !== 42) {
            exit$1 = 1;
          } else {
            return parse_after_padding(pct_ind$1, str_ind$2 + 1 | 0, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* Arg_padding */__(1, [padty]));
          }
          if (exit$1 === 1) {
            switch (padty) {
              case 0 : 
                  if (!legacy_behavior$1) {
                    invalid_format_without(str_ind$2 - 1 | 0, /* "-" */45, "padding");
                  }
                  return parse_after_padding(pct_ind$1, str_ind$2, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* No_padding */0);
              case 1 : 
                  return parse_after_padding(pct_ind$1, str_ind$2, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* No_padding */0);
              case 2 : 
                  return parse_after_padding(pct_ind$1, str_ind$2, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* Lit_padding */__(0, [
                                /* Right */1,
                                0
                              ]));
              
            }
          }
          
        }
        
      }  };
    var is_int_base = function (symb) {
      var switcher = symb - 88 | 0;
      if (switcher > 32 || switcher < 0) {
        return /* boolean */0;
      } else {
        switch (switcher) {
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 8 : 
          case 9 : 
          case 10 : 
          case 11 : 
          case 13 : 
          case 14 : 
          case 15 : 
          case 16 : 
          case 18 : 
          case 19 : 
          case 20 : 
          case 21 : 
          case 22 : 
          case 24 : 
          case 25 : 
          case 26 : 
          case 27 : 
          case 28 : 
          case 30 : 
          case 31 : 
              return /* boolean */0;
          case 0 : 
          case 12 : 
          case 17 : 
          case 23 : 
          case 29 : 
          case 32 : 
              return /* boolean */1;
          
        }
      }
    };
    var counter_of_char = function (symb) {
      var exit$$1 = 0;
      if (symb >= 108) {
        if (symb >= 111) {
          exit$$1 = 1;
        } else {
          switch (symb - 108 | 0) {
            case 0 : 
                return /* Line_counter */0;
            case 1 : 
                exit$$1 = 1;
                break;
            case 2 : 
                return /* Char_counter */1;
            
          }
        }
      } else if (symb !== 76) {
        exit$$1 = 1;
      } else {
        return /* Token_counter */2;
      }
      if (exit$$1 === 1) {
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                2686,
                34
              ]
            ];
      }
      
    };
    var parse_char_set = function (str_ind, end_ind) {
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var char_set = make(32, /* "\000" */0);
      var add_range = function (c, c$prime) {
        for(var i = c; i <= c$prime; ++i){
          add_in_char_set(char_set, char_of_int(i));
        }
        return /* () */0;
      };
      var fail_single_percent = function (str_ind) {
        return _2(failwith_message(/* Format */[
                        /* String_literal */__(11, [
                            "invalid format ",
                            /* Caml_string */__(3, [
                                /* No_padding */0,
                                /* String_literal */__(11, [
                                    ": '",
                                    /* Char_literal */__(12, [
                                        /* "%" */37,
                                        /* String_literal */__(11, [
                                            "' alone is not accepted in character sets, use ",
                                            /* Char_literal */__(12, [
                                                /* "%" */37,
                                                /* Char_literal */__(12, [
                                                    /* "%" */37,
                                                    /* String_literal */__(11, [
                                                        " instead at position ",
                                                        /* Int */__(4, [
                                                            /* Int_d */0,
                                                            /* No_padding */0,
                                                            /* No_precision */0,
                                                            /* Char_literal */__(12, [
                                                                /* "." */46,
                                                                /* End_of_format */0
                                                              ])
                                                          ])
                                                      ])
                                                  ])
                                              ])
                                          ])
                                      ])
                                  ])
                              ])
                          ]),
                        "invalid format %S: '%%' alone is not accepted in character sets, use %%%% instead at position %d."
                      ]), str, str_ind);
      };
      var parse_char_set_after_char = function (_str_ind, end_ind, _c) {
        while(true) {
          var c = _c;
          var str_ind = _str_ind;
          if (str_ind === end_ind) {
            invalid_format_message(end_ind, "unexpected end of format");
          }
          var c$prime = get(str, str_ind);
          var exit$$1 = 0;
          var exit$1 = 0;
          if (c$prime >= 46) {
            if (c$prime !== 64) {
              if (c$prime !== 93) {
                exit$$1 = 1;
              } else {
                add_in_char_set(char_set, c);
                return str_ind + 1 | 0;
              }
            } else {
              exit$1 = 2;
            }
          } else if (c$prime !== 37) {
            if (c$prime >= 45) {
              var str_ind$1 = str_ind + 1 | 0;
              var end_ind$1 = end_ind;
              var c$1 = c;
              if (str_ind$1 === end_ind$1) {
                invalid_format_message(end_ind$1, "unexpected end of format");
              }
              var c$prime$1 = get(str, str_ind$1);
              if (c$prime$1 !== 37) {
                if (c$prime$1 !== 93) {
                  add_range(c$1, c$prime$1);
                  return parse_char_set_content(str_ind$1 + 1 | 0, end_ind$1);
                } else {
                  add_in_char_set(char_set, c$1);
                  add_in_char_set(char_set, /* "-" */45);
                  return str_ind$1 + 1 | 0;
                }
              } else {
                if ((str_ind$1 + 1 | 0) === end_ind$1) {
                  invalid_format_message(end_ind$1, "unexpected end of format");
                }
                var c$prime$2 = get(str, str_ind$1 + 1 | 0);
                var exit$2 = 0;
                if (c$prime$2 !== 37 && c$prime$2 !== 64) {
                  return fail_single_percent(str_ind$1);
                } else {
                  exit$2 = 1;
                }
                if (exit$2 === 1) {
                  add_range(c$1, c$prime$2);
                  return parse_char_set_content(str_ind$1 + 2 | 0, end_ind$1);
                }
                
              }
            } else {
              exit$$1 = 1;
            }
          } else {
            exit$1 = 2;
          }
          if (exit$1 === 2) {
            if (c === /* "%" */37) {
              add_in_char_set(char_set, c$prime);
              return parse_char_set_content(str_ind + 1 | 0, end_ind);
            } else {
              exit$$1 = 1;
            }
          }
          if (exit$$1 === 1) {
            if (c === /* "%" */37) {
              fail_single_percent(str_ind);
            }
            add_in_char_set(char_set, c);
            _c = c$prime;
            _str_ind = str_ind + 1 | 0;
            continue ;
          }
          
        }    };
      var parse_char_set_content = function (_str_ind, end_ind) {
        while(true) {
          var str_ind = _str_ind;
          if (str_ind === end_ind) {
            invalid_format_message(end_ind, "unexpected end of format");
          }
          var c = get(str, str_ind);
          if (c !== 45) {
            if (c !== 93) {
              return parse_char_set_after_char(str_ind + 1 | 0, end_ind, c);
            } else {
              return str_ind + 1 | 0;
            }
          } else {
            add_in_char_set(char_set, /* "-" */45);
            _str_ind = str_ind + 1 | 0;
            continue ;
          }
        }    };
      var parse_char_set_start = function (str_ind, end_ind) {
        if (str_ind === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        var c = get(str, str_ind);
        return parse_char_set_after_char(str_ind + 1 | 0, end_ind, c);
      };
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var match = get(str, str_ind);
      var match$1 = match !== 94 ? /* tuple */[
          str_ind,
          /* boolean */0
        ] : /* tuple */[
          str_ind + 1 | 0,
          /* boolean */1
        ];
      var next_ind = parse_char_set_start(match$1[0], end_ind);
      var char_set$1 = to_string(char_set);
      return /* tuple */[
              next_ind,
              match$1[1] ? rev_char_set(char_set$1) : char_set$1
            ];
    };
    var check_open_box = function (fmt) {
      if (typeof fmt === "number" || !(fmt.tag === 11 && typeof fmt[1] === "number")) {
        return /* () */0;
      } else {
        try {
          open_box_of_string(fmt[0]);
          return /* () */0;
        }
        catch (raw_exn){
          var exn = internalToOCamlException(raw_exn);
          if (exn[0] === failure) {
            return /* () */0;
          } else {
            throw exn;
          }
        }
      }
    };
    var parse_tag = function (is_open_tag, str_ind, end_ind) {
      try {
        if (str_ind === end_ind) {
          throw not_found;
        }
        var match = get(str, str_ind);
        if (match !== 60) {
          throw not_found;
        } else {
          var ind = index_from$1(str, str_ind + 1 | 0, /* ">" */62);
          if (ind >= end_ind) {
            throw not_found;
          }
          var sub_str = sub$2(str, str_ind, (ind - str_ind | 0) + 1 | 0);
          var beg_ind = ind + 1 | 0;
          var match$1 = parse_literal(beg_ind, beg_ind, end_ind);
          var match$2 = parse_literal(str_ind, str_ind, ind + 1 | 0);
          var sub_fmt = match$2[0];
          var sub_format = /* Format */[
            sub_fmt,
            sub_str
          ];
          var formatting = is_open_tag ? /* Open_tag */__(0, [sub_format]) : (check_open_box(sub_fmt), /* Open_box */__(1, [sub_format]));
          return /* Fmt_EBB */[/* Formatting_gen */__(18, [
                      formatting,
                      match$1[0]
                    ])];
        }
      }
      catch (exn){
        if (exn === not_found) {
          var match$3 = parse_literal(str_ind, str_ind, end_ind);
          var sub_format$1 = /* Format */[
            /* End_of_format */0,
            ""
          ];
          var formatting$1 = is_open_tag ? /* Open_tag */__(0, [sub_format$1]) : /* Open_box */__(1, [sub_format$1]);
          return /* Fmt_EBB */[/* Formatting_gen */__(18, [
                      formatting$1,
                      match$3[0]
                    ])];
        } else {
          throw exn;
        }
      }
    };
    return parse_literal(0, 0, str.length);
  }

  function format_of_string_fmtty(str, fmtty) {
    var match = fmt_ebb_of_string(/* None */0, str);
    try {
      return /* Format */[
              type_format(match[0], fmtty),
              str
            ];
    }
    catch (exn){
      if (exn === Type_mismatch) {
        return _2(failwith_message(/* Format */[
                        /* String_literal */__(11, [
                            "bad input: format type mismatch between ",
                            /* Caml_string */__(3, [
                                /* No_padding */0,
                                /* String_literal */__(11, [
                                    " and ",
                                    /* Caml_string */__(3, [
                                        /* No_padding */0,
                                        /* End_of_format */0
                                      ])
                                  ])
                              ])
                          ]),
                        "bad input: format type mismatch between %S and %S"
                      ]), str, string_of_fmtty(fmtty));
      } else {
        throw exn;
      }
    }
  }
  /* No side effect */

  function ksprintf(k, param) {
    var k$prime = function (_, acc) {
      var buf = create$1(64);
      strput_acc(buf, acc);
      return _1(k, contents(buf));
    };
    return make_printf(k$prime, /* () */0, /* End_of_acc */0, param[0]);
  }

  function sprintf(fmt) {
    return ksprintf((function (s) {
                  return s;
                }), fmt);
  }
  /* No side effect */

  function next_char(ib) {
    try {
      var c = _1(ib[/* get_next_char */6], /* () */0);
      ib[/* current_char */1] = c;
      ib[/* current_char_is_valid */2] = /* boolean */1;
      ib[/* char_count */3] = ib[/* char_count */3] + 1 | 0;
      if (c === /* "\n" */10) {
        ib[/* line_count */4] = ib[/* line_count */4] + 1 | 0;
      }
      return c;
    }
    catch (exn){
      if (exn === end_of_file) {
        ib[/* current_char */1] = /* "\000" */0;
        ib[/* current_char_is_valid */2] = /* boolean */0;
        ib[/* eof */0] = /* boolean */1;
        return /* "\000" */0;
      } else {
        throw exn;
      }
    }
  }

  function peek_char(ib) {
    if (ib[/* current_char_is_valid */2]) {
      return ib[/* current_char */1];
    } else {
      return next_char(ib);
    }
  }

  function checked_peek_char(ib) {
    var c = peek_char(ib);
    if (ib[/* eof */0]) {
      throw end_of_file;
    }
    return c;
  }

  function end_of_input(ib) {
    peek_char(ib);
    return ib[/* eof */0];
  }

  function char_count(ib) {
    if (ib[/* current_char_is_valid */2]) {
      return ib[/* char_count */3] - 1 | 0;
    } else {
      return ib[/* char_count */3];
    }
  }

  function token(ib) {
    var tokbuf = ib[/* tokbuf */7];
    var tok = contents(tokbuf);
    tokbuf[/* position */1] = 0;
    ib[/* token_count */5] = ib[/* token_count */5] + 1 | 0;
    return tok;
  }

  function ignore_char(width, ib) {
    var width$1 = width - 1 | 0;
    ib[/* current_char_is_valid */2] = /* boolean */0;
    return width$1;
  }

  function store_char(width, ib, c) {
    add_char(ib[/* tokbuf */7], c);
    return ignore_char(width, ib);
  }

  function create$2(iname, next) {
    return /* record */[
            /* eof : boolean */0,
            /* current_char : "\000" */0,
            /* current_char_is_valid : boolean */0,
            /* char_count */0,
            /* line_count */0,
            /* token_count */0,
            /* get_next_char */next,
            /* tokbuf */create$1(1024),
            /* input_name */iname
          ];
  }

  function from_string(s) {
    var i = [0];
    var len = s.length;
    var next = function () {
      if (i[0] >= len) {
        throw end_of_file;
      } else {
        var c = get(s, i[0]);
        i[0] = i[0] + 1 | 0;
        return c;
      }
    };
    return create$2(/* From_string */0, next);
  }

  var file_buffer_size = [1024];

  function scan_raise_at_end() {
    throw end_of_file;
  }

  function from_ic(scan_close_ic, iname, ic) {
    var len = file_buffer_size[0];
    var buf = caml_create_string(len);
    var i = [0];
    var lim = [0];
    var eof = [/* boolean */0];
    var next = function () {
      if (i[0] < lim[0]) {
        var c = get$1(buf, i[0]);
        i[0] = i[0] + 1 | 0;
        return c;
      } else if (eof[0]) {
        throw end_of_file;
      } else {
        lim[0] = input(ic, buf, 0, len);
        if (lim[0] === 0) {
          eof[0] = /* boolean */1;
          return _1(scan_close_ic, ic);
        } else {
          i[0] = 1;
          return get$1(buf, 0);
        }
      }
    };
    return create$2(iname, next);
  }

  var stdin$2 = from_ic(scan_raise_at_end, /* From_file */__(0, [
          "-",
          stdin$1
        ]), stdin$1);

  var Scan_failure = create("Scanf.Scan_failure");

  function bad_input_escape(c) {
    var s = _1(sprintf(/* Format */[
              /* String_literal */__(11, [
                  "illegal escape character ",
                  /* Caml_char */__(1, [/* End_of_format */0])
                ]),
              "illegal escape character %C"
            ]), c);
    throw [
          Scan_failure,
          s
        ];
  }

  function bad_token_length(message) {
    var s = _1(sprintf(/* Format */[
              /* String_literal */__(11, [
                  "scanning of ",
                  /* String */__(2, [
                      /* No_padding */0,
                      /* String_literal */__(11, [
                          " failed: the specified length was too short for token",
                          /* End_of_format */0
                        ])
                    ])
                ]),
              "scanning of %s failed: the specified length was too short for token"
            ]), message);
    throw [
          Scan_failure,
          s
        ];
  }

  function character_mismatch_err(c, ci) {
    return _2(sprintf(/* Format */[
                    /* String_literal */__(11, [
                        "looking for ",
                        /* Caml_char */__(1, [/* String_literal */__(11, [
                                ", found ",
                                /* Caml_char */__(1, [/* End_of_format */0])
                              ])])
                      ]),
                    "looking for %C, found %C"
                  ]), c, ci);
  }

  function check_char(ib, _c) {
    while(true) {
      var c = _c;
      if (c === /* " " */32) {
        var ib$1 = ib;
        while(true) {
          var c$1 = peek_char(ib$1);
          if (ib$1[/* eof */0]) {
            return 0;
          } else {
            var switcher = c$1 - 9 | 0;
            if (switcher > 4 || switcher < 0) {
              if (switcher !== 23) {
                return /* () */0;
              } else {
                ib$1[/* current_char_is_valid */2] = /* boolean */0;
                continue ;
              }
            } else if (switcher === 3 || switcher === 2) {
              return /* () */0;
            } else {
              ib$1[/* current_char_is_valid */2] = /* boolean */0;
              continue ;
            }
          }
        }    } else {
        var ci = checked_peek_char(ib);
        if (ci === c) {
          ib[/* current_char_is_valid */2] = /* boolean */0;
          return /* () */0;
        } else if (ci !== 13) {
          var s = character_mismatch_err(c, ci);
          throw [
                Scan_failure,
                s
              ];
        } else if (c === /* "\n" */10) {
          ib[/* current_char_is_valid */2] = /* boolean */0;
          _c = /* "\n" */10;
          continue ;
        } else {
          var s$1 = character_mismatch_err(c, ci);
          throw [
                Scan_failure,
                s$1
              ];
        }
      }
    }}

  function token_char(ib) {
    return get(token(ib), 0);
  }

  function token_bool(ib) {
    var s = token(ib);
    switch (s) {
      case "false" : 
          return /* boolean */0;
      case "true" : 
          return /* boolean */1;
      default:
        var s$1 = _1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "invalid boolean ",
                      /* Caml_string */__(3, [
                          /* No_padding */0,
                          /* End_of_format */0
                        ])
                    ]),
                  "invalid boolean %S"
                ]), s);
        throw [
              Scan_failure,
              s$1
            ];
    }
  }

  function token_int_literal(conv, ib) {
    var tok;
    var exit$$1 = 0;
    var switcher = conv - 88 | 0;
    if (switcher > 32 || switcher < 0) {
      exit$$1 = 1;
    } else {
      switch (switcher) {
        case 10 : 
            tok = "0b" + token(ib);
            break;
        case 23 : 
            tok = "0o" + token(ib);
            break;
        case 12 : 
        case 17 : 
        case 29 : 
            tok = token(ib);
            break;
        case 1 : 
        case 2 : 
        case 3 : 
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 11 : 
        case 13 : 
        case 14 : 
        case 15 : 
        case 16 : 
        case 18 : 
        case 19 : 
        case 20 : 
        case 21 : 
        case 22 : 
        case 24 : 
        case 25 : 
        case 26 : 
        case 27 : 
        case 28 : 
        case 30 : 
        case 31 : 
            exit$$1 = 1;
            break;
        case 0 : 
        case 32 : 
            tok = "0x" + token(ib);
            break;
        
      }
    }
    if (exit$$1 === 1) {
      throw [
            assert_failure,
            [
              "scanf.ml",
              507,
              11
            ]
          ];
    }
    var l = tok.length;
    if (l === 0 || get(tok, 0) !== /* "+" */43) {
      return tok;
    } else {
      return sub$2(tok, 1, l - 1 | 0);
    }
  }

  function token_float(ib) {
    return caml_float_of_string(token(ib));
  }

  function scan_decimal_digits(_width, ib) {
    while(true) {
      var width = _width;
      if (width === 0) {
        return width;
      } else {
        var c = peek_char(ib);
        if (ib[/* eof */0]) {
          return width;
        } else if (c >= 58) {
          if (c !== 95) {
            return width;
          } else {
            var width$1 = ignore_char(width, ib);
            _width = width$1;
            continue ;
          }
        } else if (c >= 48) {
          var width$2 = store_char(width, ib, c);
          _width = width$2;
          continue ;
        } else {
          return width;
        }
      }
    }}

  function scan_decimal_digits_plus(width, ib) {
    if (width === 0) {
      return bad_token_length("decimal digits");
    } else {
      var c = checked_peek_char(ib);
      if (c > 57 || c < 48) {
        var s = _1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "character ",
                      /* Caml_char */__(1, [/* String_literal */__(11, [
                              " is not a decimal digit",
                              /* End_of_format */0
                            ])])
                    ]),
                  "character %C is not a decimal digit"
                ]), c);
        throw [
              Scan_failure,
              s
            ];
      } else {
        var width$1 = store_char(width, ib, c);
        return scan_decimal_digits(width$1, ib);
      }
    }
  }

  function scan_digits_plus(basis, digitp, width, ib) {
    if (width === 0) {
      return bad_token_length("digits");
    } else {
      var c = checked_peek_char(ib);
      if (_1(digitp, c)) {
        var _width = store_char(width, ib, c);
        while(true) {
          var width$1 = _width;
          if (width$1 === 0) {
            return width$1;
          } else {
            var c$1 = peek_char(ib);
            if (ib[/* eof */0]) {
              return width$1;
            } else if (_1(digitp, c$1)) {
              _width = store_char(width$1, ib, c$1);
              continue ;
            } else if (c$1 !== 95) {
              return width$1;
            } else {
              _width = ignore_char(width$1, ib);
              continue ;
            }
          }
        }    } else {
        var s = _2(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "character ",
                      /* Caml_char */__(1, [/* String_literal */__(11, [
                              " is not a valid ",
                              /* String */__(2, [
                                  /* No_padding */0,
                                  /* String_literal */__(11, [
                                      " digit",
                                      /* End_of_format */0
                                    ])
                                ])
                            ])])
                    ]),
                  "character %C is not a valid %s digit"
                ]), c, basis);
        throw [
              Scan_failure,
              s
            ];
      }
    }
  }

  function is_binary_digit(param) {
    if (param === 49 || param === 48) {
      return /* boolean */1;
    } else {
      return /* boolean */0;
    }
  }

  function scan_binary_int(param, param$1) {
    return scan_digits_plus("binary", is_binary_digit, param, param$1);
  }

  function is_octal_digit(param) {
    if (param > 55 || param < 48) {
      return /* boolean */0;
    } else {
      return /* boolean */1;
    }
  }

  function scan_octal_int(param, param$1) {
    return scan_digits_plus("octal", is_octal_digit, param, param$1);
  }

  function is_hexa_digit(param) {
    var switcher = param - 48 | 0;
    if (switcher > 22 || switcher < 0) {
      if (switcher > 54 || switcher < 49) {
        return /* boolean */0;
      } else {
        return /* boolean */1;
      }
    } else if (switcher > 16 || switcher < 10) {
      return /* boolean */1;
    } else {
      return /* boolean */0;
    }
  }

  function scan_hexadecimal_int(param, param$1) {
    return scan_digits_plus("hexadecimal", is_hexa_digit, param, param$1);
  }

  function scan_sign(width, ib) {
    var c = checked_peek_char(ib);
    if (c !== 43 && c !== 45) {
      return width;
    } else {
      return store_char(width, ib, c);
    }
  }

  function scan_optionally_signed_decimal_int(width, ib) {
    var width$1 = scan_sign(width, ib);
    return scan_decimal_digits_plus(width$1, ib);
  }

  function scan_int_conv(conv, width, ib) {
    var exit$$1 = 0;
    var switcher = conv - 88 | 0;
    if (switcher > 32 || switcher < 0) {
      exit$$1 = 1;
    } else {
      switch (switcher) {
        case 10 : 
            return scan_binary_int(width, ib);
        case 12 : 
            return scan_optionally_signed_decimal_int(width, ib);
        case 17 : 
            var width$1 = width;
            var ib$1 = ib;
            var width$2 = scan_sign(width$1, ib$1);
            var width$3 = width$2;
            var ib$2 = ib$1;
            var c = checked_peek_char(ib$2);
            if (c !== 48) {
              return scan_decimal_digits_plus(width$3, ib$2);
            } else {
              var width$4 = store_char(width$3, ib$2, c);
              if (width$4 === 0) {
                return width$4;
              } else {
                var c$1 = peek_char(ib$2);
                if (ib$2[/* eof */0]) {
                  return width$4;
                } else if (c$1 >= 99) {
                  if (c$1 !== 111) {
                    if (c$1 !== 120) {
                      return scan_decimal_digits(width$4, ib$2);
                    } else {
                      return scan_hexadecimal_int(store_char(width$4, ib$2, c$1), ib$2);
                    }
                  } else {
                    return scan_octal_int(store_char(width$4, ib$2, c$1), ib$2);
                  }
                } else if (c$1 !== 88) {
                  if (c$1 >= 98) {
                    return scan_binary_int(store_char(width$4, ib$2, c$1), ib$2);
                  } else {
                    return scan_decimal_digits(width$4, ib$2);
                  }
                } else {
                  return scan_hexadecimal_int(store_char(width$4, ib$2, c$1), ib$2);
                }
              }
            }
        case 23 : 
            return scan_octal_int(width, ib);
        case 29 : 
            return scan_decimal_digits_plus(width, ib);
        case 1 : 
        case 2 : 
        case 3 : 
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 11 : 
        case 13 : 
        case 14 : 
        case 15 : 
        case 16 : 
        case 18 : 
        case 19 : 
        case 20 : 
        case 21 : 
        case 22 : 
        case 24 : 
        case 25 : 
        case 26 : 
        case 27 : 
        case 28 : 
        case 30 : 
        case 31 : 
            exit$$1 = 1;
            break;
        case 0 : 
        case 32 : 
            return scan_hexadecimal_int(width, ib);
        
      }
    }
    if (exit$$1 === 1) {
      throw [
            assert_failure,
            [
              "scanf.ml",
              674,
              9
            ]
          ];
    }
    
  }

  function scan_frac_part(width, ib) {
    if (width === 0) {
      return width;
    } else {
      var c = peek_char(ib);
      if (ib[/* eof */0] || c > 57 || c < 48) {
        return width;
      } else {
        return scan_decimal_digits(store_char(width, ib, c), ib);
      }
    }
  }

  function scan_exp_part(width, ib) {
    if (width === 0) {
      return width;
    } else {
      var c = peek_char(ib);
      if (ib[/* eof */0] || c !== 69 && c !== 101) {
        return width;
      } else {
        return scan_optionally_signed_decimal_int(store_char(width, ib, c), ib);
      }
    }
  }

  function scan_int_part(width, ib) {
    var width$1 = scan_sign(width, ib);
    return scan_decimal_digits(width$1, ib);
  }

  function scan_float(width, precision, ib) {
    var width$1 = scan_int_part(width, ib);
    if (width$1 === 0) {
      return /* tuple */[
              width$1,
              precision
            ];
    } else {
      var c = peek_char(ib);
      if (ib[/* eof */0]) {
        return /* tuple */[
                width$1,
                precision
              ];
      } else if (c !== 46) {
        return /* tuple */[
                scan_exp_part(width$1, ib),
                precision
              ];
      } else {
        var width$2 = store_char(width$1, ib, c);
        var precision$1 = width$2 < precision ? width$2 : precision;
        var width$3 = width$2 - (precision$1 - scan_frac_part(precision$1, ib) | 0) | 0;
        return /* tuple */[
                scan_exp_part(width$3, ib),
                precision$1
              ];
      }
    }
  }

  function scan_caml_float(width, precision, ib) {
    var width$1 = scan_optionally_signed_decimal_int(width, ib);
    if (width$1 === 0) {
      throw [
            Scan_failure,
            "no dot or exponent part found in float token"
          ];
    } else {
      var c = peek_char(ib);
      if (ib[/* eof */0]) {
        throw [
              Scan_failure,
              "no dot or exponent part found in float token"
            ];
      } else {
        var switcher = c - 69 | 0;
        if (switcher > 32 || switcher < 0) {
          if (switcher !== -23) {
            throw [
                  Scan_failure,
                  "no dot or exponent part found in float token"
                ];
          } else {
            var width$2 = store_char(width$1, ib, c);
            var precision$1 = width$2 < precision ? width$2 : precision;
            var width$3 = width$2 - (precision$1 - scan_frac_part(precision$1, ib) | 0) | 0;
            return scan_exp_part(width$3, ib);
          }
        } else if (switcher > 31 || switcher < 1) {
          return scan_exp_part(width$1, ib);
        } else {
          throw [
                Scan_failure,
                "no dot or exponent part found in float token"
              ];
        }
      }
    }
  }

  function scan_string(stp, width, ib) {
    var _width = width;
    while(true) {
      var width$1 = _width;
      if (width$1 === 0) {
        return width$1;
      } else {
        var c = peek_char(ib);
        if (ib[/* eof */0]) {
          return width$1;
        } else if (stp) {
          if (c === stp[0]) {
            ib[/* current_char_is_valid */2] = /* boolean */0;
            return width$1;
          } else {
            _width = store_char(width$1, ib, c);
            continue ;
          }
        } else {
          var switcher = c - 9 | 0;
          if (switcher > 4 || switcher < 0) {
            if (switcher !== 23) {
              _width = store_char(width$1, ib, c);
              continue ;
            } else {
              return width$1;
            }
          } else if (switcher === 3 || switcher === 2) {
            _width = store_char(width$1, ib, c);
            continue ;
          } else {
            return width$1;
          }
        }
      }
    }}

  function scan_char(width, ib) {
    return store_char(width, ib, checked_peek_char(ib));
  }

  function char_for_backslash(c) {
    if (c >= 110) {
      if (c >= 117) {
        return c;
      } else {
        switch (c - 110 | 0) {
          case 0 : 
              return /* "\n" */10;
          case 4 : 
              return /* "\r" */13;
          case 1 : 
          case 2 : 
          case 3 : 
          case 5 : 
              return c;
          case 6 : 
              return /* "\t" */9;
          
        }
      }
    } else if (c !== 98) {
      return c;
    } else {
      return /* "\b" */8;
    }
  }

  function char_for_decimal_code(c0, c1, c2) {
    var c = (imul(100, c0 - /* "0" */48 | 0) + imul(10, c1 - /* "0" */48 | 0) | 0) + (c2 - /* "0" */48 | 0) | 0;
    if (c < 0 || c > 255) {
      var s = _3(sprintf(/* Format */[
                /* String_literal */__(11, [
                    "bad character decimal encoding \\",
                    /* Char */__(0, [/* Char */__(0, [/* Char */__(0, [/* End_of_format */0])])])
                  ]),
                "bad character decimal encoding \\%c%c%c"
              ]), c0, c1, c2);
      throw [
            Scan_failure,
            s
          ];
    } else {
      return char_of_int(c);
    }
  }

  function hexadecimal_value_of_char(c) {
    if (c >= /* "a" */97) {
      return c - 87 | 0;
    } else if (c >= /* "A" */65) {
      return c - 55 | 0;
    } else {
      return c - /* "0" */48 | 0;
    }
  }

  function char_for_hexadecimal_code(c1, c2) {
    var c = (hexadecimal_value_of_char(c1) << 4) + hexadecimal_value_of_char(c2) | 0;
    if (c < 0 || c > 255) {
      var s = _2(sprintf(/* Format */[
                /* String_literal */__(11, [
                    "bad character hexadecimal encoding \\",
                    /* Char */__(0, [/* Char */__(0, [/* End_of_format */0])])
                  ]),
                "bad character hexadecimal encoding \\%c%c"
              ]), c1, c2);
      throw [
            Scan_failure,
            s
          ];
    } else {
      return char_of_int(c);
    }
  }

  function check_next_char(message, width, ib) {
    if (width === 0) {
      return bad_token_length(message);
    } else {
      var c = peek_char(ib);
      if (ib[/* eof */0]) {
        var message$1 = message;
        var s = _1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "scanning of ",
                      /* String */__(2, [
                          /* No_padding */0,
                          /* String_literal */__(11, [
                              " failed: premature end of file occurred before end of token",
                              /* End_of_format */0
                            ])
                        ])
                    ]),
                  "scanning of %s failed: premature end of file occurred before end of token"
                ]), message$1);
        throw [
              Scan_failure,
              s
            ];
      } else {
        return c;
      }
    }
  }

  function scan_backslash_char(width, ib) {
    var c = check_next_char("a Char", width, ib);
    var exit$$1 = 0;
    if (c >= 40) {
      if (c >= 58) {
        var switcher = c - 92 | 0;
        if (switcher > 28 || switcher < 0) {
          return bad_input_escape(c);
        } else {
          switch (switcher) {
            case 0 : 
            case 6 : 
            case 18 : 
            case 22 : 
            case 24 : 
                exit$$1 = 1;
                break;
            case 1 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 5 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 11 : 
            case 12 : 
            case 13 : 
            case 14 : 
            case 15 : 
            case 16 : 
            case 17 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 23 : 
            case 25 : 
            case 26 : 
            case 27 : 
                return bad_input_escape(c);
            case 28 : 
                var get_digit = function () {
                  var c = next_char(ib);
                  var switcher = c - 48 | 0;
                  if (switcher > 22 || switcher < 0) {
                    if (switcher > 54 || switcher < 49) {
                      return bad_input_escape(c);
                    } else {
                      return c;
                    }
                  } else if (switcher > 16 || switcher < 10) {
                    return c;
                  } else {
                    return bad_input_escape(c);
                  }
                };
                var c1 = get_digit(/* () */0);
                var c2 = get_digit(/* () */0);
                return store_char(width - 2 | 0, ib, char_for_hexadecimal_code(c1, c2));
            
          }
        }
      } else if (c >= 48) {
        var get_digit$1 = function () {
          var c = next_char(ib);
          if (c > 57 || c < 48) {
            return bad_input_escape(c);
          } else {
            return c;
          }
        };
        var c1$1 = get_digit$1(/* () */0);
        var c2$1 = get_digit$1(/* () */0);
        return store_char(width - 2 | 0, ib, char_for_decimal_code(c, c1$1, c2$1));
      } else {
        return bad_input_escape(c);
      }
    } else if (c !== 34 && c < 39) {
      return bad_input_escape(c);
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      return store_char(width, ib, char_for_backslash(c));
    }
    
  }

  function scan_caml_char(width, ib) {
    var find_stop = function (width) {
      var c = check_next_char("a Char", width, ib);
      if (c !== 39) {
        var s = character_mismatch_err(/* "'" */39, c);
        throw [
              Scan_failure,
              s
            ];
      } else {
        return ignore_char(width, ib);
      }
    };
    var width$1 = width;
    var c = checked_peek_char(ib);
    if (c !== 39) {
      var s = character_mismatch_err(/* "'" */39, c);
      throw [
            Scan_failure,
            s
          ];
    } else {
      var width$2 = ignore_char(width$1, ib);
      var c$1 = check_next_char("a Char", width$2, ib);
      if (c$1 !== 92) {
        return find_stop(store_char(width$2, ib, c$1));
      } else {
        return find_stop(scan_backslash_char(ignore_char(width$2, ib), ib));
      }
    }
  }

  function scan_caml_string(width, ib) {
    var find_stop = function (_width) {
      while(true) {
        var width = _width;
        var c = check_next_char("a String", width, ib);
        if (c !== 34) {
          if (c !== 92) {
            _width = store_char(width, ib, c);
            continue ;
          } else {
            var width$1 = ignore_char(width, ib);
            var match = check_next_char("a String", width$1, ib);
            if (match !== 10) {
              if (match !== 13) {
                return find_stop(scan_backslash_char(width$1, ib));
              } else {
                var width$2 = ignore_char(width$1, ib);
                var match$1 = check_next_char("a String", width$2, ib);
                if (match$1 !== 10) {
                  return find_stop(store_char(width$2, ib, /* "\r" */13));
                } else {
                  return skip_spaces(ignore_char(width$2, ib));
                }
              }
            } else {
              return skip_spaces(ignore_char(width$1, ib));
            }
          }
        } else {
          return ignore_char(width, ib);
        }
      }  };
    var skip_spaces = function (_width) {
      while(true) {
        var width = _width;
        var match = check_next_char("a String", width, ib);
        if (match !== 32) {
          return find_stop(width);
        } else {
          _width = ignore_char(width, ib);
          continue ;
        }
      }  };
    var width$1 = width;
    var c = checked_peek_char(ib);
    if (c !== 34) {
      var s = character_mismatch_err(/* "\"" */34, c);
      throw [
            Scan_failure,
            s
          ];
    } else {
      return find_stop(ignore_char(width$1, ib));
    }
  }

  function scan_bool(ib) {
    var c = checked_peek_char(ib);
    var m;
    if (c !== 102) {
      if (c !== 116) {
        var s = _1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "the character ",
                      /* Caml_char */__(1, [/* String_literal */__(11, [
                              " cannot start a boolean",
                              /* End_of_format */0
                            ])])
                    ]),
                  "the character %C cannot start a boolean"
                ]), c);
        throw [
              Scan_failure,
              s
            ];
      } else {
        m = 4;
      }
    } else {
      m = 5;
    }
    return scan_string(/* None */0, m, ib);
  }

  function scan_chars_in_char_set(char_set, scan_indic, width, ib) {
    var scan_chars = function (_i, stp) {
      while(true) {
        var i = _i;
        var c = peek_char(ib);
        if (i > 0 && !ib[/* eof */0] && is_in_char_set(char_set, c) && c !== stp) {
          store_char(max_int$1, ib, c);
          _i = i - 1 | 0;
          continue ;
        } else {
          return 0;
        }
      }  };
    if (scan_indic) {
      var c = scan_indic[0];
      scan_chars(width, c);
      if (ib[/* eof */0]) {
        return 0;
      } else {
        var ci = peek_char(ib);
        if (c === ci) {
          ib[/* current_char_is_valid */2] = /* boolean */0;
          return /* () */0;
        } else {
          var s = character_mismatch_err(c, ci);
          throw [
                Scan_failure,
                s
              ];
        }
      }
    } else {
      return scan_chars(width, -1);
    }
  }

  function scanf_bad_input(ib, x) {
    var exit$$1 = 0;
    var s;
    if (x[0] === Scan_failure) {
      s = x[1];
      exit$$1 = 1;
    } else if (x[0] === failure) {
      s = x[1];
      exit$$1 = 1;
    } else {
      throw x;
    }
    if (exit$$1 === 1) {
      var i = char_count(ib);
      var s$1 = _2(sprintf(/* Format */[
                /* String_literal */__(11, [
                    "scanf: bad input at char number ",
                    /* Int */__(4, [
                        /* Int_i */3,
                        /* No_padding */0,
                        /* No_precision */0,
                        /* String_literal */__(11, [
                            ": ",
                            /* Caml_string */__(3, [
                                /* No_padding */0,
                                /* End_of_format */0
                              ])
                          ])
                      ])
                  ]),
                "scanf: bad input at char number %i: %S"
              ]), i, s);
      throw [
            Scan_failure,
            s$1
          ];
    }
    
  }

  function get_counter(ib, counter) {
    switch (counter) {
      case 0 : 
          return ib[/* line_count */4];
      case 1 : 
          return char_count(ib);
      case 2 : 
          return ib[/* token_count */5];
      
    }
  }

  function width_of_pad_opt(pad_opt) {
    if (pad_opt) {
      return pad_opt[0];
    } else {
      return max_int$1;
    }
  }

  function stopper_of_formatting_lit(fmting) {
    if (fmting === /* Escaped_percent */6) {
      return /* tuple */[
              /* "%" */37,
              ""
            ];
    } else {
      var str = string_of_formatting_lit(fmting);
      var stp = get(str, 1);
      var sub_str = sub$2(str, 2, str.length - 2 | 0);
      return /* tuple */[
              stp,
              sub_str
            ];
    }
  }

  function take_format_readers(k, _fmt) {
    while(true) {
      var fmt = _fmt;
      if (typeof fmt === "number") {
        return _1(k, /* Nil */0);
      } else {
        switch (fmt.tag | 0) {
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 8 : 
              _fmt = fmt[3];
              continue ;
          case 14 : 
              return take_fmtty_format_readers(k, erase_rel(symm(fmt[1])), fmt[2]);
          case 18 : 
              _fmt = concat_fmt(fmt[0][0][0], fmt[1]);
              continue ;
          case 19 : 
              var fmt_rest = fmt[0];
              return (function(fmt_rest){
              return function (reader) {
                var new_k = function (readers_rest) {
                  return _1(k, /* Cons */[
                              reader,
                              readers_rest
                            ]);
                };
                return take_format_readers(new_k, fmt_rest);
              }
              }(fmt_rest));
          case 2 : 
          case 3 : 
          case 11 : 
          case 12 : 
          case 17 : 
          case 21 : 
              _fmt = fmt[1];
              continue ;
          case 23 : 
              var k$1 = k;
              var ign = fmt[0];
              var fmt$1 = fmt[1];
              if (typeof ign === "number") {
                if (ign === 3) {
                  return (function(k$1,fmt$1){
                  return function (reader) {
                    var new_k = function (readers_rest) {
                      return _1(k$1, /* Cons */[
                                  reader,
                                  readers_rest
                                ]);
                    };
                    return take_format_readers(new_k, fmt$1);
                  }
                  }(k$1,fmt$1));
                } else {
                  return take_format_readers(k$1, fmt$1);
                }
              } else if (ign.tag === 8) {
                return take_fmtty_format_readers(k$1, ign[1], fmt$1);
              } else {
                return take_format_readers(k$1, fmt$1);
              }
          case 13 : 
          case 20 : 
          case 24 : 
              _fmt = fmt[2];
              continue ;
          default:
            _fmt = fmt[0];
            continue ;
        }
      }
    }}

  function take_fmtty_format_readers(k, _fmtty, fmt) {
    while(true) {
      var fmtty = _fmtty;
      if (typeof fmtty === "number") {
        return take_format_readers(k, fmt);
      } else {
        switch (fmtty.tag | 0) {
          case 8 : 
              _fmtty = fmtty[1];
              continue ;
          case 9 : 
              var ty = trans(symm(fmtty[0]), fmtty[1]);
              _fmtty = concat_fmtty(ty, fmtty[2]);
              continue ;
          case 13 : 
              var fmt_rest = fmtty[0];
              return (function(fmt_rest){
              return function (reader) {
                var new_k = function (readers_rest) {
                  return _1(k, /* Cons */[
                              reader,
                              readers_rest
                            ]);
                };
                return take_fmtty_format_readers(new_k, fmt_rest, fmt);
              }
              }(fmt_rest));
          case 14 : 
              var fmt_rest$1 = fmtty[0];
              return (function(fmt_rest$1){
              return function (reader) {
                var new_k = function (readers_rest) {
                  return _1(k, /* Cons */[
                              reader,
                              readers_rest
                            ]);
                };
                return take_fmtty_format_readers(new_k, fmt_rest$1, fmt);
              }
              }(fmt_rest$1));
          default:
            _fmtty = fmtty[0];
            continue ;
        }
      }
    }}

  function make_scanf(ib, _fmt, readers) {
    while(true) {
      var fmt = _fmt;
      if (typeof fmt === "number") {
        return /* Nil */0;
      } else {
        switch (fmt.tag | 0) {
          case 0 : 
              scan_char(0, ib);
              var c = token_char(ib);
              return /* Cons */[
                      c,
                      make_scanf(ib, fmt[0], readers)
                    ];
          case 1 : 
              scan_caml_char(0, ib);
              var c$1 = token_char(ib);
              return /* Cons */[
                      c$1,
                      make_scanf(ib, fmt[0], readers)
                    ];
          case 2 : 
              var rest = fmt[1];
              var pad = fmt[0];
              var exit$$1 = 0;
              if (typeof rest === "number") {
                exit$$1 = 1;
              } else {
                switch (rest.tag | 0) {
                  case 17 : 
                      var match = stopper_of_formatting_lit(rest[0]);
                      var stp = match[0];
                      var scan = (function(stp){
                      return function scan(width, _, ib) {
                        return scan_string(/* Some */[stp], width, ib);
                      }
                      }(stp));
                      var str_rest_000 = match[1];
                      var str_rest_001 = rest[1];
                      var str_rest = /* String_literal */__(11, [
                          str_rest_000,
                          str_rest_001
                        ]);
                      return pad_prec_scanf(ib, str_rest, readers, pad, /* No_precision */0, scan, token);
                  case 18 : 
                      var match$1 = rest[0];
                      if (match$1.tag) {
                        var scan$1 = function (width, _, ib) {
                          return scan_string(/* Some */[/* "[" */91], width, ib);
                        };
                        return pad_prec_scanf(ib, concat_fmt(match$1[0][0], rest[1]), readers, pad, /* No_precision */0, scan$1, token);
                      } else {
                        var scan$2 = function (width, _, ib) {
                          return scan_string(/* Some */[/* "{" */123], width, ib);
                        };
                        return pad_prec_scanf(ib, concat_fmt(match$1[0][0], rest[1]), readers, pad, /* No_precision */0, scan$2, token);
                      }
                  default:
                    exit$$1 = 1;
                }
              }
              if (exit$$1 === 1) {
                var scan$3 = function (width, _, ib) {
                  return scan_string(/* None */0, width, ib);
                };
                return pad_prec_scanf(ib, rest, readers, pad, /* No_precision */0, scan$3, token);
              }
              break;
          case 3 : 
              var scan$4 = function (width, _, ib) {
                return scan_caml_string(width, ib);
              };
              return pad_prec_scanf(ib, fmt[1], readers, fmt[0], /* No_precision */0, scan$4, token);
          case 4 : 
              var c$2 = char_of_iconv(fmt[0]);
              var scan$5 = (function(c$2){
              return function scan$5(width, _, ib) {
                return scan_int_conv(c$2, width, ib);
              }
              }(c$2));
              return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$5, (function(c$2){
                        return function (param) {
                          return caml_int_of_string(token_int_literal(c$2, param));
                        }
                        }(c$2)));
          case 5 : 
              var c$3 = char_of_iconv(fmt[0]);
              var scan$6 = (function(c$3){
              return function scan$6(width, _, ib) {
                return scan_int_conv(c$3, width, ib);
              }
              }(c$3));
              return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$6, (function(c$3){
                        return function (param) {
                          return caml_int32_of_string(token_int_literal(c$3, param));
                        }
                        }(c$3)));
          case 6 : 
              var c$4 = char_of_iconv(fmt[0]);
              var scan$7 = (function(c$4){
              return function scan$7(width, _, ib) {
                return scan_int_conv(c$4, width, ib);
              }
              }(c$4));
              return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$7, (function(c$4){
                        return function (param) {
                          return caml_nativeint_of_string(token_int_literal(c$4, param));
                        }
                        }(c$4)));
          case 7 : 
              var c$5 = char_of_iconv(fmt[0]);
              var scan$8 = (function(c$5){
              return function scan$8(width, _, ib) {
                return scan_int_conv(c$5, width, ib);
              }
              }(c$5));
              return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$8, (function(c$5){
                        return function (param) {
                          return caml_int64_of_string(token_int_literal(c$5, param));
                        }
                        }(c$5)));
          case 8 : 
              if (fmt[0] >= 15) {
                return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan_caml_float, token_float);
              } else {
                return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan_float, token_float);
              }
          case 9 : 
              scan_bool(ib);
              var b = token_bool(ib);
              return /* Cons */[
                      b,
                      make_scanf(ib, fmt[0], readers)
                    ];
          case 10 : 
              if (end_of_input(ib)) {
                _fmt = fmt[0];
                continue ;
              } else {
                throw [
                      Scan_failure,
                      "end of input not found"
                    ];
              }
          case 11 : 
              var f = function (param) {
                return check_char(ib, param);
              };
              iter$1(f, bytes_of_string(fmt[0]));
              _fmt = fmt[1];
              continue ;
          case 12 : 
              check_char(ib, fmt[0]);
              _fmt = fmt[1];
              continue ;
          case 13 : 
              scan_caml_string(width_of_pad_opt(fmt[0]), ib);
              var s = token(ib);
              var fmt$1;
              try {
                fmt$1 = format_of_string_fmtty(s, fmt[1]);
              }
              catch (raw_exn){
                var exn = internalToOCamlException(raw_exn);
                if (exn[0] === failure) {
                  throw [
                        Scan_failure,
                        exn[1]
                      ];
                } else {
                  throw exn;
                }
              }
              return /* Cons */[
                      fmt$1,
                      make_scanf(ib, fmt[2], readers)
                    ];
          case 14 : 
              var fmtty = fmt[1];
              scan_caml_string(width_of_pad_opt(fmt[0]), ib);
              var s$1 = token(ib);
              var match$2;
              try {
                var match$3 = fmt_ebb_of_string(/* None */0, s$1);
                var match$4 = fmt_ebb_of_string(/* None */0, s$1);
                match$2 = /* tuple */[
                  type_format(match$3[0], erase_rel(fmtty)),
                  type_format(match$4[0], erase_rel(symm(fmtty)))
                ];
              }
              catch (raw_exn$1){
                var exn$1 = internalToOCamlException(raw_exn$1);
                if (exn$1[0] === failure) {
                  throw [
                        Scan_failure,
                        exn$1[1]
                      ];
                } else {
                  throw exn$1;
                }
              }
              return /* Cons */[
                      /* Format */[
                        match$2[0],
                        s$1
                      ],
                      make_scanf(ib, concat_fmt(match$2[1], fmt[2]), readers)
                    ];
          case 15 : 
              throw [
                    invalid_argument,
                    "scanf: bad conversion \"%a\""
                  ];
          case 16 : 
              throw [
                    invalid_argument,
                    "scanf: bad conversion \"%t\""
                  ];
          case 17 : 
              var s$2 = string_of_formatting_lit(fmt[0]);
              var f$1 = function (param) {
                return check_char(ib, param);
              };
              iter$1(f$1, bytes_of_string(s$2));
              _fmt = fmt[1];
              continue ;
          case 18 : 
              var match$5 = fmt[0];
              check_char(ib, /* "@" */64);
              if (match$5.tag) {
                check_char(ib, /* "[" */91);
                _fmt = concat_fmt(match$5[0][0], fmt[1]);
                continue ;
              } else {
                check_char(ib, /* "{" */123);
                _fmt = concat_fmt(match$5[0][0], fmt[1]);
                continue ;
              }
          case 19 : 
              var x = _1(readers[0], ib);
              return /* Cons */[
                      x,
                      make_scanf(ib, fmt[0], readers[1])
                    ];
          case 20 : 
              var rest$1 = fmt[2];
              var char_set = fmt[1];
              var width_opt = fmt[0];
              var exit$1 = 0;
              if (typeof rest$1 === "number" || rest$1.tag !== 17) {
                exit$1 = 1;
              } else {
                var match$6 = stopper_of_formatting_lit(rest$1[0]);
                var width = width_of_pad_opt(width_opt);
                scan_chars_in_char_set(char_set, /* Some */[match$6[0]], width, ib);
                var s$3 = token(ib);
                var str_rest_000$1 = match$6[1];
                var str_rest_001$1 = rest$1[1];
                var str_rest$1 = /* String_literal */__(11, [
                    str_rest_000$1,
                    str_rest_001$1
                  ]);
                return /* Cons */[
                        s$3,
                        make_scanf(ib, str_rest$1, readers)
                      ];
              }
              if (exit$1 === 1) {
                var width$1 = width_of_pad_opt(width_opt);
                scan_chars_in_char_set(char_set, /* None */0, width$1, ib);
                var s$4 = token(ib);
                return /* Cons */[
                        s$4,
                        make_scanf(ib, rest$1, readers)
                      ];
              }
              break;
          case 21 : 
              var count = get_counter(ib, fmt[0]);
              return /* Cons */[
                      count,
                      make_scanf(ib, fmt[1], readers)
                    ];
          case 22 : 
              var c$6 = checked_peek_char(ib);
              return /* Cons */[
                      c$6,
                      make_scanf(ib, fmt[0], readers)
                    ];
          case 23 : 
              var match$7 = param_format_of_ignored_format(fmt[0], fmt[1]);
              var match$8 = make_scanf(ib, match$7[0], readers);
              if (match$8) {
                return match$8[1];
              } else {
                throw [
                      assert_failure,
                      [
                        "scanf.ml",
                        1258,
                        13
                      ]
                    ];
              }
          case 24 : 
              throw [
                    invalid_argument,
                    "scanf: bad conversion \"%?\" (custom converter)"
                  ];
          
        }
      }
    }}

  function pad_prec_scanf(ib, fmt, readers, pad, prec, scan, token) {
    if (typeof pad === "number") {
      if (typeof prec === "number") {
        if (prec !== 0) {
          throw [
                invalid_argument,
                "scanf: bad conversion \"%*\""
              ];
        } else {
          _3(scan, max_int$1, max_int$1, ib);
          var x = _1(token, ib);
          return /* Cons */[
                  x,
                  make_scanf(ib, fmt, readers)
                ];
        }
      } else {
        _3(scan, max_int$1, prec[0], ib);
        var x$1 = _1(token, ib);
        return /* Cons */[
                x$1,
                make_scanf(ib, fmt, readers)
              ];
      }
    } else if (pad.tag) {
      throw [
            invalid_argument,
            "scanf: bad conversion \"%*\""
          ];
    } else if (pad[0] !== 0) {
      var w = pad[1];
      if (typeof prec === "number") {
        if (prec !== 0) {
          throw [
                invalid_argument,
                "scanf: bad conversion \"%*\""
              ];
        } else {
          _3(scan, w, max_int$1, ib);
          var x$2 = _1(token, ib);
          return /* Cons */[
                  x$2,
                  make_scanf(ib, fmt, readers)
                ];
        }
      } else {
        _3(scan, w, prec[0], ib);
        var x$3 = _1(token, ib);
        return /* Cons */[
                x$3,
                make_scanf(ib, fmt, readers)
              ];
      }
    } else {
      throw [
            invalid_argument,
            "scanf: bad conversion \"%-\""
          ];
    }
  }

  function kscanf(ib, ef, param) {
    var str = param[1];
    var fmt = param[0];
    var k = function (readers, f) {
      reset(ib[/* tokbuf */7]);
      var match;
      try {
        match = /* Args */__(0, [make_scanf(ib, fmt, readers)]);
      }
      catch (raw_exc){
        var exc = internalToOCamlException(raw_exc);
        if (exc[0] === Scan_failure) {
          match = /* Exc */__(1, [exc]);
        } else if (exc[0] === failure) {
          match = /* Exc */__(1, [exc]);
        } else if (exc === end_of_file) {
          match = /* Exc */__(1, [exc]);
        } else if (exc[0] === invalid_argument) {
          var s = exc[1] + (" in format \"" + (escaped$2(str) + "\""));
          throw [
                invalid_argument,
                s
              ];
        } else {
          throw exc;
        }
      }
      if (match.tag) {
        return _2(ef, ib, match[0]);
      } else {
        var _f = f;
        var _args = match[0];
        while(true) {
          var args = _args;
          var f$1 = _f;
          if (args) {
            _args = args[1];
            _f = _1(f$1, args[0]);
            continue ;
          } else {
            return f$1;
          }
        }    }
    };
    return take_format_readers(k, fmt);
  }

  function sscanf(s, fmt) {
    return kscanf(from_string(s), scanf_bad_input, fmt);
  }

  function unescaped(s) {
    return _1(sscanf("\"" + (s + "\""), /* Format */[
                    /* Caml_string */__(3, [
                        /* No_padding */0,
                        /* Flush */__(10, [/* End_of_format */0])
                      ]),
                    "%S%!"
                  ]), (function (x) {
                  return x;
                }));
  }
  /* stdin Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function $pipe$bang(o, d) {
    if (o) {
      return o[0];
    } else {
      return failwith(d);
    }
  }

  function $pipe$unknown(o, d) {
    if (o) {
      return o[0];
    } else {
      return d;
    }
  }

  function $pipe$unknown$great(o, fn) {
    if (o) {
      return _1(fn, o[0]);
    } else {
      return /* None */0;
    }
  }

  function $pipe$unknown$great$great(o, fn) {
    if (o) {
      return /* Some */[_1(fn, o[0])];
    } else {
      return /* None */0;
    }
  }

  function fold(o, d, f) {
    if (o) {
      return _1(f, o[0]);
    } else {
      return d;
    }
  }

  var Infix = /* module */[
    /* |! */$pipe$bang,
    /* |? */$pipe$unknown,
    /* |?> */$pipe$unknown$great,
    /* |?>> */$pipe$unknown$great$great,
    /* fold */fold
  ];

  function split_by($staropt$star, is_delim, str) {
    var keep_empty = $staropt$star ? $staropt$star[0] : /* boolean */0;
    var len = str.length;
    var _acc = /* [] */0;
    var _last_pos = len;
    var _pos = len - 1 | 0;
    while(true) {
      var pos = _pos;
      var last_pos = _last_pos;
      var acc = _acc;
      if (pos === -1) {
        if (last_pos === 0 && !keep_empty) {
          return acc;
        } else {
          return /* :: */[
                  sub$2(str, 0, last_pos),
                  acc
                ];
        }
      } else if (_1(is_delim, get(str, pos))) {
        var new_len = (last_pos - pos | 0) - 1 | 0;
        if (new_len !== 0 || keep_empty) {
          var v = sub$2(str, pos + 1 | 0, new_len);
          _pos = pos - 1 | 0;
          _last_pos = pos;
          _acc = /* :: */[
            v,
            acc
          ];
          continue ;
        } else {
          _pos = pos - 1 | 0;
          _last_pos = pos;
          continue ;
        }
      } else {
        _pos = pos - 1 | 0;
        continue ;
      }
    }}

  function fail(text, pos, message) {
    var pre = sub$2(text, 0, pos);
    var lines = split_by(/* None */0, (function (c) {
            return +(c === /* "\n" */10);
          }), pre);
    var last = nth(lines, length(lines) - 1 | 0);
    var col = last.length + 1 | 0;
    var line = length(lines);
    return failwith(_4(sprintf(/* Format */[
                        /* String_literal */__(11, [
                            "Error \"",
                            /* String */__(2, [
                                /* No_padding */0,
                                /* String_literal */__(11, [
                                    "\" at ",
                                    /* Int */__(4, [
                                        /* Int_d */0,
                                        /* No_padding */0,
                                        /* No_precision */0,
                                        /* Char_literal */__(12, [
                                            /* ":" */58,
                                            /* Int */__(4, [
                                                /* Int_d */0,
                                                /* No_padding */0,
                                                /* No_precision */0,
                                                /* String_literal */__(11, [
                                                    " -> ",
                                                    /* String */__(2, [
                                                        /* No_padding */0,
                                                        /* Char_literal */__(12, [
                                                            /* "\n" */10,
                                                            /* End_of_format */0
                                                          ])
                                                      ])
                                                  ])
                                              ])
                                          ])
                                      ])
                                  ])
                              ])
                          ]),
                        "Error \"%s\" at %d:%d -> %s\n"
                      ]), message, line, col, last));
  }

  function skipToNewline(text, _pos) {
    while(true) {
      var pos = _pos;
      if (pos >= text.length) {
        return pos;
      } else if (get(text, pos) === /* "\n" */10) {
        return pos + 1 | 0;
      } else {
        _pos = pos + 1 | 0;
        continue ;
      }
    }}

  function skipToCloseMultilineComment(text, _pos) {
    while(true) {
      var pos = _pos;
      if ((pos + 1 | 0) >= text.length) {
        return failwith("Unterminated comment");
      } else if (get(text, pos) === /* "*" */42 && get(text, pos + 1 | 0) === /* "/" */47) {
        return pos + 2 | 0;
      } else {
        _pos = pos + 1 | 0;
        continue ;
      }
    }}

  function skipWhite(text, _pos) {
    while(true) {
      var pos = _pos;
      if (pos < text.length && (get(text, pos) === /* " " */32 || get(text, pos) === /* "\t" */9 || get(text, pos) === /* "\n" */10)) {
        _pos = pos + 1 | 0;
        continue ;
      } else {
        return pos;
      }
    }}

  function parseString(text, pos) {
    var i = pos;
    while(get(text, i) !== /* "\"" */34) {
      var match = +(get(text, i) === /* "\\" */92);
      i = i + (
        match ? 2 : 1
      ) | 0;
    }  return /* tuple */[
            unescaped(sub$2(text, pos, i - pos | 0)),
            i + 1 | 0
          ];
  }

  function parseNumber(text, pos) {
    var i = pos;
    var len = text.length;
    while(i < len && (/* "0" */48 <= get(text, i) && get(text, i) <= /* "9" */57 || get(text, i) === /* "." */46)) {
      i = i + 1 | 0;
    }  var s = sub$2(text, pos, i - pos | 0);
    return /* tuple */[
            /* Number */__(1, [caml_float_of_string(s)]),
            i
          ];
  }

  function expect($$char, text, pos, message) {
    if (get(text, pos) !== $$char) {
      return fail(text, pos, "Expected: " + message);
    } else {
      return pos + 1 | 0;
    }
  }

  function parseComment(text, pos, next) {
    if (get(text, pos) !== /* "/" */47) {
      if (get(text, pos) === /* "*" */42) {
        return _2(next, text, skipToCloseMultilineComment(text, pos + 1 | 0));
      } else {
        return failwith("Invalid syntax");
      }
    } else {
      return _2(next, text, skipToNewline(text, pos + 1 | 0));
    }
  }

  function maybeSkipComment(text, pos) {
    if (pos < text.length && get(text, pos) === /* "/" */47) {
      if ((pos + 1 | 0) < text.length && get(text, pos + 1 | 0) === /* "/" */47) {
        return skipToNewline(text, pos + 1 | 0);
      } else if ((pos + 1 | 0) < text.length && get(text, pos + 1 | 0) === /* "*" */42) {
        return skipToCloseMultilineComment(text, pos + 1 | 0);
      } else {
        return fail(text, pos, "Invalid synatx");
      }
    } else {
      return pos;
    }
  }

  function skip(text, _pos) {
    while(true) {
      var pos = _pos;
      if (pos === text.length) {
        return pos;
      } else {
        var n = maybeSkipComment(text, skipWhite(text, pos));
        if (n > pos) {
          _pos = n;
          continue ;
        } else {
          return n;
        }
      }
    }}

  function parse(text, _pos) {
    while(true) {
      var pos = _pos;
      if (pos >= text.length) {
        return fail(text, pos, "Reached end of file without being done parsing");
      } else {
        var match = get(text, pos);
        if (match < 92) {
          if (match >= 35) {
            var switcher = match - 47 | 0;
            if (switcher > 10 || switcher < 0) {
              if (switcher >= 44) {
                return parseArray(text, pos + 1 | 0);
              } else {
                return fail(text, pos, "unexpected character");
              }
            } else if (switcher !== 0) {
              return parseNumber(text, pos);
            } else {
              return parseComment(text, pos + 1 | 0, parse);
            }
          } else if (match >= 11) {
            if (match >= 32) {
              switch (match - 32 | 0) {
                case 0 : 
                    _pos = skipWhite(text, pos);
                    continue ;
                case 1 : 
                    return fail(text, pos, "unexpected character");
                case 2 : 
                    var match$1 = parseString(text, pos + 1 | 0);
                    return /* tuple */[
                            /* String */__(0, [match$1[0]]),
                            match$1[1]
                          ];
                
              }
            } else {
              return fail(text, pos, "unexpected character");
            }
          } else if (match >= 9) {
            _pos = skipWhite(text, pos);
            continue ;
          } else {
            return fail(text, pos, "unexpected character");
          }
        } else if (match >= 111) {
          if (match !== 116) {
            if (match !== 123) {
              return fail(text, pos, "unexpected character");
            } else {
              return parseObject(text, pos + 1 | 0);
            }
          } else if (sub$2(text, pos, 4) === "true") {
            return /* tuple */[
                    /* True */0,
                    pos + 4 | 0
                  ];
          } else {
            return fail(text, pos, "unexpected character");
          }
        } else if (match !== 102) {
          if (match >= 110 && sub$2(text, pos, 4) === "null") {
            return /* tuple */[
                    /* Null */2,
                    pos + 4 | 0
                  ];
          } else {
            return fail(text, pos, "unexpected character");
          }
        } else if (sub$2(text, pos, 5) === "false") {
          return /* tuple */[
                  /* False */1,
                  pos + 5 | 0
                ];
        } else {
          return fail(text, pos, "unexpected character");
        }
      }
    }}

  function parseArrayValue(text, pos) {
    var pos$1 = skip(text, pos);
    var match = parse(text, pos$1);
    var value = match[0];
    var pos$2 = skip(text, match[1]);
    var match$1 = get(text, pos$2);
    if (match$1 !== 44) {
      if (match$1 !== 93) {
        var match$2 = parseArrayValue(text, pos$2);
        return /* tuple */[
                /* :: */[
                  value,
                  match$2[0]
                ],
                match$2[1]
              ];
      } else {
        return /* tuple */[
                /* :: */[
                  value,
                  /* [] */0
                ],
                pos$2 + 1 | 0
              ];
      }
    } else {
      var pos$3 = skip(text, pos$2 + 1 | 0);
      if (get(text, pos$3) === /* "]" */93) {
        return /* tuple */[
                /* :: */[
                  value,
                  /* [] */0
                ],
                pos$3 + 1 | 0
              ];
      } else {
        var match$3 = parseArrayValue(text, pos$3);
        return /* tuple */[
                /* :: */[
                  value,
                  match$3[0]
                ],
                match$3[1]
              ];
      }
    }
  }

  function parseArray(text, pos) {
    var pos$1 = skip(text, pos);
    var match = get(text, pos$1);
    if (match !== 93) {
      var match$1 = parseArrayValue(text, pos$1);
      return /* tuple */[
              /* Array */__(2, [match$1[0]]),
              match$1[1]
            ];
    } else {
      return /* tuple */[
              /* Array */__(2, [/* [] */0]),
              pos$1 + 1 | 0
            ];
    }
  }

  function parseObjectValue(text, pos) {
    var pos$1 = skip(text, pos);
    if (get(text, pos$1) !== /* "\"" */34) {
      return fail(text, pos$1, "Expected string");
    } else {
      var match = parseString(text, pos$1 + 1 | 0);
      var key = match[0];
      var pos$2 = skip(text, match[1]);
      var pos$3 = expect(/* ":" */58, text, pos$2, "Colon");
      var match$1 = parse(text, pos$3);
      var value = match$1[0];
      var pos$4 = skip(text, match$1[1]);
      var match$2 = get(text, pos$4);
      if (match$2 !== 44) {
        if (match$2 !== 125) {
          var match$3 = parseObjectValue(text, pos$4);
          return /* tuple */[
                  /* :: */[
                    /* tuple */[
                      key,
                      value
                    ],
                    match$3[0]
                  ],
                  match$3[1]
                ];
        } else {
          return /* tuple */[
                  /* :: */[
                    /* tuple */[
                      key,
                      value
                    ],
                    /* [] */0
                  ],
                  pos$4 + 1 | 0
                ];
        }
      } else {
        var pos$5 = skip(text, pos$4 + 1 | 0);
        if (get(text, pos$5) === /* "}" */125) {
          return /* tuple */[
                  /* :: */[
                    /* tuple */[
                      key,
                      value
                    ],
                    /* [] */0
                  ],
                  pos$5 + 1 | 0
                ];
        } else {
          var match$4 = parseObjectValue(text, pos$5);
          return /* tuple */[
                  /* :: */[
                    /* tuple */[
                      key,
                      value
                    ],
                    match$4[0]
                  ],
                  match$4[1]
                ];
        }
      }
    }
  }

  function parseObject(text, pos) {
    var pos$1 = skip(text, pos);
    if (get(text, pos$1) === /* "}" */125) {
      return /* tuple */[
              /* Object */__(3, [/* [] */0]),
              pos$1 + 1 | 0
            ];
    } else {
      var match = parseObjectValue(text, pos$1);
      return /* tuple */[
              /* Object */__(3, [match[0]]),
              match[1]
            ];
    }
  }

  function parse$1(text) {
    var match = parse(text, 0);
    var pos = skip(text, match[1]);
    if (pos < text.length) {
      return failwith("Extra data after parse finished: " + sub$2(text, pos, text.length - pos | 0));
    } else {
      return match[0];
    }
  }

  function get$2(key, t) {
    if (typeof t === "number" || t.tag !== 3) {
      return /* None */0;
    } else {
      try {
        return /* Some */[assoc(key, t[0])];
      }
      catch (exn){
        if (exn === not_found) {
          return /* None */0;
        } else {
          throw exn;
        }
      }
    }
  }

  function string(t) {
    if (typeof t === "number" || t.tag) {
      return /* None */0;
    } else {
      return /* Some */[t[0]];
    }
  }

  function number(t) {
    if (typeof t === "number" || t.tag !== 1) {
      return /* None */0;
    } else {
      return /* Some */[t[0]];
    }
  }

  function array(t) {
    if (typeof t === "number" || t.tag !== 2) {
      return /* None */0;
    } else {
      return /* Some */[t[0]];
    }
  }
  /* Scanf Not a pure module */

  function make_matrix(sx, sy, init) {
    var res = caml_make_vect(sx, /* array */[]);
    for(var x = 0 ,x_finish = sx - 1 | 0; x <= x_finish; ++x){
      res[x] = caml_make_vect(sy, init);
    }
    return res;
  }

  function copy$2(a) {
    var l = a.length;
    if (l === 0) {
      return /* array */[];
    } else {
      return caml_array_sub(a, 0, l);
    }
  }

  function append$1(a1, a2) {
    var l1 = a1.length;
    if (l1 === 0) {
      return copy$2(a2);
    } else if (a2.length === 0) {
      return caml_array_sub(a1, 0, l1);
    } else {
      return a1.concat(a2);
    }
  }

  function blit$3(a1, ofs1, a2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
      throw [
            invalid_argument,
            "Array.blit"
          ];
    } else {
      return caml_array_blit(a1, ofs1, a2, ofs2, len);
    }
  }

  function iteri$3(f, a) {
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      _2(f, i, a[i]);
    }
    return /* () */0;
  }

  function mapi$4(f, a) {
    var l = a.length;
    if (l === 0) {
      return /* array */[];
    } else {
      var r = caml_make_vect(l, _2(f, 0, a[0]));
      for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
        r[i] = _2(f, i, a[i]);
      }
      return r;
    }
  }

  function fold_left$1(f, x, a) {
    var r = x;
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      r = _2(f, r, a[i]);
    }
    return r;
  }

  var Bottom = create("Array.Bottom");
  /* No side effect */

  function Make(funarg) {
    var height = function (param) {
      if (param) {
        return param[4];
      } else {
        return 0;
      }
    };
    var create = function (l, x, d, r) {
      var hl = height(l);
      var hr = height(r);
      return /* Node */[
              l,
              x,
              d,
              r,
              hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    };
    var singleton = function (x, d) {
      return /* Node */[
              /* Empty */0,
              x,
              d,
              /* Empty */0,
              1
            ];
    };
    var bal = function (l, x, d, r) {
      var hl = l ? l[4] : 0;
      var hr = r ? r[4] : 0;
      if (hl > (hr + 2 | 0)) {
        if (l) {
          var lr = l[3];
          var ld = l[2];
          var lv = l[1];
          var ll = l[0];
          if (height(ll) >= height(lr)) {
            return create(ll, lv, ld, create(lr, x, d, r));
          } else if (lr) {
            return create(create(ll, lv, ld, lr[0]), lr[1], lr[2], create(lr[3], x, d, r));
          } else {
            throw [
                  invalid_argument,
                  "Map.bal"
                ];
          }
        } else {
          throw [
                invalid_argument,
                "Map.bal"
              ];
        }
      } else if (hr > (hl + 2 | 0)) {
        if (r) {
          var rr = r[3];
          var rd = r[2];
          var rv = r[1];
          var rl = r[0];
          if (height(rr) >= height(rl)) {
            return create(create(l, x, d, rl), rv, rd, rr);
          } else if (rl) {
            return create(create(l, x, d, rl[0]), rl[1], rl[2], create(rl[3], rv, rd, rr));
          } else {
            throw [
                  invalid_argument,
                  "Map.bal"
                ];
          }
        } else {
          throw [
                invalid_argument,
                "Map.bal"
              ];
        }
      } else {
        return /* Node */[
                l,
                x,
                d,
                r,
                hl >= hr ? hl + 1 | 0 : hr + 1 | 0
              ];
      }
    };
    var is_empty = function (param) {
      if (param) {
        return /* boolean */0;
      } else {
        return /* boolean */1;
      }
    };
    var add = function (x, data, param) {
      if (param) {
        var r = param[3];
        var d = param[2];
        var v = param[1];
        var l = param[0];
        var c = _2(funarg[/* compare */0], x, v);
        if (c === 0) {
          return /* Node */[
                  l,
                  x,
                  data,
                  r,
                  param[4]
                ];
        } else if (c < 0) {
          return bal(add(x, data, l), v, d, r);
        } else {
          return bal(l, v, d, add(x, data, r));
        }
      } else {
        return /* Node */[
                /* Empty */0,
                x,
                data,
                /* Empty */0,
                1
              ];
      }
    };
    var find = function (x, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var c = _2(funarg[/* compare */0], x, param[1]);
          if (c === 0) {
            return param[2];
          } else {
            _param = c < 0 ? param[0] : param[3];
            continue ;
          }
        } else {
          throw not_found;
        }
      }  };
    var mem = function (x, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var c = _2(funarg[/* compare */0], x, param[1]);
          if (c === 0) {
            return /* true */1;
          } else {
            _param = c < 0 ? param[0] : param[3];
            continue ;
          }
        } else {
          return /* boolean */0;
        }
      }  };
    var min_binding = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var l = param[0];
          if (l) {
            _param = l;
            continue ;
          } else {
            return /* tuple */[
                    param[1],
                    param[2]
                  ];
          }
        } else {
          throw not_found;
        }
      }  };
    var max_binding = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var r = param[3];
          if (r) {
            _param = r;
            continue ;
          } else {
            return /* tuple */[
                    param[1],
                    param[2]
                  ];
          }
        } else {
          throw not_found;
        }
      }  };
    var remove_min_binding = function (param) {
      if (param) {
        var l = param[0];
        if (l) {
          return bal(remove_min_binding(l), param[1], param[2], param[3]);
        } else {
          return param[3];
        }
      } else {
        throw [
              invalid_argument,
              "Map.remove_min_elt"
            ];
      }
    };
    var remove = function (x, param) {
      if (param) {
        var r = param[3];
        var d = param[2];
        var v = param[1];
        var l = param[0];
        var c = _2(funarg[/* compare */0], x, v);
        if (c === 0) {
          var t1 = l;
          var t2 = r;
          if (t1) {
            if (t2) {
              var match = min_binding(t2);
              return bal(t1, match[0], match[1], remove_min_binding(t2));
            } else {
              return t1;
            }
          } else {
            return t2;
          }
        } else if (c < 0) {
          return bal(remove(x, l), v, d, r);
        } else {
          return bal(l, v, d, remove(x, r));
        }
      } else {
        return /* Empty */0;
      }
    };
    var iter = function (f, _param) {
      while(true) {
        var param = _param;
        if (param) {
          iter(f, param[0]);
          _2(f, param[1], param[2]);
          _param = param[3];
          continue ;
        } else {
          return /* () */0;
        }
      }  };
    var map = function (f, param) {
      if (param) {
        var l$prime = map(f, param[0]);
        var d$prime = _1(f, param[2]);
        var r$prime = map(f, param[3]);
        return /* Node */[
                l$prime,
                param[1],
                d$prime,
                r$prime,
                param[4]
              ];
      } else {
        return /* Empty */0;
      }
    };
    var mapi = function (f, param) {
      if (param) {
        var v = param[1];
        var l$prime = mapi(f, param[0]);
        var d$prime = _2(f, v, param[2]);
        var r$prime = mapi(f, param[3]);
        return /* Node */[
                l$prime,
                v,
                d$prime,
                r$prime,
                param[4]
              ];
      } else {
        return /* Empty */0;
      }
    };
    var fold = function (f, _m, _accu) {
      while(true) {
        var accu = _accu;
        var m = _m;
        if (m) {
          _accu = _3(f, m[1], m[2], fold(f, m[0], accu));
          _m = m[3];
          continue ;
        } else {
          return accu;
        }
      }  };
    var for_all = function (p, _param) {
      while(true) {
        var param = _param;
        if (param) {
          if (_2(p, param[1], param[2]) && for_all(p, param[0])) {
            _param = param[3];
            continue ;
          } else {
            return /* false */0;
          }
        } else {
          return /* boolean */1;
        }
      }  };
    var exists = function (p, _param) {
      while(true) {
        var param = _param;
        if (param) {
          if (_2(p, param[1], param[2]) || exists(p, param[0])) {
            return /* true */1;
          } else {
            _param = param[3];
            continue ;
          }
        } else {
          return /* boolean */0;
        }
      }  };
    var add_min_binding = function (k, v, param) {
      if (param) {
        return bal(add_min_binding(k, v, param[0]), param[1], param[2], param[3]);
      } else {
        return singleton(k, v);
      }
    };
    var add_max_binding = function (k, v, param) {
      if (param) {
        return bal(param[0], param[1], param[2], add_max_binding(k, v, param[3]));
      } else {
        return singleton(k, v);
      }
    };
    var join = function (l, v, d, r) {
      if (l) {
        if (r) {
          var rh = r[4];
          var lh = l[4];
          if (lh > (rh + 2 | 0)) {
            return bal(l[0], l[1], l[2], join(l[3], v, d, r));
          } else if (rh > (lh + 2 | 0)) {
            return bal(join(l, v, d, r[0]), r[1], r[2], r[3]);
          } else {
            return create(l, v, d, r);
          }
        } else {
          return add_max_binding(v, d, l);
        }
      } else {
        return add_min_binding(v, d, r);
      }
    };
    var concat = function (t1, t2) {
      if (t1) {
        if (t2) {
          var match = min_binding(t2);
          return join(t1, match[0], match[1], remove_min_binding(t2));
        } else {
          return t1;
        }
      } else {
        return t2;
      }
    };
    var concat_or_join = function (t1, v, d, t2) {
      if (d) {
        return join(t1, v, d[0], t2);
      } else {
        return concat(t1, t2);
      }
    };
    var split = function (x, param) {
      if (param) {
        var r = param[3];
        var d = param[2];
        var v = param[1];
        var l = param[0];
        var c = _2(funarg[/* compare */0], x, v);
        if (c === 0) {
          return /* tuple */[
                  l,
                  /* Some */[d],
                  r
                ];
        } else if (c < 0) {
          var match = split(x, l);
          return /* tuple */[
                  match[0],
                  match[1],
                  join(match[2], v, d, r)
                ];
        } else {
          var match$1 = split(x, r);
          return /* tuple */[
                  join(l, v, d, match$1[0]),
                  match$1[1],
                  match$1[2]
                ];
        }
      } else {
        return /* tuple */[
                /* Empty */0,
                /* None */0,
                /* Empty */0
              ];
      }
    };
    var merge = function (f, s1, s2) {
      var exit = 0;
      if (s1) {
        var v1 = s1[1];
        if (s1[4] >= height(s2)) {
          var match = split(v1, s2);
          return concat_or_join(merge(f, s1[0], match[0]), v1, _3(f, v1, /* Some */[s1[2]], match[1]), merge(f, s1[3], match[2]));
        } else {
          exit = 1;
        }
      } else if (s2) {
        exit = 1;
      } else {
        return /* Empty */0;
      }
      if (exit === 1) {
        if (s2) {
          var v2 = s2[1];
          var match$1 = split(v2, s1);
          return concat_or_join(merge(f, match$1[0], s2[0]), v2, _3(f, v2, match$1[1], /* Some */[s2[2]]), merge(f, match$1[2], s2[3]));
        } else {
          throw [
                assert_failure,
                [
                  "map.ml",
                  270,
                  10
                ]
              ];
        }
      }
      
    };
    var filter = function (p, param) {
      if (param) {
        var d = param[2];
        var v = param[1];
        var l$prime = filter(p, param[0]);
        var pvd = _2(p, v, d);
        var r$prime = filter(p, param[3]);
        if (pvd) {
          return join(l$prime, v, d, r$prime);
        } else {
          return concat(l$prime, r$prime);
        }
      } else {
        return /* Empty */0;
      }
    };
    var partition = function (p, param) {
      if (param) {
        var d = param[2];
        var v = param[1];
        var match = partition(p, param[0]);
        var lf = match[1];
        var lt = match[0];
        var pvd = _2(p, v, d);
        var match$1 = partition(p, param[3]);
        var rf = match$1[1];
        var rt = match$1[0];
        if (pvd) {
          return /* tuple */[
                  join(lt, v, d, rt),
                  concat(lf, rf)
                ];
        } else {
          return /* tuple */[
                  concat(lt, rt),
                  join(lf, v, d, rf)
                ];
        }
      } else {
        return /* tuple */[
                /* Empty */0,
                /* Empty */0
              ];
      }
    };
    var cons_enum = function (_m, _e) {
      while(true) {
        var e = _e;
        var m = _m;
        if (m) {
          _e = /* More */[
            m[1],
            m[2],
            m[3],
            e
          ];
          _m = m[0];
          continue ;
        } else {
          return e;
        }
      }  };
    var compare = function (cmp, m1, m2) {
      var _e1 = cons_enum(m1, /* End */0);
      var _e2 = cons_enum(m2, /* End */0);
      while(true) {
        var e2 = _e2;
        var e1 = _e1;
        if (e1) {
          if (e2) {
            var c = _2(funarg[/* compare */0], e1[0], e2[0]);
            if (c !== 0) {
              return c;
            } else {
              var c$1 = _2(cmp, e1[1], e2[1]);
              if (c$1 !== 0) {
                return c$1;
              } else {
                _e2 = cons_enum(e2[2], e2[3]);
                _e1 = cons_enum(e1[2], e1[3]);
                continue ;
              }
            }
          } else {
            return 1;
          }
        } else if (e2) {
          return -1;
        } else {
          return 0;
        }
      }  };
    var equal = function (cmp, m1, m2) {
      var _e1 = cons_enum(m1, /* End */0);
      var _e2 = cons_enum(m2, /* End */0);
      while(true) {
        var e2 = _e2;
        var e1 = _e1;
        if (e1) {
          if (e2 && _2(funarg[/* compare */0], e1[0], e2[0]) === 0 && _2(cmp, e1[1], e2[1])) {
            _e2 = cons_enum(e2[2], e2[3]);
            _e1 = cons_enum(e1[2], e1[3]);
            continue ;
          } else {
            return /* false */0;
          }
        } else if (e2) {
          return /* boolean */0;
        } else {
          return /* boolean */1;
        }
      }  };
    var cardinal = function (param) {
      if (param) {
        return (cardinal(param[0]) + 1 | 0) + cardinal(param[3]) | 0;
      } else {
        return 0;
      }
    };
    var bindings_aux = function (_accu, _param) {
      while(true) {
        var param = _param;
        var accu = _accu;
        if (param) {
          _param = param[0];
          _accu = /* :: */[
            /* tuple */[
              param[1],
              param[2]
            ],
            bindings_aux(accu, param[3])
          ];
          continue ;
        } else {
          return accu;
        }
      }  };
    var bindings = function (s) {
      return bindings_aux(/* [] */0, s);
    };
    return [
            /* Empty */0,
            is_empty,
            mem,
            add,
            singleton,
            remove,
            merge,
            compare,
            equal,
            iter,
            fold,
            for_all,
            exists,
            filter,
            partition,
            cardinal,
            bindings,
            min_binding,
            max_binding,
            min_binding,
            split,
            find,
            map,
            mapi
          ];
  }
  /* No side effect */

  var match = caml_sys_get_argv(/* () */0);

  var Break = create("Sys.Break");

  var argv = match[1];

  var executable_name = match[0];
  /* No side effect */

  var max_int$2 = 2147483647;
  /* No side effect */

  var max_int$3 = /* int64 */[
    /* hi */2147483647,
    /* lo */4294967295
  ];
  /* No side effect */

  function cmn(q, a, b, x, s, t) {
    var a$1 = ((a + q | 0) + x | 0) + t | 0;
    return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
  }

  function f(a, b, c, d, x, s, t) {
    return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
  }

  function g(a, b, c, d, x, s, t) {
    return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
  }

  function h(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function i(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
  }

  function cycle(x, k) {
    var a = x[0];
    var b = x[1];
    var c = x[2];
    var d = x[3];
    a = f(a, b, c, d, k[0], 7, -680876936);
    d = f(d, a, b, c, k[1], 12, -389564586);
    c = f(c, d, a, b, k[2], 17, 606105819);
    b = f(b, c, d, a, k[3], 22, -1044525330);
    a = f(a, b, c, d, k[4], 7, -176418897);
    d = f(d, a, b, c, k[5], 12, 1200080426);
    c = f(c, d, a, b, k[6], 17, -1473231341);
    b = f(b, c, d, a, k[7], 22, -45705983);
    a = f(a, b, c, d, k[8], 7, 1770035416);
    d = f(d, a, b, c, k[9], 12, -1958414417);
    c = f(c, d, a, b, k[10], 17, -42063);
    b = f(b, c, d, a, k[11], 22, -1990404162);
    a = f(a, b, c, d, k[12], 7, 1804603682);
    d = f(d, a, b, c, k[13], 12, -40341101);
    c = f(c, d, a, b, k[14], 17, -1502002290);
    b = f(b, c, d, a, k[15], 22, 1236535329);
    a = g(a, b, c, d, k[1], 5, -165796510);
    d = g(d, a, b, c, k[6], 9, -1069501632);
    c = g(c, d, a, b, k[11], 14, 643717713);
    b = g(b, c, d, a, k[0], 20, -373897302);
    a = g(a, b, c, d, k[5], 5, -701558691);
    d = g(d, a, b, c, k[10], 9, 38016083);
    c = g(c, d, a, b, k[15], 14, -660478335);
    b = g(b, c, d, a, k[4], 20, -405537848);
    a = g(a, b, c, d, k[9], 5, 568446438);
    d = g(d, a, b, c, k[14], 9, -1019803690);
    c = g(c, d, a, b, k[3], 14, -187363961);
    b = g(b, c, d, a, k[8], 20, 1163531501);
    a = g(a, b, c, d, k[13], 5, -1444681467);
    d = g(d, a, b, c, k[2], 9, -51403784);
    c = g(c, d, a, b, k[7], 14, 1735328473);
    b = g(b, c, d, a, k[12], 20, -1926607734);
    a = h(a, b, c, d, k[5], 4, -378558);
    d = h(d, a, b, c, k[8], 11, -2022574463);
    c = h(c, d, a, b, k[11], 16, 1839030562);
    b = h(b, c, d, a, k[14], 23, -35309556);
    a = h(a, b, c, d, k[1], 4, -1530992060);
    d = h(d, a, b, c, k[4], 11, 1272893353);
    c = h(c, d, a, b, k[7], 16, -155497632);
    b = h(b, c, d, a, k[10], 23, -1094730640);
    a = h(a, b, c, d, k[13], 4, 681279174);
    d = h(d, a, b, c, k[0], 11, -358537222);
    c = h(c, d, a, b, k[3], 16, -722521979);
    b = h(b, c, d, a, k[6], 23, 76029189);
    a = h(a, b, c, d, k[9], 4, -640364487);
    d = h(d, a, b, c, k[12], 11, -421815835);
    c = h(c, d, a, b, k[15], 16, 530742520);
    b = h(b, c, d, a, k[2], 23, -995338651);
    a = i(a, b, c, d, k[0], 6, -198630844);
    d = i(d, a, b, c, k[7], 10, 1126891415);
    c = i(c, d, a, b, k[14], 15, -1416354905);
    b = i(b, c, d, a, k[5], 21, -57434055);
    a = i(a, b, c, d, k[12], 6, 1700485571);
    d = i(d, a, b, c, k[3], 10, -1894986606);
    c = i(c, d, a, b, k[10], 15, -1051523);
    b = i(b, c, d, a, k[1], 21, -2054922799);
    a = i(a, b, c, d, k[8], 6, 1873313359);
    d = i(d, a, b, c, k[15], 10, -30611744);
    c = i(c, d, a, b, k[6], 15, -1560198380);
    b = i(b, c, d, a, k[13], 21, 1309151649);
    a = i(a, b, c, d, k[4], 6, -145523070);
    d = i(d, a, b, c, k[11], 10, -1120210379);
    c = i(c, d, a, b, k[2], 15, 718787259);
    b = i(b, c, d, a, k[9], 21, -343485551);
    x[0] = a + x[0] | 0;
    x[1] = b + x[1] | 0;
    x[2] = c + x[2] | 0;
    x[3] = d + x[3] | 0;
    return /* () */0;
  }

  var state = /* array */[
    1732584193,
    -271733879,
    -1732584194,
    271733878
  ];

  var md5blk = /* array */[
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];

  function caml_md5_string(s, start, len) {
    var s$1 = s.slice(start, len);
    var n = s$1.length;
    state[0] = 1732584193;
    state[1] = -271733879;
    state[2] = -1732584194;
    state[3] = 271733878;
    for(var i = 0; i <= 15; ++i){
      md5blk[i] = 0;
    }
    var i_end = n / 64 | 0;
    for(var i$1 = 1; i$1 <= i_end; ++i$1){
      for(var j = 0; j <= 15; ++j){
        var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
        md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
      }
      cycle(state, md5blk);
    }
    var s_tail = s$1.slice((i_end << 6));
    for(var kk = 0; kk <= 15; ++kk){
      md5blk[kk] = 0;
    }
    var i_end$1 = s_tail.length - 1 | 0;
    for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
      md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
    }
    var i$3 = i_end$1 + 1 | 0;
    md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
    if (i$3 > 55) {
      cycle(state, md5blk);
      for(var i$4 = 0; i$4 <= 15; ++i$4){
        md5blk[i$4] = 0;
      }
    }
    md5blk[14] = (n << 3);
    cycle(state, md5blk);
    return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
  }
  /* No side effect */

  function string$1(str) {
    return caml_md5_string(str, 0, str.length);
  }
  /* No side effect */

  var size = 54;
  /* No side effect */

  function assign(st1, st2) {
    blit$3(st2[/* st */0], 0, st1[/* st */0], 0, 55);
    st1[/* idx */1] = st2[/* idx */1];
    return /* () */0;
  }

  function full_init(s, seed) {
    var combine = function (accu, x) {
      return string$1(accu + String(x));
    };
    var extract = function (d) {
      return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
    };
    var seed$1 = seed.length === 0 ? /* int array */[0] : seed;
    var l = seed$1.length;
    for(var i = 0; i <= 54; ++i){
      caml_array_set(s[/* st */0], i, i);
    }
    var accu = "x";
    for(var i$1 = 0 ,i_finish = 54 + (
        55 > l ? 55 : l
      ) | 0; i$1 <= i_finish; ++i$1){
      var j = i$1 % 55;
      var k = i$1 % l;
      accu = combine(accu, caml_array_get(seed$1, k));
      caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
    }
    s[/* idx */1] = 0;
    return /* () */0;
  }

  function make$2(seed) {
    var result = /* record */[
      /* st */caml_make_vect(55, 0),
      /* idx */0
    ];
    full_init(result, seed);
    return result;
  }

  function make_self_init() {
    return make$2(caml_sys_random_seed(/* () */0));
  }

  function copy$3(s) {
    var result = /* record */[
      /* st */caml_make_vect(55, 0),
      /* idx */0
    ];
    assign(result, s);
    return result;
  }

  function bits(s) {
    s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
    var curval = caml_array_get(s[/* st */0], s[/* idx */1]);
    var newval = caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
    var newval30 = newval & 1073741823;
    caml_array_set(s[/* st */0], s[/* idx */1], newval30);
    return newval30;
  }

  function $$int(s, bound) {
    if (bound > 1073741823 || bound <= 0) {
      throw [
            invalid_argument,
            "Random.int"
          ];
    } else {
      var s$1 = s;
      var n = bound;
      while(true) {
        var r = bits(s$1);
        var v = r % n;
        if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
          continue ;
        } else {
          return v;
        }
      }  }
  }

  function int32(s, bound) {
    if (bound <= 0) {
      throw [
            invalid_argument,
            "Random.int32"
          ];
    } else {
      var s$1 = s;
      var n = bound;
      while(true) {
        var b1 = bits(s$1);
        var b2 = ((bits(s$1) & 1) << 30);
        var r = b1 | b2;
        var v = r % n;
        if ((r - v | 0) > ((max_int$2 - n | 0) + 1 | 0)) {
          continue ;
        } else {
          return v;
        }
      }  }
  }

  function int64(s, bound) {
    if (le(bound, /* int64 */[
            /* hi */0,
            /* lo */0
          ])) {
      throw [
            invalid_argument,
            "Random.int64"
          ];
    } else {
      var s$1 = s;
      var n = bound;
      while(true) {
        var b1 = of_int32(bits(s$1));
        var b2 = lsl_(of_int32(bits(s$1)), 30);
        var b3 = lsl_(of_int32(bits(s$1) & 7), 60);
        var r = or_(b1, /* int64 */[
              /* hi */b2[0] | b3[0],
              /* lo */((b2[1] | b3[1]) >>> 0)
            ]);
        var v = mod_$1(r, n);
        if (gt(sub(r, v), add(sub(max_int$3, n), /* int64 */[
                    /* hi */0,
                    /* lo */1
                  ]))) {
          continue ;
        } else {
          return v;
        }
      }  }
  }

  var nativeint = size === 32 ? int32 : (function (s, bound) {
        return int64(s, of_int32(bound))[1] | 0;
      });

  function rawfloat(s) {
    var r1 = bits(s);
    var r2 = bits(s);
    return (r1 / 1073741824.0 + r2) / 1073741824.0;
  }

  function $$float(s, bound) {
    return rawfloat(s) * bound;
  }

  function bool$1(s) {
    return +((bits(s) & 1) === 0);
  }

  var $$default = /* record */[
    /* st : array */[
      987910699,
      495797812,
      364182224,
      414272206,
      318284740,
      990407751,
      383018966,
      270373319,
      840823159,
      24560019,
      536292337,
      512266505,
      189156120,
      730249596,
      143776328,
      51606627,
      140166561,
      366354223,
      1003410265,
      700563762,
      981890670,
      913149062,
      526082594,
      1021425055,
      784300257,
      667753350,
      630144451,
      949649812,
      48546892,
      415514493,
      258888527,
      511570777,
      89983870,
      283659902,
      308386020,
      242688715,
      482270760,
      865188196,
      1027664170,
      207196989,
      193777847,
      619708188,
      671350186,
      149669678,
      257044018,
      87658204,
      558145612,
      183450813,
      28133145,
      901332182,
      710253903,
      510646120,
      652377910,
      409934019,
      801085050
    ],
    /* idx */0
  ];

  function $$int$1(bound) {
    return $$int($$default, bound);
  }

  function $$float$1(scale) {
    return rawfloat($$default) * scale;
  }

  function full_init$1(seed) {
    return full_init($$default, seed);
  }

  function init$3(seed) {
    return full_init($$default, /* int array */[seed]);
  }

  function self_init() {
    return full_init$1(caml_sys_random_seed(/* () */0));
  }

  function get_state() {
    return copy$3($$default);
  }

  function set_state(s) {
    return assign($$default, s);
  }

  var State = [
    make$2,
    make_self_init,
    copy$3,
    bits,
    $$int,
    int32,
    nativeint,
    int64,
    $$float,
    bool$1
  ];
  /* No side effect */

  /* No side effect */

  var forward_tag = 250;
  /* No side effect */

  var Undefined = create("CamlinternalLazy.Undefined");

  function raise_undefined() {
    throw Undefined;
  }

  function force_lazy_block(blk) {
    var closure = blk[0];
    blk[0] = raise_undefined;
    try {
      var result = _1(closure, /* () */0);
      blk[0] = result;
      blk.tag = forward_tag;
      return result;
    }
    catch (e){
      blk[0] = (function () {
          throw e;
        });
      throw e;
    }
  }
  /* No side effect */

  function generic_dirname(is_dir_sep, current_dir_name, name) {
    if (name === "") {
      return current_dir_name;
    } else {
      var _n = name.length - 1 | 0;
      while(true) {
        var n = _n;
        if (n < 0) {
          return sub$2(name, 0, 1);
        } else if (_2(is_dir_sep, name, n)) {
          _n = n - 1 | 0;
          continue ;
        } else {
          var _n$1 = n;
          while(true) {
            var n$1 = _n$1;
            if (n$1 < 0) {
              return current_dir_name;
            } else if (_2(is_dir_sep, name, n$1)) {
              var _n$2 = n$1;
              while(true) {
                var n$2 = _n$2;
                if (n$2 < 0) {
                  return sub$2(name, 0, 1);
                } else if (_2(is_dir_sep, name, n$2)) {
                  _n$2 = n$2 - 1 | 0;
                  continue ;
                } else {
                  return sub$2(name, 0, n$2 + 1 | 0);
                }
              }          } else {
              _n$1 = n$1 - 1 | 0;
              continue ;
            }
          }      }
      }  }
  }

  var current_dir_name = ".";

  function is_dir_sep(s, i) {
    return +(get(s, i) === /* "/" */47);
  }

  var temp_dir_name;

  try {
    temp_dir_name = caml_sys_getenv("TMPDIR");
  }
  catch (exn){
    if (exn === not_found) {
      temp_dir_name = "/tmp";
    } else {
      throw exn;
    }
  }

  function dirname(param) {
    return generic_dirname(is_dir_sep, current_dir_name, param);
  }

  var temp_dir_name$1;

  try {
    temp_dir_name$1 = caml_sys_getenv("TEMP");
  }
  catch (exn$1){
    if (exn$1 === not_found) {
      temp_dir_name$1 = ".";
    } else {
      throw exn$1;
    }
  }

  var prng = __(246, [(function () {
          return State[/* make_self_init */1](/* () */0);
        })]);

  var dirname$1 = dirname;
  /* match Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE


  function keycodeMap(i32) {
    var match = i32;
    var switcher = match - 8 | 0;
    if (switcher > 214 || switcher < 0) {
      return /* Nothing */65;
    } else {
      switch (switcher) {
        case 0 : 
            return /* Backspace */0;
        case 1 : 
            return /* Tab */1;
        case 5 : 
            return /* Enter */2;
        case 8 : 
            return /* LeftShift */56;
        case 9 : 
            return /* LeftCtrl */55;
        case 10 : 
            return /* LeftAlt */57;
        case 12 : 
            return /* CapsLock */63;
        case 19 : 
            return /* Escape */3;
        case 24 : 
            return /* Space */4;
        case 29 : 
            return /* Left */52;
        case 30 : 
            return /* Up */54;
        case 31 : 
            return /* Right */51;
        case 32 : 
            return /* Down */53;
        case 40 : 
            return /* Num_0 */10;
        case 41 : 
            return /* Num_1 */11;
        case 42 : 
            return /* Num_2 */12;
        case 43 : 
            return /* Num_3 */13;
        case 44 : 
            return /* Num_4 */14;
        case 45 : 
            return /* Num_5 */15;
        case 46 : 
            return /* Num_6 */16;
        case 47 : 
            return /* Num_7 */17;
        case 48 : 
            return /* Num_8 */18;
        case 49 : 
            return /* Num_9 */19;
        case 57 : 
            return /* A */25;
        case 58 : 
            return /* B */26;
        case 59 : 
            return /* C */27;
        case 60 : 
            return /* D */28;
        case 61 : 
            return /* E */29;
        case 62 : 
            return /* F */30;
        case 63 : 
            return /* G */31;
        case 64 : 
            return /* H */32;
        case 65 : 
            return /* I */33;
        case 66 : 
            return /* J */34;
        case 67 : 
            return /* K */35;
        case 68 : 
            return /* L */36;
        case 69 : 
            return /* M */37;
        case 70 : 
            return /* N */38;
        case 71 : 
            return /* O */39;
        case 72 : 
            return /* P */40;
        case 73 : 
            return /* Q */41;
        case 74 : 
            return /* R */42;
        case 75 : 
            return /* S */43;
        case 76 : 
            return /* T */44;
        case 77 : 
            return /* U */45;
        case 78 : 
            return /* V */46;
        case 79 : 
            return /* W */47;
        case 80 : 
            return /* X */48;
        case 81 : 
            return /* Y */49;
        case 82 : 
            return /* Z */50;
        case 83 : 
            return /* LeftOsKey */58;
        case 85 : 
            return /* RightOsKey */62;
        case 178 : 
            return /* Semicolon */20;
        case 179 : 
            return /* Equals */21;
        case 180 : 
            return /* Comma */6;
        case 181 : 
            return /* Minus */7;
        case 182 : 
            return /* Period */8;
        case 183 : 
            return /* Slash */9;
        case 184 : 
            return /* Backtick */64;
        case 2 : 
        case 3 : 
        case 4 : 
        case 6 : 
        case 7 : 
        case 11 : 
        case 13 : 
        case 14 : 
        case 15 : 
        case 16 : 
        case 17 : 
        case 18 : 
        case 20 : 
        case 21 : 
        case 22 : 
        case 23 : 
        case 25 : 
        case 26 : 
        case 27 : 
        case 28 : 
        case 33 : 
        case 34 : 
        case 35 : 
        case 36 : 
        case 37 : 
        case 38 : 
        case 39 : 
        case 50 : 
        case 51 : 
        case 52 : 
        case 53 : 
        case 54 : 
        case 55 : 
        case 56 : 
        case 84 : 
        case 86 : 
        case 87 : 
        case 88 : 
        case 89 : 
        case 90 : 
        case 91 : 
        case 92 : 
        case 93 : 
        case 94 : 
        case 95 : 
        case 96 : 
        case 97 : 
        case 98 : 
        case 99 : 
        case 100 : 
        case 101 : 
        case 102 : 
        case 103 : 
        case 104 : 
        case 105 : 
        case 106 : 
        case 107 : 
        case 108 : 
        case 109 : 
        case 110 : 
        case 111 : 
        case 112 : 
        case 113 : 
        case 114 : 
        case 115 : 
        case 116 : 
        case 117 : 
        case 118 : 
        case 119 : 
        case 120 : 
        case 121 : 
        case 122 : 
        case 123 : 
        case 124 : 
        case 125 : 
        case 126 : 
        case 127 : 
        case 128 : 
        case 129 : 
        case 130 : 
        case 131 : 
        case 132 : 
        case 133 : 
        case 134 : 
        case 135 : 
        case 136 : 
        case 137 : 
        case 138 : 
        case 139 : 
        case 140 : 
        case 141 : 
        case 142 : 
        case 143 : 
        case 144 : 
        case 145 : 
        case 146 : 
        case 147 : 
        case 148 : 
        case 149 : 
        case 150 : 
        case 151 : 
        case 152 : 
        case 153 : 
        case 154 : 
        case 155 : 
        case 156 : 
        case 157 : 
        case 158 : 
        case 159 : 
        case 160 : 
        case 161 : 
        case 162 : 
        case 163 : 
        case 164 : 
        case 165 : 
        case 166 : 
        case 167 : 
        case 168 : 
        case 169 : 
        case 170 : 
        case 171 : 
        case 172 : 
        case 173 : 
        case 174 : 
        case 175 : 
        case 176 : 
        case 177 : 
        case 185 : 
        case 186 : 
        case 187 : 
        case 188 : 
        case 189 : 
        case 190 : 
        case 191 : 
        case 192 : 
        case 193 : 
        case 194 : 
        case 195 : 
        case 196 : 
        case 197 : 
        case 198 : 
        case 199 : 
        case 200 : 
        case 201 : 
        case 202 : 
        case 203 : 
        case 204 : 
        case 205 : 
        case 206 : 
        case 207 : 
        case 208 : 
        case 209 : 
        case 210 : 
            return /* Nothing */65;
        case 211 : 
            return /* OpenBracket */22;
        case 212 : 
            return /* Backslash */23;
        case 213 : 
            return /* CloseBracket */24;
        case 214 : 
            return /* Quote */5;
        
      }
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var keycodeMap$1 = keycodeMap;
  /* No side effect */

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * Common utilities
   * @module glMatrix
   */

  // Configuration Constants
  const EPSILON = 0.000001;
  let ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;

  const degree = Math.PI / 180;

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */
  function create$5() {
    let out = new ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * @class 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @name mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */
  function create$6() {
    let out = new ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }


  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */
  function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */
  function translate$2(out, a, v) {
    let x = v[0], y = v[1], z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
      a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
      a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

      out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
      out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
      out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }

  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {vec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/
  function scale$3(out, a, v) {
    let x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  function rotate$3(out, a, rad, axis) {
    let x = axis[0], y = axis[1], z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (Math.abs(len) < EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }

  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */
  function ortho(out, left, right, bottom, top, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */
  function create$7() {
    let out = new ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
  }

  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */
  function length$2(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
  }

  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */
  function fromValues$4(x, y, z) {
    let out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */
  function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x*x + y*y + z*z;
    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
      out[0] = a[0] * len;
      out[1] = a[1] * len;
      out[2] = a[2] * len;
    }
    return out;
  }

  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */
  function cross(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2];
    let bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }

  /**
   * Alias for {@link vec3.length}
   * @function
   */
  const len$1 = length$2;

  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */
  const forEach = (function() {
    let vec = create$7();

    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if(!stride) {
        stride = 3;
      }

      if(!offset) {
        offset = 0;
      }

      if(count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }

      for(i = offset; i < l; i += stride) {
        vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
        fn(vec, vec, arg);
        a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
      }

      return a;
    };
  })();

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */
  function create$8() {
    let out = new ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
  }

  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */
  function normalize$1(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x*x + y*y + z*z + w*w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
    }
    return out;
  }

  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */
  const forEach$1 = (function() {
    let vec = create$8();

    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if(!stride) {
        stride = 4;
      }

      if(!offset) {
        offset = 0;
      }

      if(count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }

      for(i = offset; i < l; i += stride) {
        vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
        fn(vec, vec, arg);
        a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
      }

      return a;
    };
  })();

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */
  function create$9() {
    let out = new ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }

  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }

  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {quat} out
   */
  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
      cosom = -cosom;
      bx = - bx;
      by = - by;
      bz = - bz;
      bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
      // standard case (slerp)
      omega  = Math.acos(cosom);
      sinom  = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
  }

  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */
  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if ( fTrace > 0.0 ) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0);  // 2w
      out[3] = 0.5 * fRoot;
      fRoot = 0.5/fRoot;  // 1/(4w)
      out[0] = (m[5]-m[7])*fRoot;
      out[1] = (m[6]-m[2])*fRoot;
      out[2] = (m[1]-m[3])*fRoot;
    } else {
      // |w| <= 1/2
      let i = 0;
      if ( m[4] > m[0] )
        i = 1;
      if ( m[8] > m[i*3+i] )
        i = 2;
      let j = (i+1)%3;
      let k = (i+2)%3;

      fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
      out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
      out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }

    return out;
  }

  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */
  const normalize$2 = normalize$1;

  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {vec3} a the initial vector
   * @param {vec3} b the destination vector
   * @returns {quat} out
   */
  const rotationTo = (function() {
    let tmpvec3 = create$7();
    let xUnitVec3 = fromValues$4(1,0,0);
    let yUnitVec3 = fromValues$4(0,1,0);

    return function(out, a, b) {
      let dot$$1 = dot(a, b);
      if (dot$$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len$1(tmpvec3) < 0.000001)
          cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$$1;
        return normalize$2(out, out);
      }
    };
  })();

  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {quat} c the third operand
   * @param {quat} d the fourth operand
   * @param {Number} t interpolation amount
   * @returns {quat} out
   */
  const sqlerp = (function () {
    let temp1 = create$9();
    let temp2 = create$9();

    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));

      return out;
    };
  }());

  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */
  const setAxes = (function() {
    let matr = create$5();

    return function(out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];

      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];

      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];

      return normalize$2(out, fromMat3(out, matr));
    };
  })();

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE. */

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */
  function create$11() {
    let out = new ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
  }

  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */
  const forEach$2 = (function() {
    let vec = create$11();

    return function(a, stride, offset, count, fn, arg) {
      let i, l;
      if(!stride) {
        stride = 2;
      }

      if(!offset) {
        offset = 0;
      }

      if(count) {
        l = Math.min((count * stride) + offset, a.length);
      } else {
        l = a.length;
      }

      for(i = offset; i < l; i += stride) {
        vec[0] = a[i]; vec[1] = a[i+1];
        fn(vec, vec, arg);
        a[i] = vec[0]; a[i+1] = vec[1];
      }

      return a;
    };
  })();

  /**
   * @fileoverview gl-matrix - High performance matrix and vector operations
   * @author Brandon Jones
   * @author Colin MacKenzie IV
   * @version 2.4.0
   */

  function to_js_boolean(b) {
    if (b) {
      return true;
    } else {
      return false;
    }
  }
  /* No side effect */

  function null_undefined_to_opt(x) {
    if (x === null || x === undefined) {
      return /* None */0;
    } else {
      return /* Some */[x];
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE


  var triangles = 4;

  var texture0 = 33984;

  var texture_2d = 3553;

  var blend = 3042;

  var texture_wrap_s = 10242;

  var texture_wrap_t = 10243;

  var clamp_to_edge = 33071;

  var src_alpha = 770;

  var one_minus_src_alpha = 771;

  var rgba = 6408;

  var array_buffer = 34962;

  var element_array_buffer = 34963;

  var stream_draw = 35040;

  var float_ = 5126;

  var fragment_shader = 35632;

  var vertex_shader = 35633;

  var depth_buffer_bit = 256;

  var color_buffer_bit = 16384;

  var unsigned_short = 5123;

  var unsigned_byte = 5121;

  var texture_mag_filter = 10240;

  var texture_min_filter = 10241;

  var nearest = 9728;

  var linear = 9729;

  var linear_mipmap_nearest = 9985;
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var $$window = (window);

  var makeAudioContext = ( function() { return new (window.AudioContext || window.webkitAudioContext)(); } );

  function readFile(filename, cb) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = (function () {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
          return _1(cb, rawFile.responseText);
        } else {
          return 0;
        }
      });
    rawFile.send(null);
    return /* () */0;
  }

  var File = /* module */[/* readFile */readFile];

  function getWidth(param) {
    return param[0].width / window.devicePixelRatio | 0;
  }

  function getHeight(param) {
    return param[0].height / window.devicePixelRatio | 0;
  }

  function getPixelWidth(param) {
    return param[0].width | 0;
  }

  function getPixelHeight(param) {
    return param[0].height | 0;
  }

  function getPixelScale() {
    return window.devicePixelRatio;
  }

  function init$4(screen, _) {
    var node = screen ? null_undefined_to_opt(document.getElementById(screen[0])) : /* None */0;
    var canvas;
    if (node) {
      canvas = node[0];
    } else {
      var canvas$1 = document.createElement("canvas");
      document.body.appendChild(canvas$1);
      canvas = canvas$1;
    }
    canvas.style.backgroundColor = "black";
    return /* tuple */[
            canvas,
            _1(makeAudioContext, /* () */0)
          ];
  }

  function setWindowSize(param, width, height) {
    var w = param[0];
    w.width = width * window.devicePixelRatio | 0;
    w.height = height * window.devicePixelRatio | 0;
    w.style.width = String(width) + "px";
    w.style.height = String(height) + "px";
    return /* () */0;
  }

  function getContext(param) {
    return param[0].getContext("webgl", {
                preserveDrawingBuffer: /* boolean */1,
                antialias: /* boolean */1
              });
  }

  var Window = /* module */[
    /* getWidth */getWidth,
    /* getHeight */getHeight,
    /* getPixelWidth */getPixelWidth,
    /* getPixelHeight */getPixelHeight,
    /* getPixelScale */getPixelScale,
    /* init */init$4,
    /* setWindowSize */setWindowSize,
    /* getContext */getContext
  ];

  function loadSound(param, path, cb) {
    var audioctx = param[1];
    var rawFile = new XMLHttpRequest();
    rawFile.responseType = "arraybuffer";
    rawFile.open("GET", path, true);
    rawFile.onreadystatechange = (function () {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
          audioctx.decodeAudioData(rawFile.response, cb);
          return /* () */0;
        } else {
          return 0;
        }
      });
    rawFile.send(null);
    return /* () */0;
  }

  function playSound(param, sound, volume, loop) {
    var audioctx = param[1];
    var src = audioctx.createBufferSource();
    var gain = audioctx.createGain();
    gain.gain.value = volume;
    src.buffer = sound;
    src.connect(gain);
    gain.connect(audioctx.destination);
    src.start(0.0);
    src.loop = to_js_boolean(loop);
    return /* () */0;
  }

  var Audio = /* module */[
    /* loadSound */loadSound,
    /* playSound */playSound
  ];

  function render(param, mouseDown, mouseUp, mouseMove, keyDown, keyUp, windowResize, displayFunc, _) {
    var canvas = param[0];
    if (mouseDown) {
      var cb = mouseDown[0];
      canvas.addEventListener("mousedown", (function (e) {
              var match = e.button;
              var button;
              if (match > 2 || match < 0) {
                throw [
                      assert_failure,
                      [
                        "reasongl_web.re",
                        292,
                        19
                      ]
                    ];
              } else {
                button = match;
              }
              var rect = canvas.getBoundingClientRect();
              var x = e.clientX - rect.left | 0;
              var y = e.clientY - rect.top | 0;
              return _4(cb, button, /* MouseDown */0, x, y);
            }));
    }
    if (mouseUp) {
      var cb$1 = mouseUp[0];
      canvas.addEventListener("mouseup", (function (e) {
              var match = e.button;
              var button;
              if (match > 2 || match < 0) {
                throw [
                      assert_failure,
                      [
                        "reasongl_web.re",
                        314,
                        19
                      ]
                    ];
              } else {
                button = match;
              }
              var rect = canvas.getBoundingClientRect();
              var x = e.clientX - rect.left | 0;
              var y = e.clientY - rect.top | 0;
              return _4(cb$1, button, /* MouseUp */1, x, y);
            }));
    }
    if (mouseMove) {
      var cb$2 = mouseMove[0];
      canvas.addEventListener("mousemove", (function (e) {
              var rect = canvas.getBoundingClientRect();
              var x = e.clientX - rect.left | 0;
              var y = e.clientY - rect.top | 0;
              return _2(cb$2, x, y);
            }));
    }
    var keyLastPressed = [/* [] */0];
    if (keyDown) {
      var cb$3 = keyDown[0];
      $$window.addEventListener("keydown", (function (e) {
              var keycode = e.which;
              var repeat = fold_left((function (acc, k) {
                      if (acc) {
                        return /* true */1;
                      } else {
                        return +(k === keycode);
                      }
                    }), /* boolean */0, keyLastPressed[0]);
              if (!repeat) {
                keyLastPressed[0] = /* :: */[
                  keycode,
                  keyLastPressed[0]
                ];
              }
              return _2(cb$3, keycodeMap$1(keycode), repeat);
            }));
    }
    if (keyUp) {
      var cb$4 = keyUp[0];
      $$window.addEventListener("keyup", (function (e) {
              var keycode = e.which;
              keyLastPressed[0] = filter((function (k) {
                        return +(k !== keycode);
                      }))(keyLastPressed[0]);
              return _1(cb$4, keycodeMap$1(keycode));
            }));
    }
    if (windowResize) {
      var cb$5 = windowResize[0];
      $$window.addEventListener("resize", (function () {
              return _1(cb$5, /* () */0);
            }));
    }
    var frame = [/* None */0];
    var tick = function (prev, _) {
      var now = Date.now();
      _1(displayFunc, now - prev);
      var id = window.requestAnimationFrame((function (param) {
              return tick(now, param);
            }));
      frame[0] = /* Some */[id];
      canvas.__hiddenrafid = id;
      return /* () */0;
    };
    var partial_arg = Date.now();
    var id = window.requestAnimationFrame((function (param) {
            return tick(partial_arg, param);
          }));
    frame[0] = /* Some */[id];
    canvas.__hiddenrafid = id;
    return (function (play) {
        var match = frame[0];
        if (match) {
          if (play) {
            return /* boolean */1;
          } else {
            window.cancelAnimationFrame(match[0]);
            frame[0] = /* None */0;
            return /* boolean */0;
          }
        } else if (play) {
          var partial_arg = Date.now();
          var id = window.requestAnimationFrame((function (param) {
                  return tick(partial_arg, param);
                }));
          frame[0] = /* Some */[id];
          canvas.__hiddenrafid = id;
          return /* boolean */1;
        } else {
          return /* boolean */0;
        }
      });
  }

  function shaderSource(context, shader, source) {
    context.shaderSource(shader, "#version 100 \n precision highp float; \n" + source);
    return /* () */0;
  }

  function create$12(kind, size) {
    switch (kind) {
      case 0 : 
          return new Float64Array(size);
      case 1 : 
          return new Float32Array(size);
      case 2 : 
          return new Int16Array(size);
      case 3 : 
          return new Uint16Array(size);
      case 4 : 
          return new Int8Array(size);
      case 5 : 
      case 6 : 
          return new Uint8Array(size);
      case 8 : 
          throw [
                assert_failure,
                [
                  "reasongl_web.re",
                  603,
                  17
                ]
              ];
      case 7 : 
      case 9 : 
          return new Int32Array(size);
      
    }
  }

  function of_array(kind, arr) {
    switch (kind) {
      case 0 : 
          return new Float64Array(arr);
      case 1 : 
          return new Float32Array(arr);
      case 2 : 
          return new Int16Array(arr);
      case 3 : 
          return new Uint16Array(arr);
      case 4 : 
          return new Int8Array(arr);
      case 5 : 
      case 6 : 
          return new Uint8Array(arr);
      case 8 : 
          throw [
                assert_failure,
                [
                  "reasongl_web.re",
                  616,
                  17
                ]
              ];
      case 7 : 
      case 9 : 
          return new Int32Array(arr);
      
    }
  }

  function unsafe_blit(arr, arr2, offset, _) {
    arr2.set(arr, offset);
    return /* () */0;
  }

  function sub$12(arr, offset, len) {
    return arr.subarray(offset, offset + len | 0);
  }

  function readPixels_RGBA(context, x, y, width, height) {
    var data = new Uint8Array((imul(width, height) << 2));
    context.readPixels(x, y, width, height, rgba, unsigned_byte, data);
    return data;
  }

  function loadImage(filename, _, callback, _$1) {
    var image = new Image();
    image.src = filename;
    image.addEventListener("load", (function () {
            return _1(callback, /* Some */[image]);
          }));
    return /* () */0;
  }

  function loadImageFromMemory(data, _, callback, _$1) {
    var image = new Image();
    image.src = "data:image/png;base64," + btoa(data);
    image.addEventListener("load", (function () {
            return _1(callback, /* Some */[image]);
          }));
    return /* () */0;
  }

  function texImage2DWithImage(context, target, level, image) {
    context.texImage2D(target, level, rgba, rgba, unsigned_byte, image);
    return /* () */0;
  }

  function texImage2D_RGBA(context, target, level, width, height, border, data) {
    context.texImage2D(target, level, rgba, width, height, border, rgba, unsigned_byte, data);
    return /* () */0;
  }

  var texImage2D_null = ( function(gl, target, level, width, height) {
      gl.texImage2D(target, level, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } );

  function vertexAttribPointer(context, attribute, size, type_, normalize$$1, stride, offset) {
    var normalize$1$$1 = normalize$$1 ? true : false;
    context.vertexAttribPointer(attribute, size, type_, normalize$1$$1, stride, offset);
    return /* () */0;
  }

  function to_array(a) {
    return a;
  }

  function Mat4_001() {
    return create$6();
  }

  function Mat4_002(prim) {
    identity$3(prim);
    return /* () */0;
  }

  function Mat4_003(prim, prim$1, prim$2) {
    translate$2(prim, prim$1, prim$2);
    return /* () */0;
  }

  function Mat4_004(prim, prim$1, prim$2) {
    scale$3(prim, prim$1, prim$2);
    return /* () */0;
  }

  function Mat4_005(prim, prim$1, prim$2, prim$3) {
    rotate$3(prim, prim$1, prim$2, prim$3);
    return /* () */0;
  }

  function Mat4_006(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6) {
    ortho(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6);
    return /* () */0;
  }

  var Mat4 = /* module */[
    /* to_array */to_array,
    Mat4_001,
    Mat4_002,
    Mat4_003,
    Mat4_004,
    Mat4_005,
    Mat4_006
  ];

  function uniformMatrix4fv(context, $$location, value) {
    context.uniformMatrix4fv($$location, false, value);
    return /* () */0;
  }

  function getProgramParameter(context, program, paramName) {
    switch (paramName) {
      case 0 : 
          if (context.getProgramParameter(program, context.DELETE_STATUS)) {
            return 1;
          } else {
            return 0;
          }
      case 1 : 
          if (context.getProgramParameter(program, context.LINK_STATUS)) {
            return 1;
          } else {
            return 0;
          }
      case 2 : 
          if (context.getProgramParameter(program, context.VALIDATE_STATUS)) {
            return 1;
          } else {
            return 0;
          }
      
    }
  }

  function getShaderParameter(context, shader, paramName) {
    switch (paramName) {
      case 0 : 
          if (context.getShaderParameter(shader, context.DELETE_STATUS)) {
            return 1;
          } else {
            return 0;
          }
      case 1 : 
          if (context.getShaderParameter(shader, context.COMPILE_STATUS)) {
            return 1;
          } else {
            return 0;
          }
      case 2 : 
          return context.getShaderParameter(shader, context.SHADER_TYPE);
      
    }
  }

  var Gl_004 = /* Events : Events */[keycodeMap$1];

  function Gl_006(prim, prim$1, prim$2, prim$3, prim$4) {
    prim.clearColor(prim$1, prim$2, prim$3, prim$4);
    return /* () */0;
  }

  function Gl_007(prim) {
    return prim.createProgram();
  }

  function Gl_008(prim, prim$1) {
    return prim.createShader(prim$1);
  }

  function Gl_009(prim, prim$1, prim$2) {
    prim.attachShader(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_010(prim, prim$1) {
    prim.deleteShader(prim$1);
    return /* () */0;
  }

  function Gl_012(prim, prim$1) {
    prim.compileShader(prim$1);
    return /* () */0;
  }

  function Gl_013(prim, prim$1) {
    prim.linkProgram(prim$1);
    return /* () */0;
  }

  function Gl_014(prim, prim$1) {
    prim.useProgram(prim$1);
    return /* () */0;
  }

  function Gl_015(prim) {
    return prim.createBuffer();
  }

  function Gl_016(prim, prim$1, prim$2) {
    prim.bindBuffer(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_017(prim) {
    return prim.createTexture();
  }

  function Gl_018(prim, prim$1) {
    prim.activeTexture(prim$1);
    return /* () */0;
  }

  function Gl_019(prim, prim$1, prim$2) {
    prim.bindTexture(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_020(prim, prim$1, prim$2, prim$3) {
    prim.texParameteri(prim$1, prim$2, prim$3);
    return /* () */0;
  }

  function Gl_021(prim) {
    return prim.createFramebuffer();
  }

  function Gl_022(prim, prim$1, prim$2) {
    prim.bindFramebuffer(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_023(prim, prim$1) {
    prim.bindFramebuffer(prim$1, (null));
    return /* () */0;
  }

  function Gl_024(prim, prim$1, prim$2, prim$3, prim$4) {
    prim.framebufferTexture2D(prim$1, prim$2, prim$3, prim$4, (0));
    return /* () */0;
  }

  function Gl_025(prim, prim$1) {
    prim.enable(prim$1);
    return /* () */0;
  }

  function Gl_026(prim, prim$1) {
    prim.disable(prim$1);
    return /* () */0;
  }

  function Gl_027(prim, prim$1, prim$2) {
    prim.blendFunc(prim$1, prim$2);
    return /* () */0;
  }

  var Gl_028 = /* Bigarray */[
    create$12,
    of_array,
    (function (prim) {
        return prim.length;
      }),
    (function (prim, prim$1) {
        prim.set(prim$1);
        return /* () */0;
      }),
    unsafe_blit,
    (function (prim, prim$1) {
        return prim[prim$1];
      }),
    (function (prim, prim$1) {
        return prim[prim$1];
      }),
    (function (prim, prim$1, prim$2) {
        prim[prim$1] = prim$2;
        return /* () */0;
      }),
    (function (prim, prim$1, prim$2) {
        prim[prim$1] = prim$2;
        return /* () */0;
      }),
    sub$12
  ];

  function Gl_029(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9) {
    prim.texSubImage2D(prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9);
    return /* () */0;
  }

  function Gl_031(prim) {
    return prim.width;
  }

  function Gl_032(prim) {
    return prim.height;
  }

  function Gl_036(prim, prim$1, prim$2) {
    prim.uniform1i(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_037(prim, prim$1, prim$2) {
    prim.uniform1f(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_038(prim, prim$1, prim$2, prim$3) {
    prim.uniform2f(prim$1, prim$2, prim$3);
    return /* () */0;
  }

  function Gl_039(prim, prim$1, prim$2, prim$3, prim$4) {
    prim.uniform3f(prim$1, prim$2, prim$3, prim$4);
    return /* () */0;
  }

  function Gl_040(prim, prim$1, prim$2, prim$3, prim$4, prim$5) {
    prim.uniform4f(prim$1, prim$2, prim$3, prim$4, prim$5);
    return /* () */0;
  }

  function Gl_043(prim, prim$1, prim$2, prim$3) {
    prim.bufferData(prim$1, prim$2, prim$3);
    return /* () */0;
  }

  function Gl_044(prim, prim$1, prim$2, prim$3, prim$4) {
    prim.viewport(prim$1, prim$2, prim$3, prim$4);
    return /* () */0;
  }

  function Gl_045(prim, prim$1) {
    prim.clear(prim$1);
    return /* () */0;
  }

  function Gl_046(prim, prim$1, prim$2) {
    return prim.getUniformLocation(prim$1, prim$2);
  }

  function Gl_047(prim, prim$1, prim$2) {
    return prim.getAttribLocation(prim$1, prim$2);
  }

  function Gl_048(prim, prim$1) {
    prim.enableVertexAttribArray(prim$1);
    return /* () */0;
  }

  function Gl_050(prim, prim$1, prim$2) {
    prim.vertexAttribDivisor(prim$1, prim$2);
    return /* () */0;
  }

  function Gl_055(prim, prim$1) {
    return prim.getShaderInfoLog(prim$1);
  }

  function Gl_056(prim, prim$1) {
    return prim.getProgramInfoLog(prim$1);
  }

  function Gl_057(prim, prim$1) {
    return prim.getShaderSource(prim$1);
  }

  function Gl_058(prim, prim$1, prim$2, prim$3) {
    prim.drawArrays(prim$1, prim$2, prim$3);
    return /* () */0;
  }

  function Gl_059(prim, prim$1, prim$2, prim$3, prim$4) {
    prim.drawElements(prim$1, prim$2, prim$3, prim$4);
    return /* () */0;
  }

  function Gl_060(prim, prim$1, prim$2, prim$3, prim$4, prim$5) {
    prim.drawElementsInstanced(prim$1, prim$2, prim$3, prim$4, prim$5);
    return /* () */0;
  }

  var Gl = /* module */[
    /* target */"web",
    /* File */File,
    /* Window */Window,
    /* Audio */Audio,
    Gl_004,
    /* render */render,
    Gl_006,
    Gl_007,
    Gl_008,
    Gl_009,
    Gl_010,
    /* shaderSource */shaderSource,
    Gl_012,
    Gl_013,
    Gl_014,
    Gl_015,
    Gl_016,
    Gl_017,
    Gl_018,
    Gl_019,
    Gl_020,
    Gl_021,
    Gl_022,
    Gl_023,
    Gl_024,
    Gl_025,
    Gl_026,
    Gl_027,
    Gl_028,
    Gl_029,
    /* readPixels_RGBA */readPixels_RGBA,
    Gl_031,
    Gl_032,
    /* loadImage */loadImage,
    /* loadImageFromMemory */loadImageFromMemory,
    /* texImage2DWithImage */texImage2DWithImage,
    Gl_036,
    Gl_037,
    Gl_038,
    Gl_039,
    Gl_040,
    /* texImage2D_RGBA */texImage2D_RGBA,
    /* texImage2D_null */texImage2D_null,
    Gl_043,
    Gl_044,
    Gl_045,
    Gl_046,
    Gl_047,
    Gl_048,
    /* vertexAttribPointer */vertexAttribPointer,
    Gl_050,
    /* Mat4 */Mat4,
    /* uniformMatrix4fv */uniformMatrix4fv,
    /* getProgramParameter */getProgramParameter,
    /* getShaderParameter */getShaderParameter,
    Gl_055,
    Gl_056,
    Gl_057,
    Gl_058,
    Gl_059,
    Gl_060
  ];
  /* window Not a pure module */

  function Make$1(funarg) {
    var height = function (param) {
      if (param) {
        return param[3];
      } else {
        return 0;
      }
    };
    var create = function (l, v, r) {
      var hl = l ? l[3] : 0;
      var hr = r ? r[3] : 0;
      return /* Node */[
              l,
              v,
              r,
              hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    };
    var bal = function (l, v, r) {
      var hl = l ? l[3] : 0;
      var hr = r ? r[3] : 0;
      if (hl > (hr + 2 | 0)) {
        if (l) {
          var lr = l[2];
          var lv = l[1];
          var ll = l[0];
          if (height(ll) >= height(lr)) {
            return create(ll, lv, create(lr, v, r));
          } else if (lr) {
            return create(create(ll, lv, lr[0]), lr[1], create(lr[2], v, r));
          } else {
            throw [
                  invalid_argument,
                  "Set.bal"
                ];
          }
        } else {
          throw [
                invalid_argument,
                "Set.bal"
              ];
        }
      } else if (hr > (hl + 2 | 0)) {
        if (r) {
          var rr = r[2];
          var rv = r[1];
          var rl = r[0];
          if (height(rr) >= height(rl)) {
            return create(create(l, v, rl), rv, rr);
          } else if (rl) {
            return create(create(l, v, rl[0]), rl[1], create(rl[2], rv, rr));
          } else {
            throw [
                  invalid_argument,
                  "Set.bal"
                ];
          }
        } else {
          throw [
                invalid_argument,
                "Set.bal"
              ];
        }
      } else {
        return /* Node */[
                l,
                v,
                r,
                hl >= hr ? hl + 1 | 0 : hr + 1 | 0
              ];
      }
    };
    var add = function (x, t) {
      if (t) {
        var r = t[2];
        var v = t[1];
        var l = t[0];
        var c = _2(funarg[/* compare */0], x, v);
        if (c === 0) {
          return t;
        } else if (c < 0) {
          return bal(add(x, l), v, r);
        } else {
          return bal(l, v, add(x, r));
        }
      } else {
        return /* Node */[
                /* Empty */0,
                x,
                /* Empty */0,
                1
              ];
      }
    };
    var singleton = function (x) {
      return /* Node */[
              /* Empty */0,
              x,
              /* Empty */0,
              1
            ];
    };
    var add_min_element = function (v, param) {
      if (param) {
        return bal(add_min_element(v, param[0]), param[1], param[2]);
      } else {
        return singleton(v);
      }
    };
    var add_max_element = function (v, param) {
      if (param) {
        return bal(param[0], param[1], add_max_element(v, param[2]));
      } else {
        return singleton(v);
      }
    };
    var join = function (l, v, r) {
      if (l) {
        if (r) {
          var rh = r[3];
          var lh = l[3];
          if (lh > (rh + 2 | 0)) {
            return bal(l[0], l[1], join(l[2], v, r));
          } else if (rh > (lh + 2 | 0)) {
            return bal(join(l, v, r[0]), r[1], r[2]);
          } else {
            return create(l, v, r);
          }
        } else {
          return add_max_element(v, l);
        }
      } else {
        return add_min_element(v, r);
      }
    };
    var min_elt = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var l = param[0];
          if (l) {
            _param = l;
            continue ;
          } else {
            return param[1];
          }
        } else {
          throw not_found;
        }
      }  };
    var max_elt = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var r = param[2];
          if (r) {
            _param = r;
            continue ;
          } else {
            return param[1];
          }
        } else {
          throw not_found;
        }
      }  };
    var remove_min_elt = function (param) {
      if (param) {
        var l = param[0];
        if (l) {
          return bal(remove_min_elt(l), param[1], param[2]);
        } else {
          return param[2];
        }
      } else {
        throw [
              invalid_argument,
              "Set.remove_min_elt"
            ];
      }
    };
    var concat$$1 = function (t1, t2) {
      if (t1) {
        if (t2) {
          return join(t1, min_elt(t2), remove_min_elt(t2));
        } else {
          return t1;
        }
      } else {
        return t2;
      }
    };
    var split$$1 = function (x, param) {
      if (param) {
        var r = param[2];
        var v = param[1];
        var l = param[0];
        var c = _2(funarg[/* compare */0], x, v);
        if (c === 0) {
          return /* tuple */[
                  l,
                  /* boolean */1,
                  r
                ];
        } else if (c < 0) {
          var match = split$$1(x, l);
          return /* tuple */[
                  match[0],
                  match[1],
                  join(match[2], v, r)
                ];
        } else {
          var match$1 = split$$1(x, r);
          return /* tuple */[
                  join(l, v, match$1[0]),
                  match$1[1],
                  match$1[2]
                ];
        }
      } else {
        return /* tuple */[
                /* Empty */0,
                /* boolean */0,
                /* Empty */0
              ];
      }
    };
    var is_empty = function (param) {
      if (param) {
        return /* boolean */0;
      } else {
        return /* boolean */1;
      }
    };
    var mem$$1 = function (x, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var c = _2(funarg[/* compare */0], x, param[1]);
          if (c === 0) {
            return /* true */1;
          } else {
            _param = c < 0 ? param[0] : param[2];
            continue ;
          }
        } else {
          return /* boolean */0;
        }
      }  };
    var remove = function (x, param) {
      if (param) {
        var r = param[2];
        var v = param[1];
        var l = param[0];
        var c = _2(funarg[/* compare */0], x, v);
        if (c === 0) {
          var t1 = l;
          var t2 = r;
          if (t1) {
            if (t2) {
              return bal(t1, min_elt(t2), remove_min_elt(t2));
            } else {
              return t1;
            }
          } else {
            return t2;
          }
        } else if (c < 0) {
          return bal(remove(x, l), v, r);
        } else {
          return bal(l, v, remove(x, r));
        }
      } else {
        return /* Empty */0;
      }
    };
    var union = function (s1, s2) {
      if (s1) {
        if (s2) {
          var h2 = s2[3];
          var v2 = s2[1];
          var h1 = s1[3];
          var v1 = s1[1];
          if (h1 >= h2) {
            if (h2 === 1) {
              return add(v2, s1);
            } else {
              var match = split$$1(v1, s2);
              return join(union(s1[0], match[0]), v1, union(s1[2], match[2]));
            }
          } else if (h1 === 1) {
            return add(v1, s2);
          } else {
            var match$1 = split$$1(v2, s1);
            return join(union(match$1[0], s2[0]), v2, union(match$1[2], s2[2]));
          }
        } else {
          return s1;
        }
      } else {
        return s2;
      }
    };
    var inter = function (s1, s2) {
      if (s1 && s2) {
        var r1 = s1[2];
        var v1 = s1[1];
        var l1 = s1[0];
        var match = split$$1(v1, s2);
        var l2 = match[0];
        if (match[1]) {
          return join(inter(l1, l2), v1, inter(r1, match[2]));
        } else {
          return concat$$1(inter(l1, l2), inter(r1, match[2]));
        }
      } else {
        return /* Empty */0;
      }
    };
    var diff = function (s1, s2) {
      if (s1) {
        if (s2) {
          var r1 = s1[2];
          var v1 = s1[1];
          var l1 = s1[0];
          var match = split$$1(v1, s2);
          var l2 = match[0];
          if (match[1]) {
            return concat$$1(diff(l1, l2), diff(r1, match[2]));
          } else {
            return join(diff(l1, l2), v1, diff(r1, match[2]));
          }
        } else {
          return s1;
        }
      } else {
        return /* Empty */0;
      }
    };
    var cons_enum = function (_s, _e) {
      while(true) {
        var e = _e;
        var s = _s;
        if (s) {
          _e = /* More */[
            s[1],
            s[2],
            e
          ];
          _s = s[0];
          continue ;
        } else {
          return e;
        }
      }  };
    var compare = function (s1, s2) {
      var _e1 = cons_enum(s1, /* End */0);
      var _e2 = cons_enum(s2, /* End */0);
      while(true) {
        var e2 = _e2;
        var e1 = _e1;
        if (e1) {
          if (e2) {
            var c = _2(funarg[/* compare */0], e1[0], e2[0]);
            if (c !== 0) {
              return c;
            } else {
              _e2 = cons_enum(e2[1], e2[2]);
              _e1 = cons_enum(e1[1], e1[2]);
              continue ;
            }
          } else {
            return 1;
          }
        } else if (e2) {
          return -1;
        } else {
          return 0;
        }
      }  };
    var equal = function (s1, s2) {
      return +(compare(s1, s2) === 0);
    };
    var subset = function (_s1, _s2) {
      while(true) {
        var s2 = _s2;
        var s1 = _s1;
        if (s1) {
          if (s2) {
            var r2 = s2[2];
            var l2 = s2[0];
            var r1 = s1[2];
            var v1 = s1[1];
            var l1 = s1[0];
            var c = _2(funarg[/* compare */0], v1, s2[1]);
            if (c === 0) {
              if (subset(l1, l2)) {
                _s2 = r2;
                _s1 = r1;
                continue ;
              } else {
                return /* false */0;
              }
            } else if (c < 0) {
              if (subset(/* Node */[
                      l1,
                      v1,
                      /* Empty */0,
                      0
                    ], l2)) {
                _s1 = r1;
                continue ;
              } else {
                return /* false */0;
              }
            } else if (subset(/* Node */[
                    /* Empty */0,
                    v1,
                    r1,
                    0
                  ], r2)) {
              _s1 = l1;
              continue ;
            } else {
              return /* false */0;
            }
          } else {
            return /* boolean */0;
          }
        } else {
          return /* boolean */1;
        }
      }  };
    var iter$$1 = function (f, _param) {
      while(true) {
        var param = _param;
        if (param) {
          iter$$1(f, param[0]);
          _1(f, param[1]);
          _param = param[2];
          continue ;
        } else {
          return /* () */0;
        }
      }  };
    var fold = function (f, _s, _accu) {
      while(true) {
        var accu = _accu;
        var s = _s;
        if (s) {
          _accu = _2(f, s[1], fold(f, s[0], accu));
          _s = s[2];
          continue ;
        } else {
          return accu;
        }
      }  };
    var for_all$$1 = function (p, _param) {
      while(true) {
        var param = _param;
        if (param) {
          if (_1(p, param[1]) && for_all$$1(p, param[0])) {
            _param = param[2];
            continue ;
          } else {
            return /* false */0;
          }
        } else {
          return /* boolean */1;
        }
      }  };
    var exists$$1 = function (p, _param) {
      while(true) {
        var param = _param;
        if (param) {
          if (_1(p, param[1]) || exists$$1(p, param[0])) {
            return /* true */1;
          } else {
            _param = param[2];
            continue ;
          }
        } else {
          return /* boolean */0;
        }
      }  };
    var filter$$1 = function (p, param) {
      if (param) {
        var v = param[1];
        var l$prime = filter$$1(p, param[0]);
        var pv = _1(p, v);
        var r$prime = filter$$1(p, param[2]);
        if (pv) {
          return join(l$prime, v, r$prime);
        } else {
          return concat$$1(l$prime, r$prime);
        }
      } else {
        return /* Empty */0;
      }
    };
    var partition$$1 = function (p, param) {
      if (param) {
        var v = param[1];
        var match = partition$$1(p, param[0]);
        var lf = match[1];
        var lt = match[0];
        var pv = _1(p, v);
        var match$1 = partition$$1(p, param[2]);
        var rf = match$1[1];
        var rt = match$1[0];
        if (pv) {
          return /* tuple */[
                  join(lt, v, rt),
                  concat$$1(lf, rf)
                ];
        } else {
          return /* tuple */[
                  concat$$1(lt, rt),
                  join(lf, v, rf)
                ];
        }
      } else {
        return /* tuple */[
                /* Empty */0,
                /* Empty */0
              ];
      }
    };
    var cardinal = function (param) {
      if (param) {
        return (cardinal(param[0]) + 1 | 0) + cardinal(param[2]) | 0;
      } else {
        return 0;
      }
    };
    var elements_aux = function (_accu, _param) {
      while(true) {
        var param = _param;
        var accu = _accu;
        if (param) {
          _param = param[0];
          _accu = /* :: */[
            param[1],
            elements_aux(accu, param[2])
          ];
          continue ;
        } else {
          return accu;
        }
      }  };
    var elements = function (s) {
      return elements_aux(/* [] */0, s);
    };
    var find$$1 = function (x, _param) {
      while(true) {
        var param = _param;
        if (param) {
          var v = param[1];
          var c = _2(funarg[/* compare */0], x, v);
          if (c === 0) {
            return v;
          } else {
            _param = c < 0 ? param[0] : param[2];
            continue ;
          }
        } else {
          throw not_found;
        }
      }  };
    var of_list = function (l) {
      if (l) {
        var match = l[1];
        var x0 = l[0];
        if (match) {
          var match$1 = match[1];
          var x1 = match[0];
          if (match$1) {
            var match$2 = match$1[1];
            var x2 = match$1[0];
            if (match$2) {
              var match$3 = match$2[1];
              var x3 = match$2[0];
              if (match$3) {
                if (match$3[1]) {
                  var l$1 = sort_uniq(funarg[/* compare */0], l);
                  var sub = function (n, l) {
                    var exit = 0;
                    if (n > 3 || n < 0) {
                      exit = 1;
                    } else {
                      switch (n) {
                        case 0 : 
                            return /* tuple */[
                                    /* Empty */0,
                                    l
                                  ];
                        case 1 : 
                            if (l) {
                              return /* tuple */[
                                      /* Node */[
                                        /* Empty */0,
                                        l[0],
                                        /* Empty */0,
                                        1
                                      ],
                                      l[1]
                                    ];
                            } else {
                              exit = 1;
                            }
                            break;
                        case 2 : 
                            if (l) {
                              var match = l[1];
                              if (match) {
                                return /* tuple */[
                                        /* Node */[
                                          /* Node */[
                                            /* Empty */0,
                                            l[0],
                                            /* Empty */0,
                                            1
                                          ],
                                          match[0],
                                          /* Empty */0,
                                          2
                                        ],
                                        match[1]
                                      ];
                              } else {
                                exit = 1;
                              }
                            } else {
                              exit = 1;
                            }
                            break;
                        case 3 : 
                            if (l) {
                              var match$1 = l[1];
                              if (match$1) {
                                var match$2 = match$1[1];
                                if (match$2) {
                                  return /* tuple */[
                                          /* Node */[
                                            /* Node */[
                                              /* Empty */0,
                                              l[0],
                                              /* Empty */0,
                                              1
                                            ],
                                            match$1[0],
                                            /* Node */[
                                              /* Empty */0,
                                              match$2[0],
                                              /* Empty */0,
                                              1
                                            ],
                                            2
                                          ],
                                          match$2[1]
                                        ];
                                } else {
                                  exit = 1;
                                }
                              } else {
                                exit = 1;
                              }
                            } else {
                              exit = 1;
                            }
                            break;
                        
                      }
                    }
                    if (exit === 1) {
                      var nl = n / 2 | 0;
                      var match$3 = sub(nl, l);
                      var l$1 = match$3[1];
                      if (l$1) {
                        var match$4 = sub((n - nl | 0) - 1 | 0, l$1[1]);
                        return /* tuple */[
                                create(match$3[0], l$1[0], match$4[0]),
                                match$4[1]
                              ];
                      } else {
                        throw [
                              assert_failure,
                              [
                                "set.ml",
                                372,
                                18
                              ]
                            ];
                      }
                    }
                    
                  };
                  return sub(length(l$1), l$1)[0];
                } else {
                  return add(match$3[0], add(x3, add(x2, add(x1, singleton(x0)))));
                }
              } else {
                return add(x3, add(x2, add(x1, singleton(x0))));
              }
            } else {
              return add(x2, add(x1, singleton(x0)));
            }
          } else {
            return add(x1, singleton(x0));
          }
        } else {
          return singleton(x0);
        }
      } else {
        return /* Empty */0;
      }
    };
    return [
            /* Empty */0,
            is_empty,
            mem$$1,
            add,
            singleton,
            remove,
            union,
            inter,
            diff,
            compare,
            equal,
            subset,
            iter$$1,
            fold,
            for_all$$1,
            exists$$1,
            filter$$1,
            partition$$1,
            cardinal,
            elements,
            min_elt,
            max_elt,
            min_elt,
            split$$1,
            find$$1,
            of_list
          ];
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var compare$8 = caml_compare;

  var KeySet = Make$1(/* module */[/* compare */compare$8]);

  function peekch(param) {
    var i = param[1];
    var str = param[0];
    if (i < str.length) {
      return /* Some */[get(str, i)];
    } else {
      return /* None */0;
    }
  }

  function popch(param) {
    return /* tuple */[
            param[0],
            param[1] + 1 | 0
          ];
  }

  function peekn(param, len) {
    var i = param[1];
    var str = param[0];
    if ((i + len | 0) < str.length) {
      return /* Some */[sub$2(str, i, len)];
    } else {
      return /* None */0;
    }
  }

  function skipWhite$1(param) {
    var str = param[0];
    var len = str.length;
    var _n = param[1];
    while(true) {
      var n = _n;
      if (n >= len) {
        return /* tuple */[
                str,
                n
              ];
      } else if (get(str, n) === /* " " */32) {
        _n = n + 1 | 0;
        continue ;
      } else {
        return /* tuple */[
                str,
                n
              ];
      }
    }}

  function popn(param, len) {
    return /* tuple */[
            param[0],
            param[1] + len | 0
          ];
  }

  function match_(stream, matchstr) {
    var len = matchstr.length;
    var match = peekn(stream, len);
    if (match) {
      var peek = match[0];
      if (peek === matchstr) {
        return popn(stream, len);
      } else {
        return failwith("Could not match '" + (matchstr + ("', got '" + (peek + "' instead."))));
      }
    } else {
      return failwith("Could not match " + matchstr);
    }
  }

  function charsRemaining(param) {
    return param[0].length - param[1] | 0;
  }

  function create$13(str) {
    return /* tuple */[
            str,
            0
          ];
  }

  var Stream = /* module */[
    /* empty : [] */0,
    /* peekch */peekch,
    /* popch */popch,
    /* peekn */peekn,
    /* skipWhite */skipWhite$1,
    /* popn */popn,
    /* match_ */match_,
    /* charsRemaining */charsRemaining,
    /* create */create$13
  ];

  function append_char(s, c) {
    return s + make$1(1, c);
  }

  function split$1(str, sep) {
    var _stream = /* tuple */[
      str,
      0
    ];
    var sep$1 = sep;
    var _accstr = "";
    var _acc = /* [] */0;
    while(true) {
      var acc = _acc;
      var accstr = _accstr;
      var stream = _stream;
      var match = peekch(stream);
      if (match) {
        var c = match[0];
        if (c === sep$1) {
          _acc = /* :: */[
            accstr,
            acc
          ];
          _accstr = "";
          _stream = popch(stream);
          continue ;
        } else {
          _accstr = append_char(accstr, c);
          _stream = popch(stream);
          continue ;
        }
      } else {
        return rev(/* :: */[
                    accstr,
                    acc
                  ]);
      }
    }}

  var circularBufferSize = 60000;

  var vertexSize = 8;
  /* KeySet Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var identity$6 = /* float array */[
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1
  ];

  function createIdentity() {
    return /* float array */[
            1,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1
          ];
  }

  function createTranslation(dx, dy) {
    return /* float array */[
            1,
            0,
            dx,
            0,
            1,
            dy,
            0,
            0,
            1
          ];
  }

  function createScaling(sx, sy) {
    return /* float array */[
            sx,
            0,
            0,
            0,
            sy,
            0,
            0,
            0,
            1
          ];
  }

  function copyInto(src, dst) {
    caml_array_set(dst, 0, caml_array_get(src, 0));
    caml_array_set(dst, 1, caml_array_get(src, 1));
    caml_array_set(dst, 2, caml_array_get(src, 2));
    caml_array_set(dst, 3, caml_array_get(src, 3));
    caml_array_set(dst, 4, caml_array_get(src, 4));
    caml_array_set(dst, 5, caml_array_get(src, 5));
    caml_array_set(dst, 6, caml_array_get(src, 6));
    caml_array_set(dst, 7, caml_array_get(src, 7));
    return caml_array_set(dst, 8, caml_array_get(src, 8));
  }

  function matmatmul(mat1, mat2) {
    if (mat1.length !== 9) {
      throw [
            assert_failure,
            [
              "Reprocessing_Matrix.re",
              56,
              9
            ]
          ];
    } else {
      var m0 = mat1[0];
      var m1 = mat1[1];
      var m2 = mat1[2];
      var m3 = mat1[3];
      var m4 = mat1[4];
      var m5 = mat1[5];
      var m6 = mat1[6];
      var m7 = mat1[7];
      var m8 = mat1[8];
      if (mat2.length !== 9) {
        throw [
              assert_failure,
              [
                "Reprocessing_Matrix.re",
                56,
                9
              ]
            ];
      } else {
        var ma = mat2[0];
        var mb = mat2[1];
        var mc = mat2[2];
        var md = mat2[3];
        var me = mat2[4];
        var mf = mat2[5];
        var mg = mat2[6];
        var mh = mat2[7];
        var mi = mat2[8];
        caml_array_set(mat1, 0, ma * m0 + md * m1 + mg * m2);
        caml_array_set(mat1, 1, mb * m0 + me * m1 + mh * m2);
        caml_array_set(mat1, 2, mc * m0 + mf * m1 + mi * m2);
        caml_array_set(mat1, 3, ma * m3 + md * m4 + mg * m5);
        caml_array_set(mat1, 4, mb * m3 + me * m4 + mh * m5);
        caml_array_set(mat1, 5, mc * m3 + mf * m4 + mi * m5);
        caml_array_set(mat1, 6, ma * m6 + md * m7 + mg * m8);
        caml_array_set(mat1, 7, mb * m6 + me * m7 + mh * m8);
        return caml_array_set(mat1, 8, mc * m6 + mf * m7 + mi * m8);
      }
    }
  }

  function matptmul(m, param) {
    var y = param[1];
    var x = param[0];
    return /* tuple */[
            x * caml_array_get(m, 0) + y * caml_array_get(m, 1) + caml_array_get(m, 2),
            x * caml_array_get(m, 3) + y * caml_array_get(m, 4) + caml_array_get(m, 5)
          ];
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE


  var vertexShaderSource = "\n  attribute vec2 aVertexPosition;\n  attribute vec4 aVertexColor;\n  attribute vec2 aTextureCoord;\n\n  uniform mat4 uPMatrix;\n\n  varying vec4 vColor;\n  varying vec2 vTextureCoord;\n\n  void main(void) {\n    gl_Position = uPMatrix * vec4(aVertexPosition, 0.0, 1.0);\n    vColor = aVertexColor;\n    vTextureCoord = aTextureCoord;\n  }\n";

  var fragmentShaderSource = "\n  varying vec4 vColor;\n  varying vec2 vTextureCoord;\n\n  uniform sampler2D uSampler;\n\n  void main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n  }\n";
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE


  var pi = 4.0 * Math.atan(1.0);

  var two_pi = 2.0 * pi;

  var tau = two_pi;
  /* pi Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function getProgram(context, vertexShaderSource$$1, fragmentShaderSource$$1) {
    var vertexShader = _2(Gl[/* createShader */8], context, vertex_shader);
    Gl[/* shaderSource */11](context, vertexShader, vertexShaderSource$$1);
    _2(Gl[/* compileShader */12], context, vertexShader);
    var compiledCorrectly = +(Gl[/* getShaderParameter */54](context, vertexShader, /* Compile_status */1) === 1);
    if (compiledCorrectly) {
      var fragmentShader = _2(Gl[/* createShader */8], context, fragment_shader);
      Gl[/* shaderSource */11](context, fragmentShader, fragmentShaderSource$$1);
      _2(Gl[/* compileShader */12], context, fragmentShader);
      var compiledCorrectly$1 = +(Gl[/* getShaderParameter */54](context, fragmentShader, /* Compile_status */1) === 1);
      if (compiledCorrectly$1) {
        var program = _1(Gl[/* createProgram */7], context);
        _3(Gl[/* attachShader */9], context, program, vertexShader);
        _2(Gl[/* deleteShader */10], context, vertexShader);
        _3(Gl[/* attachShader */9], context, program, fragmentShader);
        _2(Gl[/* deleteShader */10], context, fragmentShader);
        _2(Gl[/* linkProgram */13], context, program);
        var linkedCorrectly = +(Gl[/* getProgramParameter */53](context, program, /* Link_status */1) === 1);
        if (linkedCorrectly) {
          return /* Some */[program];
        } else {
          console.log("Linking error: " + _2(Gl[/* getProgramInfoLog */56], context, program));
          return /* None */0;
        }
      } else {
        console.log("Fragment shader error: " + _2(Gl[/* getShaderInfoLog */55], context, fragmentShader));
        return /* None */0;
      }
    } else {
      console.log("Vertex shader error: " + _2(Gl[/* getShaderInfoLog */55], context, vertexShader));
      return /* None */0;
    }
  }

  function createCanvas$1($$window, height, width) {
    _3(Gl[/* Window */2][/* setWindowSize */6], $$window, width, height);
    var context = _1(Gl[/* Window */2][/* getContext */7], $$window);
    _5(Gl[/* viewport */44], context, -1, -1, width, height);
    _5(Gl[/* clearColor */6], context, 0, 0, 0, 1);
    _2(Gl[/* clear */45], context, color_buffer_bit | depth_buffer_bit);
    var camera = /* record */[/* projectionMatrix */_1(Gl[/* Mat4 */51][/* create */1], /* () */0)];
    var vertexBuffer = _1(Gl[/* createBuffer */15], context);
    var elementBuffer = _1(Gl[/* createBuffer */15], context);
    var match = getProgram(context, vertexShaderSource, fragmentShaderSource);
    var program = match ? match[0] : failwith("Could not create the program and/or the shaders. Aborting.");
    _2(Gl[/* useProgram */14], context, program);
    var aVertexPosition = _3(Gl[/* getAttribLocation */47], context, program, "aVertexPosition");
    _2(Gl[/* enableVertexAttribArray */48], context, aVertexPosition);
    var aVertexColor = _3(Gl[/* getAttribLocation */47], context, program, "aVertexColor");
    _2(Gl[/* enableVertexAttribArray */48], context, aVertexColor);
    var pMatrixUniform = _3(Gl[/* getUniformLocation */46], context, program, "uPMatrix");
    Gl[/* uniformMatrix4fv */52](context, pMatrixUniform, camera[/* projectionMatrix */0]);
    var aTextureCoord = _3(Gl[/* getAttribLocation */47], context, program, "aTextureCoord");
    _2(Gl[/* enableVertexAttribArray */48], context, aTextureCoord);
    var texture = _1(Gl[/* createTexture */17], context);
    _2(Gl[/* activeTexture */18], context, texture0);
    _3(Gl[/* bindTexture */19], context, texture_2d, texture);
    var uSampler = _3(Gl[/* getUniformLocation */46], context, program, "uSampler");
    Gl[/* texImage2D_RGBA */41](context, texture_2d, 0, 1, 1, 0, _2(Gl[/* Bigarray */28][/* of_array */1], /* Uint8 */5, /* int array */[
              255,
              255,
              255,
              255
            ]));
    _4(Gl[/* texParameteri */20], context, texture_2d, texture_mag_filter, linear);
    _4(Gl[/* texParameteri */20], context, texture_2d, texture_min_filter, linear_mipmap_nearest);
    _2(Gl[/* enable */25], context, blend);
    _3(Gl[/* blendFunc */27], context, src_alpha, one_minus_src_alpha);
    _7(Gl[/* Mat4 */51][/* ortho */6], camera[/* projectionMatrix */0], 0, width, height, 0, 0, 1);
    return /* record */[
            /* camera */camera,
            /* window */$$window,
            /* gl */context,
            /* vertexBuffer */vertexBuffer,
            /* elementBuffer */elementBuffer,
            /* aVertexColor */aVertexColor,
            /* aTextureCoord */aTextureCoord,
            /* aVertexPosition */aVertexPosition,
            /* pMatrixUniform */pMatrixUniform,
            /* uSampler */uSampler,
            /* batch : record */[
              /* vertexArray */_2(Gl[/* Bigarray */28][/* create */0], /* Float32 */1, imul(circularBufferSize, vertexSize)),
              /* elementArray */_2(Gl[/* Bigarray */28][/* create */0], /* Uint16 */3, circularBufferSize),
              /* vertexPtr */0,
              /* elementPtr */0,
              /* currTex : None */0,
              /* nullTex */texture
            ],
            /* keyboard : record */[
              /* keyCode : Nothing */65,
              /* pressed */KeySet[/* empty */0],
              /* released */KeySet[/* empty */0],
              /* down */KeySet[/* empty */0]
            ],
            /* mouse : record */[
              /* pos : tuple */[
                0,
                0
              ],
              /* prevPos : tuple */[
                0,
                0
              ],
              /* pressed : boolean */0
            ],
            /* style : record */[
              /* strokeColor : None */0,
              /* strokeWeight */3,
              /* strokeCap : Round */0,
              /* fillColor : Some */[/* record */[
                  /* r */0,
                  /* g */0,
                  /* b */0,
                  /* a */1
                ]],
              /* tintColor : None */0,
              /* rectMode : Corner */0
            ],
            /* styleStack : [] */0,
            /* frame : record */[
              /* count */1,
              /* rate */10,
              /* deltaTime */0.001
            ],
            /* matrix */createIdentity(/* () */0),
            /* matrixStack : [] */0,
            /* size : record */[
              /* height */height,
              /* width */width,
              /* resizeable : boolean */1
            ]
          ];
  }

  function drawGeometry(vertexArray, elementArray, mode, count, textureBuffer, env) {
    _3(Gl[/* bindBuffer */16], env[/* gl */2], array_buffer, env[/* vertexBuffer */3]);
    _4(Gl[/* bufferData */43], env[/* gl */2], array_buffer, vertexArray, stream_draw);
    Gl[/* vertexAttribPointer */49](env[/* gl */2], env[/* aVertexPosition */7], 2, float_, /* boolean */0, (vertexSize << 2), 0);
    Gl[/* vertexAttribPointer */49](env[/* gl */2], env[/* aVertexColor */5], 4, float_, /* boolean */0, (vertexSize << 2), 8);
    Gl[/* vertexAttribPointer */49](env[/* gl */2], env[/* aTextureCoord */6], 2, float_, /* boolean */0, (vertexSize << 2), 24);
    _3(Gl[/* uniform1i */36], env[/* gl */2], env[/* uSampler */9], 0);
    _3(Gl[/* bindBuffer */16], env[/* gl */2], element_array_buffer, env[/* elementBuffer */4]);
    _4(Gl[/* bufferData */43], env[/* gl */2], element_array_buffer, elementArray, stream_draw);
    _3(Gl[/* bindTexture */19], env[/* gl */2], texture_2d, textureBuffer);
    return _5(Gl[/* drawElements */59], env[/* gl */2], mode, count, unsigned_short, 0);
  }

  function flushGlobalBatch(env) {
    if (env[/* batch */10][/* elementPtr */3] > 0) {
      var match = env[/* batch */10][/* currTex */4];
      var textureBuffer = match ? match[0] : env[/* batch */10][/* nullTex */5];
      drawGeometry(_3(Gl[/* Bigarray */28][/* sub */9], env[/* batch */10][/* vertexArray */0], 0, env[/* batch */10][/* vertexPtr */2]), _3(Gl[/* Bigarray */28][/* sub */9], env[/* batch */10][/* elementArray */1], 0, env[/* batch */10][/* elementPtr */3]), triangles, env[/* batch */10][/* elementPtr */3], textureBuffer, env);
      env[/* batch */10][/* currTex */4] = /* None */0;
      env[/* batch */10][/* vertexPtr */2] = 0;
      env[/* batch */10][/* elementPtr */3] = 0;
      return /* () */0;
    } else {
      return 0;
    }
  }

  function maybeFlushBatch(texture, el, vert, env) {
    if ((env[/* batch */10][/* elementPtr */3] + el | 0) >= circularBufferSize || (env[/* batch */10][/* vertexPtr */2] + vert | 0) >= circularBufferSize || env[/* batch */10][/* elementPtr */3] > 0 && env[/* batch */10][/* currTex */4] !== texture) {
      return flushGlobalBatch(env);
    } else {
      return 0;
    }
  }

  function addRectToGlobalBatch(env, param, param$1, param$2, param$3, param$4) {
    var a = param$4[/* a */3];
    var b = param$4[/* b */2];
    var g = param$4[/* g */1];
    var r = param$4[/* r */0];
    maybeFlushBatch(/* None */0, 6, 32, env);
    var set = Gl[/* Bigarray */28][/* set */7];
    var i = env[/* batch */10][/* vertexPtr */2];
    var vertexArrayToMutate = env[/* batch */10][/* vertexArray */0];
    _3(set, vertexArrayToMutate, i + 0 | 0, param[0]);
    _3(set, vertexArrayToMutate, i + 1 | 0, param[1]);
    _3(set, vertexArrayToMutate, i + 2 | 0, r);
    _3(set, vertexArrayToMutate, i + 3 | 0, g);
    _3(set, vertexArrayToMutate, i + 4 | 0, b);
    _3(set, vertexArrayToMutate, i + 5 | 0, a);
    _3(set, vertexArrayToMutate, i + 6 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 7 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 8 | 0, param$1[0]);
    _3(set, vertexArrayToMutate, i + 9 | 0, param$1[1]);
    _3(set, vertexArrayToMutate, i + 10 | 0, r);
    _3(set, vertexArrayToMutate, i + 11 | 0, g);
    _3(set, vertexArrayToMutate, i + 12 | 0, b);
    _3(set, vertexArrayToMutate, i + 13 | 0, a);
    _3(set, vertexArrayToMutate, i + 14 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 15 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 16 | 0, param$2[0]);
    _3(set, vertexArrayToMutate, i + 17 | 0, param$2[1]);
    _3(set, vertexArrayToMutate, i + 18 | 0, r);
    _3(set, vertexArrayToMutate, i + 19 | 0, g);
    _3(set, vertexArrayToMutate, i + 20 | 0, b);
    _3(set, vertexArrayToMutate, i + 21 | 0, a);
    _3(set, vertexArrayToMutate, i + 22 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 23 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 24 | 0, param$3[0]);
    _3(set, vertexArrayToMutate, i + 25 | 0, param$3[1]);
    _3(set, vertexArrayToMutate, i + 26 | 0, r);
    _3(set, vertexArrayToMutate, i + 27 | 0, g);
    _3(set, vertexArrayToMutate, i + 28 | 0, b);
    _3(set, vertexArrayToMutate, i + 29 | 0, a);
    _3(set, vertexArrayToMutate, i + 30 | 0, 0.0);
    _3(set, vertexArrayToMutate, i + 31 | 0, 0.0);
    var ii = div(i, vertexSize);
    var j = env[/* batch */10][/* elementPtr */3];
    var elementArrayToMutate = env[/* batch */10][/* elementArray */1];
    _3(set, elementArrayToMutate, j + 0 | 0, ii);
    _3(set, elementArrayToMutate, j + 1 | 0, ii + 1 | 0);
    _3(set, elementArrayToMutate, j + 2 | 0, ii + 2 | 0);
    _3(set, elementArrayToMutate, j + 3 | 0, ii + 1 | 0);
    _3(set, elementArrayToMutate, j + 4 | 0, ii + 2 | 0);
    _3(set, elementArrayToMutate, j + 5 | 0, ii + 3 | 0);
    env[/* batch */10][/* vertexPtr */2] = i + (vertexSize << 2) | 0;
    env[/* batch */10][/* elementPtr */3] = j + 6 | 0;
    return /* () */0;
  }

  function drawLineWithMatrix(param, param$1, matrix, color, width, project, env) {
    var yy2 = param$1[1];
    var xx2 = param$1[0];
    var yy1 = param[1];
    var xx1 = param[0];
    var dx = xx2 - xx1;
    var dy = yy2 - yy1;
    var mag = Math.sqrt(dx * dx + dy * dy);
    var radius = width / 2;
    var xthing = dy / mag * radius;
    var ything = -dx / mag * radius;
    var match = project ? /* tuple */[
        dx / mag * radius,
        xthing
      ] : /* tuple */[
        0,
        0
      ];
    var projecty = match[1];
    var projectx = match[0];
    var x1 = xx2 + xthing + projectx;
    var y1 = yy2 + ything + projecty;
    var x2 = xx1 + xthing - projectx;
    var y2 = yy1 + ything - projecty;
    var x3 = xx2 - xthing + projectx;
    var y3 = yy2 - ything + projecty;
    var x4 = xx1 - xthing - projectx;
    var y4 = yy1 - ything - projecty;
    return addRectToGlobalBatch(env, matptmul(matrix, /* tuple */[
                    x1,
                    y1
                  ]), matptmul(matrix, /* tuple */[
                    x2,
                    y2
                  ]), matptmul(matrix, /* tuple */[
                    x3,
                    y3
                  ]), matptmul(matrix, /* tuple */[
                    x4,
                    y4
                  ]), color);
  }

  function drawArc(env, param, radx, rady, start, stop, isPie, matrix, param$1) {
    var a = param$1[/* a */3];
    var b = param$1[/* b */2];
    var g = param$1[/* g */1];
    var r = param$1[/* r */0];
    var yCenterOfCircle = param[1];
    var xCenterOfCircle = param[0];
    var noOfFans = ((radx + rady | 0) / 2 | 0) + 10 | 0;
    maybeFlushBatch(/* None */0, imul(3, noOfFans), imul(vertexSize, noOfFans + 3 | 0), env);
    var match = +(stop < start);
    var match$1 = match ? /* tuple */[
        stop,
        start
      ] : /* tuple */[
        start,
        stop
      ];
    var stop$1 = match$1[1];
    var start$1 = match$1[0];
    var pi$$1 = 4.0 * Math.atan(1.0);
    var anglePerFan = 2 * pi$$1 / noOfFans;
    var verticesData = env[/* batch */10][/* vertexArray */0];
    var elementData = env[/* batch */10][/* elementArray */1];
    var set = Gl[/* Bigarray */28][/* set */7];
    var get = Gl[/* Bigarray */28][/* get */5];
    var vertexArrayOffset = env[/* batch */10][/* vertexPtr */2];
    var elementArrayOffset = env[/* batch */10][/* elementPtr */3];
    var start_i = isPie ? (start$1 / anglePerFan | 0) - 3 | 0 : (start$1 / anglePerFan | 0) - 2 | 0;
    var stop_i = (stop$1 / anglePerFan | 0) + 1 | 0;
    for(var i = start_i; i <= stop_i; ++i){
      var param$2;
      if (isPie && (i - start_i | 0) === 0) {
        param$2 = /* tuple */[
          xCenterOfCircle,
          yCenterOfCircle
        ];
      } else {
        var angle = caml_float_max(caml_float_min(anglePerFan * (i + 1 | 0), stop$1), start$1);
        param$2 = /* tuple */[
          xCenterOfCircle + Math.cos(angle) * radx,
          yCenterOfCircle + Math.sin(angle) * rady
        ];
      }
      var match$2 = matptmul(matrix, param$2);
      var ii = imul(i - start_i | 0, vertexSize) + vertexArrayOffset | 0;
      _3(set, verticesData, ii + 0 | 0, match$2[0]);
      _3(set, verticesData, ii + 1 | 0, match$2[1]);
      _3(set, verticesData, ii + 2 | 0, r);
      _3(set, verticesData, ii + 3 | 0, g);
      _3(set, verticesData, ii + 4 | 0, b);
      _3(set, verticesData, ii + 5 | 0, a);
      _3(set, verticesData, ii + 6 | 0, 0.0);
      _3(set, verticesData, ii + 7 | 0, 0.0);
      if ((i - start_i | 0) < 3) {
        _3(set, elementData, (i - start_i | 0) + elementArrayOffset | 0, div(ii, vertexSize));
      } else {
        var jj = (imul((i - start_i | 0) - 3 | 0, 3) + elementArrayOffset | 0) + 3 | 0;
        _3(set, elementData, jj, div(vertexArrayOffset, vertexSize));
        _3(set, elementData, jj + 1 | 0, _2(get, elementData, jj - 1 | 0));
        _3(set, elementData, jj + 2 | 0, div(ii, vertexSize));
      }
    }
    env[/* batch */10][/* vertexPtr */2] = env[/* batch */10][/* vertexPtr */2] + imul(noOfFans + 3 | 0, vertexSize) | 0;
    env[/* batch */10][/* elementPtr */3] = (env[/* batch */10][/* elementPtr */3] + imul((stop_i - start_i | 0) - 3 | 0, 3) | 0) + 3 | 0;
    return /* () */0;
  }

  function drawEllipse(env, center, radx, rady, matrix, c) {
    return drawArc(env, center, radx, rady, 0, tau, /* boolean */0, matrix, c);
  }

  function loadImage$1(env, filename, isPixel) {
    var imageRef = /* record */[
      /* glData : None */0,
      /* drawnTo : boolean */0
    ];
    Gl[/* loadImage */33](filename, /* None */0, (function (imageData) {
            if (imageData) {
              var img = imageData[0];
              var context = env[/* gl */2];
              var texture = _1(Gl[/* createTexture */17], context);
              var height = _1(Gl[/* getImageHeight */32], img);
              var width = _1(Gl[/* getImageWidth */31], img);
              var filter$$1 = isPixel ? nearest : linear;
              imageRef[/* glData */0] = /* Some */[/* record */[
                  /* framebuffer : None */0,
                  /* texture */texture,
                  /* height */height,
                  /* width */width
                ]];
              _3(Gl[/* bindTexture */19], context, texture_2d, texture);
              Gl[/* texImage2DWithImage */35](context, texture_2d, 0, img);
              _4(Gl[/* texParameteri */20], context, texture_2d, texture_mag_filter, filter$$1);
              _4(Gl[/* texParameteri */20], context, texture_2d, texture_min_filter, filter$$1);
              _4(Gl[/* texParameteri */20], context, texture_2d, texture_wrap_s, clamp_to_edge);
              return _4(Gl[/* texParameteri */20], context, texture_2d, texture_wrap_t, clamp_to_edge);
            } else {
              return failwith("Could not load image '" + (filename + "'."));
            }
          }), /* () */0);
    return imageRef;
  }

  function loadImageFromMemory$1(env, data, isPixel) {
    var imageRef = /* record */[
      /* glData : None */0,
      /* drawnTo : boolean */0
    ];
    Gl[/* loadImageFromMemory */34](data, /* None */0, (function (imageData) {
            if (imageData) {
              var img = imageData[0];
              var texture = _1(Gl[/* createTexture */17], env[/* gl */2]);
              var height = _1(Gl[/* getImageHeight */32], img);
              var width = _1(Gl[/* getImageWidth */31], img);
              var filter$$1 = isPixel ? nearest : linear;
              imageRef[/* glData */0] = /* Some */[/* record */[
                  /* framebuffer : None */0,
                  /* texture */texture,
                  /* height */height,
                  /* width */width
                ]];
              _3(Gl[/* bindTexture */19], env[/* gl */2], texture_2d, texture);
              Gl[/* texImage2DWithImage */35](env[/* gl */2], texture_2d, 0, img);
              _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_mag_filter, filter$$1);
              _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_min_filter, filter$$1);
              _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_s, clamp_to_edge);
              return _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_t, clamp_to_edge);
            } else {
              return failwith("Could not load image");
            }
          }), /* () */0);
    return imageRef;
  }

  function drawImage(param, param$1, param$2, param$3, param$4, subx, suby, subw, subh, env) {
    var imgw = param[/* width */3];
    var imgh = param[/* height */2];
    var texture = param[/* texture */1];
    var match = env[/* style */13][/* tintColor */4];
    var match$1 = match ? match[0] : /* record */[
        /* r */1,
        /* g */1,
        /* b */1,
        /* a */1
      ];
    var a = match$1[/* a */3];
    var b = match$1[/* b */2];
    var g = match$1[/* g */1];
    var r = match$1[/* r */0];
    maybeFlushBatch(/* Some */[texture], 6, 32, env);
    var fsubx = subx / imgw + 0.0004;
    var fsuby = suby / imgh + 0.0004;
    var fsubw = subw / imgw - 0.0008;
    var fsubh = subh / imgh - 0.0008;
    var set = Gl[/* Bigarray */28][/* set */7];
    var ii = env[/* batch */10][/* vertexPtr */2];
    var vertexArray = env[/* batch */10][/* vertexArray */0];
    _3(set, vertexArray, ii + 0 | 0, param$1[0]);
    _3(set, vertexArray, ii + 1 | 0, param$1[1]);
    _3(set, vertexArray, ii + 2 | 0, r);
    _3(set, vertexArray, ii + 3 | 0, g);
    _3(set, vertexArray, ii + 4 | 0, b);
    _3(set, vertexArray, ii + 5 | 0, a);
    _3(set, vertexArray, ii + 6 | 0, fsubx + fsubw);
    _3(set, vertexArray, ii + 7 | 0, fsuby + fsubh);
    _3(set, vertexArray, ii + 8 | 0, param$2[0]);
    _3(set, vertexArray, ii + 9 | 0, param$2[1]);
    _3(set, vertexArray, ii + 10 | 0, r);
    _3(set, vertexArray, ii + 11 | 0, g);
    _3(set, vertexArray, ii + 12 | 0, b);
    _3(set, vertexArray, ii + 13 | 0, a);
    _3(set, vertexArray, ii + 14 | 0, fsubx);
    _3(set, vertexArray, ii + 15 | 0, fsuby + fsubh);
    _3(set, vertexArray, ii + 16 | 0, param$3[0]);
    _3(set, vertexArray, ii + 17 | 0, param$3[1]);
    _3(set, vertexArray, ii + 18 | 0, r);
    _3(set, vertexArray, ii + 19 | 0, g);
    _3(set, vertexArray, ii + 20 | 0, b);
    _3(set, vertexArray, ii + 21 | 0, a);
    _3(set, vertexArray, ii + 22 | 0, fsubx + fsubw);
    _3(set, vertexArray, ii + 23 | 0, fsuby);
    _3(set, vertexArray, ii + 24 | 0, param$4[0]);
    _3(set, vertexArray, ii + 25 | 0, param$4[1]);
    _3(set, vertexArray, ii + 26 | 0, r);
    _3(set, vertexArray, ii + 27 | 0, g);
    _3(set, vertexArray, ii + 28 | 0, b);
    _3(set, vertexArray, ii + 29 | 0, a);
    _3(set, vertexArray, ii + 30 | 0, fsubx);
    _3(set, vertexArray, ii + 31 | 0, fsuby);
    var jj = env[/* batch */10][/* elementPtr */3];
    var elementArray = env[/* batch */10][/* elementArray */1];
    _3(set, elementArray, jj, div(ii, vertexSize));
    _3(set, elementArray, jj + 1 | 0, div(ii, vertexSize) + 1 | 0);
    _3(set, elementArray, jj + 2 | 0, div(ii, vertexSize) + 2 | 0);
    _3(set, elementArray, jj + 3 | 0, div(ii, vertexSize) + 1 | 0);
    _3(set, elementArray, jj + 4 | 0, div(ii, vertexSize) + 2 | 0);
    _3(set, elementArray, jj + 5 | 0, div(ii, vertexSize) + 3 | 0);
    env[/* batch */10][/* vertexPtr */2] = ii + (vertexSize << 2) | 0;
    env[/* batch */10][/* elementPtr */3] = jj + 6 | 0;
    env[/* batch */10][/* currTex */4] = /* Some */[texture];
    return /* () */0;
  }

  function drawImageWithMatrix(image, x, y, width, height, subx, suby, subw, subh, env) {
    var partial_arg = env[/* matrix */16];
    var transform = function (param) {
      return matptmul(partial_arg, param);
    };
    var p1 = _1(transform, /* tuple */[
          x + width | 0,
          y + height | 0
        ]);
    var p2 = _1(transform, /* tuple */[
          x,
          y + height | 0
        ]);
    var p3 = _1(transform, /* tuple */[
          x + width | 0,
          y
        ]);
    var p4 = _1(transform, /* tuple */[
          x,
          y
        ]);
    return drawImage(image, p1, p2, p3, p4, subx, suby, subw, subh, env);
  }

  function drawImageWithMatrixf(image, x, y, width, height, subx, suby, subw, subh, env) {
    var partial_arg = env[/* matrix */16];
    var transform = function (param) {
      return matptmul(partial_arg, param);
    };
    var p1 = _1(transform, /* tuple */[
          x + width,
          y + height
        ]);
    var p2 = _1(transform, /* tuple */[
          x,
          y + height
        ]);
    var p3 = _1(transform, /* tuple */[
          x + width,
          y
        ]);
    var p4 = _1(transform, /* tuple */[
          x,
          y
        ]);
    return drawImage(image, p1, p2, p3, p4, subx, suby, subw, subh, env);
  }

  function resetSize(env, width, height) {
    env[/* size */18][/* width */1] = width;
    env[/* size */18][/* height */0] = height;
    var pixelWidth = _1(Gl[/* Window */2][/* getPixelWidth */2], env[/* window */1]);
    var pixelHeight = _1(Gl[/* Window */2][/* getPixelHeight */3], env[/* window */1]);
    _5(Gl[/* viewport */44], env[/* gl */2], 0, 0, pixelWidth, pixelHeight);
    _5(Gl[/* clearColor */6], env[/* gl */2], 0, 0, 0, 1);
    _7(Gl[/* Mat4 */51][/* ortho */6], env[/* camera */0][/* projectionMatrix */0], 0, width, height, 0, 0, 1);
    return Gl[/* uniformMatrix4fv */52](env[/* gl */2], env[/* pMatrixUniform */8], env[/* camera */0][/* projectionMatrix */0]);
  }
  /* Reasongl_web Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function width(env) {
    return env[/* size */18][/* width */1];
  }

  function height(env) {
    return env[/* size */18][/* height */0];
  }

  function mouse(env) {
    return env[/* mouse */12][/* pos */0];
  }

  function mousePressed(env) {
    return env[/* mouse */12][/* pressed */2];
  }

  function key(key$1, env) {
    return _2(KeySet[/* mem */2], key$1, env[/* keyboard */11][/* down */3]);
  }

  function keyPressed(key, env) {
    return _2(KeySet[/* mem */2], key, env[/* keyboard */11][/* pressed */1]);
  }

  function size$1(width, height, env) {
    _3(Gl[/* Window */2][/* setWindowSize */6], env[/* window */1], width, height);
    return resetSize(env, width, height);
  }

  function deltaTime(env) {
    return env[/* frame */15][/* deltaTime */2];
  }

  function loadSound$1(path, env) {
    var sound = [/* Loading */0];
    _3(Gl[/* Audio */3][/* loadSound */0], env[/* window */1], path, (function (v) {
            var match = sound[0];
            if (typeof match !== "number") {
              if (!match.tag) {
                _4(Gl[/* Audio */3][/* playSound */1], env[/* window */1], v, match[0], match[1]);
              }
              
            }
            sound[0] = /* Loaded */__(1, [v]);
            return /* () */0;
          }));
    return sound;
  }

  function playSound$1(sound, $staropt$star, $staropt$star$1, env) {
    var volume = $staropt$star ? $staropt$star[0] : 1.0;
    var loop = $staropt$star$1 ? $staropt$star$1[0] : /* boolean */0;
    var match = sound[0];
    if (typeof match === "number") {
      sound[0] = /* ShouldPlay */__(0, [
          volume,
          loop
        ]);
      return /* () */0;
    } else if (match.tag) {
      return _4(Gl[/* Audio */3][/* playSound */1], env[/* window */1], match[0], volume, loop);
    } else {
      sound[0] = /* ShouldPlay */__(0, [
          volume,
          loop
        ]);
      return /* () */0;
    }
  }
  /* Reasongl_web Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var d_a647e4659c173b8e2a1beed6e11eefcd = "ql\x95\x07\x90p\x8f\x05\xce\x03|M\xa5`\x17@B\xb7C\xf0N1\0\xf8\xab|\x07\xe4!\xe2\x9c!\x8e\xca\xbb\x81\xb4\xb1\xe3\x9b\xe7s\xa1x\x9f#%\xa5\xee\xbf\xf1<\xab\xb30,T\x16<\xc0\x97\x97\x0b\xd7\x90Vs}\x05\0h+\xf7\xfa\x0f\x01\x80\xc6c\xd5Rb\xd5\x94Y\x10\x1c\xb0\xae\x02\0q\xe3w*\xe1\x17*\xe7\x95X\xe8\xc6\xa3\xec\xdcyF\xb0\x19\x07\x8f\x93oO\x02v\x90\x97\xc5\xb6N\xbc\x0f.\xb7\xc2\x15xM\xc82\x97\x1c+vZv\x1f\x89\fU#0\x99\xda\x19\0<\x01\0p<\xdbg\x06\x94\xad\xc0{Z\x05\xf7\x14\xb2\xcc\x947\x1a:*S\x11\x03\x80O\x05\0\xd7%\x9d\n\x9cS[\xf4\xe2*^\x1d\t\0>\xaf\x06?Sir\xda(\xbd\x0b\xa35\xc5C\xef\xa2x-t7%\x9f\x9b\x1f\x12w?!'\x83\x93R\xd2\x0eHi]\xc7\x10\xb9n\xb8n@\x89,\x06\0\xef\x06\x80I\xe0\x9a\xf6 +Vq?\xd7\x19\0\xfcz\xbe\xdaC\xda\x90\xd5\xde\b\0>\xea\xb8\xd2\x1e$\xf5\x8c\xbe\n`r\0\x80\x84\xb0\x02W\xab\xcd\x02k\0\x06\0\xbf<\xac\x9c\0\xe06o\xc1\x8d\0\0\xf0{\xeb\xcd\0\xe0E\0\0\xc0\xf3\xae\xe3E\x1c\xfa\xdcy\x9e\xe5e\0\x80+\xf24\t)\x1c\x07\x7f5C\xcd\x05k}\x03:y\xe8\xfeo6\0\x90\x01\xc0B\xc4\xf75\xfa\x9d\xd0\xe7:&DHe\x04Z\x0b>G\xec\xc6.\x91\xdf\xb3=\xe7\xfb\xd7zh\xdd\x1b\0\x10\0@\xd5l\xe3\xb8>\xf497\xd6\xe5\x88(\x9fH\xde!%\xbepe\x83x\x8eD\x13\x03\x80\xc7\0@E,\xe4\x19\xfe\xddk\x0e}ng\x14\xe1\r\xec=\x93\"\x14\xc0\x03T%aC\r\xfe\xc9Hs\xc4\x02\rMYZ@\xce\xd5\xd8@\xfc\x94\"\xd7@\xc4\xfe\xbe\x86+\xd1\0\xa0 \0\xb8\xd6\xec\b(\xf6H|\xae\x86\xcf\xa1a\x92XuL\x91\xde(\x17\xa3\xb4\xa45\x14v\xcc\x10\xdf\x94\xe5\x03;jN#%K\xc2\xef\xb7\xca\x9c\x8b\x01@a\0\x18<\x89\xac\xda\xf3\0}<n\x03\xe8\xa8\xc9\x9e,\xb8\xe5\xb5c\xe2~\t\xe0a\xc0p\xa7\x02\x8d\xa0\xe3X\xc4\x8a\xebN\x19\xc2\x03\\F\xc2j\xfb\x9a\xc5|\xd73\x13\xde\x83\xfb\f\xce\xc4\x1b\x95O\x8a\xb5\xfe\x06\0\x17\0@\xed\x89\xef{\x8f\xb5\xf7\xf1\xb8-\xf0Y=\xd8\x14\xf3\xb1D9b\0C\xc2\x81\xe7k\xc2\xe1~\xaff\xfe/\xd9\xfa\xa5z\xf9Wb\x1d\x8d\x99\xac\xbf\x01\xc0\x05\0\xe0\xba\xfb+Rl\xec\n\xbb\xdb}\x15\\\x9f\x05?\x9bC|\xa3\xd0\xcf84\xb5\xd9f\x86\xdf\xb5\xf6}D\xdc\xdf\x0b\xdfS+\b=\xa4\x93\xa0\xa8\xd2\xe3\x01d\x04\xa2\xb8\x97\x1f\x98\xd0\xd0\x07fK&\xebo\0\xc0<\x94M\xb1\x98G\xa1{I\xc5\xf5\x0b\xfcK\xf2p\x15\x0f[\x05\xba\xca\xba#\x01\x94p\xb3\xcb\f\xffr*J\xef\x95\x1am\x1dz\x9f\x7f\x18\x0f\x8dS\x02\xea\xb3\x1a\xe6aIe\xe7H(\xf8\x9a\xc9\xfa\x1b\x000\x16\xfb\x0f\x83\xe4\x87\x10\0\xb0\x15\n)\xf6\x80\xc0\xe7\n\xf7\xbf\x01?\xe1\t\xb6\xfe\x1b\xe4c\x88m\x02\xc0\xd2)\xcf\xd1\x83.\xd3\xfd\x87Q\xc6\x94D\xab\x86J\xbe\x02~\xc2\xb0\x16\0\xb6\xc8{0\0\x88\xb0\xec\xbe\x8c1\xb7\x10\x0f\xe0\xab\xfej\x88\x1f#\x1d\xab\x88\x07\xc8\x07V\xb6\xc8\xd2\xa5L4\xc6e\xae\xa5z\xcc;\xe6\xdef\xc8\x93h\xd5n\xab\x86\xae\xe9\x10\0\xc0\x12\0\xb1=\xe1\xba\r\0\x02\x16\xdb\x9d\xe7v\x1e;\xb2\xd2\x12E\x9d\x85\x0b\x1e\x97\x07\x97*\x81\xc5\xae\xb8\xc6\xad\x1f m\xa21V\xccR\x05?\x98\xf5\xa6%\x94\xea@\xd7\x86\xf7\xf1g&<\x89\x05\x80#\x10\xdal\x84\xd7\x10\xea<\xed\r\0\xf2\t\xb7\xbf\xbc1/\x85r5)\xcb9A\xfc \x8b\x14\x0b\xac}\x91\xb1\xd3v|\xe1S\xced\xa7o\xdbLB\xaa\xba:\xb9\x10\x8ako\x10\0w#\xb8\xc6\x10`\xb4\x81\xe7:\x05B\xc7>q\xad\x18\0\b\\^l)'\xc7\xea\x9d^A+X\xf4\xae\x17Q\x11V\xeb\xfcLW\xf0\xde\xf6D\xf7\xbbO\xb0\xde\x98\xfc2\x07\x91g(\x84:\x18pv\xafc\x0b\xe4@$^\xd9\xacx\x9e\xdc\xa8\xad\xd9s\x1d\xa1s\xa7X\x7f\x03\x80/\x95\x0et3\xef(@\xd3*\xac\x8f\xb6\x9a\x1a\x8c\x91\x12V`\x8f\xadf\\\xf7\xf3s\r\xe31\xf9\x9eY\x0bq\x8c\xbc\x7f\b\x80=\xd0o\xf6\x19c\x7f\x03\x80/\x16\xcd\xe8\xb3R\xc0\x83+#\x8f\x02\xd7\xd4\0=\xf3\xde\x07\0\x14\xa0q\xf5\x02\xbe\xb0\xc3m\xa3\xc5c\xe2Sz1\xdc0\xaa\xf5\x003\xce_4\x06\0&\xbe\xf8\xfd\xaa\x17\xc8m\x9br3\xf2R~w\x07\xd9\xac<n[\xb3f<\x15<\x95(t\xf4\x90\xce\xf6;\x02\xbd\x8b %\xef0\0`\xe2\xe3:\xf1\xf3\xdasI\xc7:\xa50\xe0\xdcA\"\"i\x06\xe2\xacu\xac\xf4\x84\xe2\xa6\xb4*S\x1e\x96O\x11w\xe7]\xc4(\x1eg\xfd\x07\xe4\xa1\x9c\x9e\xc7F\x84\n\x06\0L\xbc\xc7e\xa6\xb9R\xd3\x01\xe4;\x05\x15\xf3B\xee\0\x80\xd3u\xe5\x8eZ\xb8`(\xc5\x8e%\x10\xd1\xc4\xba\x7f\x12\xbd\xa1U\xf8\xec*\b\xb3\x04\xd7\x89\xf7\x18\xb2\xfe{\xe0\xef\x8d`-\x18\0\x04^\x10\x97`\xe1f\xc8k\xce\xd5\x0b\xce%\xe1\x82\xc7CK\xab\x04\0\x18!\x8dgOK\xed\x85\xb7\xc8\x06\xe6=5\x89\0\xb0\x80\xae\xe8j\x85t\xef\xa9\x85\xf8B\xaf\x90\xf5\xe7Z\xc7\xb7\xc0\xf34\0\x10\xb8\xa3\x8d\xc0b\x1f\xc2s\xb5\x02\xf72\xc5\xfd\xc5\xd6\x96\x9b\0\\\x15\x04\0M\xb9t(I\xc9\xdd\xc3\xa1\x04\xf4\x83\xf0\xd0$\xd68\xc4\xf3\xe8\x82\xb3\xe6\x1d\xc5\xee\xa2\xac\x04\xa8P\x05O\xa3\x01\x80>n\x9c\x04\x9f\x99\x85\xe7\x92\xf4\x81\xcf\x19\xae\x99Z\\\x1a\xb7\xb7\x16z\x1amd\xdc\x1f\x02Vn\xf4\xba\xa6\x19h$\xae\xa3V\0bK\xbc\xa3Aq=;\xc4m\xdf\xd5\xc4\xbb5\0( \x1c\xab\xef\xaa@\xf2\x83\xb1X\x13\xa4\xd5\xd7Kz\xda}\xbf\x95\xb2\xe5F\x01\x894\xee\x97\xde\xcf\xc4$\xf6*\xe1yZ\xe6>F!(\xb5\xc4\xef\xacB\xe5\xd1V>\xce\x84\x81h\x84\xf7h!@\xc4\x03\xf7)\xb8&\xb6\x97\xe4\n\x0e\x88/\xeah\x94\xaev\xa3t\xa1c\0\xe0\n\xc1\x05D\xad\xc7*K\xea\x0bp\x1d\xc2\x80\xdew-LNbR\x93\x1a\x01\b\xae\x03\xd0\x80\xa2\xbb\xdej\xc6\xc8LD\xa8jI\xc0H+4\x11VtP\x9ek\x89\b7$I!M\xf8\xb0Cz\xc7\xe1\xdd\0\x80\xadr\n\x0f\x1fVr\xae\x07D\x02\xc4\x14\x9f\x826\xf6\x9f\x05\xefw\n\x9c\x7f\x06\xdb\x06\x8c\x96\x10{\x8b\x843\x80R\xba:\x10\xcf\xd6\t\n\xa0)\xa3m!\xbd\xebp{\xc8B\xa0\xc8<w\x90\xd7\xc97@\x17\xf2H\xc8Eq\xf5\xa1\x0f\x88\xb4\xe1P-\\\x1f\xeez8\xe0w\x7fCG\0\x80M\x06\n\x88/\xb9#\xa1\x99\xe2\xce5x^\xae\xb6\x0e~\x01=\x95V\xc8\x82\x1f\x8a\xdcC\xedQ\x94\x969w\xcc\xae\x86\x86\xd4\xb3\x86\xdf\xb5\t\x1d\xc4\xb7*\xe3sU\x19\xce\xd1$\x02\x9c\xd4\xbb\x9b@\xd6\xdf`\0 \xb4\xb2\xd8\xbd\x9e#\x13v\x95G\xd95EG!\xab\x17\xdbE\xe7s\xa1\xd7\x9f\xeb\xa8<\n\xd6\x05\xac\xed\x12\xf8|JQ\x0f\xe6\x1c\xa8\xc1\xa4\x84\x84vx\xaa\xc8\xcf}\xa4,(\f\xd8\x13\x12h\x0b\n\x1d\x96\x88Pb\x84|\xa4!\xd2\xfa\xf5\x18n\xc0X\xce\x01_R\xce\xc4\xe46\xc1\xf3\xf9R\xb6\xd0\xf0\xb9\x0e\xa5\x85\x94\x8e\x14\xd7J\xaf\0\x82]\xe1\x16\xaf\xa0\xcf|\xaf`\xa3\xc1L\x1e&\xbe\xecn\x93x\xae]\xa9\xc8M!\xe5\xf7\xc5\xd2>Zp\t\xf1\tg\xcd9\xd0\xccA7fb\x92]|\x89\x95\\\xe7:\"@\xe8\0\xf9\xf4\xdf\xe9\xe6g7\b\x81\x93\x9b\x1edbr\x9b`\xeb;d<\x974\xbb\x1b;\xfcs}\xc0\xf3\x93\xb0\xfe\x98\xebo\xf2h\x19 ~[\b\xcb\x16\x11J\x8c\x91\xc7\x13\x06\x8bb\xd0\x1b\xcd\xf57\xf9V\xa92\x85\x12%\xad\xb4\xd6#\xd1v\xc1\xb9[{\xb8!\xc7\\\x7f\x93\x8f\x96\\\xd3h\xde\x06\0\xd8\xf39\xdd\xfc\xc5\\\x7f\x93o\x92S\xd1\xf6\x87^WI\0\xf0u\xf9\xa52\x14\x9b\x98\x14\x979Ai{'\x1e\xe7j\xb3\xa5\n\xa7=\x9e\x02\x008\x14\xf8\xaa\xb2R\x93w\n\x8eQ\xb5n\xbb\xaf9$&3\xff4\0\xd0\x12\x9e\x86B\x81\xab\xe9\xc9MLT\x92Z\x030\x82\xbc\xa5\x94;O\xecQ\x02\0R\xf8\xf10W\xa0\xb9\xfe&\x8f\x14\xb7\xdf\x9e\x1b4Iy\x10n\x03\xc5\x13b}\xdfq@x<\xf8\xea\xf1Z\xc6\x04o\xa6\x85{\xe8\xc9ML\xd4\xf1\xbb\xeb\xe6\x9eJ2\xbf\xf8\x9er\x85\x12}\xc2\xb30\x000y\x85\x9cV\xff\xdc\x9e\x9a\x13\xe2\xdeO\x03\x80\x141\x000y\xbc\xb8qj\xe7\xb8\xf3\x9f\x9a\xb8Z/TH\x03\0\x93\xd7(\xc4A\xfc\xfd\xca\xe4\xd5\xd3v\x01\f\0L>V(BPw\xf1\x0e\x06\0\x06\0&\x9f'\x14%\xb8\x9b\x1b\xb8\xb2\x9a\xefi\xdb\x80\x06\0&\x1f)\x92f\x9d\x1e>\xafy\xc5\0\xc0\xc4\x04d\xd3[\xdc\xfa\x80\xd5\0\xc0\0\xc0\xe4sD\xda\xf7\xdfA>~\0\x13\x13\x13\x13\x13\x13\x13\x13\x13\x13\x13\x13\x13\x13\x93\xf2\xf2?\xde\xe2\xf9\xd7\xb5\xa0\xd2\x10\0\0\0-tEXtSoftware\0by.blooddy.crypto.image.PNG24Encoder\xa8\x06\x7f\xee\0\0\0\0IEND\xaeB`\x82";

  var d_d89d4399cabd0fbbf0c369ca8c93e2a0 = "\x1f\x93\xc1N\x89y%\xe2c7\xf2)\xe5\x9117\x91\xca$\xbcE\x80b\x1f\xa9\xcc;\xd8v\xe0+D\xbb(\xdc\xcf\xd7\n\xe5\xa7b\xf5\x1d-\xb4\xf1\xe1\0\xd0x\x94\xbac\xc2\x12\xe9L\xc0\x92\0\xa0\xc9\xe6\xe3\xf0p\x8f\xb8\xd6\xd5\0\xe0\xb3\x93N\x12\xc5\xc2\x9d\x801S\x87b\0 e\xdb\x8b\xf3\x82v\x90\xcd\xf6\xa3@p\xbb\x01\0\xdc\xe7\"I\xd0\xd5`\xa4\x1d\x06\0\x89\0\xb01\x8b\xb6\x82\xdf\xdb\x8f\xa9\x000C\xb99\x04#\xc4\x93Y4\b\xf0\x86\x1b\0`PxpnQ\x8f%\xf3\xbe\0\0F\xe5Q\x0b\x16\xbc\xc4\xe25\n\0\xe0\xaei\x81r\xe4\xa2x\x8cZ\xaa\x1b\xbf\xdf\0\0\xae\x170\t\xef\xd5\xac\xff\x97\0@n\xd1\xec=/B\0\x90\x1e%&\x10\xb91\xf4\x9a\0\"\xeeuv7\0@\xeb\xe4\"*\xe6\xb7r\xef\xe5w\xe0O\x06\xbb\xc7d\xa0s\x9dh\x93e\x8d\xc2\xf2i\x12\x86cf\x008\xe3\xf3\x9c\xf5\n\x9a\x1d\x13)\xd8M7\0\x80{/#c\xfds<\xbf\x16d\xa3\xe1\xb5\x95\xa7&\x99\xad4\x97\xd0\xc2\xd6K\xda\x1b\x90:s\0\xe7\x1d\xf01\xc0\xbf\x89E\xbc\xc3\x90\x0b\x04r\xcd\xf3\x1b#=\x89\x9c\0\xe0&3\xeb\xc0\x9a\xc8Q\xf1\xd9\x81\x7f\xd7g\n\x84p3\xfc\xde1\xb2\xb2\xee\x82\x82\x8bfz!XH\x16n\t\0\x90\xde\x93\xab\xac\xb9\xb6\xa2r\x85Km\xe4\xb9\xde6R\xdc\xb5\xfa\xc7\x0f\xa0\xd4\n\x80Z }\xeb\xd4D\xb9\xb0|l\xad\xb5\xc7\x85k\x1e\f\0>%\xab\f\0nS\xfe-\xc1c\x1a\f\x04\xee\x01\x81\x18\xd2N,\xb9\xa6\x0e=e\x04\xb7\x01\x80>\xac\xcc\xe1}\xb9\xdb\xa7\x9b\xa9j9i\x81n\t\x9e\x95\x8a\xe4&\x18S\xa6\x0e\xc5*\xdej\0\x10\xcc\xa3\xe0\xe73*\xcf3\n\xeem&\xdc{\x8a\x13\xd2\xe5\x8c\xf4\x9d\xd7v\b.\xc8\x0b\xe0\x17\x14\x93H\x1b \xcf\xd4\xa1X\xc5\xdb!/9\xc5\x96\xe9|w$\x01\xaf\x02\x80\r\xe8\"\xa9\x10=\xbc;0\xf5|o{ \xac0/\xe0%\"-\x9c\xe1\xa6\x0e\xc5\0\x80\xbbg\x9f\x8b\x9eJ:\xe1\x88\x93%\xd2E~:\0\xf4\xcc\xbb\x96l\x05\xba\xe7X<\x86\xc9\xd8\x86^\x9e[\x88\x99:\xa4\x05\0\xc9\x18\xb3\x18\xe9!\xbd\xca\xf0\xaeB\xa0+\0`#\xbc\x1a\xdf:\xa8\x9dg2\x83\xac\x06`\x03\xab\x0fx=\b\x84(\xbc$\0@U\x90\x85\x86\x9a\xe4\xf4hb\x92\xa1\xa1gqe)\xb0/!\x1bS\xd8\x14\xfa\xfd\x9a\xc8\xb74\x82\xe7\xe6\xeb\t\xf1\x81\xe3\x04\xd6f\x9cUB\xb1hn~\xbf\xd0\xd4\xa13\xf6+Q\t\xb8\x17p\x15G\x88\xdf\x96j \x8da8\x05\0V\x8f\x175\x82\xbe\xb5;\xf4\xfb\x03\x01j\x8b\x10hpr\xb4&\x9e\x81\xd1\x8d\xbd\f\0\\%\xf0%\x16s\x01\xc0\xf1c\x1dJ\xc5\x88\xd8R\x1dB\xeb\x89\tD\x96D\xf0\x19#\xbf\xbbz\x14n\x8fX/c@\xc9g\xc23\x98\x15\xe7?\x14\xf7a\xf2\"\0(\xb1\xb8\xaf\x16\xdc\xd6{\xd6\xf47\x81\xcfN\x9ep\xa7\xba\xf8\x19\xf5\x1e%\xac#\xdc\xe9\xd0\xefo\x82\x1cO\x97\xb0\x1e\xf1\xf9\f\x002Ih6\x9f\x01\0\xef\t,\x10GW^\xbd\xf8\x19q^Z+\b=$9\x96\x91\te&S\xdd{<\x03\x03\x80\xdf\xb9\x8dU\xa8\xf8\xfd\x07\xad\x0b)\0hvM8\xca2\x9b=\xf8\xa5\0\xa0m\x19\xe5>\x9fB\xdbMyR\xbe\x89J\xda\xea\xc9O\x05\0\xc9:r=*_85\0\xcfc`\xa2\x14\x97\x84A\xfb\xe2&\xe2\xfbO\x06\0\xaa\xd4\xd9$\r\0\xbaH\0p\x93\x85G\xc0\xfa\x1f\xe6\xfe_g\xe9\xb9\x177g\x8ak\xdd\x05\x10*;\xe6Fv\xf7\x04\0Hj\x050\x89\xc8\x13\xa5\xfe\xb1\x80\xd8\xcbX\x14\xa1E\xa7\x04D\r\0l\xcc\xdf\xb9\x8eL\xae\xd5|3\xeb\xff\x1c\0\xc8\xad\xfc\xa5\xeeI\x9ax\x9a\x1f\xee\t`&\xe2X\xefe,\b\0K\0@'Ang$<:\x9cl\xb5\xd8\xfff\0x\xba\xf2k\x01\xc0\x97\x80J\xed\x1el\x80\x1e\x156A|W\xe5\x0e\xff2\xe8h\x88OV\x90UT\xae\x84\xe7\xc7\x15\x02aK\x8f\xfbAF\x947Y\x039\x9a\x93\xe9\xc9\x1dGg]\x807\x03\xc0\x1b\x94?\x16\0\xf0\xfd\xc5$?+\xf0\xf76\xa4p\x16Jf\xfa-B\xe0\nu\xd9\xe5\xc8\x014\xc4\xffz\xe0wH\xb8\xe7f\xca\x7f3\0\\\xa5\xfcx\xb1\xd4\x17\x02\0\xa6G\xd3V\x13n\x10W\xae\\\t\x94\x96\x8a}k\xe0\xfb\x0b\xaaLy\x0e\xca\x9d_!<<\xb6\x03\xff\x10\x98\x93}\xaa\n\xfc\xbfD9\xb7\x89\x12\x000\xb7[I\xcb\x8f\x95h\xba\x10\0\xb05\xd5\xfcv\x8b\x9e\x117*\xec\x10\xb8\xee\x9d\xc2\xbd\xe7\xe2\xe4\x16\xf2\xd4YP\xe7\x90\xcc\x81p\t\\\x1b\x0fH\xb9\xe1\x8d\xcf\xea\xa7\x8c97\x89\0\0\xdfQ*\x11S\x83\xbf\xb6\xbf\xba\x10\0b\xc9:\xb4\x89*\x89\xa7\xa3Y\xec\\\xa80f\xcaoh\x12z\xb9\x93\xa99\xe62\x98D\x02\xc0~\x81\x17\x80\x17|,\xd2\xa7\0@\x07q\x13\x90cx\x02\xdc\x04\xd8\xc0\xfc\x9fS\xda\x96Q\x8e\x05=\x13\x1f-W\x9d\x01\0|\xb9\x94\xd4\xb5Ry\xbc\xd0\xdaT\xf7:\x008\xe7\xda/Pv\xbf\x1c'\xa9b\x89 S\0 \x96\xaf\xaf\x04\xc5\x97f\xc0)\x97\x07ps\tT\x0f\x03\x97\x98\x94\x86\x11Xac\xab-{\xf4\x1c,'p1\0l\b\x89\x8fB\xa1@\xe7\xb1\x86s\xa4\xdbz\x07\0\xa4\xce\f\xccq\x1f\xd4\xe7\xb5-\xd5U\"\0\x9c\xca{\x80\xbf]\xbb%\x8e.\0R#X\x11\xd0\xe5\0\xb0z\x928%B\x81\xc5\x13\x0fk\x92`w\x03\0\xb6x\xed\x83\0\xa0\xf5\x84s#\xfc\x9e\xae\xb4\x01\xbf\xd3\xa3M$\x9e\x89\xbd\x03\xe2\xca\xb3\x8f\x9f\xd0\xd0\\\xfe\x87\0\0\x8eMs\x84\x02\x15\x11C\x1f\xa0\x1f\xee\x91\x0b\x004\xfb\xe5>\x8e\x80s\x04V\x1b\t\x94\xb9\0`\x009\x99)7\xce=e'\xa1\xff\x01\xca\x15\xe8\xca\xc6\r\xfe\xee\x02\x98\xc5\x7f \0\xd4\x99C\x81\x81H\xf8M\xa0g\xe2\xbdc\x17\0{,\xa1=\xffY\xb1\xb0s\x86\x001\0xd\x06\0\x93\x0f\x01\x80\xdc\xa1\0\xd50\")r\xc9\xa9\b\xa9\xd4\xdf\xbe1j\xd4\b\xf3\xeaa\0\0\xc8:\xb7\x06\0\x06\0\x12\xc5\x8d\r\x05\x1aA\x9c\xaf\x990\x94\xa2\b\xda\xe9\xc7\xdc\xb9N\x97wgb\xdcP\xbe\xe0\x88\x04\x80T&\xe4\xd5\0\xc0\0@\x02\0\x98\xe56&\x14\x90p\xc6\xf5J\xa0\x89\x05\x80\x05\xd2y\xff\xb9\x10a\n\0B\xabTD\xcau__\x02\0\x15\xe3mM\x11\xc6\xa55\x80z\x97\x1cB\xabu(,s\x8en\xc0\xd2e\xa6\x03\xba'\xae\xedZ\x03\0\x93'\xaf1*\x94\x82\x1a\xea\x9a\x13\0\xdckn\b\x0fS\xf2[g\x07\xe6\xec<\xcf\x11>\x8b\x8d\xe9\xe3\x04O\xda\x19\x89cS,>\r\0\xd4\xe0\x1f\x8f~\x85p<\xf8\x83\xe2\x9eG\xc2\x93\xda\x15@\xc21\xf3\xe4\x04\x80\x01d\xdc\x03\x1ds\xbd\x1c'\xe3a@\xf0L\x89a\xd5\x95\x94\xe8J'\t\x85z\xd1c\xc3\xa8\x98\xe4\xdbA(g\xad\bI6\xe2\xd9\xcc\x10\xc7\x19P\x1a\bg\xe2\x99\xb7\x02\x8f\xcf7M\x88Z3VA\xa8\xb0\"c\xc0\x8dl\x1d\xf4\xc6\xca\xb4\x80<s^C<w\x1f\xe7\xa2\xc7\x9e\xf3,y\xd6J\xca\x14b\xce:\xaf\x82{\xe6\x1a\x81Z\xe1\xb3\xbb\xba\xde\x9er\xf1G\x01\xd8c\x82\x93\x1a\xe5\0j\x04\x10\xbb\xa9x<\0\xb8\x7f\xe7\b\x1e$m\xb4\x9a\xd1\xe1\xbe\x05\xbaf\x02\x80\x15\xfe\x1dT\x99b\xc9\xb4\t+\xbc\xebP\t\x94w$\xde\x19\xb5\x1d;y\xc2\x1c\xb7\x12p\x05\xfd\xb4\xa3T\xa1\\\xfc\x85y\xcf\r\xf89\x15p\x12\x10\xd7\xac\x98\x17\x90\b\0x\xeb\xef\xf4\fpv\x9b\x8b\x115q\xa9\xef\xa5\xa7n\xd3\xe5\x94\x1a\xfc$\x17\xb9\0\xad\x07\x99\x8b\xcb=\xc7\td%\xb9%\x94\x1f\xd7\xfb\xf7\b\0\xf0\xff\x0fg\x8d\xb5\x9e{\x0b\x15\x8f\xf9v\x014\xb9\x94\xaf\x16\x8a\x99W\xc2\tP\x0b\xdd\xe1\xd8r[\0\x1d\x07\xde]\xe0y\xdeW\x1fx\x06\xb8\xd9E\x12\x9fv\x84\xf2n\n\xcb\xd6\x80\xbfP\xe9\xec\x12,\x05\xaa\x7f2\x1c\xa1\xe7\xdd2\0P;\xe1\xab\xf5\x14dx\x813\xb3P\xb9\xcf\xcd\x10\xcf\xf8S\xaa\x19)gRK{H=\xa0\n\xfee\xd4\x19\xe1=\xac8%\x01\xa0c\0\xc0$\xf3\x0b\xe4\x94\x8e\xeac\xaf\x12c\xb2*\x93\xbb\x9a\xb2\x10G\xc6]\xdfA\x9e\x7f\xf8V\x8b\x14\x1a&\xea\xe6+\x8e\bCc\0\x90 =\xf0\xc36$I.\xaa\x80\xa5\x87\xf4\xac\xec\x9c\xe1\x1c\xa5\0\xc0]\x88\xbe\x9d\x92\xb3@\xe5\x9b\x93Q\x15\xc8v>\xb8\xb5\xe6\xa3\x1b7\0(\x9c\x04\x1c\x13\xcf\xc3\xd1`I\x13J\xa9\x1c\xfe\x9aZ\x01n\x12\xd17)nO<\x93*\xe2\xfdU\x84b\x8f\xcau\xb0;\xc6\xc1\0\xe0\xa1\0\xf0\xc4\x90\xe6\xad\x92\xba\xd8W\x90\x17?\xe1\xed\xb4\xd0ND\xadX\x1fG\x84w\xe0\x0b\x05B\xd7\xb5\x83q\n\x18\0|(\0\xa4\xd2|kx\x0fp\xc5\xdd\x19\xc6\x9c\x87\x9b\xf3\x90\xcc\x8c\xa0\xf6\xf89\xef\x80\xf2Lv\x02\x98\x06S\xef<\0 \xc9\xdaK:\xfc>\x19\0\xb8\xdatIr\x90\x92\x06\xc2\xe3\xb6$\xd2(\x7fo\x04\xbe$\x99+!\xe6\xf6\xf8\xcfcr\xac7\xfe\x9f4\x8fu~\x7f\x87\xf42o\x03\0\xa40\xabR\x01rg\xb9k\xf8w,\xb9{\x94d\xdby\n\0\f\x10\x97\x94t\xad\xa5V1v\xc1\xfb\xc4\xc5P\x15\xf1\xbcsl\x03r\x9e\xd1\xe8<\xafRD\xb6_\t\0\x9ck\xa6i`\xd1&\xa04\xcdC\xdd\x8d\0\x10\x02(iS\xd2\xaa\xbc\x7f\r\0\xcc\x8e[,\x05\0\xe9\xe7$<\x02W\x03\x80\xeb\x15\x94\xe2y\xf8:\0\x98\x05\xf1]\xea\x04\x1a\xfcRq\xa2gC\n\xb4y\xe2\xbe\xfe&\0Hy\xee\xa1\xad\xd3\x03%\xb7\x96\b\0p\xf7\xce\xfb\x8b\x01\0\x87\x87\\\x02\xb0IX+\xbeg\xb2\xc3\xfb\x93\xbe\x8f\x01\x80S\x01kd\xf9\xb7\x02\xf1\x16&\xda\\\x187\x14[\xc9^\0\0\xad\xf0(\xb1w\x8f\xeb\xfc\x07\xe6Z\xcf\x8eEm\xa2\xb5F\xb1\xb7F\xb17\x81\xf7W\x81\xacB\x93\xda\xe3\xef\x14Jz\xe6\x0bf!\0h\xd8\x95\f\0\b\0\xd8\x81\xdf\x0e\xca5=\x18W\rJ\x9alp\xc6:\xb45U\"9\xa7\x95\x06dCB\xcfg\xda\x0b\xdf\x15\xa5x\xaer\xc6$\x01%\xe5\xdd\xd4\xf5P{\xfc\xa3\xc2M\x0f1D\x19\0\\\x90\x04\xac\xc1O\xc4p\x0e\x9c\xc8\xb5\xef:A\\\xe3\x0f\x06\x8e\xe9\x81\0\x80\x93q\x1b\xe3%h\xde\x15\x958l#\\{\x1c\xda\x9d\xa3\xbe|\xdb\x80\x8b0?DU\0\xce\xca\xeb\xe9\x05\0\xf0\tu\x1f\x8f\x01\0\xecri\xb6ib\x948\xa6\xe9\x07\xf7\xc9S\x000\n\x8f\x9c\x15\x80+\xa455I\x01\xa0!\x80P\x0bl\xdc^;\x07D\x9c\x8b\xaf\xa9\x10\x1d@\xc6\x07\x80\x9f\xd5bj\x9e\x17\0JI\x8eQ\xd0\x14)\xe4\x9d\x16\x01w\r6\x99\xdf\x95/\x1c\xda\x12\x92{\x12\xde=\t\xab\x12\xe5\xe27J\x17\x1d{y;\xfcf\x04\xc2^\xe4\x938$\f\0\x14.^\x89j\xc2\xbb\0 \x17\xfb\xb0\x04\0\xdc\x8c{\x13\t\0X\xd1\x16\xcf\xb9j\xa4h\x1bq\xcdk\xc0\xc2w\xf0wG'\xa6\xa7@B\x98\xd2\x9b\x8a\xbf\x07\0vHo\x1az\x1a\0\xe0\n\xbc\xb9\xd0\xbb\xc2\xee\xf6\xc0<\x03i\xe1\xd1\xce(\xe7\x02\xd7\xd1\xaa\xbb\xe03\x03\x9d\x98\xd6\x10\xa6\x18\0<\x04\0R\xbb\xfd\x9e\x06\0\xd8\x92\xae\x05\xdf\x95\xfb[\x12\xeeD\xe9\xf4\xa7^\xa0\x8cw\x95\xdd\xd6?`\x85\xe7\x02X\xe5\xdf\x07\0\0|\0\0l\nK\x9a\xfa\xae\xf0(\xb5P]\x83k!C\xb5\x0e\x1a\"\x18|\x9fw\x88\xf1\x01\x14ZT%\x8ba>\x1d\x000\xddvS\xf8]\xe5\xecC\xd0>\xa7\xd5\0\xe03\x01\xe0j9@\xdf\x16\xfaD\0\xc0\xcd;\xfd\x05\xef\xaa\x14\0H\x80\xebn\x0f\xa0\x02#\xff\x8c\x96\xe9A\0P\xbar\xeb\n\0\xc0Y\xea)\xe3\xb9%C\\\xb8\x03\x17p\xf9j\x1d4\fNw\xe6\0L2\xc8\x0e\xcf)\x97\xcc\x01F\xc3O\f\\\xdd\0\0\x98A'w\x01J\x0eo\xad\xe4.\x80\x11p\xbcDN\xe2J\\?\x9f\xc3\xe2\xb5\xc2\x05\xec[\x80\x1d\xa4\x11\x7f\xe2\xfe\xf4\xfaB\0\xc0\xfd\b\xb9z#\xee\0\0l\x18\xb6\x9fw\xe3>\xcf\x06l\x04\xd7k\xc5\xd7F\x9b\x92\xa4\x92\x14\x844 +\x83=\x12<\x12\t\x8bM)Y\xa0\xfcP\xca+\x01\x007-\xbdy\b\xe79\x94\x05\xcf\xb4\xfc\xda\xedB\x1c\x17\xd6\x99Aed\xacc't?5J\x8c\xad\x7f\x7f\xf1\xf3,]\xc3p5\0\x9c\xef\x8d\x1b|\xa2\xa9\xe2\xbbk\xad\xa7\xd2\xbd\x9b\b\x84\x9a\xe1\xe7z\b\x93`\xd1\xb9\xee\xe7,\xfc\xed\xe3F\xeb\x8f\xad\xe1\x1ay<\r\0\\p\x1d<\x86\xe3\xe9\x95vx\x1c\x9d;\xd32\xc5\xd34Q\xb8\xe0-\xe8\x8ba|\xdc\xef>O\xa5\xf6X(\xce\x1dM\xc9\x03\x84\xbe\xfb\x07\xae\xa3\xbf2\x89\xf3J\xfbL\x9e\xa6\x89\xe2\xa1c\xa4\xd5X\x8c>B\x81$\xb1\xa8\x01\xc0\xf7\b\x97\xa0\xb4g\x0f\x7f\xf9\xd5\x17\x8fK:E\xe4\x07B\xc9\xa3\x18\x97\x15\xcf\xb0\xa7\x0e\xe9\xb5\x96\0\0\x93g\xcaa\0@K\x07\xe9\xfd\xde>\x19 /\xabN\x03a\xd6\xddI\xe9Y\xbc\x15\0\xba\x9fp\xc7G\x8b\xaeaC\xceU!HU\"jb\xea\x92e\xc4\xee\xceLG\xac\xfd\xaf\f\x01\xb0\xa5\xdeQ\x82g\xf6\x80@L\xf2%W#Ln\xb7\xf0-\0 \x19\xcf\xc5\x8d\xe8\xba\x1a\0\xf6\x87\0@\x1fx>\x98q\xfa+\x93\x80n\xac>\x13\x8bo\x07\xdd\x80\x85*\xb0`'\x03\x80\xa8\xf0\f\x17\xdbL\xf0o6{\x17xZ\x9a\x9d\b\x8aWQ\n\0\x9a\x90\xaft#\x91o\xbc\xd9\x13\xd7\xe5\xa5\x82\x91\xb1\x12~V\x82\xec\x0b\x84\x93\x80\x9d\x01\x80J\xa4\xb3\xfc\xdcg\xdcgZ\x173s\xff\x92f\xa4\xe6\x01\0@\x154}-[\x90\xb6~{\x15\xbeT\xdf4\x96\x0e\xd2\x880S3\xeb\xe3K\x01@C\x90\xdad\xc8\xb74\x82\x90M\x0b\0k\x06\x008;\xfdb\x89h;\xf8MjZ\xa2L\xfbU\xb2+Qz\x10\xa0&\x8eU\x9b\0\xe0,\x06\0\xe2\x85\xab)\x86Ji\xc9\xad\x841\xb1\xe4\xb9be\x1b\x12\0`\fX\xef]\xe0Mrc\xe5\xbe\x9a.,v\xf6\x1a\x15\xdbq\xa5\xc0\xb1\xa1\0\xb6(\xda\xa3g\x16\xb1\xe6\xb8\x12\0zG94C@b\xaem\x14\x82\xcd\x012\xf6\xa8Q\xe1\xf5\x85\xae{\x10\x80{#\xcc\x9d\x9c\xe4\xa0\x0bq]\xa7\xa7Q\x19\0\xe8\x01`\x14\xb8\x8f\xa1\x8c\xec\xd5V\xf7S\x8bvv\x88\xdb\xd2\xaa#\x95\xb5#\0\0\x97s/J\0\xa8\xe17\xf5\xb7o-\xae\x82s\xba[\xd8\xbe\xc1,\x95\x07pf\x03\x009\0\xe0\x1e\x80V\xf8\xb2W\x03\x80\xac\x89\xae\xd8\xc5+\x1d\xef\x85\xdf_K\0\0^3\x94\xd7\xe7\x03\0.\xe4\x9c\b/\x80\x9b-\x11bi\xbe\x83\xdd\xf8\x11\0 qyz\xe2\xe1\xf4 \x9f\xa2S\x83\xbe\x0b\xb1$\0<9\x07\xa0\x915r\xf1\xd6\xa0\xab\xd5X\x14\0\x80\xc1%t~\x1f\0\xac\xcc\xfal\x89\x1c\xc3&0F\xbd'\x14\xfc\xaa\xaa@-\xf5\xd6\f\xf7\x15M\x18\0\xc8\xdf\xcd\x9e\xf0]\tp\x8cJ\0\x90\xcck\xe4\0@\xeb\x91J\xdfQ\xa8\xcdy\xfe\x06\0\xd0\xb6\xe7\xba\xdbQ`\0\xf0\x18\0\x98!\xbe\x04\x17\xc7\xfe\xdada%\0\0\x9f\xb5m\x1f\x02\x008Q\xf8Uc\xc4\xf0\xcbo2\xc5\x88\x06\0\xf7)\xbf6n\x8d\xe1_\x1c\x88\xfb\xa7\xe2\xee\x15\xc2u\xf7>e\x9f\x19\x85\xa4BRM\xe5*\xceS\x1c\xf0E\xcc\xc28\xee\x19\x10\xaa\xe3q\xe0[\xe1\xa4\xda(8\x7f\xab<\x9a\x0f\x04\x80\n~O\x19\x8e\t\xcb\x8e\b\xab\xd7F\x02\0\xae\x11\x19\x19\0\xe8\x81\xae#\xa0\0BZ=\x19\xf2\0\xbe\xaa1h\x14*'U9u%\0\xa46\xb3\xbc\x1d\0|\xfb\xdb1\xca\x1f\xdb\t\x17\x0b\0x\xad\xb9\x96\xd6\x07\0\xeev\xdd\x81,9\xa7\xe0\xbe";

  var d_096bc231ae663e6b83097c210f8a7ac4 = " width=19 height=24 xoffset=1 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=84 x=103 y=101 width=19 height=23 xoffset=1 yoffset=2 xadvance=20 page=0 chnl=15\nchar id=85 x=104 y=57 width=18 height=24 xoffset=3 yoffset=2 xadvance=23 page=0 chnl=15\nchar id=86 x=123 y=29 width=21 height=23 xoffset=0 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=87 x=126 y=3 width=30 height=23 xoffset=0 yoffset=2 xadvance=30 page=0 chnl=15\nchar id=88 x=84 y=203 width=21 height=23 xoffset=0 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=89 x=84 y=229 width=21 height=23 xoffset=0 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=90 x=87 y=156 width=18 height=23 xoffset=1 yoffset=2 xadvance=20 page=0 chnl=15\nchar id=48 x=106 y=127 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=49 x=108 y=154 width=9 height=23 xoffset=3 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=50 x=108 y=180 width=16 height=23 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=51 x=108 y=206 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=52 x=120 y=154 width=16 height=23 xoffset=0 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=53 x=124 y=127 width=16 height=23 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=54 x=126 y=206 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=55 x=127 y=180 width=15 height=23 xoffset=2 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=56 x=139 y=153 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=57 x=144 y=206 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=33 x=145 y=180 width=4 height=23 xoffset=3 yoffset=2 xadvance=9 page=0 chnl=15\nchar id=8470 x=152 y=180 width=31 height=23 xoffset=3 yoffset=2 xadvance=34 page=0 chnl=15\nchar id=59 x=45 y=75 width=4 height=21 xoffset=3 yoffset=8 xadvance=9 page=0 chnl=15\nchar id=37 x=162 y=206 width=25 height=24 xoffset=2 yoffset=2 xadvance=28 page=0 chnl=15\nchar id=58 x=68 y=3 width=4 height=17 xoffset=3 yoffset=8 xadvance=9 page=0 chnl=15\nchar id=63 x=125 y=55 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=42 x=82 y=29 width=11 height=10 xoffset=1 yoffset=2 xadvance=12 page=0 chnl=15\nchar id=40 x=125 y=82 width=8 height=30 xoffset=2 yoffset=2 xadvance=11 page=0 chnl=15\nchar id=41 x=136 y=82 width=8 height=30 xoffset=2 yoffset=2 xadvance=11 page=0 chnl=15\nchar id=95 x=22 y=193 width=19 height=2 xoffset=0 yoffset=29 xadvance=18 page=0 chnl=15\nchar id=43 x=59 y=237 width=15 height=15 xoffset=2 yoffset=6 xadvance=19 page=0 chnl=15\nchar id=45 x=44 y=125 width=9 height=3 xoffset=1 yoffset=15 xadvance=11 page=0 chnl=15\nchar id=61 x=41 y=240 width=15 height=10 xoffset=2 yoffset=9 xadvance=19 page=0 chnl=15\nchar id=46 x=82 y=42 width=4 height=4 xoffset=3 yoffset=22 xadvance=9 page=0 chnl=15\nchar id=44 x=97 y=57 width=4 height=8 xoffset=3 yoffset=22 xadvance=9 page=0 chnl=15\nchar id=47 x=143 y=55 width=9 height=24 xoffset=0 yoffset=2 xadvance=9 page=0 chnl=15\nchar id=124 x=143 y=115 width=3 height=30 xoffset=3 yoffset=2 xadvance=8 page=0 chnl=15\nchar id=92 x=147 y=82 width=9 height=24 xoffset=0 yoffset=2 xadvance=9 page=0 chnl=15\nchar id=34 x=125 y=115 width=9 height=8 xoffset=1 yoffset=2 xadvance=11 page=0 chnl=15\nchar id=39 x=77 y=237 width=4 height=8 xoffset=1 yoffset=2 xadvance=6 page=0 chnl=15\nchar id=64 x=149 y=109 width=30 height=30 xoffset=2 yoffset=2 xadvance=32 page=0 chnl=15\nchar id=35 x=157 y=142 width=17 height=24 xoffset=0 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=36 x=177 y=142 width=16 height=29 xoffset=1 yoffset=0 xadvance=18 page=0 chnl=15\nchar id=94 x=3 y=240 width=14 height=13 xoffset=1 yoffset=2 xadvance=15 page=0 chnl=15\nchar id=38 x=186 y=174 width=20 height=24 xoffset=1 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=123 x=155 y=29 width=9 height=30 xoffset=1 yoffset=2 xadvance=11 page=0 chnl=15\nchar id=125 x=159 y=62 width=9 height=30 xoffset=1 yoffset=2 xadvance=11 page=0 chnl=15\nchar id=91 x=190 y=201 width=7 height=30 xoffset=2 yoffset=2 xadvance=9 page=0 chnl=15\nchar id=93 x=200 y=201 width=7 height=30 xoffset=1 yoffset=2 xadvance=9 page=0 c";

  var d_8f72a8e66d30e2a8b44b5f50ccb81b54 = "hnl=15\nchar id=32 x=0 y=0 width=0 height=0 xoffset=1 yoffset=2 xadvance=9 page=0 chnl=15\nkernings count=97\nkerning first=32 second=65 amount=-2\nkerning first=32 second=84 amount=-1\nkerning first=32 second=89 amount=-1\nkerning first=49 second=49 amount=-2\nkerning first=65 second=32 amount=-2\nkerning first=65 second=84 amount=-2\nkerning first=65 second=86 amount=-2\nkerning first=65 second=87 amount=-1\nkerning first=65 second=89 amount=-2\nkerning first=65 second=118 amount=-1\nkerning first=65 second=119 amount=-1\nkerning first=65 second=121 amount=-1\nkerning first=70 second=44 amount=-4\nkerning first=70 second=46 amount=-4\nkerning first=70 second=65 amount=-2\nkerning first=76 second=32 amount=-1\nkerning first=76 second=84 amount=-2\nkerning first=76 second=86 amount=-2\nkerning first=76 second=87 amount=-2\nkerning first=76 second=89 amount=-2\nkerning first=76 second=121 amount=-1\nkerning first=80 second=32 amount=-1\nkerning first=80 second=44 amount=-4\nkerning first=80 second=46 amount=-4\nkerning first=80 second=65 amount=-2\nkerning first=82 second=84 amount=-1\nkerning first=82 second=86 amount=-1\nkerning first=82 second=87 amount=-1\nkerning first=82 second=89 amount=-1\nkerning first=84 second=32 amount=-1\nkerning first=84 second=44 amount=-4\nkerning first=84 second=45 amount=-2\nkerning first=84 second=46 amount=-4\nkerning first=84 second=58 amount=-4\nkerning first=84 second=59 amount=-4\nkerning first=84 second=65 amount=-2\nkerning first=84 second=79 amount=-1\nkerning first=84 second=97 amount=-4\nkerning first=84 second=99 amount=-4\nkerning first=84 second=101 amount=-4\nkerning first=84 second=105 amount=-1\nkerning first=84 second=111 amount=-4\nkerning first=84 second=114 amount=-1\nkerning first=84 second=115 amount=-4\nkerning first=84 second=117 amount=-1\nkerning first=84 second=119 amount=-2\nkerning first=84 second=121 amount=-2\nkerning first=86 second=44 amount=-3\nkerning first=86 second=45 amount=-2\nkerning first=86 second=46 amount=-3\nkerning first=86 second=58 amount=-1\nkerning first=86 second=59 amount=-1\nkerning first=86 second=65 amount=-2\nkerning first=86 second=97 amount=-2\nkerning first=86 second=101 amount=-2\nkerning first=86 second=105 amount=-1\nkerning first=86 second=111 amount=-2\nkerning first=86 second=114 amount=-1\nkerning first=86 second=117 amount=-1\nkerning first=86 second=121 amount=-1\nkerning first=87 second=44 amount=-2\nkerning first=87 second=45 amount=-1\nkerning first=87 second=46 amount=-2\nkerning first=87 second=58 amount=-1\nkerning first=87 second=59 amount=-1\nkerning first=87 second=65 amount=-1\nkerning first=87 second=97 amount=-1\nkerning first=87 second=101 amount=-1\nkerning first=87 second=105 amount=0\nkerning first=87 second=111 amount=-1\nkerning first=87 second=114 amount=-1\nkerning first=87 second=117 amount=-1\nkerning first=87 second=121 amount=0\nkerning first=89 second=32 amount=-1\nkerning first=89 second=44 amount=-4\nkerning first=89 second=45 amount=-3\nkerning first=89 second=46 amount=-4\nkerning first=89 second=58 amount=-2\nkerning first=89 second=59 amount=-2\nkerning first=89 second=65 amount=-2\nkerning first=89 second=97 amount=-2\nkerning first=89 second=101 amount=-3\nkerning first=89 second=105 amount=-1\nkerning first=89 second=111 amount=-3\nkerning first=89 second=112 amount=-2\nkerning first=89 second=113 amount=-3\nkerning first=89 second=117 amount=-2\nkerning first=89 second=118 amount=-2\nkerning first=102 second=102 amount=-1\nkerning first=114 second=44 amount=-2\nkerning first=114 second=46 amount=-2\nkerning first=118 second=44 amount=-2\nkerning first=118 second=46 amount=-2\nkerning first=119 second=44 amount=-2\nkerning first=119 second=46 amount=-2\nkerning first=121 second=44 amount=-2\nkerning first=121 second=46 amount=-2";

  var d_0118d93503fb26f597f0e4924d5b8c0d = "info face=font size=32 bold=0 italic=0 charset= unicode= stretchH=100 smooth=1 aa=1 padding=3,3,3,3 spacing=0,0 outline=0\ncommon lineHeight=36 base=25 scaleW=256 scaleH=256 pages=1 packed=0\npage id=0 file=\"font.png\"\nchars count=91\nchar id=97 x=3 y=3 width=16 height=18 xoffset=1 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=98 x=3 y=24 width=15 height=24 xoffset=2 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=99 x=3 y=51 width=15 height=18 xoffset=1 yoffset=8 xadvance=16 page=0 chnl=15\nchar id=100 x=3 y=72 width=15 height=24 xoffset=1 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=101 x=3 y=99 width=16 height=18 xoffset=1 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=102 x=21 y=24 width=10 height=24 xoffset=0 yoffset=2 xadvance=9 page=0 chnl=15\nchar id=103 x=21 y=51 width=15 height=24 xoffset=1 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=104 x=34 y=3 width=14 height=23 xoffset=2 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=105 x=3 y=120 width=3 height=23 xoffset=2 yoffset=2 xadvance=7 page=0 chnl=15\nchar id=106 x=3 y=146 width=7 height=30 xoffset=-1 yoffset=2 xadvance=7 page=0 chnl=15\nchar id=107 x=9 y=120 width=14 height=23 xoffset=2 yoffset=2 xadvance=16 page=0 chnl=15\nchar id=108 x=22 y=78 width=3 height=23 xoffset=2 yoffset=2 xadvance=7 page=0 chnl=15\nchar id=109 x=34 y=29 width=23 height=17 xoffset=2 yoffset=8 xadvance=27 page=0 chnl=15\nchar id=110 x=51 y=3 width=14 height=17 xoffset=2 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=111 x=3 y=179 width=16 height=18 xoffset=1 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=112 x=13 y=146 width=15 height=24 xoffset=2 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=113 x=26 y=104 width=15 height=24 xoffset=1 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=114 x=22 y=3 width=9 height=17 xoffset=2 yoffset=8 xadvance=11 page=0 chnl=15\nchar id=115 x=28 y=78 width=14 height=18 xoffset=1 yoffset=8 xadvance=16 page=0 chnl=15\nchar id=116 x=39 y=49 width=8 height=23 xoffset=1 yoffset=3 xadvance=9 page=0 chnl=15\nchar id=117 x=3 y=200 width=14 height=17 xoffset=2 yoffset=8 xadvance=18 page=0 chnl=15\nchar id=118 x=3 y=220 width=16 height=17 xoffset=0 yoffset=8 xadvance=16 page=0 chnl=15\nchar id=119 x=20 y=200 width=23 height=17 xoffset=0 yoffset=8 xadvance=23 page=0 chnl=15\nchar id=120 x=22 y=173 width=16 height=17 xoffset=0 yoffset=8 xadvance=16 page=0 chnl=15\nchar id=121 x=22 y=220 width=16 height=24 xoffset=1 yoffset=8 xadvance=16 page=0 chnl=15\nchar id=122 x=41 y=220 width=15 height=17 xoffset=1 yoffset=8 xadvance=16 page=0 chnl=15\nchar id=65 x=31 y=131 width=22 height=23 xoffset=0 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=66 x=44 y=99 width=18 height=23 xoffset=2 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=67 x=41 y=157 width=21 height=24 xoffset=2 yoffset=2 xadvance=23 page=0 chnl=15\nchar id=68 x=56 y=125 width=19 height=23 xoffset=2 yoffset=2 xadvance=23 page=0 chnl=15\nchar id=69 x=46 y=184 width=17 height=23 xoffset=3 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=70 x=65 y=151 width=16 height=23 xoffset=3 yoffset=2 xadvance=20 page=0 chnl=15\nchar id=71 x=59 y=210 width=22 height=24 xoffset=2 yoffset=2 xadvance=25 page=0 chnl=15\nchar id=72 x=66 y=177 width=18 height=23 xoffset=3 yoffset=2 xadvance=23 page=0 chnl=15\nchar id=73 x=50 y=49 width=3 height=23 xoffset=3 yoffset=2 xadvance=9 page=0 chnl=15\nchar id=74 x=56 y=49 width=13 height=24 xoffset=1 yoffset=2 xadvance=16 page=0 chnl=15\nchar id=75 x=60 y=23 width=19 height=23 xoffset=2 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=76 x=65 y=76 width=15 height=23 xoffset=2 yoffset=2 xadvance=18 page=0 chnl=15\nchar id=77 x=72 y=49 width=22 height=23 xoffset=2 yoffset=2 xadvance=27 page=0 chnl=15\nchar id=78 x=82 y=3 width=18 height=23 xoffset=2 yoffset=2 xadvance=23 page=0 chnl=15\nchar id=79 x=78 y=102 width=22 height=24 xoffset=2 yoffset=2 xadvance=25 page=0 chnl=15\nchar id=80 x=83 y=75 width=18 height=23 xoffset=2 yoffset=2 xadvance=21 page=0 chnl=15\nchar id=81 x=97 y=29 width=23 height=25 xoffset=1 yoffset=2 xadvance=25 page=0 chnl=15\nchar id=82 x=103 y=3 width=20 height=23 xoffset=3 yoffset=2 xadvance=23 page=0 chnl=15\nchar id=83 x=84 y=129";

  var d_37e5d986c886a357d80b4e7e80cfb0bc = "\x89PNG\r\n\x1a\n\0\0\0\rIHDR\0\0\x01\0\0\0\x01\0\b\x06\0\0\0\\r\xa8f\0\0)\x12IDATx\xda\xed]i\xb5\xacL\xac\x8d\x03$ \x01\tH@\x02\x12\x90\x80\x04$ \x01\tH@\x02\x12\x90p\xdf\xf7\xde:\xbc[7\xa7*C\r\f\xdd\xc9Z\xfc9\xa7\x9bf\xa8\xec\f\x95\xec\0\x98\x98\x98\x98\x98\x98\x98\x98\x98\x98\x98\x98\xfc\x9f\xd4\xff\x1d\xcb\x7f\xc7\x1a8F\xe6\xfb\xe3\xcf\xd1\xfewT\xff\x1d\x03\xfa~\x8f>\xff\xe7\xe7X\x13\xae\xd9\xfd\xcd\xf3\x1ef\xe5\xb5\xffq\x8eV\xf1\xdb\xb1\xdf\xc3\xdf\r\xfd\x9d:6t\x7f\xcb\xcf3\xa7dw\xbe_\t\xd7\x83\xfb\x9b\xb3\xf0\xdef\xe7;\xbd\xa9\xd5;d\x14.\xbc\xf5gaP\x8bzD\x8b\xe0<\xf6\x02\0\xe0\xfe\xe6\xc0\\\xfb\x11\xb8\xf6\x1c\0\xb0\x0b\x95*\x17\0\x84\xee\xaf\x17*f'\xb8\xc6\xdes~\x89\xb8@S\x9bj=_:dY&\xc7\xb2\x9e\xc7N(\xb2O\xa1}\x0bt(\b\0{\xc0:\x1e\x1e\0+\x01\0\x7f~\x9e[N\0\x18\x89\xc3\xf5\xd4\xf0ut\x02\x85\x96\\\xeb\xe29w\xa3\xf0\x1avS\xadw\xc8\xea |\xe8\x05WH\x99\x1a\xa1B\xb4?\xc7\xe8\xb1\x909\x01\xe0\xbc~\x9f\x15\xc6\x9e\x01\xb6J\xadsT\t\0\xa0\x01\x10\t\0H\xa5B\0\xb8\n\x94s\x13\x9c\xf7|\xdf\x8b\x028\xfaH@4\xb9IZ\xc5\x0b\x9b\tk\x0e\x8c\xb5\xe7<\x86\x1c\0\xd0\x0b\xadY\xae\xb8\xf4O \xcc\xa9.\x06\0\xf8\x01\xe4?\x82\x18\x7f\x17\x9e\xbfC\x1e\xc5.\x04\x0em\x98a\xf2\x80\xc4\xdfi\xa1\xb9xmD\xeei\xaa+\x9d\x1b\0\xa4\x96i,\0\0\xab\xd2\xf2\xe5\x06\0\xf8QN\xee\xf9\xcf\xc2w4!0\x99\x84q\xbd6\xd1h\xf2\x12\xa9\xd0\xe2\x19\x13\x941\x04\0)\x19|\x0eD\xda\xc2\0P\xa3\x10\xa9\xbd\x01\0V\xc1\xefw\xc2\xe7\xb0\xa3\xe7\xda\n\xbc\xbb:\x13\xa8\x9b\xdc\x1c\x12\xb4?\x16\xf3L6\xed\x1eW\x97\x02\x80=\x02\0\xb8]\x88\x8d\xc9;\xdc\r\x008\xd7\xc0\x85\x02%\0`\x07>YW)s\x05\xa3\xe2Y\x97\xf0\xb2L.\x92>\xa0\xe8n\x82m\x17\x02\xc0\x1a\xa1@\xd8\x9d\xf6e\xf1\xb7\x87\x03\0(B\x81\xdc\x000\x83|\xbbnc>7\x04\x80da\xdc\xfb\x19\xe4\xbb\x05&\x0f\x92\x89P\xc4\xc9I\xe6\x8c\x85\x01`\x0eX,j\xf7\xe1i\0 \r\x05r\x01@\x05\xbfw9F\xc5\xfb\xf6)\xea\x12\0\b\xf7wz\xc2\x039L\xa5\xde#\xb8\x06\xa0'\x92<%\x01`\x16.\xd8\xe1\xe1\0 \r\x05J\x14\x02I\x9f}\x07\xb2\xdd\x9c\x05\xfd\xbd!\xdeWM|\xcf\xe4\xc1\xb2\x80|\xebn.\b\0U\xa4\xf2>\x11\0$\xa1@n\x008~~G\x92y\xaf\bE\xee\"\xad|\x0f\xba-`\x93\x87\x88T\t\xb1+\x9e\x13\0R\x94\xf7\xa9\0\xc0\x85\x02\x12\0\xf0\xf5c\x1c\x1e\xcf\xa9\x03\xfd\x96\xdb\n\xfe\x84\xad\x0b\xf2\xb5\"\xce\xe7\xbeg\xf2P9\x84/n\x04\xf9.\xc0\xdb\0\xc0-\xb1\xad3\x01\0\x17\n\xc4\xe6\0*\xf8]\xa2\x1b\x03hc\xe0\xbd\xef@\xef\xe4\x84,=\xf7=\x93\x17\x84\0\x9bG\x01j\xf0'\t?\t\0r\xf4\x02p\x96\x16\x87\x02\xa9I@\x9c\xf8\xd3\xba\xdd\xad\xc7\xd5o\x80\xdf\xc1\xf0\x85\x0f5\xe8;\x06M\x1e\"\x8d\xc7\xad\xa4:\xcd\xa8\x17m\0 \x0f\x05r\xec\x02`\x10\xd0n\xbd\xe1w\xe9\x9e\x8f*\xe3\xdd\x90\xb5\x97~\xcf\xe4\xc1 \xb0\b\x93K\x07\x913\xb0\x10@\x1e\n\xe4\xda\x06\\!\xbe%\x19\xe7\x01\xb8}\xfeSp\x99\xb0\xf4{&/\0\x82\xd8\xce\xb8\x94$\xda\x1d\t\xbc\x9c\xd7\xffG\xa9\xa8SF\0\xc0\x1e\x86f\x0bn@y\0i\xc3O\x87<\x1a\xe9\xf7LL\xbe\x16\0j\"\xd4J\x01\x80\xd3\x83\x89\tc\x1a\x94C\xd0<c\x1f\x98Y\xf9\xaf\x89\x01\x80\"f\xcfY\n\xbcE\x86\x02\x87\x13\xeai\0d\x8d\xfc\x9e\x89\xc9\xe5\0\x10K\xb2\xb1\xa1\\H\x93\xe1\xbck!\0\xc0|\0R2\x8e\x05\xe2h\xbf\x86\xc8\xef\x99\xbcT\t\xb5\x82\tAW\xcf\xa2|*\0H\x94?VY}\xa1@\x0e\0\0On\xa1\x8dP\xe4%\x12p\xac\xfc\xd7\0\xe0\xff\xa5\x0b\xb8\xba\xe3\x0b\0@\xaa\xfc)\xca:\x14\x02\0L\r\xb6E(\xb2\xa6\x9e\xe0\0+\xff5\0 ,\xdc\x8e<\x80\xf6\xe6{\xfc\x93Q\xf9ML\f\0<2\xc2\xf3H!%\0\x80\x95\x7f7\xe571\0H\x03\x80\xf6%\0\x80\x95\x7f\x03+h11\0(\x0e\0\xbe\xa9>\xff[n\xec\xf2\x02.\xf0\xbb\xbc\xb4\x85\xdf\xdc\x81sd\xac\x9eS\xf9s\0_\xfd\xf3L\xa8\xe9L\x9ajE7'\xd0'\\SN\xae\xff\x16\xfe\xce5\xb0\xdd\x83\x87\x01\x80\xfbr4\xf1{\xeb(\xa6\x9b\x18:\xffNM\xe4\x19\x81\xe7\x04\xec=\0#\xe5\xe5\x0f\x01@n\xcb\x9f\x02\0\x15\x84\x07\xaa\xf8\x8eEx\xadC\x06\x90\xa7\bYR\fDl\xb2\xd3\xa4\x10\0,B%\xe4\xac\xacd\x07\0\x90\xe2\xf9\xfa\xe0qB\xce\xa5\xaar\xc1\x89\x9bZ\xe4[l9\x94\xbf\x02\x7f+m\xe3XN\x89\xb5n<\xcf\xe0\0\x9e\x0b`\x13\xe4)p\xdfAL\xaf~.\xaao\x97Sbs<7\x93\x87\xc4\xc7\xaeu9\xad\xf2\x84\x16\xc0T\0\0\xa8\xb9v\x0b\xf0\x94W\xb8\xa3\xb1c\0\xa0\xf2(\\L\xc2o\x82\x7f\xa9\xd4V\xf8]\x1f\xbf\x0b\x94\x1f\x13\x9fR\x1eD\xe7yn\xdc\xb5kX\x9f\xa8\xdfK\xdd\xeb\xb7\xae\xc1\x17\0@\x17\x88\x01\xa5\x03\x1f59\0\t\xa9E\x03\xb2\xe2\x16\x8a\x92\x1a\xb3\x1em\xe0\xa7\x1d\xd7\xca\x02\xb2)\xbe\xd4\xf3\xda\x10\xb8I,l\x03\xba\xfd\xfe.!\x86\xcf9\xe9g5\xb7\xff\xd9\x000\x0b\x17\xd1\\\0\0$\x1c\xfa;\x93\x83\x90\0\xc0\x86,Z\xecpO\xfcl0\xb1J/p\xb7\x07\x88\xaf9\xc0\x9e\x03g\xd9%3\x03\xa8\xf0!G\xf2\xcf\0\xe0\xc1\0p\x80n\xbe|\x9d\x11\x006\xe1\xe7\xd6\f\0@\x91`\xc4&\xf0Ne<\x1c\xa5\x94d\xdc\xf7D\xeb:*\x144\xa6>#\xf7\xa0\x0f\x03\x80\x07\x03\x80$\xbe\x9b\x05\t\xc1\x18\0X/\x06\x80\x99X\x98\x12 \xc4Vrw~\xb7\x17*u\x07\xe9\xd9\xf9J\x01^5\xe8\x1bw6\xc8K\xf4i\0\xf0`\0\x90 \xfc(\xf8\xfc\xd3\x01`\x0e(\xc7\x11\xa9\x90\x13\xfcn\xc1]\x05\x9e\xcd\x04y\xa6\x15/ \xe7\xe3[\x14\x1eG\t\x9e\x7f\x03\0\x03\x80\xdb\x01@b\x91\xb5\xd9\xf2\x11)\xd49\xe4\xb4\x12*CJ\xc9\xf1\xa0\b\xa5z\x05X\xe4\x02(\x03\0\x03\x80W\0\0\xb6\x90\xa5\xe7\xdb\xe5*\x84i\x95\xe7\xa28\x1d}\x9f\xcbY\xa9\xb7\x81M\x0e~,\0H\n2>!\x07 \x8d\xe7cH6\xdf\0\0\x12\xcb\xeezC\xd3Mk\xcd\xe4b\0\x90\xec\x83K\x92Bo\x06\0\x9fB\xcd\x1f\x06\0\xb5\xe0y.\x90\x7f\xcaO_ \xa40\xc9\xbc\x10\xa5Y\xe4]\x18&\xbc\x11\0\xb0\x95\xa4\x16l\xca\xf6\xe1]\0\x80c\xf1\xda\xe3\x05\xe5l\x10k\xd1\x9a0\xe6\xe0\x07\x03\0\xb5\x05\xb6\b\x11\xfc\x13\0\0{;\x07\xd0\xcdL1\0\xb0B\x9e\xee\xc11Ba\xa9A\x9e\x03\xe4\xb5\xd4\xb8\xd0\xca\xda\xac\x1f\f\0\xbe\xd2\xd5\x1a~\x97\xab\xc2\x17\0@\x03|\xa9p\n\0\xe4\xea\xb0[\"\xe2u\xb7)g\x0f\0\xdf\x91IY]\xaf\xd1\\\xff\x07\x03\xc0\x04\xfe\x1aym\x0b\xea\xa7\0\0\xb6\x86>\x05K\x19\xa2\xd2dp\x8b\xf1\xc4f\r\b\xf9\xa6\xfc6\x05r\x1f#\xfa\xad\xc9T\xee\x99\x000\x02\xdd\x93>*^\xb8\xf1\xc4\xcbd\x17>\xab\xb3\xd7\xa0'\x9e\xf5\x9e\0@\x93\xc7+\xc9\xbd\x05:\x81\x8d\x0f\x7f\x8d\xa4\x8c\b\xab\xe1\xba\xd1bo\x97\x16d[\x8e\x0b\xfa\\\xeb\tQb\xdck<\xe4\xb3\xf4\x88/\xf3\x02LL\x90\xe0\xe1\x9eM\xc0]\xc7d G\x86\x10\xa2G\x1eH\xe9m:\x9b!h\xa2\x8eq'\x81E\x89\xd9J\xa3\xb2\xe7\\\xf3\x90V\xb94\x84\xa4\xe74\xe6\xc6\xe3\x95\xcd\xe0\x9f\xde\\'<_\x17|JO\xf8\xb5R`\x13\xb1\f\x8e\x95\xbb\x1b\0b\xcaa\x17\x90s\xdfa\x82\x0f\xcd\x91\x9a]\x9f\xe1\x9a\xc2'\x03\x80\x17\b\xc5H\xab\xd9\xaaj~\xac\x98\xef\x1c\x95\xa3\x80.#p\x8cr_\x05\0\xda~\xfd\n\xf8!\xa0\xbe\xef\x8cB \xd8~>\x8b;\x18c\x92\xae\xb8\x90\xa85\0\xf8N\x91X!\xc9\xde0w\x9e\x03d\xa3\xbe\x9e\x06\0\x1a\xcb\xd8G\0\0\xfe\xfe\xec\x01\xd0\x19)h\r\xbfwm\x9e\x9ca7\0x\xa8`+\xb0:\x16z\x84\xdf\x84\x195a\xc5\x0e\xe4\x9e\xba\xe7\xf1\x8d\xa2~:\0,\x11a\x80\xcb\x07p\x05\xfdu\xeb\x80\x04\x18\0\x98he\x13(\xe4*\xb0\x86\\U\x9a\xaf\xce`\xf4,f\x9f[\xdaB\x9e\xf1\xdcZ\0\x902\xfc\xb8V\xd9\xad\xf03\xfe{\xff\xfa0y\x90\xeb/)&\xc1\xd6\xbd&\x16>\xb5\xa7\xdd0\x1e\0\x15\x82\xac7\0@\xa5\f\x03\x86\xc0w\x9f\xb4\xe8k\xf0\x8fo?\xf341a\xc4\f\xbaF1\xab\x11y\x88h\x98_\x06\b\x8f\xa7\xd2\x9cg|\x11\0\x802\f\xd8\xe0_\x1a\xad\xa7\x01\xc0\x04\xb2\xdd\x05m\xb1\xce.\0\xc9\x01\xfc\xb3'L\x1e\xe2\xfe\xa7\x94\x7fj(\xae\x9a\x17\xe5\0\0\xe4\xbd\xec\xb5\xe7s\xa1k\\!\x7f\xef\x02\xf7\xdd^\x91\xeb\xd1\x14\x04\xd5\xc20)4\x93\xc1\xe4F\xc9\xf5\"\xb4\xe7y\x13\0T #\xc8\x1c<.\xeeS\0\xa0\x02Y\xf2\xd5}.\xd2\"\xa3A\xe1\xdaW\xf0\xbb\xf6\xc0\xc4\0\xe0\xd1\0\x80\x13X\x95\xd0\xfd\x7f\x12\0\x8c g\xf9\x9dA\xd7\x04\xb6\x80q\xfd\x19\0|8\0pa@\xc8\r\x0e]c\xe3X\xce+\0`\x03\xf9n\x86\x96\x15\xe8\xf4,\x06S\xa7w\x03@JfV\x93K\xa8_\b\0\\\x180\x81?Q(\x89\xc9\x87\x0b\0\xc0\x9d\xa2\xac9\x0f\x07\0-\\\xc3\xa2lRH4\xd4Tn\xc1IO\xb8\x8d\\\xf2\xa8{!\0pa@(\x0bN]\xe3y\xbe\xfa\x02\0\xd0\x88t\x0e\xa4\xfb\x1cw\xc5\xf5\xc5\x94\x97\x9b\x14\x12w[hR|\xb6!,\xc1\xae\0\x9d7\x01@(\fh@>\x9a\x1c\x03f\x9f\xf9\xber\0\xc0\xaa\0\xf3\rt\xa5\xd2\xdc\xd6\xae\xc9\xc5\x82g\xc6\x85\xdc8\xb7\x80g\x13,\x1c\x1f}X\x05\xbf\xbb\xe4\xde\x04\0\xa10 \xe4\xfeS\xe7\x1a@\xc66|5\0\xcc\n\xe5\xac@\xdf,u\xf68l`4\xe1\x8f\x91\x11\xe8\xb1X=\xfc\xbb\x85\xd4\x10`B\xf5\x02\xf8\x9a\x84J\0\xc0\xc9C7e\x06\x80P\x18\xb0\x13\x1eT\x8cB\xde\x05\0x\xc49\xb7\x05\xd8%\xe4\x8f$\xb5 &7\x82@\xe8\xe8\x05/\xf6\0\xba\x1bp(\f\0\x92\xef\xc6\x02\0\x0e\x03\x1a\x06\x18\xdf\0\0\xb8@g\x03YBoNt\xe3mR\xd0\xc3\xa4#\x94W\xba(\xce\x05\xe5c\xafY\xe0/g`I\0p=\x8dZ`\xed4\xdbp8\f\x98\x98\xbc\xc7\x1b\0\0[~\xa95\xdf\x13-\xf8jy\x80g\n&\x05\xcd\xbd\xbd\xd3\x02\xcf\x89/\t9\xb8\x04[h\xcb\x0e\x13j\xb6J%r{\x03\x0e\xa0\x13\xa8O\x07\x80&R\xf9\x1bH\xdf\xfe3\0\xf8 9G@I\xd8\x80%\xd4\xe1>J-\xa9\xab\xde\x82\x9fAg\xfc9\xef\xc1$\xba8%\xf2\x11~4/\x05\x80\xd81\xe0\x03\xa4O\x0f6\0\xf8 \xd1\x8c\x94\x92\x10P\xfar\t\x9a\"\x9bY\x90\xcf\x90\x8c\xfc\x02&\f\xe0Xn\x9f\x0e\0k\xa4\"/\x19\xe2w\x03\x80\x0f\x0b\x1b\xb8\xedDL\b\xc2-\x9e\x1a\xfe\xddE\xd0\x96\xccv\x10\xa6'[\t\xf0\x91(\xd1\x02\xb2\xd1^O\x07\x80#R\tsl\xe1\x19\0\xbcL\xa8>~\x80\xdf\xed\xa4\xb3\xa3\xb8\x13\xb2\xe8\xb9f\xcfqR\xa1|\xc6\x1b\x06\x96\x1c\x91\0PGz\0+\xe8\xfa\xff[\xc8S>>\x83\xcd\t\xf8(\0\xa0F\x8ba\xebk\xe3\xa1x\xcb\xa8e\xe9m\xe1\x9a\n\xbb)\x93\xe2\x8e`-\xc1\x1f\x05\0\xae%\xf2\xb1\xda\x8e`\r#\x1a\x05\xd3v\xd8Mp\xcd\xde\xfa\x06y\nx\x1a\xb0j\xc0\x8f\x04\x80\xd2V\xf1I\x95c\x92\xc1\x1d\x18\x049\xde\xbd\x0ed\xfc\x8a\xd8\xfb:\x94\n\xd5F\x84\fn\x02\xb4)\xf0^m\xa0\xac\x01\xc0%\0P\x82\x07As\x1c\xccb\xc7\x95y5\xa3\xc8[\x04h\xc4\0@\x0f\xe9\xdb\x7f\x18P\x160\x86 \x03\x80\x0f\0\x805pP \xd0\b\x95\xd3\xc7\xe17\x82\xbf^B\xda\x98\x13\x03\0s\xe6\x10\xc37\x11\xc9\xe4&i!<\x91\xa6\x12\0\x80$\x01\xd5\x11\x8a\xd20\xf1\xe2\x99\xc5\xaf\x1f\n\0\x92\xc5\x8e\xcb\xad\x17\x81\xb5\xd5x\x15\xbdR\xf9\xdc\xdd\x11)\0\xac\xa0\x1b\x95&\x05\xf6\x19\xac1\xe86\xa1\xfa\0N7tJ\0\x80\x1ad\xc59+\\\xb3Mw\x17\x15\x1a\x8e\xf1\xb9q^\r\xfc\xae^\xf4)\xfe\x04\xef\xdbYq=\x90\xc9T\xf0^\xe5\x97\xee\xdf\xc7\x02\xc0\xee,\xd6\x19\xb9\xb1\x13r\x01\xa7\x0f\x07\0l\xf9\x06\x85\xc2\xf8\x8e\xb7\x0e\xd9\x98\xcc\xed\xbf_p\xf6\xb8\r|fM\0\x80\x1a\xf8\xed\xa9\x1e\xd2\xc6q\xbf\r\0\xee\xcc\xa7<E\xdc\x19\x8a&7I\x0f\xb2\xbd\xe3&\x01\0\x06\x90\x15\xb6\xccp\xcd\x98j\x03\x80\x7f\x15\xb0\x15\xfe\x1d\b\xcf\xaeO\xf8}+\x05\xbeQ\xdc,r\xa7\xf8\xac\x06\0\xc6\x07\xc6zw\x03\xc0v!\xd8Q\0\x14\xca\xd7\x9c\xad\xce\\x\x91\xb2+`\0\xf0\0\x91t\xe6I\xadV\b\0\xf0v\xd3\xf2\xe3\x154_\n\0\xd3\xc5\xe1\x0e\x10!Y\xc3\\#7D$\xa5.\xc0\0\xe0e\x96\xb0\x85\xf8$`h\x07\xe0lD\xe9\xbe\0\0j\x88\x9f\xbfW\xc2\xf5\x9f\x99\xdc\x90\xc4CI\xa9\f4\0\xf8\"\x008\xad\x05\xb7\x9d5\xc2{\xb7\x01\xb5\xc7\x1d\\x\x9aN>\xc9\xc8o7\x9c\x19\r\0\f\0\xb8\x17Z\xfd\0\xc1\x02t\xcd\xc1'\x03\x80\xb6`\xa7\x84\xf5_\x04\x9f\x956\xeb\xc4v\x07\x1a\0<,\x07\xa0\xa1\x81\x8e\x05\0\xdf\"\x1b\x04\xaeq\x0f\x7f\xeb\x06\xda\x87\x02\xc0(8\xba\x1b\xdfuL\xf7\xdd*\xf0\x02b\xf8\x01*0V\xe0G\x88f\x17 \xa5\x14\xb8\x16\xc4\x88\x03q\x8e7\xf4\x02<]\xa6\bE\x95n\xe1J\x81\xe5\x04B\x1b\f\xf2\x10\xd1\xcc\x81\xdb#\x01\xe0\0y\xa6\xd8\0\xa0\x9c\x1c\n\xf7\xdf\xe75\xcc\x02C2+\x9e\x97\x96\x89\xd8\xa4\x90H&\xfb\x0e\x10_\b\xe4\xee\0\fBWr\xf2\x84\0\xb3\x01@\x16\xf7\x7f\x8c\x04\x8e]\xe0)\x1c\x8a\xe75\x9b\xf2?C\xf0>\xfd@\xb8\x8e9\xea\0&\xf4\xe2}]r-q\x9d\x06\0z\x19!\x8ee\b{_\x95\0`\x8c\xf5\xe9\x85\"\x19\r6@|\x0e`\0y\x96\xbcgb\xd8\xce\0@-\xb1<\x83xm\xb4\x82\x10\xd1Zz_\x9c\x0f\xd8\xc0Ok\xd5B\xfa6`\x07\xf4\xf6\xdfN(\xf79' \xd7\x16\xe1\xb7\x01@J\xe9q\x0f\xb2\x84]\xea\xac@\x93\x07\xc5\x8bZ\xa2\b\t\0\x84\xce/\x19?\xb6dN\x18}\x1b\0H\xf9\x07\xb8\x10qd\fH\x0e\xbap\x93\x97\xca\x15\x94\xd4%\x14bU\x1c\xcd\x07\0\0\x14\x02\0wo\xbf3u0\0x\x8bBh\x8e\xd6\0@\x14jXq\x8f\x01\xc0W\0\xc0\xdb\xdeMi\x008\x13\x86\xbb\xa9\xc3;\xe5\xac\xd3\xf7\r\xf5\xa8o\x02\0\r\xf7\xfe\xd9jl\xf2\xafh\xda\xbe}kBZ\xb5\xe7\x82\x85m\x07\xbeH\x1a\xf0\xef\0H\xf6\xff\xef\x06\x80PC\x91-\xc0\xbfr\xc56\xe0)g=\x87\x01\xf1K\xa4B\x16b\x83\x7f\x1bXp/\xff\xd5/\x96J\xd8\xed\xa0\x1f\xff\xfd\x89\xa1\t\x17\xaaL\x10_{?+\xbd\x87\x05l;\xf0U\xc2Q}\xc1\x8f\"\xed7)\x96&~\xc5#\xc1\xafHF\x9dc\xccC;\x07\xa3\xe2y\x95\x02\0\xd7\x8d\xd7\xd2\xb2m\xca\xb8~\0\xdb\x0e|\x8d\xb4 \xef\xc3\x1f\xe1\x9e\x16Nm\x02\x0b\x8f\xc9.\xb5\b\x1b\x90MCv\xa9\xd0\xb8k\xa1\xb6 w\b\xcf\x1c\xe4\xb6+k\x88\xe3[\x88i\xdbu\x7f\xcb\xb6\x03\x1f.\xb3\xc25\xac \x9e\xcb\xae\xf9\xb1<x\xa1\x0e?\xe7\xad!\xdc\xef";

  function file_chunks(param) {
    var exit = 0;
    switch (param) {
      case "/font.fnt" : 
      case "font.fnt" : 
          exit = 2;
          break;
      case "/font.png" : 
      case "font.png" : 
          exit = 1;
          break;
      default:
        return /* None */0;
    }
    switch (exit) {
      case 1 : 
          return /* Some */[/* :: */[
                    d_37e5d986c886a357d80b4e7e80cfb0bc,
                    /* :: */[
                      d_d89d4399cabd0fbbf0c369ca8c93e2a0,
                      /* :: */[
                        d_a647e4659c173b8e2a1beed6e11eefcd,
                        /* [] */0
                      ]
                    ]
                  ]];
      case 2 : 
          return /* Some */[/* :: */[
                    d_0118d93503fb26f597f0e4924d5b8c0d,
                    /* :: */[
                      d_096bc231ae663e6b83097c210f8a7ac4,
                      /* :: */[
                        d_8f72a8e66d30e2a8b44b5f50ccb81b54,
                        /* [] */0
                      ]
                    ]
                  ]];
      
    }
  }

  function read$1(name) {
    var match = file_chunks(name);
    if (match) {
      return /* Some */[concat$2("", match[0])];
    } else {
      return /* None */0;
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function intCompare(i, j) {
    var match = +(i === j);
    if (match) {
      return 0;
    } else {
      var match$1 = +(i < j);
      if (match$1) {
        return -1;
      } else {
        return 1;
      }
    }
  }

  var IntMap = Make(/* module */[/* compare */intCompare]);

  function compare$9(param, param$1) {
    var first = intCompare(param[0], param$1[0]);
    if (first !== 0) {
      return first;
    } else {
      return intCompare(param[1], param$1[1]);
    }
  }

  var IntPairMap = Make(/* module */[/* compare */compare$9]);

  var defaultFont = [/* None */0];

  function parse_num(_stream, _acc) {
    while(true) {
      var acc = _acc;
      var stream = _stream;
      var match = Stream[/* peekch */1](stream);
      var exit$$1 = 0;
      var c;
      if (match) {
        var c$1 = match[0];
        if (c$1 >= 47) {
          if (c$1 > 57 || c$1 < 48) {
            exit$$1 = 1;
          } else {
            c = c$1;
            exit$$1 = 2;
          }
        } else if (c$1 >= 45) {
          c = c$1;
          exit$$1 = 2;
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
      switch (exit$$1) {
        case 1 : 
            try {
              return /* tuple */[
                      stream,
                      caml_float_of_string(acc)
                    ];
            }
            catch (exn){
              return failwith("Could not parse number [" + (acc + "]."));
            }
        case 2 : 
            _acc = append_char(acc, c);
            _stream = Stream[/* popch */2](stream);
            continue ;
        
      }
    }}

  function parse_num$1(stream) {
    return parse_num(stream, "");
  }

  function parse_string(_stream, _acc) {
    while(true) {
      var acc = _acc;
      var stream = _stream;
      var match = Stream[/* peekch */1](stream);
      if (match) {
        var c = match[0];
        if (c !== 34) {
          _acc = append_char(acc, c);
          _stream = Stream[/* popch */2](stream);
          continue ;
        } else {
          return /* tuple */[
                  Stream[/* popch */2](stream),
                  acc
                ];
        }
      } else {
        return failwith("Unterminated string.");
      }
    }}

  function parse_string$1(stream) {
    return parse_string(stream, "");
  }

  function pop_line(_stream) {
    while(true) {
      var stream = _stream;
      var match = Stream[/* peekch */1](stream);
      if (match) {
        if (match[0] !== 10) {
          _stream = Stream[/* popch */2](stream);
          continue ;
        } else {
          return Stream[/* popch */2](stream);
        }
      } else {
        return failwith("could not pop line");
      }
    }}

  function parse_char_fmt(_stream, _num, _map) {
    while(true) {
      var map$$1 = _map;
      var num = _num;
      var stream = _stream;
      if (num < 0) {
        return /* tuple */[
                stream,
                map$$1
              ];
      } else if (caml_notequal(Stream[/* peekn */3](stream, 4), /* Some */["char"])) {
        prerr_string("Warning: encountered end of char sequence early when loading font.\n");
        return /* tuple */[
                stream,
                map$$1
              ];
      } else {
        var stream$1 = Stream[/* match_ */6](stream, "char id=");
        var match = parse_num(stream$1, "");
        var stream$2 = Stream[/* match_ */6](Stream[/* skipWhite */4](match[0]), "x=");
        var match$1 = parse_num(stream$2, "");
        var stream$3 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$1[0]), "y=");
        var match$2 = parse_num(stream$3, "");
        var stream$4 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$2[0]), "width=");
        var match$3 = parse_num(stream$4, "");
        var stream$5 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$3[0]), "height=");
        var match$4 = parse_num(stream$5, "");
        var stream$6 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$4[0]), "xoffset=");
        var match$5 = parse_num(stream$6, "");
        var stream$7 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$5[0]), "yoffset=");
        var match$6 = parse_num(stream$7, "");
        var stream$8 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$6[0]), "xadvance=");
        var match$7 = parse_num(stream$8, "");
        var stream$9 = pop_line(match$7[0]);
        var new_map = _3(IntMap[/* add */3], match[1] | 0, /* record */[
              /* x */match$1[1],
              /* y */match$2[1],
              /* width */match$3[1],
              /* height */match$4[1],
              /* xoffset */match$5[1],
              /* yoffset */match$6[1],
              /* xadvance */match$7[1]
            ], map$$1);
        _map = new_map;
        _num = num - 1 | 0;
        _stream = stream$9;
        continue ;
      }
    }}

  function parse_kern_fmt(_stream, _num, _map) {
    while(true) {
      var map$$1 = _map;
      var num = _num;
      var stream = _stream;
      if (num === 0) {
        return /* tuple */[
                stream,
                map$$1
              ];
      } else {
        var stream$1 = Stream[/* match_ */6](stream, "kerning first=");
        var match = parse_num(stream$1, "");
        var stream$2 = Stream[/* match_ */6](Stream[/* skipWhite */4](match[0]), "second=");
        var match$1 = parse_num(stream$2, "");
        var stream$3 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$1[0]), "amount=");
        var match$2 = parse_num(stream$3, "");
        var stream$4 = pop_line(match$2[0]);
        var new_map = _3(IntPairMap[/* add */3], /* tuple */[
              match[1] | 0,
              match$1[1] | 0
            ], match$2[1], map$$1);
        _map = new_map;
        _num = num - 1 | 0;
        _stream = stream$4;
        continue ;
      }
    }}

  function replaceFilename(path, filename) {
    var splitStr = split$1(path, /* "/" */47);
    var revLst = rev(splitStr);
    var newRevLst = revLst ? /* :: */[
        filename,
        revLst[1]
      ] : /* [] */0;
    var newLst = rev(newRevLst);
    return concat$2("/", newLst);
  }

  function getCharMapAndKernMap(str) {
    var stream = Stream[/* create */8](str + "\n");
    var match = Stream[/* peekn */3](stream, 9);
    var match$1 = match ? (
        match[0] === "info res=" ? parse_num(Stream[/* match_ */6](stream, "info res="), "") : /* tuple */[
            stream,
            1
          ]
      ) : /* tuple */[
        stream,
        1
      ];
    var stream$1 = pop_line(match$1[0]);
    var stream$2 = Stream[/* match_ */6](stream$1, "common lineHeight=");
    var match$2 = parse_num(stream$2, "");
    var stream$3 = pop_line(match$2[0]);
    var stream$4 = Stream[/* match_ */6](stream$3, "page id=0 file=\"");
    var match$3 = parse_string(stream$4, "");
    var stream$5 = pop_line(match$3[0]);
    var stream$6 = Stream[/* match_ */6](stream$5, "chars count=");
    var match$4 = parse_num(stream$6, "");
    var stream$7 = pop_line(match$4[0]);
    var match$5 = parse_char_fmt(stream$7, match$4[1] | 0, IntMap[/* empty */0]);
    var stream$8 = Stream[/* match_ */6](match$5[0], "kernings count=");
    var match$6 = parse_num(stream$8, "");
    var stream$9 = pop_line(match$6[0]);
    var match$7 = parse_kern_fmt(stream$9, match$6[1] | 0, IntPairMap[/* empty */0]);
    return /* tuple */[
            match$5[1],
            match$7[1],
            match$3[1],
            match$1[1],
            match$2[1]
          ];
  }

  function parseFontFormat(env, path, isPixel) {
    var ret = [/* None */0];
    _2(Gl[/* File */1][/* readFile */0], path, (function (str) {
            var match = getCharMapAndKernMap(str);
            var img_filename = replaceFilename(path, match[2]);
            ret[0] = /* Some */[/* record */[
                /* chars */match[0],
                /* kerning */match[1],
                /* res */match[3],
                /* lineHeight */match[4],
                /* image */loadImage$1(env, img_filename, isPixel)
              ]];
            return /* () */0;
          }));
    return ret;
  }

  function getChar(fnt, ch) {
    try {
      return _2(IntMap[/* find */21], ch, fnt[/* chars */0]);
    }
    catch (exn){
      return failwith("Could not find character " + (String(ch) + " in font."));
    }
  }

  function drawChar(env, fnt, image, ch, last, x, y) {
    var c = getChar(fnt, ch);
    var kernAmount;
    if (last) {
      try {
        kernAmount = _2(IntPairMap[/* find */21], /* tuple */[
              last[0],
              ch
            ], fnt[/* kerning */1]);
      }
      catch (exn){
        kernAmount = 0;
      }
    } else {
      kernAmount = 0;
    }
    if (image) {
      drawImageWithMatrixf(image[0], x + (c[/* xoffset */4] + kernAmount) / fnt[/* res */2], y + c[/* yoffset */5] / fnt[/* res */2], c[/* width */2] / fnt[/* res */2], c[/* height */3] / fnt[/* res */2], c[/* x */0] | 0, c[/* y */1] | 0, c[/* width */2] | 0, c[/* height */3] | 0, env);
      return (c[/* xadvance */6] + kernAmount) / fnt[/* res */2];
    } else {
      return (c[/* xadvance */6] + kernAmount) / fnt[/* res */2];
    }
  }

  function drawString(env, fnt, str, x, y) {
    var fnt$1 = fnt ? fnt[0] : defaultFont;
    var match = fnt$1[0];
    if (match) {
      var fnt$2 = match[0];
      var match$1 = fnt$2[/* image */4][/* glData */0];
      if (match$1) {
        var img = match$1[0];
        var offset = [x];
        var lastChar = [/* None */0];
        return iter$2((function (c) {
                      var advance = drawChar(env, fnt$2, /* Some */[img], c, lastChar[0], offset[0], y);
                      offset[0] += advance;
                      lastChar[0] = /* Some */[c];
                      return /* () */0;
                    }), str);
      } else {
        console.log("loading font.");
        return /* () */0;
      }
    } else {
      return /* () */0;
    }
  }

  function calcStringWidth(env, fnt, str) {
    var fnt$1 = fnt ? fnt[0] : defaultFont;
    var match = fnt$1[0];
    if (match) {
      var fnt$2 = match[0];
      var offset = [0];
      var lastChar = [/* None */0];
      iter$2((function (c) {
              offset[0] += drawChar(env, fnt$2, /* None */0, c, lastChar[0], offset[0], 0);
              lastChar[0] = /* Some */[c];
              return /* () */0;
            }), str);
      return offset[0];
    } else {
      return 0;
    }
  }

  function loadDefaultFont(env) {
    var match = read$1("font.fnt");
    var data = match ? match[0] : failwith("Failed to load default font. This shouldn't happen.");
    var match$1 = read$1("font.png");
    var imageData = match$1 ? match$1[0] : failwith("Failed to load default font image. This shouldn't happen");
    var match$2 = getCharMapAndKernMap(data);
    defaultFont[0] = /* Some */[/* record */[
        /* chars */match$2[0],
        /* kerning */match$2[1],
        /* res */match$2[3],
        /* lineHeight */match$2[4],
        /* image */loadImageFromMemory$1(env, imageData, /* boolean */0)
      ]];
    return /* () */0;
  }

  var Font = /* module */[
    /* IntMap */IntMap,
    /* IntPairMap */IntPairMap,
    /* defaultFont */defaultFont,
    /* parse_num */parse_num$1,
    /* parse_string */parse_string$1,
    /* pop_line */pop_line,
    /* parse_char_fmt */parse_char_fmt,
    /* parse_kern_fmt */parse_kern_fmt,
    /* replaceFilename */replaceFilename,
    /* getCharMapAndKernMap */getCharMapAndKernMap,
    /* parseFontFormat */parseFontFormat,
    /* getChar */getChar,
    /* drawChar */drawChar,
    /* drawString */drawString,
    /* calcStringWidth */calcStringWidth,
    /* loadDefaultFont */loadDefaultFont
  ];
  /* IntMap Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function translate$4(x, y, env) {
    return matmatmul(env[/* matrix */16], createTranslation(x, y));
  }

  function scale$9(x, y, env) {
    return matmatmul(env[/* matrix */16], createScaling(x, y));
  }

  function fill$4(color, env) {
    var init = env[/* style */13];
    env[/* style */13] = /* record */[
      /* strokeColor */init[/* strokeColor */0],
      /* strokeWeight */init[/* strokeWeight */1],
      /* strokeCap */init[/* strokeCap */2],
      /* fillColor : Some */[color],
      /* tintColor */init[/* tintColor */4],
      /* rectMode */init[/* rectMode */5]
    ];
    return /* () */0;
  }

  function tint(color, env) {
    var init = env[/* style */13];
    env[/* style */13] = /* record */[
      /* strokeColor */init[/* strokeColor */0],
      /* strokeWeight */init[/* strokeWeight */1],
      /* strokeCap */init[/* strokeCap */2],
      /* fillColor */init[/* fillColor */3],
      /* tintColor : Some */[color],
      /* rectMode */init[/* rectMode */5]
    ];
    return /* () */0;
  }

  function pushStyle(env) {
    env[/* styleStack */14] = /* :: */[
      env[/* style */13],
      env[/* styleStack */14]
    ];
    return /* () */0;
  }

  function popStyle(env) {
    var match = env[/* styleStack */14];
    if (match) {
      env[/* style */13] = match[0];
      env[/* styleStack */14] = match[1];
      return /* () */0;
    } else {
      return failwith("Too many `popStyle` without enough `pushStyle`.");
    }
  }

  function pushMatrix(env) {
    var copy = createIdentity(/* () */0);
    copyInto(env[/* matrix */16], copy);
    env[/* matrixStack */17] = /* :: */[
      copy,
      env[/* matrixStack */17]
    ];
    return /* () */0;
  }

  function popMatrix(env) {
    var match = env[/* matrixStack */17];
    if (match) {
      env[/* matrix */16] = match[0];
      env[/* matrixStack */17] = match[1];
      return /* () */0;
    } else {
      return failwith("Too many `popMatrix` without enough `pushMatrix`.");
    }
  }

  function loadImage$2(filename, $staropt$star, env) {
    var isPixel = $staropt$star ? $staropt$star[0] : /* boolean */0;
    return loadImage$1(env, filename, isPixel);
  }

  function subImage(img, param, width$$1, height$$1, param$1, subw, subh, env) {
    var match = img[/* glData */0];
    if (match) {
      return drawImageWithMatrix(match[0], param[0], param[1], width$$1, height$$1, param$1[0], param$1[1], subw, subh, env);
    } else {
      console.log("image not ready yet, just doing nothing :D");
      return /* () */0;
    }
  }

  function subImagef(img, param, width$$1, height$$1, param$1, subw, subh, env) {
    var match = img[/* glData */0];
    if (match) {
      return drawImageWithMatrixf(match[0], param[0], param[1], width$$1, height$$1, param$1[0], param$1[1], subw, subh, env);
    } else {
      console.log("image not ready yet, just doing nothing :D");
      return /* () */0;
    }
  }

  function image(img, param, width$$1, height$$1, env) {
    var match = img[/* glData */0];
    if (match) {
      var img$1 = match[0];
      var imgw = img$1[/* width */3];
      var imgh = img$1[/* height */2];
      var exit$$1 = 0;
      var w;
      var h;
      if (width$$1) {
        var w$1 = width$$1[0];
        w = w$1;
        if (height$$1) {
          h = height$$1[0];
          exit$$1 = 1;
        } else {
          h = imgh;
          exit$$1 = 1;
        }
      } else {
        w = imgw;
        if (height$$1) {
          h = height$$1[0];
          exit$$1 = 1;
        } else {
          h = imgh;
          exit$$1 = 1;
        }
      }
      if (exit$$1 === 1) {
        return drawImageWithMatrix(img$1, param[0], param[1], w, h, 0, 0, imgw, imgh, env);
      }
      
    } else {
      console.log("image not ready yet, just doing nothing :D");
      return /* () */0;
    }
  }

  function quadf(p1, p2, p3, p4, env) {
    var partial_arg = env[/* matrix */16];
    var transform = function (param) {
      return matptmul(partial_arg, param);
    };
    var tp1 = _1(transform, p1);
    var tp2 = _1(transform, p2);
    var tp3 = _1(transform, p3);
    var tp4 = _1(transform, p4);
    var match = env[/* style */13][/* fillColor */3];
    if (match) {
      addRectToGlobalBatch(env, tp3, tp4, tp2, tp1, match[0]);
    }
    var match$1 = env[/* style */13][/* strokeColor */0];
    if (match$1) {
      var color = match$1[0];
      var width$$1 = env[/* style */13][/* strokeWeight */1];
      var matrix = env[/* matrix */16];
      drawLineWithMatrix(p1, p2, matrix, color, width$$1, /* boolean */0, env);
      drawLineWithMatrix(p2, p3, matrix, color, width$$1, /* boolean */0, env);
      drawLineWithMatrix(p3, p4, matrix, color, width$$1, /* boolean */0, env);
      drawLineWithMatrix(p1, p4, matrix, color, width$$1, /* boolean */0, env);
      var r = width$$1 / 2;
      drawEllipse(env, tp1, r, r, identity$6, color);
      drawEllipse(env, tp2, r, r, identity$6, color);
      drawEllipse(env, tp3, r, r, identity$6, color);
      return drawEllipse(env, tp4, r, r, identity$6, color);
    } else {
      return /* () */0;
    }
  }

  function rectf(param, width$$1, height$$1, env) {
    var y = param[1];
    var x = param[0];
    var match = env[/* style */13][/* rectMode */5];
    switch (match) {
      case 0 : 
          return quadf(/* tuple */[
                      x,
                      y
                    ], /* tuple */[
                      x + width$$1,
                      y
                    ], /* tuple */[
                      x + width$$1,
                      y + height$$1
                    ], /* tuple */[
                      x,
                      y + height$$1
                    ], env);
      case 1 : 
          var x$1 = x - width$$1 / 2;
          var y$1 = y - height$$1 / 2;
          return quadf(/* tuple */[
                      x$1,
                      y$1
                    ], /* tuple */[
                      x$1 + width$$1,
                      y$1
                    ], /* tuple */[
                      x$1 + width$$1,
                      y$1 + height$$1
                    ], /* tuple */[
                      x$1,
                      y$1 + height$$1
                    ], env);
      case 2 : 
          var x$2 = x - width$$1;
          var y$2 = y - height$$1;
          var width$1 = width$$1 * 2;
          var height$1 = height$$1 * 2;
          return quadf(/* tuple */[
                      x$2,
                      y$2
                    ], /* tuple */[
                      x$2 + width$1,
                      y$2
                    ], /* tuple */[
                      x$2 + width$1,
                      y$2 + height$1
                    ], /* tuple */[
                      x$2,
                      y$2 + height$1
                    ], env);
      
    }
  }

  function rect(param, width$$1, height$$1, env) {
    return rectf(/* tuple */[
                param[0],
                param[1]
              ], width$$1, height$$1, env);
  }

  function loadFont(filename, $staropt$star, env) {
    var isPixel = $staropt$star ? $staropt$star[0] : /* boolean */0;
    return Font[/* parseFontFormat */10](env, filename, isPixel);
  }

  function text(font, body, param, env) {
    return Font[/* drawString */13](env, font, body, param[0], param[1]);
  }

  function textWidth(font, body, env) {
    return Font[/* calcStringWidth */14](env, font, body) | 0;
  }

  function clear$1(env) {
    return _2(Gl[/* clear */45], env[/* gl */2], color_buffer_bit | depth_buffer_bit);
  }

  function background(color, env) {
    clear$1(env);
    var w = width(env);
    var h = height(env);
    return addRectToGlobalBatch(env, /* tuple */[
                w,
                h
              ], /* tuple */[
                0,
                h
              ], /* tuple */[
                w,
                0
              ], /* tuple */[
                0,
                0
              ], color);
  }
  /* Reasongl_web Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var lookup_table = [/* int array */[]];

  function pow(base, exp) {
    if (exp !== 0) {
      if (exp !== 1) {
        var b = pow(base, exp / 2 | 0);
        return imul(imul(b, b), exp % 2 === 0 ? 1 : base);
      } else {
        return base;
      }
    } else {
      return 1;
    }
  }

  function constrain(amt, low, high) {
    return caml_max(caml_min(amt, high), low);
  }

  function remapf(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
  }

  function randomf(min, max) {
    return $$float$1(max - min) + min;
  }

  function random$3(min, max) {
    return $$int$1(max - min | 0) + min | 0;
  }

  function lerpf(low, high) {
    return (function (param) {
        return remapf(param, 0, 1, low, high);
      });
  }

  function distf(param, param$1) {
    var dx = param$1[0] - param[0];
    var dy = param$1[1] - param[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  function dist$3(param, param$1) {
    return distf(/* tuple */[
                param[0],
                param[1]
              ], /* tuple */[
                param$1[0],
                param$1[1]
              ]);
  }

  function magf(vec) {
    return distf(/* tuple */[
                0,
                0
              ], vec);
  }

  function noise(x, y, z) {
    var p = lookup_table[0];
    var fade = function (t) {
      return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    };
    var grad = function (hash, x, y, z) {
      var match = hash & 15;
      if (match > 15 || match < 0) {
        return 0.0;
      } else {
        switch (match) {
          case 0 : 
              return x + y;
          case 1 : 
              return -x + y;
          case 2 : 
              return x - y;
          case 3 : 
              return -x - y;
          case 4 : 
              return x + z;
          case 5 : 
              return -x + z;
          case 6 : 
              return x - z;
          case 7 : 
              return -x - z;
          case 8 : 
              return y + z;
          case 10 : 
              return y - z;
          case 12 : 
              return y + x;
          case 9 : 
          case 13 : 
              return -y + z;
          case 14 : 
              return y - x;
          case 11 : 
          case 15 : 
              return -y - z;
          
        }
      }
    };
    var xi = x & 255;
    var yi = y & 255;
    var zi = z & 255;
    var xf = x - Math.floor(x);
    var yf = y - Math.floor(y);
    var zf = z - Math.floor(z);
    var u = fade(xf);
    var v = fade(yf);
    var w = fade(zf);
    var aaa = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi) + yi | 0) + zi | 0);
    var aba = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi) + (yi + 1 | 0) | 0) + zi | 0);
    var aab = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi) + yi | 0) + (zi + 1 | 0) | 0);
    var abb = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi) + (yi + 1 | 0) | 0) + (zi + 1 | 0) | 0);
    var baa = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi + 1 | 0) + yi | 0) + zi | 0);
    var bba = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi + 1 | 0) + (yi + 1 | 0) | 0) + zi | 0);
    var bab = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi + 1 | 0) + yi | 0) + (zi + 1 | 0) | 0);
    var bbb = caml_array_get(p, caml_array_get(p, caml_array_get(p, xi + 1 | 0) + (yi + 1 | 0) | 0) + (zi + 1 | 0) | 0);
    var x1 = lerpf(grad(aaa, xf, yf, zf), grad(baa, xf - 1.0, yf, zf))(u);
    var x2 = lerpf(grad(aba, xf, yf - 1.0, zf), grad(bba, xf - 1.0, yf - 1.0, zf))(u);
    var y1 = lerpf(x1, x2)(v);
    var x1$1 = lerpf(grad(aab, xf, yf, zf - 1.0), grad(bab, xf - 1.0, yf, zf - 1.0))(u);
    var x2$1 = lerpf(grad(abb, xf, yf - 1.0, zf - 1.0), grad(bbb, xf - 1.0, yf - 1.0, zf - 1.0))(u);
    var y2 = lerpf(x1$1, x2$1)(v);
    return (lerpf(y1, y2)(w) + 1.0) / 2.0;
  }

  function shuffle(array) {
    var array$1 = copy$2(array);
    var length = array$1.length;
    for(var i = 0; i <= 255; ++i){
      var j = $$int$1(length - i | 0);
      var tmp = caml_array_get(array$1, i);
      caml_array_set(array$1, i, caml_array_get(array$1, i + j | 0));
      caml_array_set(array$1, i + j | 0, tmp);
    }
    return array$1;
  }

  function noiseSeed(seed) {
    var state = get_state(/* () */0);
    init$3(seed);
    var array = caml_make_vect(256, 0);
    var array$1 = mapi$4((function (i, _) {
            return i;
          }), array);
    var array$2 = shuffle(array$1);
    var double_array = append$1(array$2, array$2);
    lookup_table[0] = double_array;
    return set_state(state);
  }

  function color(r, g, b, a) {
    return /* record */[
            /* r */r / 255,
            /* g */g / 255,
            /* b */b / 255,
            /* a */a / 255
          ];
  }

  function intersectRectRect(param, rect1W, rect1H, param$1, rect2W, rect2H) {
    var ry2 = param$1[1];
    var rx2 = param$1[0];
    var ry1 = param[1];
    var rx1 = param[0];
    return 1 - +(rx2 > rx1 + rect1W || rx2 + rect2W < rx1 || ry2 > ry1 + rect1H || ry2 + rect2H < ry1);
  }

  var split$2 = split$1;
  /* Reprocessing_Common Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function posMake(x, y) {
    return /* record */[
            /* x */x,
            /* y */y
          ];
  }

  var StringMap = Make([compare$3]);

  var tileSizef = 32;

  function drawAssetFullscreen(name, state, env) {
    var exit = 0;
    var asset;
    try {
      asset = _2(StringMap[/* find */21], name, state[/* assets */5]);
      exit = 1;
    }
    catch (exn){
      if (exn === not_found) {
        console.log("Asset " + (name + " not found. Get your shit together man."));
        return /* () */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return subImage(state[/* spritesheet */4], /* tuple */[
                  0,
                  0
                ], width(env), height(env), /* tuple */[
                  asset[/* pos */1][/* x */0] | 0,
                  asset[/* pos */1][/* y */1] | 0
                ], asset[/* size */0][/* x */0] | 0, asset[/* size */0][/* y */1] | 0, env);
    }
    
  }

  function drawAsset(x, y, name, state, env) {
    var exit = 0;
    var asset;
    try {
      asset = _2(StringMap[/* find */21], name, state[/* assets */5]);
      exit = 1;
    }
    catch (exn){
      if (exn === not_found) {
        console.log("Asset " + (name + " not found. Get your shit together man."));
        return /* () */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return subImage(state[/* spritesheet */4], /* tuple */[
                  x,
                  y
                ], asset[/* size */0][/* x */0] | 0, asset[/* size */0][/* y */1] | 0, /* tuple */[
                  asset[/* pos */1][/* x */0] | 0,
                  asset[/* pos */1][/* y */1] | 0
                ], asset[/* size */0][/* x */0] | 0, asset[/* size */0][/* y */1] | 0, env);
    }
    
  }

  function drawAssetf(x, y, name, state, env) {
    var exit = 0;
    var asset;
    try {
      asset = _2(StringMap[/* find */21], name, state[/* assets */5]);
      exit = 1;
    }
    catch (exn){
      if (exn === not_found) {
        console.log("Asset " + (name + " not found. Get your shit together man."));
        return /* () */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return subImagef(state[/* spritesheet */4], /* tuple */[
                  x,
                  y
                ], asset[/* size */0][/* x */0], asset[/* size */0][/* y */1], /* tuple */[
                  asset[/* pos */1][/* x */0] | 0,
                  asset[/* pos */1][/* y */1] | 0
                ], asset[/* size */0][/* x */0] | 0, asset[/* size */0][/* y */1] | 0, env);
    }
    
  }

  var soundNames = /* :: */[
    /* tuple */[
      "day1",
      1.0
    ],
    /* :: */[
      /* tuple */[
        "day2",
        1.0
      ],
      /* :: */[
        /* tuple */[
          "day3",
          1.0
        ],
        /* :: */[
          /* tuple */[
            "day4",
            1.0
          ],
          /* :: */[
            /* tuple */[
              "day5",
              1.0
            ],
            /* :: */[
              /* tuple */[
                "night1",
                1.0
              ],
              /* :: */[
                /* tuple */[
                  "night2",
                  1.0
                ],
                /* :: */[
                  /* tuple */[
                    "night3",
                    1.0
                  ],
                  /* :: */[
                    /* tuple */[
                      "night4",
                      1.0
                    ],
                    /* :: */[
                      /* tuple */[
                        "night5",
                        1.0
                      ],
                      /* :: */[
                        /* tuple */[
                          "monster1",
                          1.0
                        ],
                        /* :: */[
                          /* tuple */[
                            "monster2",
                            1.0
                          ],
                          /* :: */[
                            /* tuple */[
                              "door_scratch1",
                              1.0
                            ],
                            /* :: */[
                              /* tuple */[
                                "door_scratch2",
                                1.0
                              ],
                              /* :: */[
                                /* tuple */[
                                  "hit",
                                  1.0
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "pickup",
                                    1.0
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "drop",
                                      1.0
                                    ],
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ];

  function playSound$2(name, state, env) {
    var exit = 0;
    var val;
    try {
      val = _2(StringMap[/* find */21], name, state[/* sounds */6]);
      exit = 1;
    }
    catch (exn){
      if (exn === not_found) {
        console.log("Couldn't find sound " + name);
        return /* () */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return playSound$1(val[0], /* Some */[val[1]], /* Some */[/* boolean */0], env);
    }
    
  }

  var basedirname = _1(dirname$1, caml_array_get(argv, 0));

  var basedirname$1 = basedirname !== "" ? basedirname + "/" : basedirname;

  function loadSounds(env) {
    var loadSoundHelper = function (soundMap, param) {
      var soundName = param[0];
      return _3(StringMap[/* add */3], soundName, /* tuple */[
                  loadSound$1(_2(sprintf(/* Format */[
                                /* String */__(2, [
                                    /* No_padding */0,
                                    /* String_literal */__(11, [
                                        "sounds/",
                                        /* String */__(2, [
                                            /* No_padding */0,
                                            /* String_literal */__(11, [
                                                ".wav",
                                                /* End_of_format */0
                                              ])
                                          ])
                                      ])
                                  ]),
                                "%ssounds/%s.wav"
                              ]), basedirname$1, soundName), env),
                  param[1]
                ], soundMap);
    };
    return fold_left(loadSoundHelper, StringMap[/* empty */0], soundNames);
  }

  function anyKey(keys, env) {
    return exists((function (k) {
                  return key(k, env);
                }), keys);
  }

  function facingToOffset(dir) {
    switch (dir) {
      case 0 : 
          return /* record */[
                  /* x */0,
                  /* y */-0.5
                ];
      case 1 : 
          return /* record */[
                  /* x */0,
                  /* y */0.5
                ];
      case 2 : 
          return /* record */[
                  /* x */0.5,
                  /* y */0
                ];
      case 3 : 
          return /* record */[
                  /* x */-0.5,
                  /* y */0
                ];
      
    }
  }

  function isCollidable(x, y, grid) {
    var match = caml_array_get(caml_array_get(grid, x), y);
    if (typeof match === "number") {
      switch (match) {
        case 0 : 
        case 1 : 
            return /* boolean */0;
        default:
          return /* boolean */1;
      }
    } else if (match.tag) {
      return /* boolean */1;
    } else {
      return /* boolean */0;
    }
  }

  function handleCollision(state, prevOffset, offset, pos, grid) {
    var halfTileSizef = tileSizef / 2;
    var offset_000 = /* x */constrain(offset[/* x */0], -halfTileSizef, halfTileSizef);
    var offset_001 = /* y */constrain(offset[/* y */1], -halfTileSizef, halfTileSizef);
    var offset$1 = /* record */[
      offset_000,
      offset_001
    ];
    var collided = exists((function (param) {
            var tx = param[0] + ((offset_000 + pos[/* x */0]) / tileSizef | 0) | 0;
            var ty = param[1] + ((offset_001 + pos[/* y */1]) / tileSizef | 0) | 0;
            if (tx >= grid.length || tx < 0 || ty >= caml_array_get(grid, 0).length || ty < 0) {
              return /* true */1;
            } else if (isCollidable(tx, ty, grid)) {
              return intersectRectRect(/* tuple */[
                          pos[/* x */0] + offset_000 + 8,
                          pos[/* y */1] + offset_001 + 8
                        ], tileSizef - 8 - 8, tileSizef - 8 - 8, /* tuple */[
                          (tx << 5),
                          (ty << 5)
                        ], tileSizef, tileSizef);
            } else {
              return /* false */0;
            }
          }), /* :: */[
          /* tuple */[
            0,
            0
          ],
          /* :: */[
            /* tuple */[
              1,
              1
            ],
            /* :: */[
              /* tuple */[
                -1,
                -1
              ],
              /* :: */[
                /* tuple */[
                  -1,
                  1
                ],
                /* :: */[
                  /* tuple */[
                    -1,
                    0
                  ],
                  /* :: */[
                    /* tuple */[
                      0,
                      -1
                    ],
                    /* :: */[
                      /* tuple */[
                        1,
                        -1
                      ],
                      /* :: */[
                        /* tuple */[
                          1,
                          0
                        ],
                        /* :: */[
                          /* tuple */[
                            0,
                            1
                          ],
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]);
    var collided$1;
    if (collided) {
      collided$1 = /* boolean */1;
    } else {
      var collided$2 = intersectRectRect(/* tuple */[
            pos[/* x */0] + offset_000,
            pos[/* y */1] + offset_001
          ], tileSizef, tileSizef, /* tuple */[
            256,
            512
          ], tileSizef * 3, tileSizef - 8);
      collided$1 = collided$2 ? exists((function (g) {
                var match = g[/* state */2];
                if (typeof match === "number" || !(match.tag === 7 && match[0] >= 2)) {
                  return /* boolean */0;
                } else {
                  return /* boolean */1;
                }
              }), state[/* gameobjects */8]) : /* boolean */0;
    }
    if (collided$1) {
      return prevOffset;
    } else {
      return offset$1;
    }
  }

  function checkIfInBarn(pos) {
    return intersectRectRect(/* tuple */[
                pos[/* x */0] + tileSizef / 2,
                pos[/* y */1] + tileSizef / 2
              ], tileSizef / 2, tileSizef / 2, /* tuple */[
                5 * tileSizef,
                9 * tileSizef
              ], 256, 256);
  }

  function addChick(gos) {
    return /* :: */[
            /* record */[
              /* pos : record */[
                /* x */randomf(11, 22) * tileSizef,
                /* y */randomf(18, 20) * tileSizef
              ],
              /* action : NoAction */12,
              /* state : Chick */__(6, [/* record */[
                    /* momentum : record */[
                      /* x */0,
                      /* y */0
                    ],
                    /* health */1,
                    /* willDie : boolean */0
                  ]])
            ],
            gos
          ];
  }

  var debug = /* boolean */0;

  var screenSize = 600;

  var playerSpeed = 150;

  var tileSize = 32;
  /* StringMap Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var entries = /* array */[
    /* record */[
      /* tasks : array */[
        /* Bool */__(0, ["Sell eggs"]),
        /* Bool */__(0, ["Sell milk"]),
        /* Bool */__(0, ["Fill water trough"]),
        /* Count */__(1, [
            "Water tall corn",
            2
          ]),
        /* Count */__(1, [
            "Plant seed and water it",
            1
          ])
      ],
      /* pages : array */[
        /* array */[
          "You arrive at long last to your late uncle's farm.",
          "",
          "Waiting for you at the gate is the mayor.",
          "He frowns and hands you a burned journal.",
          "After the house fire that claimed your uncle's",
          "life, this was all that's left. He tells you that",
          "part of the journal was burned, but perhaps",
          "you may find comfort in the rest of it.",
          "",
          "Most of the beginning of the book was",
          "burned, but you flip towards the end and read",
          "one of the entries."
        ],
        /* array */[
          "I am so tired! I spent all day laying",
          "traps today for the fox that had attacked",
          "chickens a month ago. I don't want to rinse",
          "off another puddle of chicken blood again.",
          "But my, just think of all that has changed",
          "since then...",
          "",
          "Maria and I had a lovely walk today. She is",
          "becoming so strong! It gives me hope. I",
          "worried the worst would happen again. Maria,",
          "after a while, was feeling happy, owing, I think,",
          "to the cow who came nosing towards us. I",
          "feared the animals would be frightened to",
          "see someone new on the farm, but they weren't!"
        ],
        /* array */[
          "The walk did Maria well though.",
          "Her attitude on the farm reminds me of... ",
          "best not to trouble my dreams with it. I would",
          "rather go to sleep with a light heart.",
          "I really believe she has turned the corner, and",
          "that we are over her troubles."
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[
        /* Bool */__(0, ["Give water to animals"]),
        /* Bool */__(0, ["Feed animals"]),
        /* Bool */__(0, ["Wash away manure"])
      ],
      /* pages : array */[
        /* array */[
          "I can't sleep now, so I may as well write. We",
          "have had such an adventure, such an",
          "agonizing experience. Suddenly I became",
          "awake, and sat up, with a horrible sense of",
          "fear upon me. The room was dark, so I could",
          "not see Maria's bed. I rushed across and",
          "felt for her. The bed was empty. I lit a",
          "match and found that she was not in the",
          "room. The door was shut, but not locked. I",
          "ran downstairs. Not there! Then I looked in",
          "all the other rooms of the house, with an",
          "ever-growing fear chilling my heart.",
          "Finally I came to the front door and found",
          "it open. It was not wide open, but not"
        ],
        /* array */[
          "locked either.  I am usually so careful to",
          "lock the door every night, but these days",
          "things seem to be slipping. There was no",
          "time to think of what might happen.  I took",
          "a jacket and ran out. For a moment or two I",
          "could see nothing, then the clouds moved",
          "and I saw her on top of the barn. My heart",
          "froze. How did she get there? I ran to the",
          "building and began climbing up.  It seemed",
          "to take forever.  I called in fright,",
          "\"Maria! Maria!\" She looked at me calmly as if",
          "all were perfectly natural. In the",
          "adrenaline I had felt nothing, but sitting",
          "on the barn I could feel the pain of the"
        ],
        /* array */[
          "climb seep back in. My body ached, and my",
          "hands were covered in blood, fingernails",
          "torn from the climb up the barn. I held",
          "them out in front of me trembling, and",
          "Maria turned her attention to them. Instead",
          "of fear, I saw that she was curious.  I",
          "hesitate to write the next words, but she",
          "stretched her neck over and began to lick",
          "my fingers as a dog would lick a wound. I",
          "pulled my hands back into my clothes,",
          "covering them. I could swear I saw a glimmer",
          "of red anger in her eyes."
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[/* Bool */__(0, ["Fix the barn door"])],
      /* pages : array */[
        /* array */[
          "Twice during the night I was wakened by Maria",
          "trying to get out. She seemed, even in her",
          "sleep, to be a little impatient at finding",
          "the door shut, and went back to bed under a",
          "sort of protest. I woke with the dawn, and",
          "heard the birds chirping outside of the",
          "window. Maria woke, too, and, I was sad to",
          "see, was much worse than on the previous",
          "morning. She is no longer taking to the milk",
          "which I have been having her eat. I took her",
          "down to the kitchen to see if she would have",
          "any bread or corn, but she seemed entirely",
          "uninterested. I remember when my daughter was",
          "young I would feed her a bit of fried egg"
        ],
        /* array */[
          "when she was sick. So I broke a few eggs and",
          "and began to fry them one by one. Strangely",
          "enough when I turned around I found Maria",
          "gulping down the eggs... Raw..."
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[
        /* Bool */__(0, ["Investigate barn"]),
        /* Bool */__(0, ["Wash away any mess"])
      ],
      /* pages : array */[
        /* array */[
          "I have not had the heart to write. Some sort",
          "of shadow seems to be coming over our",
          "happiness. Maria seems to be growing weaker.",
          "I do not understand why Maria is fading away",
          "like this. She eats, still a diet of raw eggs",
          "(to which I have surreptitiously added some",
          "bread), well and sleeps well, but I fear all",
          "the time shut in the room is causing her to",
          "worsen. The color in her cheeks are fading,",
          "and she gets weaker day by day. At night I",
          "hear her gasping as if for air. I keep the",
          "key of our door always fastened to my wrist",
          "at night, but she gets up and walks around",
          "the room, and sits at the open window. Last"
        ],
        /* array */[
          "night I found her leaning out when I woke",
          "up, and when I tried to wake her I could",
          "not, and she moaned silently between long,",
          "painful struggles for breath. ",
          "",
          "I do not know what is to be done. I fear this",
          "is the end."
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[
        /* Bool */__(0, ["Find Maria's grave"]),
        /* Bool */__(0, ["Mourn"])
      ],
      /* pages : array */[
        /* array */[
          "The worst has happened. I could not bear to",
          "think let alone write of it. But after some days",
          "I have mustered the courage. Maria is gone...",
          "And I cannot help but think of my own hand",
          "in its doing. But no more of these thoughts.",
          "This was my second chance and I have thrown",
          "it away. ",
          "",
          "I visited my daughter's grave today behind the",
          "barn. I laid flowers there. Time moves so slowly",
          "when you are alone. As if it were only yesterday.",
          "All that is left now is to work. Perhaps through"
        ],
        /* array */[
          "work I will forget. Perhaps I will be given",
          "another chance."
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[/* LockMonsterIn */0],
      /* pages : array */[
        /* array */[
          "I found her. I was a fool yesterday to think",
          "that she had run away for good. I was so",
          "foolish I went to my old daughter's grave, but I",
          "no longer need her, I have Maria. I went right",
          "back to the spot I had found Maria originally,",
          "that day so long ago, on the night my first",
          "daughter died. She was so small back then",
          "and sweet. I named her after my daughter,",
          "and so I still had my Maria.",
          "",
          "Now she is strong. Quite strong. She almost did",
          "not recognize me but I convinced her to come"
        ],
        /* array */[
          "back to the farm with me. Ah my darling. My",
          "beautiful Maria. When she got back to the",
          "farm she jumped into the barn and into the",
          "hay stacks. Just like my old daughter use to do.",
          "Romping around. And well, there was a chicken",
          "in the hay stack as well. And I thought that",
          "Maria was just playing with the hen. But the",
          "hay stack was red. It became red. And well I",
          "could not watch. I shut and locked the barn",
          "door. Maria would not mind. I just don't want",
          "to disturb her play. ",
          "I'll need to get more chickens"
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[
        /* Count */__(1, [
            "Water corn",
            3
          ]),
        /* Count */__(1, [
            "Plant seed and water it",
            1
          ]),
        /* Bool */__(0, ["Sell eggs"]),
        /* Bool */__(0, ["Sell milk"]),
        /* Bool */__(0, ["Fill water trough"]),
        /* Bool */__(0, ["Feed animals"]),
        /* Bool */__(0, ["Wash away manure"])
      ],
      /* pages : array */[
        /* array */[
          "She truly does love me.",
          "As soon as I peek into the barn she looks at",
          "me so lovingly and jumps up to try to play with",
          "me. My beautiful Maria. She is so strong now,",
          "at times it seems that she is almost able to",
          "break down the door. All to get to me.",
          "All to play with me... ",
          "",
          "I have such frightful dreams these nights. I",
          "see my daughter. My old daughter. My human",
          "daughter, she tells me I am in danger. She tells",
          "me I need to kill Maria."
        ],
        /* array */[
          "I often dream of that one night, on top",
          "of the barn. I see her stretching her neck over.",
          "Licking the blood off my hands hungrily.",
          "I push my hands towards her. She opens her",
          "mouth and I see her teeth close around me.",
          "I shudder even recalling it.",
          "",
          "But what am I to do? You see? This new daughter,",
          "this new Maria, she loves me more than all the",
          "other animals in the farm. She won't even play",
          "with the chickens any more she wants to play"
        ],
        /* array */[
          "with me so much. But won't she grow weak if",
          "she does not play with the chickens? If she",
          "does not eat the chickens. If she just wants",
          "me instead...",
          "",
          "I have some experimentation to do."
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[/* Bool */__(0, ["Get the axe and feed Maria"])],
      /* pages : array */[
        /* array */[
          "I made a discovery today. My dear Maria just",
          "needs a little help to play with the chickens.",
          "I just have to take the axe and... well paint the",
          "chickens a bit red before throwing them into",
          "the barn. And I'll let you in on a bit of a secret,",
          "after I fed her six of them, she just fell asleep.",
          "I even went into the barn and laid a blanket on",
          "her. So beautiful, when she sleeps. ",
          "",
          "Wait, there was a crash outside. The barn door",
          "is broken down. I hear a banging downstairs.",
          "She wants to play with me..."
        ],
        /* array */[
          "There is a pounding on my door. She wants in.",
          "My daughter wants in.",
          "No. This monster wants in!",
          "I have nothing here to defend myself and the",
          "pounding is growing louder. She is not my",
          "daughter, it is a monster. Whoever is reading",
          "this must slay it. The axe is in the barn. You",
          "must kill it as it sleeps.",
          "The door is nearly broken.",
          "My dear Maria, I will see you soon. "
        ]
      ]
    ],
    /* record */[
      /* tasks : array */[],
      /* pages : array */[/* array */[
          "This is the end of this game.",
          "Thanks for playing.",
          "",
          "Made by:",
          " - Maude (graphics)",
          " - Avery (programming)",
          " - Ben (programming)",
          " - Nate (writing)"
        ]]
    ]
  ];
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function init$5() {
    return /* record */[
            /* dayIndex */0,
            /* dayTransition : JournalIn */2,
            /* animationTime */0,
            /* pageNumber */0
          ];
  }

  function getForwardButton(param, env) {
    var match = param[/* journal */9];
    var pageNumber = match[/* pageNumber */3];
    var currentEntry = caml_array_get(entries, match[/* dayIndex */0]);
    var match$1 = pageNumber === currentEntry[/* pages */1].length ? /* tuple */[
        "continue",
        445
      ] : /* tuple */[
        String(pageNumber + 1 | 0) + (" / " + String(currentEntry[/* pages */1].length + 1 | 0)),
        468
      ];
    var body = match$1[0];
    var w1 = textWidth(/* Some */[param[/* mainFont */13]], body, env);
    var w1$1 = w1 + 24 | 0;
    return /* tuple */[
            body,
            match$1[1],
            550,
            w1$1,
            40
          ];
  }

  function getBackButton(param, env) {
    var body = " < ";
    var w1 = textWidth(/* Some */[param[/* mainFont */13]], body, env);
    var w1$1 = w1 + 24 | 0;
    return /* tuple */[
            body,
            60,
            550,
            w1$1,
            40
          ];
  }

  function updateDay(state, env) {
    var exit$$1 = 0;
    var dayIndex;
    var pageNumber;
    var match = state[/* journal */9];
    var dayIndex$1 = match[/* dayIndex */0];
    switch (match[/* dayTransition */1]) {
      case 0 : 
          if (debug && keyPressed(/* P */40, env)) {
            var newrecord = state.slice();
            var init = state[/* journal */9];
            newrecord[/* journal */9] = /* record */[
              /* dayIndex */init[/* dayIndex */0],
              /* dayTransition : FadeOut */4,
              /* animationTime */0,
              /* pageNumber */init[/* pageNumber */3]
            ];
            return newrecord;
          } else {
            return state;
          }
      case 1 : 
      case 2 : 
          dayIndex = dayIndex$1;
          pageNumber = match[/* pageNumber */3];
          exit$$1 = 1;
          break;
      case 3 : 
          if (match[/* animationTime */2] > 1.5) {
            var newrecord$1 = state.slice();
            var init$1 = state[/* journal */9];
            newrecord$1[/* journal */9] = /* record */[
              /* dayIndex */init$1[/* dayIndex */0],
              /* dayTransition : FadeIn */5,
              /* animationTime */0,
              /* pageNumber */init$1[/* pageNumber */3]
            ];
            return newrecord$1;
          } else {
            return state;
          }
      case 4 : 
          if (match[/* animationTime */2] > 1.5) {
            var dayIndex$2 = dayIndex$1 + 1 | 0;
            var gameobjects = map((function (go) {
                    var match = go[/* state */2];
                    var match$1 = go[/* action */1];
                    var state;
                    if (typeof match === "number") {
                      state = go[/* state */2];
                    } else {
                      switch (match.tag | 0) {
                        case 0 : 
                            var stage = match[0];
                            state = stage !== -1 ? (
                                stage !== 5 ? (
                                    typeof match$1 === "number" && match$1 >= 12 ? /* Corn */__(0, [stage + 1 | 0]) : go[/* state */2]
                                  ) : /* Corn */__(0, [5])
                              ) : /* Corn */__(0, [-1]);
                            break;
                        case 2 : 
                            state = /* WaterTank */__(2, [/* Empty */2]);
                            break;
                        case 3 : 
                            var match$2 = +(match[0] === /* Full */1);
                            state = /* FoodTank */__(3, [match$2 ? /* HalfFull */0 : /* Empty */2]);
                            break;
                        case 4 : 
                            var chickenState = match[0];
                            state = chickenState[/* willDie */2] ? (
                                dayIndex$2 === 3 ? /* Chicken */__(4, [/* record */[
                                        /* momentum */chickenState[/* momentum */0],
                                        /* health */0,
                                        /* willDie */chickenState[/* willDie */2]
                                      ]]) : (
                                    dayIndex$2 >= 5 ? /* Chicken */__(4, [/* record */[
                                            /* momentum */chickenState[/* momentum */0],
                                            /* health */-1,
                                            /* willDie */chickenState[/* willDie */2]
                                          ]]) : go[/* state */2]
                                  )
                              ) : go[/* state */2];
                            break;
                        case 7 : 
                            state = dayIndex$2 >= 6 ? /* BarnDoor */__(7, [/* Broken */0]) : go[/* state */2];
                            break;
                        default:
                          state = go[/* state */2];
                      }
                    }
                    var match$3 = go[/* state */2];
                    var pos;
                    if (typeof match$3 === "number") {
                      pos = go[/* pos */0];
                    } else {
                      switch (match$3.tag | 0) {
                        case 4 : 
                            pos = match$3[0][/* willDie */2] && dayIndex$2 === 3 ? /* record */[
                                /* x */9 * tileSizef,
                                /* y */15 * tileSizef
                              ] : go[/* pos */0];
                            break;
                        case 7 : 
                            pos = match$3[0] >= 2 && dayIndex$2 >= 6 ? /* record */[
                                /* x */go[/* pos */0][/* x */0] + tileSizef - 3,
                                /* y */go[/* pos */0][/* y */1]
                              ] : go[/* pos */0];
                            break;
                        default:
                          pos = go[/* pos */0];
                      }
                    }
                    var action;
                    if (typeof state === "number") {
                      action = state === 3 && dayIndex$2 === 7 ? /* PickUp */[/* Axe */6] : go[/* action */1];
                    } else {
                      switch (state.tag | 0) {
                        case 0 : 
                            var n = state[0];
                            action = n !== -1 ? (
                                n !== 5 ? (
                                    n >= 0 && n < 5 ? /* WaterCorn */2 : go[/* action */1]
                                  ) : /* PickUp */[/* Corn */4]
                              ) : /* PlantSeed */5;
                            break;
                        case 1 : 
                            action = /* PickUp */[/* Milk */2];
                            break;
                        case 2 : 
                            action = /* WaterAnimals */3;
                            break;
                        case 3 : 
                            action = /* FeedAnimals */4;
                            break;
                        case 7 : 
                            action = state[0] !== 0 ? go[/* action */1] : (
                                dayIndex$2 === 2 ? /* DoBarnDoor */9 : (
                                    dayIndex$2 >= 6 ? /* NoAction */12 : go[/* action */1]
                                  )
                              );
                            break;
                        default:
                          action = go[/* action */1];
                      }
                    }
                    return /* record */[
                            /* pos */pos,
                            /* action */action,
                            /* state */state
                          ];
                  }), state[/* gameobjects */8]);
            var shouldAddAnotherEgg = +(dayIndex$2 === 1 || dayIndex$2 === 2);
            var gameobjects$1;
            if (shouldAddAnotherEgg) {
              var match$1 = +(dayIndex$2 === 1);
              gameobjects$1 = /* :: */[
                /* record */[
                  /* pos : record */[
                    /* x */(
                      match$1 ? 15 : 17
                    ) * tileSizef,
                    /* y */19 * tileSizef
                  ],
                  /* action : PickUp */[/* Egg */3],
                  /* state : NoState */2
                ],
                gameobjects
              ];
            } else {
              gameobjects$1 = gameobjects;
            }
            var shouldAddManure = +(dayIndex$2 === 1 || dayIndex$2 === 6);
            var gameobjects$2 = shouldAddManure ? /* :: */[
                /* record */[
                  /* pos : record */[
                    /* x */14 * tileSizef,
                    /* y */19 * tileSizef
                  ],
                  /* action : Cleanup */0,
                  /* state : NoState */2
                ],
                gameobjects$1
              ] : gameobjects$1;
            var shouldAddCleanupBlood = +(dayIndex$2 === 3);
            var gameobjects$3 = shouldAddCleanupBlood ? /* :: */[
                /* record */[
                  /* pos : record */[
                    /* x */11 * tileSizef,
                    /* y */11 * tileSizef
                  ],
                  /* action : CleanupBlood */1,
                  /* state : NoState */2
                ],
                /* :: */[
                  /* record */[
                    /* pos : record */[
                      /* x */7 * tileSizef,
                      /* y */12 * tileSizef
                    ],
                    /* action : CleanupBlood */1,
                    /* state : NoState */2
                  ],
                  /* :: */[
                    /* record */[
                      /* pos : record */[
                        /* x */8 * tileSizef,
                        /* y */15 * tileSizef
                      ],
                      /* action : CleanupBlood */1,
                      /* state : NoState */2
                    ],
                    gameobjects$2
                  ]
                ]
              ] : gameobjects$2;
            var shouldAddFlowers = +(dayIndex$2 === 4);
            var gameobjects$4 = shouldAddFlowers ? /* :: */[
                /* record */[
                  /* pos : record */[
                    /* x */tileSizef * 17,
                    /* y */tileSizef * 11
                  ],
                  /* action : PickUp */[/* Flower */7],
                  /* state : NoState */2
                ],
                gameobjects$3
              ] : gameobjects$3;
            var shouldRemoveBoss = +(dayIndex$2 === 6);
            var gameobjects$5 = shouldRemoveBoss ? filter((function (g) {
                        var tmp = g[/* state */2];
                        if (typeof tmp === "number" || tmp.tag !== 5) {
                          return /* boolean */1;
                        } else {
                          return /* boolean */0;
                        }
                      }))(gameobjects$4) : gameobjects$4;
            var checkIfAtLeastOneCorn = +(dayIndex$2 === 6);
            var gameobjects$6 = checkIfAtLeastOneCorn ? fold_left((function (param, g) {
                        var isDone = param[1];
                        var gameobjects = param[0];
                        var exit$$1 = 0;
                        if (isDone) {
                          exit$$1 = 1;
                        } else {
                          var tmp = g[/* state */2];
                          if (typeof tmp === "number" || tmp.tag) {
                            exit$$1 = 1;
                          } else {
                            return /* tuple */[
                                    /* :: */[
                                      /* record */[
                                        /* pos */g[/* pos */0],
                                        /* action : PickUp */[/* Corn */4],
                                        /* state : Corn */__(0, [5])
                                      ],
                                      gameobjects
                                    ],
                                    /* boolean */1
                                  ];
                          }
                        }
                        if (exit$$1 === 1) {
                          return /* tuple */[
                                  /* :: */[
                                    g,
                                    gameobjects
                                  ],
                                  isDone
                                ];
                        }
                        
                      }), /* tuple */[
                      /* [] */0,
                      /* boolean */0
                    ], gameobjects$5)[0] : gameobjects$5;
            var shouldAddBoss = +(dayIndex$2 === 7);
            var gameobjects$7;
            if (shouldAddBoss) {
              var bPos_000 = /* x */tileSizef * 9;
              var bPos_001 = /* y */tileSizef * 5;
              var bPos = /* record */[
                bPos_000,
                bPos_001
              ];
              gameobjects$7 = /* :: */[
                /* record */[
                  /* pos */bPos,
                  /* action : NoAction */12,
                  /* state : Boss */__(5, [/* record */[
                        /* movePair : tuple */[
                          bPos,
                          bPos
                        ],
                        /* movingTime */0,
                        /* hunger */6,
                        /* eatingTime */0,
                        /* killed : [] */0,
                        /* eating : boolean */0
                      ]])
                ],
                gameobjects$6
              ];
            } else {
              gameobjects$7 = gameobjects$6;
            }
            var shouldAddChicks = +(dayIndex$2 === 7);
            var gameobjects$8;
            if (shouldAddChicks) {
              var animalsAliveCount = fold_left((function (count, x) {
                      var match = x[/* state */2];
                      var exit$$1 = 0;
                      if (typeof match === "number") {
                        return count;
                      } else {
                        switch (match.tag | 0) {
                          case 1 : 
                          case 4 : 
                          case 6 : 
                              exit$$1 = 1;
                              break;
                          default:
                            return count;
                        }
                      }
                      if (exit$$1 === 1) {
                        if (match[0][/* health */1] > 0) {
                          return count + 1 | 0;
                        } else {
                          return count;
                        }
                      }
                      
                    }), 0, gameobjects$7);
              gameobjects$8 = animalsAliveCount < 6 ? addChick(addChick(addChick(addChick(addChick(addChick(gameobjects$7)))))) : gameobjects$7;
            } else {
              gameobjects$8 = gameobjects$7;
            }
            var newrecord$2 = state.slice();
            newrecord$2[/* playerPos */2] = /* record */[
              /* x */tileSizef * 15.8,
              /* y */tileSizef * 10
            ];
            newrecord$2[/* playerFacing */3] = /* DownD */1;
            newrecord$2[/* currentItem */7] = /* None */0;
            newrecord$2[/* gameobjects */8] = gameobjects$8;
            newrecord$2[/* journal */9] = /* record */[
              /* dayIndex */dayIndex$2,
              /* dayTransition : JournalIn */2,
              /* animationTime */0,
              /* pageNumber */0
            ];
            var match$2 = +(dayIndex$2 === 5 || dayIndex$2 === 7);
            newrecord$2[/* night */12] = match$2 ? /* boolean */1 : /* boolean */0;
            newrecord$2[/* playerDead */22] = /* boolean */0;
            return newrecord$2;
          } else {
            return state;
          }
      case 5 : 
          if (match[/* animationTime */2] > 1.5) {
            var newrecord$3 = state.slice();
            var init$2$$1 = state[/* journal */9];
            newrecord$3[/* journal */9] = /* record */[
              /* dayIndex */init$2$$1[/* dayIndex */0],
              /* dayTransition : NoTransition */0,
              /* animationTime */0,
              /* pageNumber */init$2$$1[/* pageNumber */3]
            ];
            return newrecord$3;
          } else {
            return state;
          }
      
    }
    if (exit$$1 === 1) {
      var match$3 = mouse(env);
      var my = match$3[1];
      var mx = match$3[0];
      var didClickOnForward = /* false */0;
      if (state[/* mousePressed */15]) {
        var match$4 = getForwardButton(state, env);
        var y1 = match$4[2];
        var x1 = match$4[1];
        didClickOnForward = +(mx > x1 && mx < (x1 + match$4[3] | 0) && my > y1 && my < (y1 + match$4[4] | 0));
      }
      var didClickOnBack = /* false */0;
      if (state[/* mousePressed */15]) {
        var match$5 = getBackButton(state, env);
        var y1$1 = match$5[2];
        var x1$1 = match$5[1];
        didClickOnBack = +(mx > x1$1 && mx < (x1$1 + match$5[3] | 0) && my > y1$1 && my < (y1$1 + match$5[4] | 0));
      }
      if ((keyPressed(/* Right */51, env) || didClickOnForward || keyPressed(/* Space */4, env) || keyPressed(/* X */48, env)) && pageNumber < caml_array_get(entries, dayIndex)[/* pages */1].length) {
        var newrecord$4 = state.slice();
        var init$3 = state[/* journal */9];
        newrecord$4[/* journal */9] = /* record */[
          /* dayIndex */init$3[/* dayIndex */0],
          /* dayTransition */init$3[/* dayTransition */1],
          /* animationTime */init$3[/* animationTime */2],
          /* pageNumber */pageNumber + 1 | 0
        ];
        return newrecord$4;
      } else if ((keyPressed(/* Left */52, env) || didClickOnBack) && pageNumber > 0) {
        var newrecord$5 = state.slice();
        var init$4 = state[/* journal */9];
        newrecord$5[/* journal */9] = /* record */[
          /* dayIndex */init$4[/* dayIndex */0],
          /* dayTransition */init$4[/* dayTransition */1],
          /* animationTime */init$4[/* animationTime */2],
          /* pageNumber */pageNumber - 1 | 0
        ];
        return newrecord$5;
      } else if ((keyPressed(/* Right */51, env) || didClickOnForward) && pageNumber === caml_array_get(entries, dayIndex)[/* pages */1].length) {
        var newrecord$6 = state.slice();
        var init$5 = state[/* journal */9];
        newrecord$6[/* journal */9] = /* record */[
          /* dayIndex */init$5[/* dayIndex */0],
          /* dayTransition : JournalOut */3,
          /* animationTime */init$5[/* animationTime */2],
          /* pageNumber */init$5[/* pageNumber */3]
        ];
        return newrecord$6;
      } else {
        return state;
      }
    }
    
  }

  function day1Stats(state) {
    return fold_left((function (acc, o) {
                  if (acc.length !== 5) {
                    return failwith("beeeeen 2");
                  } else {
                    var pickUpEggs = acc[0];
                    var pickUpMilk = acc[1];
                    var emptyWaterTank = acc[2];
                    var cornNoAction = acc[3];
                    var plantSeed = acc[4];
                    var match = o[/* action */1];
                    var exit$$1 = 0;
                    if (typeof match === "number") {
                      if (match >= 12) {
                        var match$1 = o[/* state */2];
                        if (typeof match$1 === "number") {
                          return acc;
                        } else {
                          switch (match$1.tag | 0) {
                            case 0 : 
                                var match$2 = match$1[0];
                                if (match$2 !== 0) {
                                  if (match$2 !== 4) {
                                    return acc;
                                  } else {
                                    return /* int array */[
                                            pickUpEggs,
                                            pickUpMilk,
                                            emptyWaterTank,
                                            cornNoAction + 1 | 0,
                                            plantSeed
                                          ];
                                  }
                                } else {
                                  return /* int array */[
                                          pickUpEggs,
                                          pickUpMilk,
                                          emptyWaterTank,
                                          cornNoAction,
                                          plantSeed + 1 | 0
                                        ];
                                }
                            case 2 : 
                                exit$$1 = 1;
                                break;
                            default:
                              return acc;
                          }
                        }
                      } else {
                        exit$$1 = 1;
                      }
                    } else {
                      var match$3 = match[0];
                      if (match$3 !== 2) {
                        if (match$3 !== 3) {
                          exit$$1 = 1;
                        } else {
                          return /* int array */[
                                  1,
                                  pickUpMilk,
                                  emptyWaterTank,
                                  cornNoAction,
                                  plantSeed
                                ];
                        }
                      } else {
                        var tmp = o[/* state */2];
                        if (typeof tmp === "number") {
                          return acc;
                        } else {
                          switch (tmp.tag | 0) {
                            case 1 : 
                                return /* int array */[
                                        pickUpEggs,
                                        1,
                                        emptyWaterTank,
                                        cornNoAction,
                                        plantSeed
                                      ];
                            case 2 : 
                                exit$$1 = 1;
                                break;
                            default:
                              return acc;
                          }
                        }
                      }
                    }
                    if (exit$$1 === 1) {
                      var match$4 = o[/* state */2];
                      if (typeof match$4 === "number" || !(match$4.tag === 2 && match$4[0] >= 2)) {
                        return acc;
                      } else {
                        return /* int array */[
                                pickUpEggs,
                                pickUpMilk,
                                1,
                                cornNoAction,
                                plantSeed
                              ];
                      }
                    }
                    
                  }
                }), /* array */[
                0,
                0,
                0,
                0,
                0
              ], state[/* gameobjects */8]);
  }

  function day2Stats(state) {
    return fold_left((function (acc, o) {
                  if (acc.length !== 3) {
                    return failwith("beeeeen 3");
                  } else {
                    var emptyWaterTank = acc[0];
                    var emptyFoodTank = acc[1];
                    var cleanup = acc[2];
                    var match = o[/* action */1];
                    var exit$$1 = 0;
                    var match$1 = o[/* state */2];
                    if (typeof match$1 === "number") {
                      exit$$1 = 1;
                    } else {
                      switch (match$1.tag | 0) {
                        case 2 : 
                            if (match$1[0] >= 2) {
                              return /* int array */[
                                      1,
                                      emptyFoodTank,
                                      cleanup
                                    ];
                            } else {
                              exit$$1 = 1;
                            }
                            break;
                        case 3 : 
                            if (match$1[0] >= 2) {
                              return /* int array */[
                                      emptyWaterTank,
                                      1,
                                      cleanup
                                    ];
                            } else {
                              exit$$1 = 1;
                            }
                            break;
                        default:
                          exit$$1 = 1;
                      }
                    }
                    if (exit$$1 === 1) {
                      if (typeof match === "number" && match === 0) {
                        return /* int array */[
                                emptyWaterTank,
                                emptyFoodTank,
                                1
                              ];
                      } else {
                        return acc;
                      }
                    }
                    
                  }
                }), /* int array */[
                0,
                0,
                0
              ], state[/* gameobjects */8]);
  }

  function day3Stats(state) {
    return fold_left((function (acc, o) {
                  var match = o[/* state */2];
                  if (typeof match === "number" || !(match.tag === 7 && match[0] === 0)) {
                    return acc;
                  } else {
                    return /* int array */[1];
                  }
                }), /* int array */[0], state[/* gameobjects */8]);
  }

  function day4Stats(state) {
    return fold_left((function (acc, o) {
                  var match = o[/* action */1];
                  if (typeof match === "number" && match === 1) {
                    return /* int array */[
                            1,
                            1
                          ];
                  } else {
                    return acc;
                  }
                }), /* int array */[
                0,
                0
              ], state[/* gameobjects */8]);
  }

  function day5Stats(state) {
    return fold_left((function (acc, o) {
                  if (acc.length !== 2) {
                    return failwith("beeeeen 4");
                  } else {
                    var flowerTombstone = acc[1];
                    var match = o[/* action */1];
                    var exit$$1 = 0;
                    var match$1 = o[/* state */2];
                    if (typeof match$1 === "number" || !(match$1.tag === 8 && !match$1[0])) {
                      exit$$1 = 1;
                    } else {
                      return /* int array */[
                              1,
                              1
                            ];
                    }
                    if (exit$$1 === 1) {
                      if (typeof match === "number" && match === 11) {
                        return /* int array */[
                                1,
                                flowerTombstone
                              ];
                      } else {
                        return acc;
                      }
                    }
                    
                  }
                }), /* int array */[
                0,
                0
              ], state[/* gameobjects */8]);
  }

  function day6Stats(state) {
    var match = fold_left((function (param, g) {
            var match = g[/* state */2];
            var isBarnDoorClosed = param[1];
            var isMonsterInBarn = param[0];
            if (typeof match === "number") {
              return /* tuple */[
                      isMonsterInBarn,
                      isBarnDoorClosed
                    ];
            } else {
              switch (match.tag | 0) {
                case 5 : 
                    return /* tuple */[
                            checkIfInBarn(g[/* pos */0]),
                            isBarnDoorClosed
                          ];
                case 7 : 
                    if (match[0] >= 2) {
                      return /* tuple */[
                              isMonsterInBarn,
                              /* boolean */1
                            ];
                    } else {
                      return /* tuple */[
                              isMonsterInBarn,
                              isBarnDoorClosed
                            ];
                    }
                default:
                  return /* tuple */[
                          isMonsterInBarn,
                          isBarnDoorClosed
                        ];
              }
            }
          }), /* tuple */[
          /* boolean */0,
          /* boolean */0
        ], state[/* gameobjects */8]);
    var match$1 = match[0] && match[1];
    return /* int array */[match$1 ? 1 : 0];
  }

  function day7Stats(state) {
    return fold_left((function (acc, o) {
                  if (acc.length !== 7) {
                    return failwith("beeeeen 1");
                  } else {
                    var wateredCorn = acc[0];
                    var plantSeed = acc[1];
                    var pickUpEggs = acc[2];
                    var pickUpMilk = acc[3];
                    var emptyWaterTank = acc[4];
                    var emptyFoodTank = acc[5];
                    var cleanup = acc[6];
                    var match = o[/* action */1];
                    var exit$$1 = 0;
                    var exit$1 = 0;
                    if (typeof match === "number") {
                      if (match >= 12) {
                        var match$1 = o[/* state */2];
                        if (typeof match$1 === "number") {
                          return acc;
                        } else {
                          switch (match$1.tag | 0) {
                            case 0 : 
                                if (match$1[0] !== 0) {
                                  return /* int array */[
                                          wateredCorn + 1 | 0,
                                          plantSeed,
                                          pickUpEggs,
                                          pickUpMilk,
                                          emptyWaterTank,
                                          emptyFoodTank,
                                          cleanup
                                        ];
                                } else {
                                  return /* int array */[
                                          wateredCorn,
                                          plantSeed + 1 | 0,
                                          pickUpEggs,
                                          pickUpMilk,
                                          emptyWaterTank,
                                          emptyFoodTank,
                                          cleanup
                                        ];
                                }
                            case 2 : 
                            case 3 : 
                                exit$1 = 2;
                                break;
                            default:
                              return acc;
                          }
                        }
                      } else {
                        exit$1 = 2;
                      }
                    } else {
                      var match$2 = match[0];
                      if (match$2 !== 2) {
                        if (match$2 !== 3) {
                          exit$1 = 2;
                        } else {
                          return /* int array */[
                                  wateredCorn,
                                  plantSeed,
                                  1,
                                  pickUpMilk,
                                  emptyWaterTank,
                                  emptyFoodTank,
                                  cleanup
                                ];
                        }
                      } else {
                        var tmp = o[/* state */2];
                        if (typeof tmp === "number") {
                          return acc;
                        } else {
                          switch (tmp.tag | 0) {
                            case 1 : 
                                return /* int array */[
                                        wateredCorn,
                                        plantSeed,
                                        pickUpEggs,
                                        1,
                                        emptyWaterTank,
                                        emptyFoodTank,
                                        cleanup
                                      ];
                            case 2 : 
                            case 3 : 
                                exit$1 = 2;
                                break;
                            default:
                              return acc;
                          }
                        }
                      }
                    }
                    if (exit$1 === 2) {
                      var match$3 = o[/* state */2];
                      if (typeof match$3 === "number") {
                        exit$$1 = 1;
                      } else {
                        switch (match$3.tag | 0) {
                          case 2 : 
                              if (match$3[0] >= 2) {
                                return /* int array */[
                                        wateredCorn,
                                        plantSeed,
                                        pickUpEggs,
                                        pickUpMilk,
                                        1,
                                        emptyFoodTank,
                                        cleanup
                                      ];
                              } else {
                                exit$$1 = 1;
                              }
                              break;
                          case 3 : 
                              if (match$3[0] >= 2) {
                                return /* int array */[
                                        wateredCorn,
                                        plantSeed,
                                        pickUpEggs,
                                        pickUpMilk,
                                        emptyWaterTank,
                                        1,
                                        cleanup
                                      ];
                              } else {
                                exit$$1 = 1;
                              }
                              break;
                          default:
                            exit$$1 = 1;
                        }
                      }
                    }
                    if (exit$$1 === 1) {
                      if (typeof match === "number" && match === 0) {
                        return /* int array */[
                                wateredCorn,
                                plantSeed,
                                pickUpEggs,
                                pickUpMilk,
                                emptyWaterTank,
                                emptyFoodTank,
                                1
                              ];
                      } else {
                        return acc;
                      }
                    }
                    
                  }
                }), /* array */[
                0,
                0,
                0,
                0,
                0,
                0,
                0
              ], state[/* gameobjects */8]);
  }

  function day8Stats(state) {
    return fold_left((function (acc, o) {
                  var match = o[/* state */2];
                  if (typeof match === "number" || !(match.tag === 5 && match[0][/* hunger */2] > 0)) {
                    return acc;
                  } else {
                    return /* int array */[1];
                  }
                }), /* int array */[0], state[/* gameobjects */8]);
  }

  function renderJournal(state, env) {
    var match = state[/* journal */9];
    var pageNumber = match[/* pageNumber */3];
    var dayIndex = match[/* dayIndex */0];
    drawAssetFullscreen("journal_page.png", state, env);
    pushStyle(env);
    tint(color(0, 0, 0, 255), env);
    if (!(dayIndex === 0 && pageNumber === 0)) {
      var date = dayIndex + 14 | 0;
      var th = date === 21 ? "st" : (
          date === 22 ? "nd" : "th"
        );
      var title = "July " + (String(date) + th);
      text(/* Some */[state[/* mainFont */13]], title, /* tuple */[
            55,
            60
          ], env);
      var w = textWidth(/* Some */[state[/* mainFont */13]], title, env);
      fill$4(color(0, 0, 0, 255), env);
      rect(/* tuple */[
            55,
            60
          ], w, 2, env);
    }
    var currentEntry = caml_array_get(entries, dayIndex);
    var match$1 = getForwardButton(state, env);
    var h1 = match$1[4];
    var w1 = match$1[3];
    var y1 = match$1[2];
    var x1 = match$1[1];
    var match$2 = mouse(env);
    var my = match$2[1];
    var mx = match$2[0];
    if (mx > x1 && mx < (x1 + w1 | 0) && my > y1 && my < (y1 + h1 | 0)) {
      fill$4(color(170, 138, 107, 255), env);
      rect(/* tuple */[
            x1,
            y1
          ], w1, h1, env);
    }
    text(/* Some */[state[/* mainFont */13]], match$1[0], /* tuple */[
          x1 + 12 | 0,
          y1 + 30 | 0
        ], env);
    var match$3 = getBackButton(state, env);
    var h1$1 = match$3[4];
    var w1$1 = match$3[3];
    var y1$1 = match$3[2];
    var x1$1 = match$3[1];
    var match$4 = mouse(env);
    var my$1 = match$4[1];
    var mx$1 = match$4[0];
    if (mx$1 > x1$1 && mx$1 < (x1$1 + w1$1 | 0) && my$1 > y1$1 && my$1 < (y1$1 + h1$1 | 0)) {
      fill$4(color(170, 138, 107, 255), env);
      rect(/* tuple */[
            x1$1,
            y1$1
          ], w1$1, h1$1, env);
    }
    text(/* Some */[state[/* mainFont */13]], match$3[0], /* tuple */[
          x1$1 + 12 | 0,
          y1$1 + 30 | 0
        ], env);
    if (pageNumber === currentEntry[/* pages */1].length) {
      text(/* Some */[state[/* mainFont */13]], "Todo list:", /* tuple */[
            55,
            124
          ], env);
      var stats = dayIndex === 0 ? day1Stats(state) : (
          dayIndex === 1 ? day2Stats(state) : (
              dayIndex === 2 ? day3Stats(state) : (
                  dayIndex === 3 ? day4Stats(state) : (
                      dayIndex === 4 ? day5Stats(state) : (
                          dayIndex === 5 ? day6Stats(state) : (
                              dayIndex === 6 ? day7Stats(state) : (
                                  dayIndex === 7 ? day8Stats(state) : /* int array */[]
                                )
                            )
                        )
                    )
                )
            )
        );
      fold_left$1((function (i, task) {
              var y = (110 + (i << 5) | 0) + 64 | 0;
              var match;
              if (typeof task === "number") {
                var stat = caml_array_get(stats, i);
                if (state[/* day6PlayerWentInBarn */17]) {
                  var match$1 = +(stat === 1);
                  match = /* tuple */[
                    match$1 ? "[X]" : "[ ]",
                    "Lock monster in barn"
                  ];
                } else {
                  var match$2 = +(stat === 1);
                  match = /* tuple */[
                    match$2 ? "[X]" : "[ ]",
                    "Investigate noise from the barn"
                  ];
                }
              } else if (task.tag) {
                var c = task[1];
                var stat$1 = caml_array_get(stats, i);
                var checkbox = stat$1 >= c ? "[X]" : String(stat$1) + (" / " + String(c));
                match = /* tuple */[
                  checkbox,
                  task[0]
                ];
              } else {
                var stat$2 = caml_array_get(stats, i);
                var checkbox$1 = stat$2 === 0 ? "[X]" : "[ ]";
                match = /* tuple */[
                  checkbox$1,
                  task[0]
                ];
              }
              text(/* Some */[state[/* mainFont */13]], match[0], /* tuple */[
                    55,
                    y
                  ], env);
              text(/* Some */[state[/* mainFont */13]], match[1], /* tuple */[
                    120,
                    y
                  ], env);
              return i + 1 | 0;
            }), 0, currentEntry[/* tasks */0]);
    } else {
      fold_left$1((function (y, line$$1) {
              text(/* Some */[state[/* mainFont */13]], line$$1, /* tuple */[
                    55,
                    y
                  ], env);
              return y + 32 | 0;
            }), 110, caml_array_get(currentEntry[/* pages */1], pageNumber));
    }
    return popStyle(env);
  }

  function renderTransition(state, env) {
    var exit$$1 = 0;
    var dayTransition;
    var animationTime;
    var match = state[/* journal */9];
    var dayTransition$1 = match[/* dayTransition */1];
    switch (dayTransition$1) {
      case 0 : 
          return state;
      case 1 : 
          renderJournal(state, env);
          if (match[/* animationTime */2] > 0 && (keyPressed(/* Space */4, env) || keyPressed(/* X */48, env))) {
            var newrecord = state.slice();
            var init = state[/* journal */9];
            newrecord[/* journal */9] = /* record */[
              /* dayIndex */init[/* dayIndex */0],
              /* dayTransition : NoTransition */0,
              /* animationTime */init[/* animationTime */2],
              /* pageNumber */init[/* pageNumber */3]
            ];
            return newrecord;
          } else {
            var newrecord$1 = state.slice();
            var init$1 = state[/* journal */9];
            newrecord$1[/* journal */9] = /* record */[
              /* dayIndex */init$1[/* dayIndex */0],
              /* dayTransition */init$1[/* dayTransition */1],
              /* animationTime */1,
              /* pageNumber */init$1[/* pageNumber */3]
            ];
            return newrecord$1;
          }
      case 2 : 
      case 3 : 
          dayTransition = dayTransition$1;
          animationTime = match[/* animationTime */2];
          exit$$1 = 1;
          break;
      case 4 : 
          var animationTime$1 = match[/* animationTime */2];
          var match$1 = state[/* playerDead */22];
          fill$4(color(match$1 ? 255 : 0, 0, 0, remapf(animationTime$1, 0, 1.5, 0, 255) | 0), env);
          rect(/* tuple */[
                0,
                0
              ], width(env), height(env), env);
          var newrecord$2 = state.slice();
          var init$2$$1 = state[/* journal */9];
          newrecord$2[/* journal */9] = /* record */[
            /* dayIndex */init$2$$1[/* dayIndex */0],
            /* dayTransition */init$2$$1[/* dayTransition */1],
            /* animationTime */animationTime$1 + deltaTime(env),
            /* pageNumber */init$2$$1[/* pageNumber */3]
          ];
          return newrecord$2;
      case 5 : 
          var animationTime$2 = match[/* animationTime */2];
          fill$4(color(0, 0, 0, remapf(animationTime$2, 0, 1.5, 255, 0) | 0), env);
          rect(/* tuple */[
                0,
                0
              ], width(env), height(env), env);
          var newrecord$3 = state.slice();
          var init$3 = state[/* journal */9];
          newrecord$3[/* journal */9] = /* record */[
            /* dayIndex */init$3[/* dayIndex */0],
            /* dayTransition */init$3[/* dayTransition */1],
            /* animationTime */animationTime$2 + deltaTime(env),
            /* pageNumber */init$3[/* pageNumber */3]
          ];
          return newrecord$3;
      
    }
    if (exit$$1 === 1) {
      fill$4(color(0, 0, 0, 255), env);
      rect(/* tuple */[
            0,
            0
          ], width(env), height(env), env);
      pushStyle(env);
      var match$2 = dayTransition === /* JournalIn */2 ? /* tuple */[
          0,
          255
        ] : /* tuple */[
          255,
          0
        ];
      tint(color(255, 255, 255, constrain(remapf(animationTime, 0, 1.5, match$2[0], match$2[1]), 0, 255) | 0), env);
      renderJournal(state, env);
      popStyle(env);
      if (animationTime > 1.5 && dayTransition === /* FadeOut */4) {
        var newrecord$4 = state.slice();
        var init$4 = state[/* journal */9];
        newrecord$4[/* journal */9] = /* record */[
          /* dayIndex */init$4[/* dayIndex */0],
          /* dayTransition : NoTransition */0,
          /* animationTime */0,
          /* pageNumber */init$4[/* pageNumber */3]
        ];
        return newrecord$4;
      } else {
        var newrecord$5 = state.slice();
        var init$5 = state[/* journal */9];
        newrecord$5[/* journal */9] = /* record */[
          /* dayIndex */init$5[/* dayIndex */0],
          /* dayTransition */init$5[/* dayTransition */1],
          /* animationTime */animationTime + deltaTime(env),
          /* pageNumber */init$5[/* pageNumber */3]
        ];
        return newrecord$5;
      }
    }
    
  }

  function checkTasks(state, _) {
    if (state[/* journal */9][/* dayIndex */0] === 0) {
      var match = day1Stats(state);
      if (match.length !== 5) {
        return failwith("beeeen");
      } else {
        var pickUpEggs = match[0];
        var pickUpMilk = match[1];
        var emptyWaterTank = match[2];
        var cornNoAction = match[3];
        var plantSeed = match[4];
        if (pickUpEggs === 0 && pickUpMilk === 0 && emptyWaterTank === 0 && cornNoAction >= 2) {
          return +(plantSeed >= 1);
        } else {
          return /* false */0;
        }
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 1) {
      var match$1 = day2Stats(state);
      if (match$1.length !== 3) {
        return failwith("bennn");
      } else {
        var emptyWaterTank$1 = match$1[0];
        var emptyFoodTank = match$1[1];
        var cleanup = match$1[2];
        if (emptyWaterTank$1 === 0 && emptyFoodTank === 0) {
          return +(cleanup === 0);
        } else {
          return /* false */0;
        }
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 2) {
      var match$2 = day3Stats(state);
      if (match$2.length !== 1) {
        return failwith("Bennnnasd");
      } else {
        var brokenBarnDoor = match$2[0];
        return +(brokenBarnDoor === 0);
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 3) {
      var match$3 = day4Stats(state);
      if (match$3.length !== 2) {
        return failwith("NOoooo");
      } else {
        var cleanupBlood = match$3[1];
        return +(cleanupBlood === 0);
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 4) {
      var match$4 = day5Stats(state);
      if (match$4.length !== 2) {
        return failwith("Bennknkjj");
      } else {
        var inspectTombstone = match$4[0];
        var flowerTombstone = match$4[1];
        if (inspectTombstone === 0) {
          return +(flowerTombstone === 0);
        } else {
          return /* false */0;
        }
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 5) {
      var match$5 = day6Stats(state);
      if (match$5.length !== 1) {
        return failwith("lkjasdkj");
      } else {
        var areYouDoneOrNot = match$5[0];
        return +(areYouDoneOrNot === 1);
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 6) {
      var match$6 = day7Stats(state);
      if (match$6.length !== 7) {
        return failwith("fuck we're runn ing out of time");
      } else {
        var wateredCorn = match$6[0];
        var plantSeed$1 = match$6[1];
        var pickUpEggs$1 = match$6[2];
        var pickUpMilk$1 = match$6[3];
        var emptyWaterTank$2 = match$6[4];
        var emptyFoodTank$1 = match$6[5];
        var cleanup$1 = match$6[6];
        if (wateredCorn >= 3 && plantSeed$1 >= 1 && pickUpEggs$1 === 0 && pickUpMilk$1 === 0 && emptyWaterTank$2 === 0 && emptyFoodTank$1 === 0) {
          return +(cleanup$1 === 0);
        } else {
          return /* false */0;
        }
      }
    } else if (state[/* journal */9][/* dayIndex */0] === 7) {
      var match$7 = day8Stats(state);
      if (match$7.length !== 1) {
        return failwith("gosh darn ben");
      } else {
        var bossWithHunger = match$7[0];
        return +(bossWithHunger === 0);
      }
    } else {
      return /* boolean */0;
    }
  }
  /* Common Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function heuristic(curr, goal) {
    return dist$3(/* tuple */[
                curr[/* x */0],
                curr[/* y */1]
              ], /* tuple */[
                goal[/* x */0],
                goal[/* y */1]
              ]);
  }

  function heuristicVsPt(x, y, goal) {
    return dist$3(/* tuple */[
                x,
                y
              ], /* tuple */[
                goal[/* x */0],
                goal[/* y */1]
              ]);
  }

  function cartesian(l, l$prime) {
    return concat(map((function (e) {
                      return map((function (e$prime) {
                                    return /* tuple */[
                                            e,
                                            e$prime
                                          ];
                                  }), l$prime);
                    }), l));
  }

  var offsetHelper = /* :: */[
    0,
    /* :: */[
      -1,
      /* :: */[
        1,
        /* [] */0
      ]
    ]
  ];

  var product = cartesian(offsetHelper, offsetHelper);

  var neighborOffsets = filter((function (p) {
            return caml_notequal(p, /* tuple */[
                        0,
                        0
                      ]);
          }))(product);

  function neighbors(param, grid) {
    var y = param[/* y */1];
    var x = param[/* x */0];
    var allNeighbors = map((function (param) {
            return /* tuple */[
                    x + param[0] | 0,
                    y + param[1] | 0
                  ];
          }), neighborOffsets);
    var w = caml_array_get(grid, 0).length;
    var h = grid.length;
    return filter((function (param) {
                    var y = param[1];
                    var x = param[0];
                    if (x > 0 && x < w && y > 0 && y < h) {
                      return 1 - isCollidable(x, y, grid);
                    } else {
                      return /* false */0;
                    }
                  }))(allNeighbors);
  }

  function removeMin(goal, lst) {
    var y = goal[1];
    var x = goal[0];
    return fold_left((function (acc, p) {
                  var h = heuristicVsPt(x, y, p);
                  if (acc) {
                    var match = acc[0];
                    var rest = match[2];
                    var min = match[1];
                    var minh = match[0];
                    if (minh <= h) {
                      return /* Some */[/* tuple */[
                                minh,
                                min,
                                /* :: */[
                                  p,
                                  rest
                                ]
                              ]];
                    } else {
                      return /* Some */[/* tuple */[
                                h,
                                p,
                                /* :: */[
                                  min,
                                  rest
                                ]
                              ]];
                    }
                  } else {
                    return /* Some */[/* tuple */[
                              h,
                              p,
                              /* [] */0
                            ]];
                  }
                }), /* None */0, lst);
  }

  function updateAndCheckContainment(n, l) {
    var parent = n[/* parent */3];
    var y = n[/* y */1];
    var x = n[/* x */0];
    return fold_left((function (param, p) {
                  var rest = param[1];
                  if (p[/* x */0] === x && p[/* y */1] === y) {
                    var newCost;
                    if (parent) {
                      var parent$1 = parent[0];
                      newCost = parent$1[/* cost */2] + heuristic(parent$1, p);
                    } else {
                      newCost = 0;
                    }
                    var match = +(p[/* cost */2] < newCost);
                    return /* tuple */[
                            /* boolean */1,
                            /* :: */[
                              match ? p : /* record */[
                                  /* x */p[/* x */0],
                                  /* y */p[/* y */1],
                                  /* cost */newCost,
                                  /* parent */parent
                                ],
                              rest
                            ]
                          ];
                  } else {
                    return /* tuple */[
                            param[0],
                            /* :: */[
                              p,
                              rest
                            ]
                          ];
                  }
                }), /* tuple */[
                /* boolean */0,
                /* [] */0
              ], l);
  }

  function addIfNotInLists(x, y, parent, ol, cl) {
    var candidate_002 = /* cost */parent[/* cost */2] + heuristicVsPt(x, y, parent);
    var candidate_003 = /* parent : Some */[parent];
    var candidate = /* record */[
      /* x */x,
      /* y */y,
      candidate_002,
      candidate_003
    ];
    var match = updateAndCheckContainment(candidate, ol);
    var ol$1 = match[1];
    var match$1 = updateAndCheckContainment(candidate, cl);
    var cl$1 = match$1[1];
    if (match[0] || match$1[0]) {
      return /* tuple */[
              ol$1,
              cl$1
            ];
    } else {
      return /* tuple */[
              /* :: */[
                candidate,
                ol$1
              ],
              cl$1
            ];
    }
  }

  function getPathHelper(_ol, _cl, goal, grid) {
    while(true) {
      var cl = _cl;
      var ol = _ol;
      var match = removeMin(goal, ol);
      if (match) {
        var match$1 = match[0];
        var p = match$1[1];
        if (p[/* x */0] === goal[0] && p[/* y */1] === goal[1]) {
          return /* Some */[p];
        } else {
          var match$2 = fold_left((function(p){
              return function (param, param$1) {
                return addIfNotInLists(param$1[0], param$1[1], p, param[0], param[1]);
              }
              }(p)), /* tuple */[
                match$1[2],
                cl
              ], neighbors(p, grid));
          _cl = /* :: */[
            p,
            match$2[1]
          ];
          _ol = match$2[0];
          continue ;
        }
      } else {
        return /* None */0;
      }
    }}

  function constructPathList(_goal, _acc) {
    while(true) {
      var acc = _acc;
      var goal = _goal;
      var match = goal[/* parent */3];
      if (match) {
        var n = match[0];
        _acc = /* :: */[
          /* tuple */[
            n[/* x */0],
            n[/* y */1]
          ],
          acc
        ];
        _goal = n;
        continue ;
      } else {
        return acc;
      }
    }}

  function getPath$1(param, goal, grid) {
    var match = getPathHelper(/* :: */[
          /* record */[
            /* x */param[0],
            /* y */param[1],
            /* cost */0,
            /* parent : None */0
          ],
          /* [] */0
        ], /* [] */0, goal, grid);
    if (match) {
      var goal$1 = match[0];
      return /* Some */[constructPathList(goal$1, /* :: */[
                    /* tuple */[
                      goal$1[/* x */0],
                      goal$1[/* y */1]
                    ],
                    /* [] */0
                  ])];
    } else {
      return /* None */0;
    }
  }
  /* product Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function init$6(grid) {
    var match = fold_left$1((function (param, col) {
            var x = param[0];
            var match = fold_left$1((function (param, tile) {
                    var gameobjects = param[1];
                    var y = param[0];
                    var tmp;
                    if (typeof tile === "number") {
                      switch (tile) {
                        case 0 : 
                            var switcher = x - 17 | 0;
                            var tmp$1;
                            if (switcher > 4 || switcher < 0) {
                              tmp$1 = /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : PlantSeed */5,
                                /* state : Corn */__(0, [-1])
                              ];
                            } else {
                              switch (switcher) {
                                case 0 : 
                                    tmp$1 = /* record */[
                                      /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                      /* action : PlantSeed */5,
                                      /* state : Corn */__(0, [-1])
                                    ];
                                    break;
                                case 1 : 
                                    tmp$1 = /* record */[
                                      /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                      /* action : WaterCorn */2,
                                      /* state : Corn */__(0, [1])
                                    ];
                                    break;
                                case 2 : 
                                    tmp$1 = /* record */[
                                      /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                      /* action : WaterCorn */2,
                                      /* state : Corn */__(0, [2])
                                    ];
                                    break;
                                case 3 : 
                                    tmp$1 = /* record */[
                                      /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                      /* action : WaterCorn */2,
                                      /* state : Corn */__(0, [3])
                                    ];
                                    break;
                                case 4 : 
                                    tmp$1 = /* record */[
                                      /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                      /* action : WaterCorn */2,
                                      /* state : Corn */__(0, [4])
                                    ];
                                    break;
                                
                              }
                            }
                            tmp = /* :: */[
                              tmp$1,
                              gameobjects
                            ];
                            break;
                        case 2 : 
                            tmp = /* :: */[
                              /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : PickUp */[/* Water */1],
                                /* state : NoState */2
                              ],
                              gameobjects
                            ];
                            break;
                        case 1 : 
                        case 3 : 
                            tmp = gameobjects;
                            break;
                        case 4 : 
                            tmp = /* :: */[
                              /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : PickUp */[/* Seed */0],
                                /* state : IsASeedBin */0
                              ],
                              gameobjects
                            ];
                            break;
                        case 5 : 
                            tmp = /* :: */[
                              /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : WaterAnimals */3,
                                /* state : WaterTank */__(2, [/* Empty */2])
                              ],
                              gameobjects
                            ];
                            break;
                        case 6 : 
                            tmp = /* :: */[
                              /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : FeedAnimals */4,
                                /* state : FoodTank */__(3, [/* Empty */2])
                              ],
                              gameobjects
                            ];
                            break;
                        case 7 : 
                            tmp = /* :: */[
                              /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : NoAction */12,
                                /* state : HayBale */1
                              ],
                              gameobjects
                            ];
                            break;
                        case 8 : 
                            tmp = /* :: */[
                              /* record */[
                                /* pos */posMake(imul(x, tileSize) + (tileSize / 2 | 0) | 0, imul(y, tileSize) + (tileSize / 2 | 0) | 0),
                                /* action : Sell */8,
                                /* state : NoState */2
                              ],
                              gameobjects
                            ];
                            break;
                        
                      }
                    } else {
                      tmp = gameobjects;
                    }
                    return /* tuple */[
                            y + 1 | 0,
                            tmp
                          ];
                  }), /* tuple */[
                  0,
                  param[1]
                ], col);
            return /* tuple */[
                    x + 1 | 0,
                    match[1]
                  ];
          }), /* tuple */[
          0,
          /* [] */0
        ], grid);
    return addChick(addChick(addChick(addChick(addChick(addChick(/* :: */[
                                    /* record */[
                                      /* pos : record */[
                                        /* x */9 * tileSizef,
                                        /* y */18 * tileSizef
                                      ],
                                      /* action : PickUp */[/* Egg */3],
                                      /* state : NoState */2
                                    ],
                                    /* :: */[
                                      /* record */[
                                        /* pos : record */[
                                          /* x */tileSizef * 16.8,
                                          /* y */tileSizef * 10
                                        ],
                                        /* action : GoToBed */10,
                                        /* state : NoState */2
                                      ],
                                      /* :: */[
                                        /* record */[
                                          /* pos : record */[
                                            /* x */9 * tileSizef,
                                            /* y */5 * tileSizef
                                          ],
                                          /* action : InspectTombstone */11,
                                          /* state : Tombstone */__(8, [/* boolean */0])
                                        ],
                                        /* :: */[
                                          /* record */[
                                            /* pos : record */[
                                              /* x */tileSizef * 10,
                                              /* y */tileSizef * 17
                                            ],
                                            /* action : NoAction */12,
                                            /* state : BarnDoor */__(7, [/* Broken */0])
                                          ],
                                          /* :: */[
                                            /* record */[
                                              /* pos : record */[
                                                /* x */13 * tileSizef,
                                                /* y */8 * tileSizef
                                              ],
                                              /* action : NoAction */12,
                                              /* state : AxeStanding */3
                                            ],
                                            /* :: */[
                                              /* record */[
                                                /* pos : record */[
                                                  /* x */6 * tileSizef,
                                                  /* y */17 * tileSizef
                                                ],
                                                /* action : PickUp */[/* Milk */2],
                                                /* state : Cow */__(1, [/* record */[
                                                      /* momentum : record */[
                                                        /* x */0,
                                                        /* y */0
                                                      ],
                                                      /* health */4
                                                    ]])
                                              ],
                                              /* :: */[
                                                /* record */[
                                                  /* pos : record */[
                                                    /* x */9 * tileSizef,
                                                    /* y */18 * tileSizef
                                                  ],
                                                  /* action : NoAction */12,
                                                  /* state : Chicken */__(4, [/* record */[
                                                        /* momentum : record */[
                                                          /* x */0,
                                                          /* y */0
                                                        ],
                                                        /* health */1,
                                                        /* willDie : boolean */0
                                                      ]])
                                                ],
                                                /* :: */[
                                                  /* record */[
                                                    /* pos : record */[
                                                      /* x */9 * tileSizef,
                                                      /* y */15 * tileSizef
                                                    ],
                                                    /* action : NoAction */12,
                                                    /* state : Chicken */__(4, [/* record */[
                                                          /* momentum : record */[
                                                            /* x */0,
                                                            /* y */0
                                                          ],
                                                          /* health */1,
                                                          /* willDie : boolean */1
                                                        ]])
                                                  ],
                                                  match[1]
                                                ]
                                              ]
                                            ]
                                          ]
                                        ]
                                      ]
                                    ]
                                  ]))))));
  }

  function maybeHighlight(state, g, focusedObject, env) {
    if (focusedObject) {
      var fgo = focusedObject[0];
      if (fgo === g) {
        var match = state[/* currentItem */7];
        var match$1 = fgo[/* action */1];
        var exit$$1 = 0;
        if (match) {
          switch (match[0]) {
            case 0 : 
                if (typeof match$1 === "number" && match$1 === 5) {
                  exit$$1 = 1;
                } else {
                  return /* () */0;
                }
                break;
            case 1 : 
                if (typeof match$1 === "number" && (match$1 === 3 || match$1 === 2)) {
                  exit$$1 = 1;
                } else {
                  return /* () */0;
                }
                break;
            case 4 : 
                if (typeof match$1 === "number" && match$1 === 4) {
                  exit$$1 = 1;
                } else {
                  return /* () */0;
                }
                break;
            case 2 : 
            case 3 : 
            case 5 : 
            case 6 : 
            case 7 : 
                return /* () */0;
            
          }
        } else if (typeof match$1 === "number" || match$1[0] !== 4) {
          return /* () */0;
        } else {
          exit$$1 = 1;
        }
        if (exit$$1 === 1) {
          fill$4(color(150, 150, 40, 100), env);
          return rectf(/* tuple */[
                      g[/* pos */0][/* x */0] - tileSizef / 2,
                      g[/* pos */0][/* y */1] - tileSizef / 2
                    ], tileSizef, tileSizef, env);
        }
        
      } else {
        return /* () */0;
      }
    } else {
      return /* () */0;
    }
  }

  function moveAnimal(state, mx, my, speed, pos, grid, env) {
    var mx$1 = constrain(mx + $$float$1(4) - 2, -5 * speed, 5 * speed);
    var my$1 = constrain(my + $$float$1(4) - 2, -5 * speed, 5 * speed);
    var dt = deltaTime(env);
    var offset = handleCollision(state, /* record */[
          /* x */0,
          /* y */0
        ], /* record */[
          /* x */dt * mx$1,
          /* y */dt * my$1
        ], pos, grid);
    return /* tuple */[
            /* record */[
              /* x */pos[/* x */0] + offset[/* x */0],
              /* y */pos[/* y */1] + offset[/* y */1]
            ],
            mx$1,
            my$1
          ];
  }

  function update(state, env) {
    var hackRefPlayerDead = [/* boolean */0];
    var gameobjects = map((function (g) {
            var match = g[/* state */2];
            var pos = g[/* pos */0];
            var by = pos[/* y */1];
            var bx = pos[/* x */0];
            if (typeof match === "number") {
              return g;
            } else {
              switch (match.tag | 0) {
                case 1 : 
                    var cow = match[0];
                    if (cow[/* health */1] > 0) {
                      var match$1 = cow[/* momentum */0];
                      var match$2 = moveAnimal(state, match$1[/* x */0], match$1[/* y */1], 1, pos, state[/* grid */0], env);
                      return /* record */[
                              /* pos */match$2[0],
                              /* action */g[/* action */1],
                              /* state : Cow */__(1, [/* record */[
                                    /* momentum : record */[
                                      /* x */match$2[1],
                                      /* y */match$2[2]
                                    ],
                                    /* health */cow[/* health */1]
                                  ]])
                            ];
                    } else {
                      return g;
                    }
                case 4 : 
                    var chicken = match[0];
                    if (chicken[/* health */1] > 0) {
                      var match$3 = chicken[/* momentum */0];
                      var match$4 = moveAnimal(state, match$3[/* x */0], match$3[/* y */1], 2, pos, state[/* grid */0], env);
                      return /* record */[
                              /* pos */match$4[0],
                              /* action */g[/* action */1],
                              /* state : Chicken */__(4, [/* record */[
                                    /* momentum : record */[
                                      /* x */match$4[1],
                                      /* y */match$4[2]
                                    ],
                                    /* health */chicken[/* health */1],
                                    /* willDie */chicken[/* willDie */2]
                                  ]])
                            ];
                    } else {
                      return g;
                    }
                case 5 : 
                    var bossState = match[0];
                    var eating = bossState[/* eating */5];
                    var eatingTime = bossState[/* eatingTime */3];
                    var movingTime = bossState[/* movingTime */1];
                    var match$5 = bossState[/* movePair */0];
                    var dest = match$5[1];
                    var start = match$5[0];
                    if (movingTime > 0) {
                      return /* record */[
                              /* pos : record */[
                                /* x */remapf(movingTime, 0.35, 0, start[/* x */0], dest[/* x */0]),
                                /* y */remapf(movingTime, 0.35, 0, start[/* y */1], dest[/* y */1])
                              ],
                              /* action */g[/* action */1],
                              /* state : Boss */__(5, [/* record */[
                                    /* movePair */bossState[/* movePair */0],
                                    /* movingTime */movingTime - deltaTime(env),
                                    /* hunger */bossState[/* hunger */2],
                                    /* eatingTime */bossState[/* eatingTime */3],
                                    /* killed */bossState[/* killed */4],
                                    /* eating */bossState[/* eating */5]
                                  ]])
                            ];
                    } else if (state[/* day6CameraAnimation */18] > 0 || state[/* journal */9][/* dayTransition */1] === /* CheckJournal */1 || state[/* journal */9][/* dayTransition */1] === /* JournalIn */2 || bossState[/* hunger */2] === 0) {
                      return g;
                    } else if (eatingTime <= 0) {
                      var allNextTargets = filter((function (g) {
                                var match = g[/* state */2];
                                var exit$$1 = 0;
                                if (typeof match === "number") {
                                  return /* boolean */0;
                                } else {
                                  switch (match.tag | 0) {
                                    case 1 : 
                                    case 4 : 
                                    case 6 : 
                                        exit$$1 = 1;
                                        break;
                                    default:
                                      return /* boolean */0;
                                  }
                                }
                                if (exit$$1 === 1) {
                                  if (match[0][/* health */1] !== 0) {
                                    return /* boolean */0;
                                  } else {
                                    return /* boolean */1;
                                  }
                                }
                                
                              }))(state[/* gameobjects */8]);
                      var allNextTargets$1 = sort((function (param, param$1) {
                              var match = param$1[/* pos */0];
                              var match$1 = param[/* pos */0];
                              var dx1 = abs(match$1[/* x */0] - bx | 0);
                              var dy1 = abs(match$1[/* y */1] - by | 0);
                              var dx2 = abs(match[/* x */0] - bx | 0);
                              var dy2 = abs(match[/* y */1] - by | 0);
                              return ((dx1 + dy1 | 0) - dx2 | 0) - dy2 | 0;
                            }), allNextTargets);
                      var match$6 = allNextTargets$1 ? /* tuple */[
                          allNextTargets$1[0][/* pos */0],
                          /* boolean */0
                        ] : /* tuple */[
                          /* record */[
                            /* x */state[/* playerPos */2][/* x */0],
                            /* y */state[/* playerPos */2][/* y */1]
                          ],
                          /* boolean */1
                        ];
                      var isPlayer = match$6[1];
                      var nextTarget = match$6[0];
                      var dx = nextTarget[/* x */0] - bx;
                      var dy = nextTarget[/* y */1] - by;
                      var mag$$1 = magf(/* tuple */[
                            dx,
                            dy
                          ]);
                      var isTargetCloseEnough = +(mag$$1 < 32);
                      if (isTargetCloseEnough) {
                        console.log("CLOSE");
                      }
                      var match$7 = bossState[/* movePair */0];
                      var match$8 = match$7[1];
                      var by$1 = match$8[/* y */1];
                      var bx$1 = match$8[/* x */0];
                      var bossTile_000 = bx$1 / tileSizef | 0;
                      var bossTile_001 = by$1 / tileSizef | 0;
                      var bossTile = /* tuple */[
                        bossTile_000,
                        bossTile_001
                      ];
                      var currentTileX = Math.floor(nextTarget[/* x */0] / tileSizef) * tileSizef;
                      var currentTileY = Math.floor(nextTarget[/* y */1] / tileSizef) * tileSizef;
                      var belowCurrentTileY = currentTileY + tileSizef;
                      var belowRightCurrentTileX = currentTileX + tileSizef;
                      var belowRightCurrentTileY = currentTileY + tileSizef;
                      var rightCurrentTileX = currentTileX + tileSizef;
                      var currentTileArea = (currentTileX + tileSizef - nextTarget[/* x */0]) * (currentTileY + tileSizef - nextTarget[/* y */1]);
                      var belowCurrentTileArea = (currentTileX + tileSizef - nextTarget[/* x */0]) * (nextTarget[/* y */1] + tileSizef - belowCurrentTileY);
                      var belowRightCurrentTileArea = (nextTarget[/* x */0] + tileSizef - belowRightCurrentTileX) * (nextTarget[/* y */1] + tileSizef - belowRightCurrentTileY);
                      var rightCurrentTileArea = (nextTarget[/* x */0] + tileSizef - rightCurrentTileX) * (currentTileY + tileSizef - nextTarget[/* y */1]);
                      var targetTile = currentTileArea > belowCurrentTileArea && currentTileArea > belowRightCurrentTileArea && currentTileArea > rightCurrentTileArea ? /* tuple */[
                          currentTileX / tileSizef | 0,
                          currentTileY / tileSizef | 0
                        ] : (
                          belowCurrentTileArea > currentTileArea && belowCurrentTileArea > belowRightCurrentTileArea && belowCurrentTileArea > rightCurrentTileArea ? /* tuple */[
                              currentTileX / tileSizef | 0,
                              belowCurrentTileY / tileSizef | 0
                            ] : (
                              belowRightCurrentTileArea > currentTileArea && belowRightCurrentTileArea > belowCurrentTileArea && belowRightCurrentTileArea > rightCurrentTileArea ? /* tuple */[
                                  belowRightCurrentTileX / tileSizef | 0,
                                  belowRightCurrentTileY / tileSizef | 0
                                ] : /* tuple */[
                                  rightCurrentTileX / tileSizef | 0,
                                  currentTileY / tileSizef | 0
                                ]
                            )
                        );
                      var barnDoor = find((function (g) {
                              var tmp = g[/* state */2];
                              if (typeof tmp === "number" || tmp.tag !== 7) {
                                return /* boolean */0;
                              } else {
                                return /* boolean */1;
                              }
                            }), state[/* gameobjects */8]);
                      var match$9 = barnDoor[/* state */2];
                      var isBarnDoorClosed;
                      isBarnDoorClosed = typeof match$9 === "number" || !(match$9.tag === 7 && match$9[0] >= 2) ? /* boolean */0 : /* boolean */1;
                      var movePair;
                      if (isBarnDoorClosed) {
                        movePair = /* tuple */[
                          g[/* pos */0],
                          g[/* pos */0]
                        ];
                      } else {
                        var p = getPath$1(bossTile, targetTile, state[/* grid */0]);
                        var exit$$1 = 0;
                        if (p) {
                          var match$10 = p[0];
                          if (match$10) {
                            var match$11 = match$10[1];
                            if (match$11) {
                              var match$12 = match$11[0];
                              var match$13 = match$10[0];
                              movePair = /* tuple */[
                                /* record */[
                                  /* x */match$13[0] * tileSizef,
                                  /* y */match$13[1] * tileSizef
                                ],
                                /* record */[
                                  /* x */match$12[0] * tileSizef,
                                  /* y */match$12[1] * tileSizef
                                ]
                              ];
                            } else {
                              exit$$1 = 1;
                            }
                          } else {
                            exit$$1 = 1;
                          }
                        } else {
                          movePair = /* tuple */[
                            /* record */[
                              /* x */bx$1,
                              /* y */by$1
                            ],
                            /* record */[
                              /* x */bx$1,
                              /* y */by$1
                            ]
                          ];
                        }
                        if (exit$$1 === 1) {
                          movePair = /* tuple */[
                            /* record */[
                              /* x */bx$1,
                              /* y */by$1
                            ],
                            /* record */[
                              /* x */bx$1,
                              /* y */by$1
                            ]
                          ];
                        }
                        
                      }
                      hackRefPlayerDead[0] = isPlayer && isTargetCloseEnough;
                      var match$14 = isTargetCloseEnough && 1 - eating;
                      var match$15 = isTargetCloseEnough && 1 - isPlayer && eating;
                      return /* record */[
                              /* pos */g[/* pos */0],
                              /* action */g[/* action */1],
                              /* state : Boss */__(5, [/* record */[
                                    /* movePair */movePair,
                                    /* movingTime */0.35,
                                    /* hunger */bossState[/* hunger */2],
                                    /* eatingTime */match$14 ? 3 : 0,
                                    /* killed */match$15 ? /* :: */[
                                        hd(allNextTargets$1),
                                        bossState[/* killed */4]
                                      ] : bossState[/* killed */4],
                                    /* eating */isTargetCloseEnough && 1 - eating
                                  ]])
                            ];
                    } else {
                      return /* record */[
                              /* pos */g[/* pos */0],
                              /* action */g[/* action */1],
                              /* state : Boss */__(5, [/* record */[
                                    /* movePair */bossState[/* movePair */0],
                                    /* movingTime */bossState[/* movingTime */1],
                                    /* hunger */bossState[/* hunger */2],
                                    /* eatingTime */eatingTime - deltaTime(env),
                                    /* killed */bossState[/* killed */4],
                                    /* eating */bossState[/* eating */5]
                                  ]])
                            ];
                    }
                    break;
                case 6 : 
                    var chick = match[0];
                    if (chick[/* health */1] > 0) {
                      var match$16 = chick[/* momentum */0];
                      var match$17 = moveAnimal(state, match$16[/* x */0], match$16[/* y */1], 4, pos, state[/* grid */0], env);
                      return /* record */[
                              /* pos */match$17[0],
                              /* action */g[/* action */1],
                              /* state : Chick */__(6, [/* record */[
                                    /* momentum : record */[
                                      /* x */match$17[1],
                                      /* y */match$17[2]
                                    ],
                                    /* health */chick[/* health */1],
                                    /* willDie */chick[/* willDie */2]
                                  ]])
                            ];
                    } else {
                      return g;
                    }
                default:
                  return g;
              }
            }
          }), state[/* gameobjects */8]);
    if (hackRefPlayerDead[0]) {
      var gameobjects$1;
      try {
        find((function (g) {
                var match = g[/* state */2];
                if (typeof match === "number" && match >= 3) {
                  return /* boolean */1;
                } else {
                  return /* boolean */0;
                }
              }), gameobjects);
        gameobjects$1 = gameobjects;
      }
      catch (exn){
        if (exn === not_found) {
          gameobjects$1 = /* :: */[
            /* record */[
              /* pos : record */[
                /* x */13 * tileSizef,
                /* y */8 * tileSizef
              ],
              /* action : PickUp */[/* Axe */6],
              /* state : AxeStanding */3
            ],
            gameobjects
          ];
        } else {
          throw exn;
        }
      }
      var newrecord = state.slice();
      newrecord[/* gameobjects */8] = gameobjects$1;
      var init = state[/* journal */9];
      newrecord[/* journal */9] = /* record */[
        /* dayIndex */state[/* journal */9][/* dayIndex */0] - 1 | 0,
        /* dayTransition : FadeOut */4,
        /* animationTime */0,
        /* pageNumber */init[/* pageNumber */3]
      ];
      newrecord[/* playerDead */22] = /* boolean */1;
      return newrecord;
    } else {
      var newrecord$1 = state.slice();
      newrecord$1[/* gameobjects */8] = gameobjects;
      return newrecord$1;
    }
  }

  function renderBefore(g, focusedObject, state, env) {
    pushStyle(env);
    var action = g[/* action */1];
    var match = g[/* pos */0];
    var y = match[/* y */1];
    var x = match[/* x */0];
    var exit$$1 = 0;
    var exit$1 = 0;
    if (typeof action === "number") {
      if (action >= 12) {
        var match$1 = g[/* state */2];
        var exit$2 = 0;
        if (typeof match$1 !== "number") {
          switch (match$1.tag | 0) {
            case 0 : 
                exit$1 = 2;
                break;
            case 1 : 
            case 4 : 
                exit$2 = 3;
                break;
            case 6 : 
                var health = match$1[0][/* health */1];
                if (health === -1) {
                  drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "blood_puddle.png", state, env);
                } else if (health === 0) {
                  drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "dead_chick.png", state, env);
                } else {
                  drawAssetf(x - tileSizef / 4, y - tileSizef / 4, "chick.png", state, env);
                }
                break;
            default:
              
          }
        }
        if (exit$2 === 3) {
          if (match$1[0][/* health */1] === -1) {
            drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "blood_puddle.png", state, env);
          }
          
        }
        
      } else {
        exit$1 = 2;
      }
    } else if (action[0] !== 4) {
      exit$1 = 2;
    } else {
      drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "dry_mud.png", state, env);
      maybeHighlight(state, g, focusedObject, env);
    }
    if (exit$1 === 2) {
      var match$2 = g[/* state */2];
      if (typeof match$2 === "number" || match$2.tag) {
        exit$$1 = 1;
      } else {
        var stage = match$2[0];
        if (stage >= 0) {
          if (stage >= 6) {
            exit$$1 = 1;
          } else {
            if (action === /* NoAction */12) {
              drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "dry_mud.png", state, env);
            }
            maybeHighlight(state, g, focusedObject, env);
            if (stage === 0) {
              drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "stage_zero_corn_fetus.png", state, env);
            } else if (stage === 1) {
              drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "stage_one_corn_toddler.png", state, env);
            }
            
          }
        } else if (stage >= -1) {
          maybeHighlight(state, g, focusedObject, env);
        } else {
          exit$$1 = 1;
        }
      }
    }
    if (exit$$1 === 1) {
      if (typeof action === "number") {
        if (action !== 1) {
          if (action !== 0) ; else {
            drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "poo.png", state, env);
          }
        } else {
          drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "blood_splatter.png", state, env);
        }
      }
      
    }
    return popStyle(env);
  }

  function renderObject(g, playerInBarn, playerBehindBarn, focusedObject, state, env) {
    var exit$$1 = 0;
    var x;
    var y;
    var health;
    var match = g[/* action */1];
    var match$1 = g[/* pos */0];
    var y$1 = match$1[/* y */1];
    var x$1 = match$1[/* x */0];
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    var exit$4 = 0;
    var exit$5 = 0;
    if (typeof match === "number") {
      if (match >= 12) {
        var match$2 = g[/* state */2];
        if (typeof match$2 === "number") {
          switch (match$2) {
            case 0 : 
            case 2 : 
                return /* () */0;
            case 3 : 
                exit$1 = 2;
                break;
            default:
              exit$3 = 4;
          }
        } else {
          switch (match$2.tag | 0) {
            case 1 : 
                x = x$1;
                y = y$1;
                health = match$2[0][/* health */1];
                exit$$1 = 1;
                break;
            case 4 : 
                var health$1 = match$2[0][/* health */1];
                if (health$1 === 0) {
                  return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "dead_chicken.png", state, env);
                } else if (health$1 > 0) {
                  return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "bet_he_would_make_some_nice_fried_chicken.png", state, env);
                } else {
                  return 0;
                }
            case 5 : 
                exit$1 = 2;
                break;
            case 6 : 
                return /* () */0;
            case 7 : 
            case 8 : 
                exit$5 = 6;
                break;
            default:
              exit$3 = 4;
          }
        }
      } else {
        exit$5 = 6;
      }
    } else {
      var match$3 = match[0];
      if (match$3 !== 2) {
        if (match$3 >= 7) {
          return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "bouquet_of_flowers.png", state, env);
        } else {
          exit$5 = 6;
        }
      } else {
        var match$4 = g[/* state */2];
        if (typeof match$4 === "number") {
          switch (match$4) {
            case 0 : 
            case 2 : 
                return /* () */0;
            case 3 : 
                exit$1 = 2;
                break;
            default:
              exit$3 = 4;
          }
        } else {
          switch (match$4.tag | 0) {
            case 1 : 
                x = x$1;
                y = y$1;
                health = match$4[0][/* health */1];
                exit$$1 = 1;
                break;
            case 5 : 
                exit$1 = 2;
                break;
            case 4 : 
            case 6 : 
                return /* () */0;
            case 7 : 
            case 8 : 
                exit$5 = 6;
                break;
            default:
              exit$3 = 4;
          }
        }
      }
    }
    if (exit$5 === 6) {
      var match$5 = g[/* state */2];
      if (typeof match$5 === "number") {
        exit$4 = 5;
      } else {
        switch (match$5.tag | 0) {
          case 7 : 
              if (playerInBarn) {
                exit$4 = 5;
              } else {
                var match$6;
                if (state[/* journal */9][/* dayIndex */0] === 5) {
                  var match$7 = fold_left((function (param, g) {
                          var match = g[/* state */2];
                          var isBarnDoorClosed = param[1];
                          var isMonsterInBarn = param[0];
                          if (typeof match === "number") {
                            return /* tuple */[
                                    isMonsterInBarn,
                                    isBarnDoorClosed
                                  ];
                          } else {
                            switch (match.tag | 0) {
                              case 5 : 
                                  return /* tuple */[
                                          checkIfInBarn(g[/* pos */0]),
                                          isBarnDoorClosed
                                        ];
                              case 7 : 
                                  if (match[0] >= 2) {
                                    return /* tuple */[
                                            isMonsterInBarn,
                                            /* boolean */1
                                          ];
                                  } else {
                                    return /* tuple */[
                                            isMonsterInBarn,
                                            isBarnDoorClosed
                                          ];
                                  }
                              default:
                                return /* tuple */[
                                        isMonsterInBarn,
                                        isBarnDoorClosed
                                      ];
                            }
                          }
                        }), /* tuple */[
                        /* boolean */0,
                        /* boolean */0
                      ], state[/* gameobjects */8]);
                  match$6 = match$7[0] && match$7[1] ? /* tuple */[
                      x$1 - 2 * noise(x$1, 1, state[/* time */11] * 10) + 1,
                      y$1 - 2 * noise(x$1, 2, state[/* time */11] * 10) + 1
                    ] : /* tuple */[
                      x$1,
                      y$1
                    ];
                } else {
                  match$6 = /* tuple */[
                    x$1,
                    y$1
                  ];
                }
                var y$2 = match$6[1];
                var x$2 = match$6[0];
                if (match$5[0] === /* Broken */0) {
                  return drawAssetf(x$2 - tileSizef / 2, y$2 - 2 * tileSizef - tileSizef / 2, "barn_door_broken.png", state, env);
                } else {
                  return drawAssetf(x$2 - tileSizef / 2, y$2 - 2 * tileSizef - tileSizef / 2, "barn_door.png", state, env);
                }
              }
              break;
          case 8 : 
              if (playerBehindBarn) {
                if (match$5[0]) {
                  return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "tombstone_with_flowers.png", state, env);
                } else {
                  return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "tombstone.png", state, env);
                }
              } else {
                exit$4 = 5;
              }
              break;
          default:
            exit$4 = 5;
        }
      }
    }
    if (exit$4 === 5) {
      if (typeof match === "number") {
        if (match >= 12) {
          return /* () */0;
        } else {
          exit$3 = 4;
        }
      } else {
        var match$8 = match[0];
        if (match$8 >= 3) {
          exit$3 = 4;
        } else {
          switch (match$8) {
            case 0 : 
                return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "seed_bucket.png", state, env);
            case 1 : 
                exit$3 = 4;
                break;
            case 2 : 
                return /* () */0;
            
          }
        }
      }
    }
    if (exit$3 === 4) {
      var match$9 = g[/* state */2];
      if (typeof match$9 === "number") {
        if (match$9 === 1) {
          return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "hay_bale.png", state, env);
        } else {
          exit$2 = 3;
        }
      } else {
        switch (match$9.tag | 0) {
          case 0 : 
              var stage = match$9[0];
              if (stage > 5 || stage < 2) {
                exit$2 = 3;
              } else {
                var switcher = stage - 2 | 0;
                var assetName;
                if (switcher > 3 || switcher < 0) {
                  assetName = failwith("There is no other stage.");
                } else {
                  switch (switcher) {
                    case 0 : 
                        assetName = "stage_two_korn.png";
                        break;
                    case 1 : 
                        assetName = "stage_three_middle_aged_corn.png";
                        break;
                    case 2 : 
                        assetName = "stage_four_almost_corn.png";
                        break;
                    case 3 : 
                        assetName = "stage_five_le_ble_d_inde.png";
                        break;
                    
                  }
                }
                return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, assetName, state, env);
              }
              break;
          case 2 : 
              var assetName$1;
              switch (match$9[0]) {
                case 0 : 
                    assetName$1 = "trough_water_half_full.png";
                    break;
                case 1 : 
                    assetName$1 = "trough_water_full.png";
                    break;
                case 2 : 
                    assetName$1 = "trough_empty_water.png";
                    break;
                
              }
              drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, assetName$1, state, env);
              drawAssetf(x$1 + tileSizef / 2, y$1 - tileSizef / 2, "water_trough_sign.png", state, env);
              return maybeHighlight(state, g, focusedObject, env);
          case 3 : 
              var assetName$2;
              switch (match$9[0]) {
                case 0 : 
                    assetName$2 = "trough_food_half_full.png";
                    break;
                case 1 : 
                    assetName$2 = "trough_food_full.png";
                    break;
                case 2 : 
                    assetName$2 = "trough_empty.png";
                    break;
                
              }
              drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, assetName$2, state, env);
              drawAssetf(x$1 + tileSizef / 2, y$1 - tileSizef / 2, "corn_trough_sign.png", state, env);
              return maybeHighlight(state, g, focusedObject, env);
          default:
            exit$2 = 3;
        }
      }
    }
    if (exit$2 === 3) {
      if (typeof match === "number") {
        if (match >= 12) {
          return /* () */0;
        } else {
          exit$1 = 2;
        }
      } else {
        var match$10 = match[0];
        if (match$10 >= 4) {
          exit$1 = 2;
        } else {
          switch (match$10 - 1 | 0) {
            case 0 : 
                exit$1 = 2;
                break;
            case 1 : 
                return /* () */0;
            case 2 : 
                return drawAssetf(x$1 - tileSizef / 2, y$1 - tileSizef / 2, "egg.png", state, env);
            
          }
        }
      }
    }
    if (exit$1 === 2) {
      var match$11 = g[/* state */2];
      if (typeof match$11 === "number") {
        if (match$11 === 3) {
          return drawAssetf(x$1 - tileSizef, y$1, "axe_standing.png", state, env);
        } else {
          return /* () */0;
        }
      } else if (match$11.tag === 5) {
        var match$12 = match$11[0];
        var match$13 = match$12[/* movePair */0];
        var match$14 = match$13[1];
        var y2 = match$14[/* y */1];
        var x2 = match$14[/* x */0];
        var match$15 = match$13[0];
        var y1 = match$15[/* y */1];
        var x1 = match$15[/* x */0];
        var facing = x1 > x2 ? /* LeftD */3 : (
            x1 < x2 ? /* RightD */2 : (
                y1 < y2 ? /* DownD */1 : /* UpD */0
              )
          );
        if (match$12[/* hunger */2] === 0) {
          return image(state[/* sleepingMonsterAsset */20], /* tuple */[
                      x$1 | 0,
                      y$1 - tileSizef | 0
                    ], /* Some */[32], /* Some */[66], env);
        } else {
          var img;
          if (state[/* day6CameraAnimation */18] > 0.2) {
            img = "monster_mouth_closed.png";
          } else {
            var match$16 = +(x1 === x2 && y1 === y2);
            var match$17 = +(match$12[/* eatingTime */3] > 0);
            var match$18 = (state[/* time */11] / 0.2 | 0) % 4;
            var exit$6 = 0;
            if (match$17) {
              if (match$18 > 2 || match$18 < 0) {
                if (match$18 !== 3) {
                  exit$6 = 3;
                } else {
                  img = "monster_gory_eating_two.png";
                }
              } else {
                img = match$18 !== 1 ? "monster_gory_eating.png" : "monster_gory_eating_two.png";
              }
            } else {
              exit$6 = 3;
            }
            if (exit$6 === 3) {
              if (match$16) {
                img = "monster_mouth_open.png";
              } else {
                switch (facing) {
                  case 0 : 
                      if (match$18 > 0) {
                        if (match$18 >= 4) {
                          img = "egg.png";
                        } else {
                          switch (match$18 - 1 | 0) {
                            case 0 : 
                                img = "monster_back_face_walk_one.png";
                                break;
                            case 1 : 
                                img = "monster_back_face.png";
                                break;
                            case 2 : 
                                img = "monster_back_face_walk_two.png";
                                break;
                            
                          }
                        }
                      } else {
                        img = match$18 >= 0 ? "monster_back_face.png" : "egg.png";
                      }
                      break;
                  case 1 : 
                      if (match$18 > 0) {
                        if (match$18 >= 4) {
                          img = "egg.png";
                        } else {
                          switch (match$18 - 1 | 0) {
                            case 0 : 
                                img = "monster_front_face_walk_one.png";
                                break;
                            case 1 : 
                                img = "monster_mouth_open.png";
                                break;
                            case 2 : 
                                img = "monster_front_face_walk_two.png";
                                break;
                            
                          }
                        }
                      } else {
                        img = match$18 >= 0 ? "monster_mouth_open.png" : "egg.png";
                      }
                      break;
                  case 2 : 
                      if (match$18 > 0) {
                        if (match$18 >= 4) {
                          img = "egg.png";
                        } else {
                          switch (match$18 - 1 | 0) {
                            case 0 : 
                                img = "monster_right_face_walk_one.png";
                                break;
                            case 1 : 
                                img = "monster_right_face.png";
                                break;
                            case 2 : 
                                img = "monster_right_face_walk_two.png";
                                break;
                            
                          }
                        }
                      } else {
                        img = match$18 >= 0 ? "monster_right_face.png" : "egg.png";
                      }
                      break;
                  case 3 : 
                      if (match$18 > 0) {
                        if (match$18 >= 4) {
                          img = "egg.png";
                        } else {
                          switch (match$18 - 1 | 0) {
                            case 0 : 
                                img = "monster_left_face_walk_one.png";
                                break;
                            case 1 : 
                                img = "monster_left_face.png";
                                break;
                            case 2 : 
                                img = "monster_left_face_walk_two.png";
                                break;
                            
                          }
                        }
                      } else {
                        img = match$18 >= 0 ? "monster_left_face.png" : "egg.png";
                      }
                      break;
                  
                }
              }
            }
            
          }
          return drawAssetf(x$1, y$1 - tileSizef, img, state, env);
        }
      } else {
        return /* () */0;
      }
    }
    if (exit$$1 === 1) {
      if (health === 0) {
        return drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "dead_cown.png", state, env);
      } else if (health > 0) {
        return drawAssetf(x - tileSizef / 2, y - tileSizef / 2, "pile_of_bacon.png", state, env);
      } else {
        return 0;
      }
    }
    
  }

  function renderAction(state, playerInBarn, finishedAllTasks, focusedObject, env) {
    var tutorial = state[/* hasPressedTheActionKeyOnce */21] ? "" : " (Press X or SPACE)";
    var match = state[/* currentItem */7];
    var body;
    var exit$$1 = 0;
    if (match) {
      switch (match[0]) {
        case 0 : 
            if (focusedObject) {
              var match$1 = focusedObject[0][/* action */1];
              if (typeof match$1 === "number") {
                if (match$1 !== 5) {
                  exit$$1 = 1;
                } else {
                  body = "Plant seed";
                }
              } else if (match$1[0] !== 0) {
                exit$$1 = 1;
              } else {
                body = "Put seed back";
              }
            } else {
              exit$$1 = 1;
            }
            break;
        case 1 : 
            if (focusedObject) {
              var match$2 = focusedObject[0][/* action */1];
              if (typeof match$2 === "number") {
                switch (match$2) {
                  case 0 : 
                      body = "Cleanup mess";
                      break;
                  case 1 : 
                      body = "Cleanup blood";
                      break;
                  case 2 : 
                      body = "Water corn";
                      break;
                  case 3 : 
                      body = "Water animals";
                      break;
                  case 4 : 
                  case 5 : 
                  case 6 : 
                  case 7 : 
                  case 8 : 
                  case 9 : 
                  case 10 : 
                  case 11 : 
                  case 12 : 
                      exit$$1 = 1;
                      break;
                  
                }
              } else if (match$2[0] !== 1) {
                exit$$1 = 1;
              } else {
                body = "Put water back";
              }
            } else {
              exit$$1 = 1;
            }
            break;
        case 2 : 
            if (focusedObject) {
              var match$3 = focusedObject[0][/* action */1];
              if (typeof match$3 === "number" && match$3 === 8) {
                body = "Sell milk";
              } else {
                exit$$1 = 1;
              }
            } else {
              exit$$1 = 1;
            }
            break;
        case 3 : 
            if (focusedObject) {
              var match$4 = focusedObject[0][/* action */1];
              if (typeof match$4 === "number" && match$4 === 8) {
                body = "Sell egg";
              } else {
                exit$$1 = 1;
              }
            } else {
              exit$$1 = 1;
            }
            break;
        case 4 : 
            if (focusedObject) {
              var match$5 = focusedObject[0][/* action */1];
              if (typeof match$5 === "number") {
                if (match$5 !== 4) {
                  exit$$1 = 1;
                } else {
                  body = "Feed animals";
                }
              } else if (match$5[0] !== 1) {
                exit$$1 = 1;
              } else {
                body = "";
              }
            } else {
              exit$$1 = 1;
            }
            break;
        case 6 : 
            if (focusedObject) {
              var match$6 = focusedObject[0][/* state */2];
              var exit$1 = 0;
              if (typeof match$6 === "number") {
                exit$$1 = 1;
              } else {
                switch (match$6.tag | 0) {
                  case 5 : 
                      if (match$6[0][/* hunger */2] !== 0) {
                        exit$$1 = 1;
                      } else {
                        body = "End this all";
                      }
                      break;
                  case 1 : 
                  case 4 : 
                  case 6 : 
                      exit$1 = 2;
                      break;
                  default:
                    exit$$1 = 1;
                }
              }
              if (exit$1 === 2) {
                if (match$6[0][/* health */1] > 0) {
                  body = "Slay";
                } else {
                  exit$$1 = 1;
                }
              }
              
            } else {
              exit$$1 = 1;
            }
            break;
        case 5 : 
        case 7 : 
            exit$$1 = 1;
            break;
        
      }
    } else if (focusedObject) {
      var match$7 = focusedObject[0];
      var match$8 = match$7[/* action */1];
      var exit$2 = 0;
      if (typeof match$8 === "number") {
        if (match$8 >= 9) {
          switch (match$8 - 9 | 0) {
            case 0 : 
                var match$9 = match$7[/* state */2];
                if (typeof match$9 === "number") {
                  exit$$1 = 1;
                } else {
                  switch (match$9.tag | 0) {
                    case 4 : 
                        exit$2 = 2;
                        break;
                    case 7 : 
                        switch (match$9[0]) {
                          case 0 : 
                              if (playerInBarn) {
                                exit$$1 = 1;
                              } else {
                                body = "Repair barn door";
                              }
                              break;
                          case 1 : 
                              if (playerInBarn) {
                                exit$$1 = 1;
                              } else {
                                body = "Close barn door";
                              }
                              break;
                          case 2 : 
                              if (playerInBarn) {
                                exit$$1 = 1;
                              } else {
                                body = "Open barn door";
                              }
                              break;
                          
                        }
                        break;
                    default:
                      exit$$1 = 1;
                  }
                }
                break;
            case 1 : 
                exit$2 = 2;
                break;
            case 2 : 
                var tmp = match$7[/* state */2];
                if (typeof tmp === "number") {
                  exit$$1 = 1;
                } else {
                  switch (tmp.tag | 0) {
                    case 4 : 
                        exit$2 = 2;
                        break;
                    case 8 : 
                        body = "Inspect grave";
                        break;
                    default:
                      exit$$1 = 1;
                  }
                }
                break;
            case 3 : 
                var tmp$1 = match$7[/* state */2];
                if (typeof tmp$1 === "number") {
                  exit$$1 = 1;
                } else {
                  switch (tmp$1.tag | 0) {
                    case 4 : 
                        exit$2 = 2;
                        break;
                    case 8 : 
                        body = "Maria - October 7th";
                        break;
                    default:
                      exit$$1 = 1;
                  }
                }
                break;
            
          }
        } else {
          exit$2 = 2;
        }
      } else {
        switch (match$8[0]) {
          case 0 : 
              body = "Pickup seed";
              break;
          case 1 : 
              body = "Pickup water";
              break;
          case 2 : 
              var match$10 = match$7[/* state */2];
              if (typeof match$10 === "number") {
                exit$$1 = 1;
              } else {
                switch (match$10.tag | 0) {
                  case 1 : 
                      if (match$10[0][/* health */1] > 0) {
                        body = "Milk cow";
                      } else {
                        exit$$1 = 1;
                      }
                      break;
                  case 4 : 
                      exit$2 = 2;
                      break;
                  default:
                    exit$$1 = 1;
                }
              }
              break;
          case 3 : 
              body = "Pickup egg";
              break;
          case 4 : 
              body = "Pickup corn";
              break;
          case 5 : 
              exit$2 = 2;
              break;
          case 6 : 
              body = "Pickup axe";
              break;
          case 7 : 
              body = "Pickup flowers";
              break;
          
        }
      }
      if (exit$2 === 2) {
        var match$11 = match$7[/* state */2];
        if (typeof match$11 === "number" || !(match$11.tag === 4 && match$11[0][/* health */1] === 0)) {
          exit$$1 = 1;
        } else {
          body = "There's not much to do now...";
        }
      }
      
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      var exit$3 = 0;
      if (match) {
        var exit$4 = 0;
        if (focusedObject) {
          var match$12 = focusedObject[0][/* action */1];
          if (typeof match$12 === "number" || match$12[0] !== 1) {
            exit$4 = 3;
          } else {
            body = "Drop into water";
          }
        } else {
          body = "";
        }
        if (exit$4 === 3) {
          if (match[0] >= 7) {
            var tmp$2 = focusedObject[0][/* state */2];
            if (typeof tmp$2 === "number" || tmp$2.tag !== 8) {
              exit$3 = 2;
            } else {
              body = "Leave flowers";
            }
          } else {
            exit$3 = 2;
          }
        }
        
      } else {
        exit$3 = 2;
      }
      if (exit$3 === 2) {
        if (focusedObject) {
          var match$13 = focusedObject[0][/* action */1];
          body = typeof match$13 === "number" && match$13 === 10 ? (
              finishedAllTasks ? "Go to bed" : (
                  finishedAllTasks ? "" : "Open Journal"
                )
            ) : "";
        } else {
          body = "";
        }
      }
      
    }
    if (body !== "") {
      var body$1 = body + tutorial;
      pushStyle(env);
      fill$4(color(101, 56, 27, 255), env);
      var width$$1 = textWidth(/* Some */[state[/* mainFont */13]], body$1, env);
      rect(/* tuple */[
            0,
            0
          ], width$$1 + 24 | 0, 70, env);
      fill$4(color(220, 194, 154, 255), env);
      rect(/* tuple */[
            6,
            6
          ], width$$1 + 12 | 0, 58, env);
      tint(color(0, 0, 0, 255), env);
      text(/* Some */[state[/* mainFont */13]], body$1, /* tuple */[
            12,
            45
          ], env);
      return popStyle(env);
    } else {
      return 0;
    }
  }

  function applyAction(state, playerInBarn, finishedAllTasks, focusedObject, env) {
    if (state[/* journal */9][/* dayTransition */1] === /* NoTransition */0 && (keyPressed(/* X */48, env) || keyPressed(/* Space */4, env))) {
      var match = state[/* currentItem */7];
      var exit$$1 = 0;
      var exit$1 = 0;
      if (match) {
        var exit$2 = 0;
        var exit$3 = 0;
        switch (match[0]) {
          case 0 : 
              if (focusedObject) {
                var go = focusedObject[0];
                var match$1 = go[/* action */1];
                if (typeof match$1 === "number") {
                  if (match$1 !== 5) {
                    if (match$1 !== 10) {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else {
                      exit$1 = 2;
                    }
                  } else {
                    var tmp = go[/* state */2];
                    if (typeof tmp === "number") {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else if (tmp.tag) {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else {
                      playSound$2("drop", state, env);
                      var newrecord = state.slice();
                      return /* tuple */[
                              (newrecord[/* currentItem */7] = /* None */0, newrecord[/* gameobjects */8] = map((function (g) {
                                        if (g !== go) {
                                          return g;
                                        } else {
                                          return /* record */[
                                                  /* pos */g[/* pos */0],
                                                  /* action : WaterCorn */2,
                                                  /* state : Corn */__(0, [0])
                                                ];
                                        }
                                      }), state[/* gameobjects */8]), newrecord),
                              /* None */0
                            ];
                    }
                  }
                } else {
                  var match$2 = match$1[0];
                  if (match$2 !== 1) {
                    if (match$2 !== 0) {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else {
                      playSound$2("drop", state, env);
                      var newrecord$1 = state.slice();
                      return /* tuple */[
                              (newrecord$1[/* currentItem */7] = /* None */0, newrecord$1),
                              /* None */0
                            ];
                    }
                  } else {
                    exit$2 = 3;
                  }
                }
              } else {
                return /* tuple */[
                        state,
                        focusedObject
                      ];
              }
              break;
          case 1 : 
              if (focusedObject) {
                var go$1 = focusedObject[0];
                var match$3 = go$1[/* action */1];
                if (typeof match$3 === "number") {
                  switch (match$3) {
                    case 0 : 
                        playSound$2("drop", state, env);
                        var newrecord$2 = state.slice();
                        return /* tuple */[
                                (newrecord$2[/* currentItem */7] = /* None */0, newrecord$2[/* gameobjects */8] = filter((function (g) {
                                            return +(g !== go$1);
                                          }))(state[/* gameobjects */8]), newrecord$2),
                                /* None */0
                              ];
                    case 1 : 
                        playSound$2("drop", state, env);
                        var newrecord$3 = state.slice();
                        return /* tuple */[
                                (newrecord$3[/* currentItem */7] = /* None */0, newrecord$3[/* gameobjects */8] = filter((function (g) {
                                            return +(g !== go$1);
                                          }))(state[/* gameobjects */8]), newrecord$3),
                                /* None */0
                              ];
                    case 2 : 
                        var match$4 = go$1[/* state */2];
                        if (typeof match$4 === "number") {
                          return /* tuple */[
                                  state,
                                  focusedObject
                                ];
                        } else if (match$4.tag) {
                          return /* tuple */[
                                  state,
                                  focusedObject
                                ];
                        } else {
                          var stage = match$4[0];
                          playSound$2("drop", state, env);
                          var newrecord$4 = state.slice();
                          return /* tuple */[
                                  (newrecord$4[/* currentItem */7] = /* None */0, newrecord$4[/* gameobjects */8] = map((function (g) {
                                            if (g !== go$1) {
                                              return g;
                                            } else {
                                              return /* record */[
                                                      /* pos */g[/* pos */0],
                                                      /* action : NoAction */12,
                                                      /* state : Corn */__(0, [stage])
                                                    ];
                                            }
                                          }), state[/* gameobjects */8]), newrecord$4),
                                  /* None */0
                                ];
                        }
                    case 3 : 
                        var match$5 = go$1[/* state */2];
                        if (typeof match$5 === "number") {
                          return /* tuple */[
                                  state,
                                  focusedObject
                                ];
                        } else if (match$5.tag === 2) {
                          var s = match$5[0];
                          if (s !== 1) {
                            playSound$2("drop", state, env);
                            var newrecord$5 = state.slice();
                            return /* tuple */[
                                    (newrecord$5[/* currentItem */7] = /* None */0, newrecord$5[/* gameobjects */8] = map((function (g) {
                                              if (g !== go$1) {
                                                return g;
                                              } else {
                                                var match = +(s === /* Empty */2);
                                                return /* record */[
                                                        /* pos */g[/* pos */0],
                                                        /* action */match ? /* WaterAnimals */3 : /* NoAction */12,
                                                        /* state : WaterTank */__(2, [/* Full */1])
                                                      ];
                                              }
                                            }), state[/* gameobjects */8]), newrecord$5),
                                    /* None */0
                                  ];
                          } else {
                            return /* tuple */[
                                    state,
                                    focusedObject
                                  ];
                          }
                        } else {
                          return /* tuple */[
                                  state,
                                  focusedObject
                                ];
                        }
                    case 10 : 
                        exit$1 = 2;
                        break;
                    case 4 : 
                    case 5 : 
                    case 6 : 
                    case 7 : 
                    case 8 : 
                    case 9 : 
                    case 11 : 
                    case 12 : 
                        return /* tuple */[
                                state,
                                focusedObject
                              ];
                    
                  }
                } else {
                  exit$2 = 3;
                }
              } else {
                return /* tuple */[
                        state,
                        focusedObject
                      ];
              }
              break;
          case 2 : 
          case 3 : 
              exit$3 = 4;
              break;
          case 4 : 
              if (focusedObject) {
                var go$2 = focusedObject[0];
                var match$6 = go$2[/* action */1];
                if (typeof match$6 === "number") {
                  if (match$6 !== 4) {
                    if (match$6 !== 10) {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else {
                      exit$1 = 2;
                    }
                  } else {
                    var tmp$1 = go$2[/* state */2];
                    if (typeof tmp$1 === "number") {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else if (tmp$1.tag === 3) {
                      playSound$2("drop", state, env);
                      var newrecord$6 = state.slice();
                      return /* tuple */[
                              (newrecord$6[/* currentItem */7] = /* None */0, newrecord$6[/* gameobjects */8] = map((function (g) {
                                        if (g !== go$2) {
                                          return g;
                                        } else {
                                          return /* record */[
                                                  /* pos */g[/* pos */0],
                                                  /* action : FeedAnimals */4,
                                                  /* state : FoodTank */__(3, [/* Full */1])
                                                ];
                                        }
                                      }), state[/* gameobjects */8]), newrecord$6),
                              /* None */0
                            ];
                    } else {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    }
                  }
                } else if (match$6[0] !== 1) {
                  return /* tuple */[
                          state,
                          focusedObject
                        ];
                } else {
                  return /* tuple */[
                          state,
                          focusedObject
                        ];
                }
              } else {
                return /* tuple */[
                        state,
                        focusedObject
                      ];
              }
              break;
          case 5 : 
              exit$2 = 3;
              break;
          case 6 : 
              if (focusedObject) {
                var match$7 = focusedObject[0][/* state */2];
                if (typeof match$7 === "number" || !(match$7.tag === 5 && match$7[0][/* hunger */2] === 0)) {
                  exit$2 = 3;
                } else {
                  playSound$2("hit", state, env);
                  var newrecord$7 = state.slice();
                  var init = state[/* journal */9];
                  newrecord$7[/* journal */9] = /* record */[
                    /* dayIndex */init[/* dayIndex */0],
                    /* dayTransition : FadeOut */4,
                    /* animationTime */0,
                    /* pageNumber */init[/* pageNumber */3]
                  ];
                  return /* tuple */[
                          newrecord$7,
                          focusedObject
                        ];
                }
              } else {
                return /* tuple */[
                        state,
                        focusedObject
                      ];
              }
              break;
          case 7 : 
              if (focusedObject) {
                var go$3 = focusedObject[0];
                var tmp$2 = go$3[/* state */2];
                if (typeof tmp$2 === "number" || tmp$2.tag !== 8) {
                  exit$2 = 3;
                } else {
                  playSound$2("drop", state, env);
                  var newrecord$8 = state.slice();
                  return /* tuple */[
                          (newrecord$8[/* currentItem */7] = /* None */0, newrecord$8[/* gameobjects */8] = map((function (g) {
                                    var match = +(g === go$3);
                                    if (match) {
                                      return /* record */[
                                              /* pos */g[/* pos */0],
                                              /* action */g[/* action */1],
                                              /* state : Tombstone */__(8, [/* boolean */1])
                                            ];
                                    } else {
                                      return g;
                                    }
                                  }), state[/* gameobjects */8]), newrecord$8),
                          focusedObject
                        ];
                }
              } else {
                return /* tuple */[
                        state,
                        focusedObject
                      ];
              }
              break;
          
        }
        if (exit$3 === 4) {
          if (focusedObject) {
            var match$8 = focusedObject[0][/* action */1];
            if (typeof match$8 === "number") {
              var switcher = match$8 - 8 | 0;
              if (switcher > 2 || switcher < 0) {
                return /* tuple */[
                        state,
                        focusedObject
                      ];
              } else {
                switch (switcher) {
                  case 0 : 
                      playSound$2("drop", state, env);
                      var newrecord$9 = state.slice();
                      return /* tuple */[
                              (newrecord$9[/* currentItem */7] = /* None */0, newrecord$9[/* dollarAnimation */10] = 0, newrecord$9),
                              /* None */0
                            ];
                  case 1 : 
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                  case 2 : 
                      exit$1 = 2;
                      break;
                  
                }
              }
            } else {
              exit$2 = 3;
            }
          } else {
            return /* tuple */[
                    state,
                    focusedObject
                  ];
          }
        }
        if (exit$2 === 3) {
          if (focusedObject) {
            var match$9 = focusedObject[0][/* action */1];
            if (typeof match$9 === "number") {
              if (match$9 !== 10) {
                exit$$1 = 1;
              } else {
                exit$1 = 2;
              }
            } else if (match$9[0] !== 1) {
              exit$$1 = 1;
            } else {
              playSound$2("drop", state, env);
              var newrecord$10 = state.slice();
              return /* tuple */[
                      (newrecord$10[/* currentItem */7] = /* None */0, newrecord$10),
                      focusedObject
                    ];
            }
          } else {
            return /* tuple */[
                    state,
                    focusedObject
                  ];
          }
        }
        
      } else if (focusedObject) {
        var go$4 = focusedObject[0];
        var match$10 = go$4[/* action */1];
        var pos = go$4[/* pos */0];
        if (typeof match$10 === "number") {
          if (match$10 >= 9) {
            switch (match$10 - 9 | 0) {
              case 0 : 
                  var match$11 = go$4[/* state */2];
                  if (typeof match$11 === "number") {
                    return /* tuple */[
                            state,
                            focusedObject
                          ];
                  } else if (match$11.tag === 7) {
                    if (playerInBarn) {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    } else {
                      playSound$2("pickup", state, env);
                      var match$12;
                      switch (match$11[0]) {
                        case 0 : 
                            match$12 = /* tuple */[
                              /* Opened */1,
                              pos
                            ];
                            break;
                        case 1 : 
                            match$12 = /* tuple */[
                              /* Closed */2,
                              /* record */[
                                /* x */pos[/* x */0] - tileSizef + 3,
                                /* y */pos[/* y */1]
                              ]
                            ];
                            break;
                        case 2 : 
                            match$12 = /* tuple */[
                              /* Opened */1,
                              /* record */[
                                /* x */pos[/* x */0] + tileSizef - 3,
                                /* y */pos[/* y */1]
                              ]
                            ];
                            break;
                        
                      }
                      var pos$1 = match$12[1];
                      var nextBarnState = match$12[0];
                      var playedInDoor = intersectRectRect(/* tuple */[
                            state[/* playerPos */2][/* x */0],
                            state[/* playerPos */2][/* y */1]
                          ], tileSizef, tileSizef, /* tuple */[
                            tileSizef * 9 - 3,
                            tileSizef * 16
                          ], 2 * tileSizef + 3, tileSizef - 8);
                      var playerPos = playedInDoor ? /* record */[
                          /* x */state[/* playerPos */2][/* x */0],
                          /* y */state[/* playerPos */2][/* y */1] + tileSizef / 4
                        ] : state[/* playerPos */2];
                      var newrecord$11 = state.slice();
                      return /* tuple */[
                              (newrecord$11[/* playerPos */2] = playerPos, newrecord$11[/* gameobjects */8] = map((function (g) {
                                        var match = +(g === go$4);
                                        if (match) {
                                          return /* record */[
                                                  /* pos */pos$1,
                                                  /* action */g[/* action */1],
                                                  /* state : BarnDoor */__(7, [nextBarnState])
                                                ];
                                        } else {
                                          return g;
                                        }
                                      }), state[/* gameobjects */8]), newrecord$11),
                              /* None */0
                            ];
                    }
                  } else {
                    return /* tuple */[
                            state,
                            focusedObject
                          ];
                  }
              case 1 : 
                  exit$1 = 2;
                  break;
              case 2 : 
                  var tmp$3 = go$4[/* state */2];
                  if (typeof tmp$3 === "number") {
                    return /* tuple */[
                            state,
                            focusedObject
                          ];
                  } else if (tmp$3.tag === 8) {
                    var newrecord$12 = state.slice();
                    return /* tuple */[
                            (newrecord$12[/* currentItem */7] = /* None */0, newrecord$12[/* gameobjects */8] = map((function (g) {
                                      var match = +(g === go$4);
                                      if (match) {
                                        return /* record */[
                                                /* pos */g[/* pos */0],
                                                /* action : NoAction */12,
                                                /* state */g[/* state */2]
                                              ];
                                      } else {
                                        return g;
                                      }
                                    }), state[/* gameobjects */8]), newrecord$12),
                            focusedObject
                          ];
                  } else {
                    return /* tuple */[
                            state,
                            focusedObject
                          ];
                  }
              case 3 : 
                  return /* tuple */[
                          state,
                          focusedObject
                        ];
              
            }
          } else {
            return /* tuple */[
                    state,
                    focusedObject
                  ];
          }
        } else {
          switch (match$10[0]) {
            case 0 : 
                playSound$2("pickup", state, env);
                var newrecord$13 = state.slice();
                return /* tuple */[
                        (newrecord$13[/* currentItem */7] = /* Some */[/* Seed */0], newrecord$13),
                        /* None */0
                      ];
            case 1 : 
                playSound$2("pickup", state, env);
                var newrecord$14 = state.slice();
                return /* tuple */[
                        (newrecord$14[/* currentItem */7] = /* Some */[/* Water */1], newrecord$14),
                        /* None */0
                      ];
            case 2 : 
                var match$13 = go$4[/* state */2];
                if (typeof match$13 === "number") {
                  return /* tuple */[
                          state,
                          focusedObject
                        ];
                } else if (match$13.tag === 1) {
                  if (match$13[0][/* health */1] > 0) {
                    playSound$2("pickup", state, env);
                    var newrecord$15 = state.slice();
                    return /* tuple */[
                            (newrecord$15[/* currentItem */7] = /* Some */[/* Milk */2], newrecord$15[/* gameobjects */8] = map((function (go$5) {
                                      var match = +(go$5 === go$4);
                                      if (match) {
                                        return /* record */[
                                                /* pos */go$4[/* pos */0],
                                                /* action : NoAction */12,
                                                /* state */go$4[/* state */2]
                                              ];
                                      } else {
                                        return go$5;
                                      }
                                    }), state[/* gameobjects */8]), newrecord$15),
                            /* Some */[/* record */[
                                /* pos */go$4[/* pos */0],
                                /* action : NoAction */12,
                                /* state */go$4[/* state */2]
                              ]]
                          ];
                  } else {
                    return /* tuple */[
                            state,
                            focusedObject
                          ];
                  }
                } else {
                  return /* tuple */[
                          state,
                          focusedObject
                        ];
                }
            case 3 : 
                playSound$2("pickup", state, env);
                var newrecord$16 = state.slice();
                return /* tuple */[
                        (newrecord$16[/* currentItem */7] = /* Some */[/* Egg */3], newrecord$16[/* gameobjects */8] = filter((function (go$5) {
                                    return +(go$5 !== go$4);
                                  }))(state[/* gameobjects */8]), newrecord$16),
                        /* None */0
                      ];
            case 4 : 
                playSound$2("pickup", state, env);
                var newrecord$17 = state.slice();
                return /* tuple */[
                        (newrecord$17[/* currentItem */7] = /* Some */[/* Corn */4], newrecord$17[/* gameobjects */8] = map((function (g) {
                                  var match = +(g === go$4);
                                  if (match) {
                                    return /* record */[
                                            /* pos */g[/* pos */0],
                                            /* action : PlantSeed */5,
                                            /* state : Corn */__(0, [-1])
                                          ];
                                  } else {
                                    return g;
                                  }
                                }), state[/* gameobjects */8]), newrecord$17),
                        /* None */0
                      ];
            case 5 : 
                return /* tuple */[
                        state,
                        focusedObject
                      ];
            case 6 : 
                playSound$2("pickup", state, env);
                var newrecord$18 = state.slice();
                return /* tuple */[
                        (newrecord$18[/* currentItem */7] = /* Some */[/* Axe */6], newrecord$18[/* gameobjects */8] = filter((function (go$5) {
                                    return +(go$5 !== go$4);
                                  }))(state[/* gameobjects */8]), newrecord$18),
                        /* None */0
                      ];
            case 7 : 
                playSound$2("pickup", state, env);
                var newrecord$19 = state.slice();
                return /* tuple */[
                        (newrecord$19[/* currentItem */7] = /* Some */[/* Flower */7], newrecord$19[/* gameobjects */8] = filter((function (g) {
                                    return +(g !== go$4);
                                  }))(state[/* gameobjects */8]), newrecord$19),
                        /* None */0
                      ];
            
          }
        }
      } else {
        return /* tuple */[
                state,
                focusedObject
              ];
      }
      if (exit$1 === 2) {
        if (finishedAllTasks) {
          var newrecord$20 = state.slice();
          var init$1 = state[/* journal */9];
          newrecord$20[/* journal */9] = /* record */[
            /* dayIndex */init$1[/* dayIndex */0],
            /* dayTransition : FadeOut */4,
            /* animationTime */0,
            /* pageNumber */init$1[/* pageNumber */3]
          ];
          return /* tuple */[
                  newrecord$20,
                  focusedObject
                ];
        } else if (finishedAllTasks) {
          exit$$1 = 1;
        } else {
          var newrecord$21 = state.slice();
          var init$2$$1 = state[/* journal */9];
          newrecord$21[/* journal */9] = /* record */[
            /* dayIndex */init$2$$1[/* dayIndex */0],
            /* dayTransition : CheckJournal */1,
            /* animationTime */0,
            /* pageNumber */init$2$$1[/* pageNumber */3]
          ];
          return /* tuple */[
                  newrecord$21,
                  focusedObject
                ];
        }
      }
      if (exit$$1 === 1) {
        if (match) {
          if (match[0] !== 6) {
            return /* tuple */[
                    state,
                    focusedObject
                  ];
          } else {
            var go$5 = focusedObject[0];
            var match$14 = go$5[/* state */2];
            if (typeof match$14 === "number") {
              return /* tuple */[
                      state,
                      focusedObject
                    ];
            } else {
              switch (match$14.tag | 0) {
                case 1 : 
                    var s$1 = match$14[0];
                    if (s$1[/* health */1] > 0) {
                      playSound$2("hit", state, env);
                      var newrecord$22 = state.slice();
                      return /* tuple */[
                              (newrecord$22[/* gameobjects */8] = map((function (g) {
                                        var match = +(g === go$5);
                                        if (match) {
                                          return /* record */[
                                                  /* pos */g[/* pos */0],
                                                  /* action */g[/* action */1],
                                                  /* state : Cow */__(1, [/* record */[
                                                        /* momentum */s$1[/* momentum */0],
                                                        /* health */0
                                                      ]])
                                                ];
                                        } else {
                                          return g;
                                        }
                                      }), state[/* gameobjects */8]), newrecord$22),
                              focusedObject
                            ];
                    } else {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    }
                case 4 : 
                    var s$2 = match$14[0];
                    if (s$2[/* health */1] > 0) {
                      playSound$2("hit", state, env);
                      var newrecord$23 = state.slice();
                      return /* tuple */[
                              (newrecord$23[/* gameobjects */8] = map((function (g) {
                                        var match = +(g === go$5);
                                        if (match) {
                                          return /* record */[
                                                  /* pos */g[/* pos */0],
                                                  /* action */g[/* action */1],
                                                  /* state : Chicken */__(4, [/* record */[
                                                        /* momentum */s$2[/* momentum */0],
                                                        /* health */0,
                                                        /* willDie */s$2[/* willDie */2]
                                                      ]])
                                                ];
                                        } else {
                                          return g;
                                        }
                                      }), state[/* gameobjects */8]), newrecord$23),
                              focusedObject
                            ];
                    } else {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    }
                case 6 : 
                    var s$3 = match$14[0];
                    if (s$3[/* health */1] > 0) {
                      playSound$2("hit", state, env);
                      var newrecord$24 = state.slice();
                      return /* tuple */[
                              (newrecord$24[/* gameobjects */8] = map((function (g) {
                                        var match = +(g === go$5);
                                        if (match) {
                                          return /* record */[
                                                  /* pos */g[/* pos */0],
                                                  /* action */g[/* action */1],
                                                  /* state : Chick */__(6, [/* record */[
                                                        /* momentum */s$3[/* momentum */0],
                                                        /* health */0,
                                                        /* willDie */s$3[/* willDie */2]
                                                      ]])
                                                ];
                                        } else {
                                          return g;
                                        }
                                      }), state[/* gameobjects */8]), newrecord$24),
                              focusedObject
                            ];
                    } else {
                      return /* tuple */[
                              state,
                              focusedObject
                            ];
                    }
                default:
                  return /* tuple */[
                          state,
                          focusedObject
                        ];
              }
            }
          }
        } else {
          return /* tuple */[
                  state,
                  focusedObject
                ];
        }
      }
      
    } else {
      return /* tuple */[
              state,
              focusedObject
            ];
    }
  }
  /* Common Not a pure module */

  function push(x, q) {
    if (q[/* length */0] === 0) {
      var cell = [];
      cell[0] = x;
      cell[1] = cell;
      q[/* length */0] = 1;
      q[/* tail */1] = cell;
      return /* () */0;
    } else {
      var tail = q[/* tail */1];
      var head = tail[/* next */1];
      var cell$1 = /* record */[
        /* content */x,
        /* next */head
      ];
      q[/* length */0] = q[/* length */0] + 1 | 0;
      tail[/* next */1] = cell$1;
      q[/* tail */1] = cell$1;
      return /* () */0;
    }
  }

  function unsafe_pop(q) {
    q[/* length */0] = q[/* length */0] - 1 | 0;
    var tail = q[/* tail */1];
    var head = tail[/* next */1];
    if (head === tail) {
      q[/* tail */1] = /* None */0;
    } else {
      tail[/* next */1] = head[/* next */1];
    }
    return head[/* content */0];
  }
  /* No side effect */

  function rotl32(x, n) {
    return (x << n) | (x >>> (32 - n | 0));
  }

  function caml_hash_mix_int(h, d) {
    var d$1 = d;
    d$1 = imul(d$1, 3432918353);
    d$1 = rotl32(d$1, 15);
    d$1 = imul(d$1, 461845907);
    var h$1 = h ^ d$1;
    h$1 = rotl32(h$1, 13);
    return (h$1 + (h$1 << 2) | 0) + 3864292196 | 0;
  }

  function caml_hash_final_mix(h) {
    var h$1 = h ^ (h >>> 16);
    h$1 = imul(h$1, 2246822507);
    h$1 = h$1 ^ (h$1 >>> 13);
    h$1 = imul(h$1, 3266489909);
    return h$1 ^ (h$1 >>> 16);
  }

  function caml_hash_mix_string(h, s) {
    var len = s.length;
    var block = (len / 4 | 0) - 1 | 0;
    var hash = h;
    for(var i = 0; i <= block; ++i){
      var j = (i << 2);
      var w = s.charCodeAt(j) | (s.charCodeAt(j + 1 | 0) << 8) | (s.charCodeAt(j + 2 | 0) << 16) | (s.charCodeAt(j + 3 | 0) << 24);
      hash = caml_hash_mix_int(hash, w);
    }
    var modulo = len & 3;
    if (modulo !== 0) {
      var w$1 = modulo === 3 ? (s.charCodeAt(len - 1 | 0) << 16) | (s.charCodeAt(len - 2 | 0) << 8) | s.charCodeAt(len - 3 | 0) : (
          modulo === 2 ? (s.charCodeAt(len - 1 | 0) << 8) | s.charCodeAt(len - 2 | 0) : s.charCodeAt(len - 1 | 0)
        );
      hash = caml_hash_mix_int(hash, w$1);
    }
    hash = hash ^ len;
    return hash;
  }

  function caml_hash(count, _, seed, obj) {
    var hash = seed;
    if (typeof obj === "number") {
      var u = obj | 0;
      hash = caml_hash_mix_int(hash, (u + u | 0) + 1 | 0);
      return caml_hash_final_mix(hash);
    } else if (typeof obj === "string") {
      hash = caml_hash_mix_string(hash, obj);
      return caml_hash_final_mix(hash);
    } else {
      var queue = /* record */[
        /* length */0,
        /* tail : None */0
      ];
      var num = count;
      push(obj, queue);
      num = num - 1 | 0;
      while(queue[/* length */0] !== 0 && num > 0) {
        var obj$1 = unsafe_pop(queue);
        if (typeof obj$1 === "number") {
          var u$1 = obj$1 | 0;
          hash = caml_hash_mix_int(hash, (u$1 + u$1 | 0) + 1 | 0);
          num = num - 1 | 0;
        } else if (typeof obj$1 === "string") {
          hash = caml_hash_mix_string(hash, obj$1);
          num = num - 1 | 0;
        } else if (typeof obj$1 !== "boolean") {
          if (typeof obj$1 !== "undefined") {
            if (typeof obj$1 === "symbol") {
              throw [
                    assert_failure,
                    [
                      "caml_hash.ml",
                      135,
                      8
                    ]
                  ];
            } else if (typeof obj$1 !== "function") {
              var size = obj$1.length;
              if (size !== undefined) {
                var obj_tag = obj$1.tag | 0;
                var tag = (size << 10) | obj_tag;
                if (tag === 248) {
                  hash = caml_hash_mix_int(hash, obj$1[1]);
                } else {
                  hash = caml_hash_mix_int(hash, tag);
                  var v = size - 1 | 0;
                  var block = v < num ? v : num;
                  for(var i = 0; i <= block; ++i){
                    push(obj$1[i], queue);
                  }
                }
              }
              
            }
            
          }
          
        }
        
      }    return caml_hash_final_mix(hash);
    }
  }
  /* No side effect */

  var randomized = [/* boolean */0];

  var prng$1 = __(246, [(function () {
          return State[/* make_self_init */1](/* () */0);
        })]);

  function power_2_above(_x, n) {
    while(true) {
      var x = _x;
      if (x >= n || (x << 1) < x) {
        return x;
      } else {
        _x = (x << 1);
        continue ;
      }
    }}

  function create$15($staropt$star, initial_size) {
    var random = $staropt$star ? $staropt$star[0] : randomized[0];
    var s = power_2_above(16, initial_size);
    var seed;
    if (random) {
      var tag = prng$1.tag | 0;
      seed = State[/* bits */3](tag === 250 ? prng$1[0] : (
              tag === 246 ? force_lazy_block(prng$1) : prng$1
            ));
    } else {
      seed = 0;
    }
    return /* record */[
            /* size */0,
            /* data */caml_make_vect(s, /* Empty */0),
            /* seed */seed,
            /* initial_size */s
          ];
  }

  function resize$1(indexfun, h) {
    var odata = h[/* data */1];
    var osize = odata.length;
    var nsize = (osize << 1);
    if (nsize >= osize) {
      var ndata = caml_make_vect(nsize, /* Empty */0);
      h[/* data */1] = ndata;
      var insert_bucket = function (param) {
        if (param) {
          var key = param[0];
          insert_bucket(param[2]);
          var nidx = _2(indexfun, h, key);
          return caml_array_set(ndata, nidx, /* Cons */[
                      key,
                      param[1],
                      caml_array_get(ndata, nidx)
                    ]);
        } else {
          return /* () */0;
        }
      };
      for(var i = 0 ,i_finish = osize - 1 | 0; i <= i_finish; ++i){
        insert_bucket(caml_array_get(odata, i));
      }
      return /* () */0;
    } else {
      return 0;
    }
  }

  function key_index(h, key) {
    if (h.length >= 3) {
      return caml_hash(10, 100, h[/* seed */2], key) & (h[/* data */1].length - 1 | 0);
    } else {
      return not_implemented("caml_hash_univ_param not implemented by bucklescript yet\n") % h[/* data */1].length;
    }
  }

  function find$1(h, key) {
    var match = caml_array_get(h[/* data */1], key_index(h, key));
    if (match) {
      if (caml_equal(key, match[0])) {
        return match[1];
      } else {
        var rest1 = match[2];
        if (rest1) {
          if (caml_equal(key, rest1[0])) {
            return rest1[1];
          } else {
            var rest2 = rest1[2];
            if (rest2) {
              if (caml_equal(key, rest2[0])) {
                return rest2[1];
              } else {
                var key$1 = key;
                var _param = rest2[2];
                while(true) {
                  var param = _param;
                  if (param) {
                    if (caml_equal(key$1, param[0])) {
                      return param[1];
                    } else {
                      _param = param[2];
                      continue ;
                    }
                  } else {
                    throw not_found;
                  }
                }            }
            } else {
              throw not_found;
            }
          }
        } else {
          throw not_found;
        }
      }
    } else {
      throw not_found;
    }
  }

  function replace(h, key, info) {
    var replace_bucket = function (param) {
      if (param) {
        var next = param[2];
        var k = param[0];
        if (caml_equal(k, key)) {
          return /* Cons */[
                  key,
                  info,
                  next
                ];
        } else {
          return /* Cons */[
                  k,
                  param[1],
                  replace_bucket(next)
                ];
        }
      } else {
        throw not_found;
      }
    };
    var i = key_index(h, key);
    var l = caml_array_get(h[/* data */1], i);
    try {
      return caml_array_set(h[/* data */1], i, replace_bucket(l));
    }
    catch (exn){
      if (exn === not_found) {
        caml_array_set(h[/* data */1], i, /* Cons */[
              key,
              info,
              l
            ]);
        h[/* size */0] = h[/* size */0] + 1 | 0;
        if (h[/* size */0] > (h[/* data */1].length << 1)) {
          return resize$1(key_index, h);
        } else {
          return 0;
        }
      } else {
        throw exn;
      }
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  function checkRebuild(_, _$1) {
    return /* boolean */0;
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var init$7 = Gl[/* Window */2][/* init */5];
  /* Reasongl_web Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var hotreloadData = create$15(/* None */0, 10);

  function unwrapOrDefault($$default, opt) {
    if (opt) {
      return opt[0];
    } else {
      return $$default;
    }
  }

  function identity$7(a, _) {
    return a;
  }

  var defaultScreen = "reprocessing-default";

  var currentScreen = [defaultScreen];

  var pauseFns = create$15(/* None */0, 10);

  function run(setup, screen, draw, mouseMove, mouseDragged, mouseDown, mouseUp, keyPressed$$1, keyReleased$$1, keyTyped, _) {
    var screen$1 = screen ? screen[0] : currentScreen[0];
    var fns;
    var exit = 0;
    var hr;
    try {
      hr = find$1(hotreloadData, screen$1);
      exit = 1;
    }
    catch (exn){
      if (exn === not_found) {
        var hr$1 = /* record */[
          /* started : boolean */0,
          /* filename */"",
          /* draw */unwrapOrDefault(identity$7, draw),
          /* mouseMove */unwrapOrDefault(identity$7, mouseMove),
          /* mouseDragged */unwrapOrDefault(identity$7, mouseDragged),
          /* mouseDown */unwrapOrDefault(identity$7, mouseDown),
          /* mouseUp */unwrapOrDefault(identity$7, mouseUp),
          /* keyPressed */unwrapOrDefault(identity$7, keyPressed$$1),
          /* keyReleased */unwrapOrDefault(identity$7, keyReleased$$1),
          /* keyTyped */unwrapOrDefault(identity$7, keyTyped)
        ];
        replace(hotreloadData, screen$1, hr$1);
        fns = hr$1;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      hr[/* draw */2] = unwrapOrDefault(identity$7, draw);
      hr[/* keyPressed */7] = unwrapOrDefault(identity$7, keyPressed$$1);
      hr[/* keyReleased */8] = unwrapOrDefault(identity$7, keyReleased$$1);
      hr[/* keyTyped */9] = unwrapOrDefault(identity$7, keyTyped);
      hr[/* mouseMove */3] = unwrapOrDefault(identity$7, mouseMove);
      hr[/* mouseDragged */4] = unwrapOrDefault(identity$7, mouseDragged);
      hr[/* mouseDown */5] = unwrapOrDefault(identity$7, mouseDown);
      hr[/* mouseUp */6] = unwrapOrDefault(identity$7, mouseUp);
      console.log("Succesfully changed functions");
      fns = hr;
    }
    if (fns[/* started */0]) {
      return 0;
    } else {
      fns[/* started */0] = /* boolean */1;
      self_init(/* () */0);
      noiseSeed($$int$1(pow(2, 29)));
      var env = createCanvas$1(_2(init$7, /* Some */[screen$1], argv), 200, 200);
      Font[/* loadDefaultFont */15](env);
      var userState = [_1(setup, env)];
      var width$$1 = _1(Gl[/* Window */2][/* getWidth */0], env[/* window */1]);
      var height$$1 = _1(Gl[/* Window */2][/* getHeight */1], env[/* window */1]);
      var data = Gl[/* readPixels_RGBA */30](env[/* gl */2], 0, 0, width$$1, height$$1);
      var textureBuffer = _1(Gl[/* createTexture */17], env[/* gl */2]);
      _3(Gl[/* bindTexture */19], env[/* gl */2], texture_2d, textureBuffer);
      Gl[/* texImage2D_RGBA */41](env[/* gl */2], texture_2d, 0, width$$1, height$$1, 0, data);
      _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_mag_filter, linear);
      _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_min_filter, linear);
      _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_s, clamp_to_edge);
      _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_t, clamp_to_edge);
      var reDrawPreviousBufferOnSecondFrame = function () {
        var x1 = 0 + width$$1 | 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var x3 = 0 + width$$1 | 0;
        var y3 = 0 + height$$1 | 0;
        var x4 = 0;
        var y4 = 0 + height$$1 | 0;
        var verticesColorAndTexture = /* float array */[
          x1,
          y1,
          0.0,
          0.0,
          0.0,
          0.0,
          1,
          1.0,
          1.0,
          x2,
          y2,
          0.0,
          0.0,
          0.0,
          0.0,
          1,
          0.0,
          1.0,
          x3,
          y3,
          0.0,
          0.0,
          0.0,
          0.0,
          1,
          1.0,
          0.0,
          x4,
          y4,
          0.0,
          0.0,
          0.0,
          0.0,
          1,
          0.0,
          0.0
        ];
        return drawGeometry(_2(Gl[/* Bigarray */28][/* of_array */1], /* Float32 */1, verticesColorAndTexture), _2(Gl[/* Bigarray */28][/* of_array */1], /* Uint16 */3, /* array */[
                        0,
                        1,
                        2,
                        1,
                        2,
                        3
                      ]), triangles, 6, textureBuffer, env);
      };
      var playPauseFn = Gl[/* render */5](env[/* window */1], /* Some */[(function (_, _$1, x, y) {
                env[/* mouse */12][/* pos */0] = /* tuple */[
                  x,
                  y
                ];
                env[/* mouse */12][/* pressed */2] = /* boolean */1;
                userState[0] = _2(fns[/* mouseDown */5], userState[0], env);
                return /* () */0;
              })], /* Some */[(function (_, _$1, x, y) {
                env[/* mouse */12][/* pos */0] = /* tuple */[
                  x,
                  y
                ];
                env[/* mouse */12][/* pressed */2] = /* boolean */0;
                userState[0] = _2(fns[/* mouseUp */6], userState[0], env);
                return /* () */0;
              })], /* Some */[(function (x, y) {
                env[/* mouse */12][/* pos */0] = /* tuple */[
                  x,
                  y
                ];
                if (env[/* mouse */12][/* pressed */2]) {
                  userState[0] = _2(fns[/* mouseDragged */4], userState[0], env);
                  return /* () */0;
                } else {
                  userState[0] = _2(fns[/* mouseMove */3], userState[0], env);
                  return /* () */0;
                }
              })], /* Some */[(function (keycode, repeat) {
                env[/* keyboard */11][/* keyCode */0] = keycode;
                if (!repeat) {
                  userState[0] = _2(fns[/* keyPressed */7], userState[0], env);
                  env[/* keyboard */11][/* pressed */1] = _2(KeySet[/* add */3], keycode, env[/* keyboard */11][/* pressed */1]);
                  env[/* keyboard */11][/* down */3] = _2(KeySet[/* add */3], keycode, env[/* keyboard */11][/* down */3]);
                }
                userState[0] = _2(fns[/* keyTyped */9], userState[0], env);
                return /* () */0;
              })], /* Some */[(function (keycode) {
                env[/* keyboard */11][/* keyCode */0] = keycode;
                env[/* keyboard */11][/* released */2] = _2(KeySet[/* add */3], keycode, env[/* keyboard */11][/* released */2]);
                env[/* keyboard */11][/* down */3] = _2(KeySet[/* remove */5], keycode, env[/* keyboard */11][/* down */3]);
                userState[0] = _2(fns[/* keyReleased */8], userState[0], env);
                return /* () */0;
              })], /* Some */[(function () {
                if (env[/* size */18][/* resizeable */2]) {
                  var height$$1 = _1(Gl[/* Window */2][/* getHeight */1], env[/* window */1]);
                  var width$$1 = _1(Gl[/* Window */2][/* getWidth */0], env[/* window */1]);
                  return resetSize(env, width$$1, height$$1);
                } else {
                  return size$1(width(env), height(env), env);
                }
              })], (function (f) {
              if (env[/* frame */15][/* count */0] === 2) {
                reDrawPreviousBufferOnSecondFrame(/* () */0);
              }
              var exit = 0;
              var val;
              try {
                val = find$1(hotreloadData, screen$1);
                exit = 1;
              }
              catch (exn){
                if (exn !== not_found) {
                  throw exn;
                }
                
              }
              if (exit === 1) {
                checkRebuild(/* boolean */0, fns[/* filename */1]);
              }
              userState[0] = _2(fns[/* draw */2], userState[0], env);
              var f$1 = f;
              var env$1 = env;
              var rate = 1000 / f$1 | 0;
              env$1[/* mouse */12][/* prevPos */1] = env$1[/* mouse */12][/* pos */0];
              env$1[/* frame */15] = /* record */[
                /* count */env$1[/* frame */15][/* count */0] + 1 | 0,
                /* rate */rate,
                /* deltaTime */f$1 / 1000
              ];
              env$1[/* keyboard */11][/* released */2] = KeySet[/* empty */0];
              env$1[/* keyboard */11][/* pressed */1] = KeySet[/* empty */0];
              copyInto(identity$6, env$1[/* matrix */16]);
              if (env$1[/* batch */10][/* elementPtr */3] > 0) {
                return flushGlobalBatch(env$1);
              } else {
                return 0;
              }
            }), /* () */0);
      return replace(pauseFns, screen$1, playPauseFn);
    }
  }
  /* hotreloadData Not a pure module */

  // Generated by BUCKLESCRIPT VERSION 2.2.4, PLEASE EDIT WITH CARE

  var mapString = "\n00000000000000000000000000000\n00000000000000000000000000000\n00000000000000000000000000000\n00000000000000000000000000000\n0000qxxxxxxxxxxe0000000000000\n0000a0000000000d0000000000000\n0000a000000000030000000000000\n0000a333333333030000000000000\n0000z333333333030000000000000\n000003834444430xxxxxxxxxxxxxx\n00000344444443000000000099999\n00000344hhh443000000000099999\n00000344hhh443000111110055500\n00000344hhh443000111110055500\n00000344444443000111110055500\n00000344444443000000000055500\n0000qx3334333xxxxxx0xxxxe0000\n0000a0000000000000000006d0000\n0000a0000000000000000000d0000\n0000a0000000000000000000d0000\n0000a0000000000000000007d0000\n0000zxxxxxxxxxxxxxxxxxxxc0000\n00000000000000000000000000000\n00000000000000000000000000000\n00000000000000000000000000000\n";

  function createGrid(s) {
    var s$1 = trim$1(s);
    var strs = split$2(s$1, /* "\n" */10);
    var width$$1 = nth(strs, 0).length;
    var height$$1 = length(strs);
    var m = make_matrix(width$$1, height$$1, /* Blocked */3);
    iteri((function (y, s) {
            return iteri$2((function (x, c) {
                          var tmp;
                          if (c >= 58) {
                            var switcher = c - 97 | 0;
                            if (switcher > 25 || switcher < 0) {
                              tmp = /* Blocked */3;
                            } else {
                              switch (switcher) {
                                case 7 : 
                                    tmp = /* Hay */7;
                                    break;
                                case 1 : 
                                case 5 : 
                                case 6 : 
                                case 8 : 
                                case 9 : 
                                case 10 : 
                                case 11 : 
                                case 12 : 
                                case 13 : 
                                case 14 : 
                                case 15 : 
                                case 17 : 
                                case 18 : 
                                case 19 : 
                                case 20 : 
                                case 21 : 
                                case 22 : 
                                case 24 : 
                                    tmp = /* Blocked */3;
                                    break;
                                case 0 : 
                                case 2 : 
                                case 3 : 
                                case 4 : 
                                case 16 : 
                                case 23 : 
                                case 25 : 
                                    tmp = /* Fence */__(1, [c]);
                                    break;
                                
                              }
                            }
                          } else if (c >= 48) {
                            switch (c - 48 | 0) {
                              case 0 : 
                                  tmp = /* Grass */__(0, [random$3(0, 10)]);
                                  break;
                              case 1 : 
                                  tmp = /* Dirt */0;
                                  break;
                              case 2 : 
                              case 3 : 
                                  tmp = /* Blocked */3;
                                  break;
                              case 4 : 
                                  tmp = /* Floor */1;
                                  break;
                              case 5 : 
                                  tmp = /* Water */2;
                                  break;
                              case 6 : 
                                  tmp = /* WaterTrough */5;
                                  break;
                              case 7 : 
                                  tmp = /* FoodTrough */6;
                                  break;
                              case 8 : 
                                  tmp = /* SeedBin */4;
                                  break;
                              case 9 : 
                                  tmp = /* Truck */8;
                                  break;
                              
                            }
                          } else {
                            tmp = /* Blocked */3;
                          }
                          return caml_array_set(caml_array_get(m, x), y, tmp);
                        }), s);
          }), strs);
    return m;
  }

  function renderPlayer(state, env) {
    var match = state[/* playerFacing */3];
    var match$1 = anyKey(/* :: */[
          /* Up */54,
          /* :: */[
            /* Down */53,
            /* :: */[
              /* Right */51,
              /* :: */[
                /* Left */52,
                /* :: */[
                  /* W */47,
                  /* :: */[
                    /* A */25,
                    /* :: */[
                      /* S */43,
                      /* :: */[
                        /* D */28,
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ], env);
    var match$2 = match$1 ? (state[/* time */11] / 0.2 | 0) % 4 : 0;
    var match$3 = +(state[/* currentItem */7] === /* None */0);
    var imgName;
    switch (match) {
      case 0 : 
          if (match$2 > 0) {
            if (match$2 >= 4) {
              imgName = failwith("Impossible walk state");
            } else {
              switch (match$2 - 1 | 0) {
                case 0 : 
                    imgName = match$3 ? "old_macdonald_back_face_walk_one.png" : "old_macdonald_back_face_hands_walk_one.png";
                    break;
                case 1 : 
                    imgName = match$3 ? "old_macdonald_back_face.png" : "old_macdonald_back_face_hands_up.png";
                    break;
                case 2 : 
                    imgName = match$3 ? "old_macdonald_back_face_walk_two.png" : "old_macdonald_back_face_hands_up_walk_two.png";
                    break;
                
              }
            }
          } else {
            imgName = match$2 >= 0 ? (
                match$3 ? "old_macdonald_back_face.png" : "old_macdonald_back_face_hands_up.png"
              ) : failwith("Impossible walk state");
          }
          break;
      case 1 : 
          if (match$2 > 0) {
            if (match$2 >= 4) {
              imgName = failwith("Impossible walk state");
            } else {
              switch (match$2 - 1 | 0) {
                case 0 : 
                    imgName = match$3 ? "old_macdonald_front_face_walk_one.png" : "old_macdonald_front_face_hands_up_walk_one.png";
                    break;
                case 1 : 
                    imgName = match$3 ? "old_macdonald_front_face.png" : "old_macdonald_front_face_hands_up.png";
                    break;
                case 2 : 
                    imgName = match$3 ? "old_macdonald_front_face_walk_two.png" : "old_macdonald_front_face_hands_up_walk_two.png";
                    break;
                
              }
            }
          } else {
            imgName = match$2 >= 0 ? (
                match$3 ? "old_macdonald_front_face.png" : "old_macdonald_front_face_hands_up.png"
              ) : failwith("Impossible walk state");
          }
          break;
      case 2 : 
          if (match$2 > 0) {
            if (match$2 >= 4) {
              imgName = failwith("Impossible walk state");
            } else {
              switch (match$2 - 1 | 0) {
                case 0 : 
                    imgName = match$3 ? "old_macdonald_right_face_walk_one.png" : "old_macdonald_right_face_hands_up_walk_one.png";
                    break;
                case 1 : 
                    imgName = match$3 ? "old_macdonald_right_face.png" : "old_macdonald_right_face_hands_up.png";
                    break;
                case 2 : 
                    imgName = match$3 ? "old_macdonald_right_face_walk_two.png" : "old_macdonald_right_face_hands_up_walk_two.png";
                    break;
                
              }
            }
          } else {
            imgName = match$2 >= 0 ? (
                match$3 ? "old_macdonald_right_face.png" : "old_macdonald_right_face_hands_up.png"
              ) : failwith("Impossible walk state");
          }
          break;
      case 3 : 
          if (match$2 > 0) {
            if (match$2 >= 4) {
              imgName = failwith("Impossible walk state");
            } else {
              switch (match$2 - 1 | 0) {
                case 0 : 
                    imgName = match$3 ? "old_macdonald_left_face_walk_one.png" : "old_macdonald_left_face_hands_up_walk_one.png";
                    break;
                case 1 : 
                    imgName = match$3 ? "old_macdonald_left_face.png" : "old_macdonald_left_face_hands_up.png";
                    break;
                case 2 : 
                    imgName = match$3 ? "old_macdonald_left_face_walk_two.png" : "old_macdonald_left_face_hands_up_walk_two.png";
                    break;
                
              }
            }
          } else {
            imgName = match$2 >= 0 ? (
                match$3 ? "old_macdonald_left_face.png" : "old_macdonald_left_face_hands_up.png"
              ) : failwith("Impossible walk state");
          }
          break;
      
    }
    drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1], imgName, state, env);
    var holdOffset = tileSizef - 4;
    var match$4 = state[/* currentItem */7];
    if (match$4) {
      switch (match$4[0]) {
        case 0 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "seed.png", state, env);
        case 1 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "water_bucket.png", state, env);
        case 2 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "bucket_with_milk.png", state, env);
        case 3 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "egg.png", state, env);
        case 4 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "pick_up_corn.png", state, env);
        case 5 : 
            console.log("Can't draw wood");
            return /* () */0;
        case 6 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "axe_pick_up.png", state, env);
        case 7 : 
            return drawAssetf(state[/* playerPos */2][/* x */0], state[/* playerPos */2][/* y */1] - holdOffset, "bouquet_of_flowers.png", state, env);
        
      }
    } else {
      return /* () */0;
    }
  }

  function setup(assets, env) {
    size$1(600, 600, env);
    var grid = createGrid(mapString);
    return /* record */[
            /* grid */grid,
            /* plants */make_matrix(4, 6, 0),
            /* playerPos : record */[
              /* x */tileSizef * 15.8,
              /* y */tileSizef * 10
            ],
            /* playerFacing : DownD */1,
            /* spritesheet */loadImage$2(basedirname$1 + "spritesheet/assets.png", /* Some */[/* boolean */1], env),
            /* assets */assets,
            /* sounds */loadSounds(env),
            /* currentItem : None */0,
            /* gameobjects */init$6(grid),
            /* journal */init$5(env),
            /* dollarAnimation */-1,
            /* time */0,
            /* night : boolean */0,
            /* mainFont */loadFont(basedirname$1 + "whatever it takes bold_2x.fnt", /* Some */[/* boolean */0], env),
            /* monsterWasLockedIn : boolean */0,
            /* mousePressed : boolean */0,
            /* mousePressedHack : boolean */0,
            /* day6PlayerWentInBarn : boolean */0,
            /* day6CameraAnimation */0,
            /* shortDestroyedBarnAsset */loadImage$2(basedirname$1 + "short_destroyed_barn.png", /* Some */[/* boolean */1], env),
            /* sleepingMonsterAsset */loadImage$2(basedirname$1 + "sleeping_monster.png", /* Some */[/* boolean */1], env),
            /* hasPressedTheActionKeyOnce : boolean */0,
            /* playerDead : boolean */0
          ];
  }

  function draw(state, env) {
    background(color(199, 217, 229, 255), env);
    var dt = deltaTime(env);
    var newrecord = state.slice();
    newrecord[/* time */11] = state[/* time */11] + dt;
    var playerSpeedDt = playerSpeed * dt;
    var newrecord$1 = newrecord.slice();
    var match = debug && keyPressed(/* N */38, env);
    newrecord$1[/* night */12] = match ? 1 - newrecord[/* night */12] : newrecord[/* night */12];
    if ($$float$1(1.0) < 0.005) {
      var soundNum = $$int$1(5) + 1 | 0;
      if (newrecord$1[/* night */12]) {
        playSound$2("night" + String(soundNum), newrecord$1, env);
      } else if ($$float$1(1.0) < 0.5) {
        playSound$2("day" + String(soundNum), newrecord$1, env);
      }
      
    }
    var offset = /* record */[
      /* x */0,
      /* y */0
    ];
    var offset$1;
    if (newrecord$1[/* journal */9][/* dayTransition */1] === /* NoTransition */0 || newrecord$1[/* journal */9][/* dayTransition */1] === /* FadeIn */5) {
      var match$1 = key(/* Left */52, env) || key(/* A */25, env);
      var offset$2 = match$1 ? handleCollision(newrecord$1, offset, /* record */[
              /* x */-playerSpeedDt,
              /* y */0
            ], newrecord$1[/* playerPos */2], newrecord$1[/* grid */0]) : offset;
      var match$2 = key(/* Right */51, env) || key(/* D */28, env);
      var offset$3 = match$2 ? handleCollision(newrecord$1, offset$2, /* record */[
              /* x */playerSpeedDt,
              /* y */offset$2[/* y */1]
            ], newrecord$1[/* playerPos */2], newrecord$1[/* grid */0]) : offset$2;
      var match$3 = key(/* Up */54, env) || key(/* W */47, env);
      var offset$4 = match$3 ? handleCollision(newrecord$1, offset$3, /* record */[
              /* x */offset$3[/* x */0],
              /* y */-playerSpeedDt
            ], newrecord$1[/* playerPos */2], newrecord$1[/* grid */0]) : offset$3;
      var match$4 = key(/* Down */53, env) || key(/* S */43, env);
      offset$1 = match$4 ? handleCollision(newrecord$1, offset$4, /* record */[
              /* x */offset$4[/* x */0],
              /* y */playerSpeedDt
            ], newrecord$1[/* playerPos */2], newrecord$1[/* grid */0]) : offset$4;
    } else {
      offset$1 = offset;
    }
    var state$1;
    if (!newrecord$1[/* hasPressedTheActionKeyOnce */21] && (key(/* X */48, env) || key(/* Space */4, env)) && newrecord$1[/* journal */9][/* dayTransition */1] === /* NoTransition */0) {
      var newrecord$2 = newrecord$1.slice();
      newrecord$2[/* hasPressedTheActionKeyOnce */21] = /* boolean */1;
      state$1 = newrecord$2;
    } else {
      state$1 = newrecord$1;
    }
    var state$2;
    if (mousePressed(env)) {
      if (!state$1[/* mousePressedHack */16] && mousePressed(env)) {
        var newrecord$3 = state$1.slice();
        newrecord$3[/* mousePressed */15] = /* boolean */1;
        newrecord$3[/* mousePressedHack */16] = /* boolean */1;
        state$2 = newrecord$3;
      } else if (state$1[/* mousePressed */15] && state$1[/* mousePressedHack */16]) {
        var newrecord$4 = state$1.slice();
        newrecord$4[/* mousePressed */15] = /* boolean */0;
        state$2 = newrecord$4;
      } else {
        state$2 = state$1;
      }
    } else {
      var newrecord$5 = state$1.slice();
      newrecord$5[/* mousePressed */15] = /* boolean */0;
      newrecord$5[/* mousePressedHack */16] = /* boolean */0;
      state$2 = newrecord$5;
    }
    var mag$$1 = magf(/* tuple */[
          offset$1[/* x */0],
          offset$1[/* y */1]
        ]);
    var state$3;
    if (mag$$1 > 0) {
      var dx = offset$1[/* x */0] / mag$$1 * playerSpeedDt;
      var dy = offset$1[/* y */1] / mag$$1 * playerSpeedDt;
      var newrecord$6 = state$2.slice();
      newrecord$6[/* playerPos */2] = /* record */[
        /* x */state$2[/* playerPos */2][/* x */0] + dx,
        /* y */state$2[/* playerPos */2][/* y */1] + dy
      ];
      state$3 = newrecord$6;
    } else {
      state$3 = state$2;
    }
    var playerInBarn = checkIfInBarn(state$3[/* playerPos */2]);
    var state$4;
    if (state$3[/* journal */9][/* dayIndex */0] === 5 && !state$3[/* day6PlayerWentInBarn */17]) {
      var newrecord$7 = state$3.slice();
      newrecord$7[/* day6PlayerWentInBarn */17] = playerInBarn;
      state$4 = newrecord$7;
    } else {
      state$4 = state$3;
    }
    var state$5;
    if (state$4[/* day6PlayerWentInBarn */17] && !playerInBarn) {
      try {
        find((function (g) {
                var tmp = g[/* state */2];
                if (typeof tmp === "number" || tmp.tag !== 5) {
                  return /* boolean */0;
                } else {
                  return /* boolean */1;
                }
              }), state$4[/* gameobjects */8]);
        state$5 = state$4;
      }
      catch (exn){
        if (exn === not_found) {
          var bPos_000 = /* x */tileSizef * 20;
          var bPos_001 = /* y */tileSizef * 18;
          var bPos = /* record */[
            bPos_000,
            bPos_001
          ];
          var gameobjects_000 = /* record */[
            /* pos */bPos,
            /* action : NoAction */12,
            /* state : Boss */__(5, [/* record */[
                  /* movePair : tuple */[
                    bPos,
                    bPos
                  ],
                  /* movingTime */0,
                  /* hunger */6,
                  /* eatingTime */0,
                  /* killed : [] */0,
                  /* eating : boolean */0
                ]])
          ];
          var gameobjects_001 = state$4[/* gameobjects */8];
          var gameobjects = /* :: */[
            gameobjects_000,
            gameobjects_001
          ];
          var newrecord$8 = state$4.slice();
          newrecord$8[/* gameobjects */8] = gameobjects;
          newrecord$8[/* day6CameraAnimation */18] = 5;
          state$5 = newrecord$8;
        } else {
          throw exn;
        }
      }
    } else {
      state$5 = state$4;
    }
    var state$6;
    if (state$5[/* day6CameraAnimation */18] > 0) {
      var newrecord$9 = state$5.slice();
      newrecord$9[/* day6CameraAnimation */18] = state$5[/* day6CameraAnimation */18] - dt;
      state$6 = newrecord$9;
    } else {
      state$6 = state$5;
    }
    var facing = state$6[/* playerFacing */3];
    var match$5 = key(/* Left */52, env) || key(/* A */25, env);
    var facing$1 = match$5 ? /* LeftD */3 : facing;
    var match$6 = key(/* Right */51, env) || key(/* D */28, env);
    var facing$2 = match$6 ? /* RightD */2 : facing$1;
    var match$7 = key(/* Up */54, env) || key(/* W */47, env);
    var facing$3 = match$7 ? /* UpD */0 : facing$2;
    var match$8 = key(/* Down */53, env) || key(/* S */43, env);
    var facing$4 = match$8 ? /* DownD */1 : facing$3;
    var newrecord$10 = state$6.slice();
    newrecord$10[/* playerFacing */3] = facing$4;
    var facingOffset = facingToOffset(facing$4);
    var state$7 = update(newrecord$10, env);
    var match$9;
    if (state$7[/* journal */9][/* dayIndex */0] === 7) {
      var exit$$1 = 0;
      var bossGo;
      try {
        bossGo = find((function (g) {
                var tmp = g[/* state */2];
                if (typeof tmp === "number" || tmp.tag !== 5) {
                  return /* boolean */0;
                } else {
                  return /* boolean */1;
                }
              }), state$7[/* gameobjects */8]);
        exit$$1 = 1;
      }
      catch (exn$1){
        if (exn$1 === not_found) {
          match$9 = failwith(" Tghis should reall ynot happen");
        } else {
          throw exn$1;
        }
      }
      if (exit$$1 === 1) {
        var match$10 = bossGo[/* state */2];
        if (typeof match$10 === "number" || match$10.tag !== 5) {
          match$9 = failwith("Well we certainly didn't think this could happen");
        } else {
          var boss = match$10[0];
          var gameobjects$1 = map((function (go) {
                  var match = exists((function (k) {
                          return +(k === go);
                        }), boss[/* killed */4]);
                  var exit$$1 = 0;
                  var tmp = go[/* state */2];
                  if (typeof tmp === "number" || tmp.tag !== 5) {
                    exit$$1 = 1;
                  } else {
                    return /* record */[
                            /* pos */go[/* pos */0],
                            /* action */go[/* action */1],
                            /* state : Boss */__(5, [/* record */[
                                  /* movePair */boss[/* movePair */0],
                                  /* movingTime */boss[/* movingTime */1],
                                  /* hunger */boss[/* hunger */2] - length(boss[/* killed */4]) | 0,
                                  /* eatingTime */boss[/* eatingTime */3],
                                  /* killed : [] */0,
                                  /* eating */boss[/* eating */5]
                                ]])
                          ];
                  }
                  if (exit$$1 === 1) {
                    if (match) {
                      var match$1 = go[/* state */2];
                      if (typeof match$1 === "number") {
                        return go;
                      } else {
                        switch (match$1.tag | 0) {
                          case 1 : 
                              return /* record */[
                                      /* pos */go[/* pos */0],
                                      /* action */go[/* action */1],
                                      /* state : Cow */__(1, [/* record */[
                                            /* momentum */match$1[0][/* momentum */0],
                                            /* health */-1
                                          ]])
                                    ];
                          case 4 : 
                              var cowState = match$1[0];
                              return /* record */[
                                      /* pos */go[/* pos */0],
                                      /* action */go[/* action */1],
                                      /* state : Chicken */__(4, [/* record */[
                                            /* momentum */cowState[/* momentum */0],
                                            /* health */-1,
                                            /* willDie */cowState[/* willDie */2]
                                          ]])
                                    ];
                          case 6 : 
                              var cowState$1 = match$1[0];
                              return /* record */[
                                      /* pos */go[/* pos */0],
                                      /* action */go[/* action */1],
                                      /* state : Chick */__(6, [/* record */[
                                            /* momentum */cowState$1[/* momentum */0],
                                            /* health */-1,
                                            /* willDie */cowState$1[/* willDie */2]
                                          ]])
                                    ];
                          default:
                            return go;
                        }
                      }
                    } else {
                      return go;
                    }
                  }
                  
                }), state$7[/* gameobjects */8]);
          var newrecord$11 = state$7.slice();
          match$9 = /* tuple */[
            (newrecord$11[/* gameobjects */8] = gameobjects$1, newrecord$11),
            /* Some */[bossGo]
          ];
        }
      }
      
    } else {
      match$9 = /* tuple */[
        state$7,
        /* None */0
      ];
    }
    var maybeBoss = match$9[1];
    var state$8 = match$9[0];
    var finishedAllTasks = checkTasks(state$8, env);
    var focusedObject = fold_left((function (foundobject, gameobject) {
            var d = distf(/* tuple */[
                  gameobject[/* pos */0][/* x */0],
                  gameobject[/* pos */0][/* y */1]
                ], /* tuple */[
                  state$8[/* playerPos */2][/* x */0] + facingOffset[/* x */0] * tileSizef + tileSizef / 2,
                  state$8[/* playerPos */2][/* y */1] + facingOffset[/* y */1] * tileSizef + tileSizef / 2
                ]);
            if (foundobject) {
              if (foundobject[0][0] < d) {
                return foundobject;
              } else {
                return /* Some */[/* tuple */[
                          d,
                          gameobject
                        ]];
              }
            } else if (d < tileSizef) {
              return /* Some */[/* tuple */[
                        d,
                        gameobject
                      ]];
            } else {
              return /* None */0;
            }
          }), /* None */0, state$8[/* gameobjects */8]);
    var focusedObject$1 = focusedObject ? /* Some */[focusedObject[0][1]] : /* None */0;
    var match$11 = applyAction(state$8, playerInBarn, finishedAllTasks, focusedObject$1, env);
    var focusedObject$2 = match$11[1];
    var state$9 = updateDay(match$11[0], env);
    pushMatrix(env);
    scale$9(2, 2, env);
    if (state$9[/* day6CameraAnimation */18] > 0) {
      var startX = -state$9[/* playerPos */2][/* x */0] + screenSize / 4 - tileSizef / 2;
      var startY = -state$9[/* playerPos */2][/* y */1] + screenSize / 4 - tileSizef / 2;
      var boss$1 = find((function (g) {
              var tmp = g[/* state */2];
              if (typeof tmp === "number" || tmp.tag !== 5) {
                return /* boolean */0;
              } else {
                return /* boolean */1;
              }
            }), state$9[/* gameobjects */8]);
      var endX = -boss$1[/* pos */0][/* x */0] + screenSize / 4 - tileSizef / 2;
      var endY = -boss$1[/* pos */0][/* y */1] + screenSize / 4 - tileSizef / 2;
      translate$4(remapf(caml_float_max(state$9[/* day6CameraAnimation */18], 2.0), 5.0, 2.0, startX, endX), remapf(caml_float_max(state$9[/* day6CameraAnimation */18], 2.0), 5.0, 2.0, startY, endY), env);
    } else {
      translate$4(-state$9[/* playerPos */2][/* x */0] + screenSize / 4 - tileSizef / 2, -state$9[/* playerPos */2][/* y */1] + screenSize / 4 - tileSizef / 2, env);
    }
    pushStyle(env);
    if (state$9[/* night */12]) {
      tint(color(100, 100, 200, 255), env);
    }
    iteri$3((function (x, row) {
            return iteri$3((function (y, tile) {
                          if (typeof tile === "number") {
                            if (tile === 0) {
                              drawAsset(imul(x, tileSize), imul(y, tileSize), "grass.png", state$9, env);
                              return drawAsset(imul(x, tileSize), imul(y, tileSize), "drier_dirt.png", state$9, env);
                            } else {
                              return drawAsset(imul(x, tileSize), imul(y, tileSize), "grass.png", state$9, env);
                            }
                          } else if (tile.tag) {
                            drawAsset(imul(x, tileSize), imul(y, tileSize), "grass.png", state$9, env);
                            var px = imul(x, tileSize);
                            var py = imul(y, tileSize);
                            var exit$$1 = 0;
                            var switcher = tile[0] - 97 | 0;
                            if (switcher > 25 || switcher < 0) {
                              exit$$1 = 1;
                            } else {
                              switch (switcher) {
                                case 2 : 
                                    return drawAsset(px, py, "corner_fence.png", state$9, env);
                                case 0 : 
                                case 3 : 
                                    return drawAsset(px, py, "vertical_fence.png", state$9, env);
                                case 4 : 
                                    return drawAsset(px, py, "fence_top_right_corner.png", state$9, env);
                                case 16 : 
                                    return drawAsset(px, py, "fence_top_left_corner.png", state$9, env);
                                case 23 : 
                                    return drawAsset(px, py, "keep_the_dogs_out.png", state$9, env);
                                case 1 : 
                                case 5 : 
                                case 6 : 
                                case 7 : 
                                case 8 : 
                                case 9 : 
                                case 10 : 
                                case 11 : 
                                case 12 : 
                                case 13 : 
                                case 14 : 
                                case 15 : 
                                case 17 : 
                                case 18 : 
                                case 19 : 
                                case 20 : 
                                case 21 : 
                                case 22 : 
                                case 24 : 
                                    exit$$1 = 1;
                                    break;
                                case 25 : 
                                    return drawAsset(px, py, "fence_bottom_left.png", state$9, env);
                                
                              }
                            }
                            if (exit$$1 === 1) {
                              return drawAsset(px, py, "keep_the_dogs_out.png", state$9, env);
                            }
                            
                          } else {
                            var switcher$1 = tile[0] - 1 | 0;
                            if (switcher$1 > 2 || switcher$1 < 0) {
                              if (switcher$1 !== -1) {
                                return drawAsset(imul(x, tileSize), imul(y, tileSize), "grass.png", state$9, env);
                              } else {
                                return drawAsset(imul(x, tileSize), imul(y, tileSize), "different_flower_grass.png", state$9, env);
                              }
                            } else if (switcher$1 !== 0) {
                              return drawAsset(imul(x, tileSize), imul(y, tileSize), "more_grass.png", state$9, env);
                            } else {
                              return drawAsset(imul(x, tileSize), imul(y, tileSize), "flower_grass.png", state$9, env);
                            }
                          }
                        }), row);
          }), state$9[/* grid */0]);
    var playerBehindBarn = playerInBarn ? /* boolean */0 : intersectRectRect(/* tuple */[
            state$9[/* playerPos */2][/* x */0],
            state$9[/* playerPos */2][/* y */1]
          ], tileSizef, tileSizef, /* tuple */[
            4 * tileSizef,
            4 * tileSizef
          ], 320, 32 * 4);
    if (playerBehindBarn) {
      if (state$9[/* journal */9][/* dayIndex */0] >= 6) {
        image(state$9[/* shortDestroyedBarnAsset */19], /* tuple */[
              imul(5, tileSize),
              imul(7, tileSize)
            ], /* Some */[284], /* Some */[331], env);
      } else {
        drawAsset(imul(5, tileSize), (tileSize << 2), "short_barn_inside.png", state$9, env);
      }
    } else if (state$9[/* journal */9][/* dayIndex */0] >= 6) {
      drawAsset(imul(5, tileSize), (tileSize << 2), "destroyed_barn.png", state$9, env);
    } else {
      drawAsset(imul(5, tileSize), (tileSize << 2), "barn_inside.png", state$9, env);
    }
    drawAsset(imul(24, tileSize), imul(12, tileSize), "pond.png", state$9, env);
    drawAsset(imul(24, tileSize), imul(10, tileSize), "truck.png", state$9, env);
    drawAssetf(14.6 * tileSizef, 5.2 * tileSizef, "im_coming_home.png", state$9, env);
    iter((function (g) {
            return renderBefore(g, focusedObject$2, state$9, env);
          }), state$9[/* gameobjects */8]);
    var sortedGameObjects = sort((function (a, b) {
            return a[/* pos */0][/* y */1] - b[/* pos */0][/* y */1] | 0;
          }), state$9[/* gameobjects */8]);
    var firstGameObject = hd(sortedGameObjects);
    if (firstGameObject[/* pos */0][/* y */1] >= state$9[/* playerPos */2][/* y */1] + tileSizef / 2) {
      renderPlayer(state$9, env);
    }
    renderObject(firstGameObject, playerInBarn, playerBehindBarn, focusedObject$2, state$9, env);
    var lastGameObject = fold_left((function (prevGameOjbect, curGameObject) {
            var barnBottom = 256 + tileSizef * 9;
            if (!playerInBarn && prevGameOjbect[/* pos */0][/* y */1] < barnBottom - 8 - tileSizef / 2 && curGameObject[/* pos */0][/* y */1] >= barnBottom - 8 - tileSizef / 2) {
              if (state$9[/* journal */9][/* dayIndex */0] >= 6 && playerBehindBarn) {
                image(state$9[/* shortDestroyedBarnAsset */19], /* tuple */[
                      imul(5, tileSize),
                      imul(7, tileSize)
                    ], /* Some */[284], /* Some */[331], env);
              } else {
                var assetName = playerBehindBarn ? "short_barn_inside.png" : "barn_outside.png";
                drawAsset(imul(5, tileSize), (tileSize << 2), assetName, state$9, env);
              }
            }
            if (prevGameOjbect[/* pos */0][/* y */1] < state$9[/* playerPos */2][/* y */1] + tileSizef / 2 && curGameObject[/* pos */0][/* y */1] >= state$9[/* playerPos */2][/* y */1] + tileSizef / 2) {
              renderPlayer(state$9, env);
            }
            renderObject(curGameObject, playerInBarn, playerBehindBarn, focusedObject$2, state$9, env);
            return curGameObject;
          }), firstGameObject, tl(sortedGameObjects));
    if (lastGameObject[/* pos */0][/* y */1] < state$9[/* playerPos */2][/* y */1] + tileSizef / 2) {
      renderPlayer(state$9, env);
    }
    var state$10;
    if (state$9[/* dollarAnimation */10] >= 0) {
      pushStyle(env);
      tint(color(255, 255, 255, remapf(state$9[/* dollarAnimation */10], 0, 1.5, 255, 0) | 0), env);
      drawAssetf(25 * tileSizef, remapf(state$9[/* dollarAnimation */10], 0, 1.5, 10 * tileSizef, 7 * tileSizef), "dolla_dolla_bills.png", state$9, env);
      popStyle(env);
      if (state$9[/* dollarAnimation */10] > 1.5) {
        var newrecord$12 = state$9.slice();
        newrecord$12[/* dollarAnimation */10] = -1;
        state$10 = newrecord$12;
      } else {
        var newrecord$13 = state$9.slice();
        newrecord$13[/* dollarAnimation */10] = state$9[/* dollarAnimation */10] + dt;
        state$10 = newrecord$13;
      }
    } else {
      state$10 = state$9;
    }
    popStyle(env);
    popMatrix(env);
    if (state$10[/* night */12]) {
      drawAssetFullscreen("baby_its_dark_outside.png", state$10, env);
    }
    if (maybeBoss) {
      var match$12 = maybeBoss[0];
      var match$13 = match$12[/* state */2];
      if (typeof match$13 !== "number") {
        if (match$13.tag === 5) {
          var match$14 = match$13[0];
          var movePair = match$14[/* movePair */0];
          var match$15 = movePair[1];
          var x2 = match$15[/* x */0];
          var match$16 = movePair[0];
          var x1 = match$16[/* x */0];
          var match$17 = match$12[/* pos */0];
          var facing$5 = x1 > x2 ? /* LeftD */3 : (
              x1 < x2 ? /* RightD */2 : (
                  match$16[/* y */1] < match$15[/* y */1] ? /* DownD */1 : /* UpD */0
                )
            );
          if (facing$5 === /* DownD */1 && match$14[/* eatingTime */3] === 0) {
            pushMatrix(env);
            scale$9(2, 2, env);
            translate$4(-state$10[/* playerPos */2][/* x */0] + screenSize / 4 - tileSizef / 2, -state$10[/* playerPos */2][/* y */1] + screenSize / 4 - tileSizef / 2, env);
            drawAssetf(match$17[/* x */0], match$17[/* y */1] - tileSizef - 10, "eyes.png", state$10, env);
            popMatrix(env);
          }
          
        }
        
      }
      
    }
    renderAction(state$10, playerInBarn, finishedAllTasks, focusedObject$2, env);
    return renderTransition(state$10, env);
  }

  function loadAssetsAsync(filename) {
    return _2(Gl[/* File */1][/* readFile */0], filename, (function (jsonString) {
                  var json = parse$1(jsonString);
                  var things = Infix[/* |! */0](Infix[/* |?> */2](get$2("frames", json), array), "error");
                  var assets = fold_left((function (assets, thing) {
                          var frame = Infix[/* |! */0](get$2("frame", thing), "error");
                          var x = Infix[/* |! */0](Infix[/* |?> */2](get$2("x", frame), number), "error");
                          var y = Infix[/* |! */0](Infix[/* |?> */2](get$2("y", frame), number), "error");
                          var w = Infix[/* |! */0](Infix[/* |?> */2](get$2("w", frame), number), "error");
                          var h = Infix[/* |! */0](Infix[/* |?> */2](get$2("h", frame), number), "error");
                          var name = Infix[/* |! */0](Infix[/* |?> */2](get$2("filename", thing), string), "error");
                          var newAsset_000 = /* size : record */[
                            /* x */w,
                            /* y */h
                          ];
                          var newAsset_001 = /* pos : record */[
                            /* x */x,
                            /* y */y
                          ];
                          var newAsset = /* record */[
                            newAsset_000,
                            newAsset_001
                          ];
                          return _3(StringMap[/* add */3], name, newAsset, assets);
                        }), StringMap[/* empty */0], things);
                  return run((function (param) {
                                return setup(assets, param);
                              }), /* None */0, /* Some */[draw], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0);
                }));
  }

  loadAssetsAsync(basedirname$1 + "spritesheet/sheet.json");
  /*  Not a pure module */

  exports.mapString = mapString;
  exports.createGrid = createGrid;
  exports.renderPlayer = renderPlayer;
  exports.setup = setup;
  exports.draw = draw;
  exports.loadAssetsAsync = loadAssetsAsync;

  return exports;

}({}));
