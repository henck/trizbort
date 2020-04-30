var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("enums/Values", [], function (exports_1, context_1) {
    "use strict";
    var Values;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Values = /** @class */ (function () {
                function Values() {
                }
                Values.ZOOM_FRACTION = 1.2;
                Values.ZOOM_ADDITIVE = 0.1;
                Values.COLOR_TRANSPARENT = 'rgba(0,0,0,0.004)';
                Values.COLOR_LINE = '#000000';
                Values.COLOR_SELECTED_GLOW = 'rgba(255,215,0,0.5)';
                Values.COLOR_SELECTED = 'rgb(255,215,0)';
                Values.COLOR_HOVER = '#FF8C00';
                Values.COLOR_CONNECTOR = 'rgba(135, 206, 235, 0.5)';
                Values.COLOR_CONNECTOR_HIGHLIGHT = 'rgb(255,215,0)';
                Values.COLOR_RESIZE = 'rgba(135, 206, 235, 0.5)';
                Values.COLOR_RESIZE_HIGHLIGHT = 'rgb(255,215,0)';
                Values.COLOR_SELECTION_LINE = '#292B71';
                Values.COLOR_SELECTION_AREA = 'rgba(41, 43, 113, 0.4)';
                Values.COLOR_STARTROOM = 'green';
                Values.COLOR_ENDROOM = 'red';
                Values.COLORS_STANDARD = ['#FFFFFF', '#D5E5D6', '#D0E0F2', '#F6D5D5', '#F8DFD0', '#E0DDF6', '#DFDFDF', '#CCCCCC', '#333333', '#000000'];
                Values.DIMEN_ROOM_MIN_WIDTH = 64; // stay in values
                Values.DIMEN_ROOM_MIN_HEIGHT = 32; // stay in values
                Values.DIMEN_ROOM_MARGIN = 6;
                Values.DIMEN_STARTROOM_MARGIN = 3;
                Values.DIMEN_RESIZE_HANDLE = 6;
                Values.DIMEN_CONNECTOR_HANDLE = 5;
                Values.DIMEN_CONNECTOR_WIDE = 20;
                Values.VIEWS_FIRSTID = 100;
                return Values;
            }());
            exports_1("Values", Values);
        }
    };
});
System.register("enums/appEvent", [], function (exports_2, context_2) {
    "use strict";
    var AppEvent;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            (function (AppEvent) {
                AppEvent[AppEvent["Select"] = 0] = "Select";
                AppEvent[AppEvent["MouseMove"] = 1] = "MouseMove";
                AppEvent[AppEvent["Delete"] = 2] = "Delete";
                AppEvent[AppEvent["Load"] = 3] = "Load";
                AppEvent[AppEvent["Refresh"] = 4] = "Refresh";
                AppEvent[AppEvent["Redraw"] = 5] = "Redraw";
                AppEvent[AppEvent["More"] = 6] = "More";
                AppEvent[AppEvent["Added"] = 7] = "Added";
            })(AppEvent || (AppEvent = {}));
            exports_2("AppEvent", AppEvent);
        }
    };
});
System.register("dispatcher", [], function (exports_3, context_3) {
    "use strict";
    var Dispatcher;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Dispatcher = /** @class */ (function () {
                function Dispatcher() {
                }
                // Attach a new subscriber
                Dispatcher.subscribe = function (subscriber) {
                    Dispatcher.subscribers.push(subscriber);
                };
                // Remove a subscriber
                Dispatcher.unsubscribe = function (subscriber) {
                    Dispatcher.subscribers.splice(Dispatcher.subscribers.indexOf(subscriber), 1);
                };
                // Notify all subscribers of an event occurring on a model
                Dispatcher.notify = function (event, obj) {
                    for (var i = 0; i < Dispatcher.subscribers.length; i++) {
                        Dispatcher.subscribers[i].notify(event, obj);
                    }
                };
                Dispatcher.subscribers = new Array();
                return Dispatcher;
            }());
            exports_3("Dispatcher", Dispatcher);
        }
    };
});
System.register("io/xmlMap", [], function (exports_4, context_4) {
    "use strict";
    var XmlField, XmlMap;
    var __moduleName = context_4 && context_4.id;
    function Xml(path, defaultValue, transform) {
        return function (target, propertyKey) {
            XmlMap.addField(target, propertyKey, path, defaultValue, transform);
        };
    }
    exports_4("Xml", Xml);
    return {
        setters: [],
        execute: function () {
            XmlField = /** @class */ (function () {
                function XmlField(klass, property, path, defaultValue, transform) {
                    this.klass = klass;
                    this.property = property;
                    this.path = path;
                    this.defaultValue = defaultValue;
                    this.transform = transform;
                }
                XmlField.prototype.load = function (instance, node) {
                    // Get the node's attribute value:
                    var value = node.getAttribute(this.path);
                    // Use default value if attribute is empty
                    if (!value)
                        value = this.defaultValue;
                    // Transform the value if a transform function was provided:
                    if (this.transform)
                        value = this.transform(value);
                    // Assign the result to the property on the instance:
                    instance[this.property] = value;
                };
                return XmlField;
            }());
            XmlMap = /** @class */ (function () {
                function XmlMap() {
                }
                XmlMap.addField = function (klass, property, path, defaultValue, transform) {
                    this.fields.push(new XmlField(klass, property, path, defaultValue, transform));
                };
                // Load all the fields and attributes for a given object.
                XmlMap.load = function (instance, node) {
                    this.fields.forEach(function (field) {
                        // XMLMap contains rules for different classes. Only use
                        // rules for the instance provided:
                        if (instance instanceof field.klass.constructor) {
                            field.load(instance, node);
                        }
                    });
                };
                XmlMap.fields = new Array();
                return XmlMap;
            }());
            exports_4("XmlMap", XmlMap);
        }
    };
});
System.register("models/model", ["dispatcher", "enums/appEvent", "models/map", "io/xmlMap"], function (exports_5, context_5) {
    "use strict";
    var dispatcher_js_1, appEvent_js_1, map_js_1, xmlMap_1, Model;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (dispatcher_js_1_1) {
                dispatcher_js_1 = dispatcher_js_1_1;
            },
            function (appEvent_js_1_1) {
                appEvent_js_1 = appEvent_js_1_1;
            },
            function (map_js_1_1) {
                map_js_1 = map_js_1_1;
            },
            function (xmlMap_1_1) {
                xmlMap_1 = xmlMap_1_1;
            }
        ],
        execute: function () {
            Model = /** @class */ (function () {
                function Model() {
                    this.id = 0;
                    this._changed = true;
                }
                Object.defineProperty(Model.prototype, "type", {
                    get: function () {
                        return this._type;
                    },
                    set: function (value) {
                        this._type = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Model.prototype.getType = function () {
                    return this.type;
                };
                Object.defineProperty(Model.prototype, "isChanged", {
                    get: function () {
                        return this._changed;
                    },
                    enumerable: true,
                    configurable: true
                });
                Model.prototype.forceChanged = function () {
                    this._changed = true;
                };
                Model.prototype.unChanged = function () {
                    this._changed = false;
                };
                Model.prototype.delete = function () {
                    this.map.remove(this);
                    dispatcher_js_1.Dispatcher.notify(appEvent_js_1.AppEvent.Delete, this);
                };
                Model.prototype.cloneToTargetField = function (target, key) {
                    switch (key) {
                        case 'map':
                            if (!target[key])
                                target[key] = new map_js_1.Map();
                            target[key].clone(this.map);
                            break;
                        default:
                            if (typeof this[key] == 'object')
                                throw "'" + key + "' field is a complex type. cloneToTarget failed with " + this.type;
                            target[key] = this[key];
                            break;
                    }
                };
                Model.prototype.cloneToTarget = function (target) {
                    for (var key in this) {
                        if (this.hasOwnProperty(key)) {
                            this.cloneToTargetField(target, key);
                        }
                    }
                    return target;
                };
                Model.prototype.clone = function () {
                    return null;
                };
                Model.prototype.bringToFront = function () {
                    this.map.bringToFront(this);
                };
                Model.prototype.bringForward = function () {
                    this.map.bringForward(this);
                };
                Model.prototype.sendBackward = function () {
                    this.map.sendBackward(this);
                };
                Model.prototype.sendToBack = function () {
                    this.map.sendToBack(this);
                };
                Model.prototype.isBackwardOf = function (dst) {
                    return this.map.isBackward(this, dst);
                };
                __decorate([
                    xmlMap_1.Xml('id', 0, function (s) { return parseInt(s); })
                ], Model.prototype, "id", void 0);
                return Model;
            }());
            exports_5("Model", Model);
        }
    };
});
System.register("enums/direction", [], function (exports_6, context_6) {
    "use strict";
    var Direction;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            (function (Direction) {
                Direction[Direction["N"] = 0] = "N";
                Direction[Direction["NNE"] = 1] = "NNE";
                Direction[Direction["NE"] = 2] = "NE";
                Direction[Direction["ENE"] = 3] = "ENE";
                Direction[Direction["E"] = 4] = "E";
                Direction[Direction["ESE"] = 5] = "ESE";
                Direction[Direction["SE"] = 6] = "SE";
                Direction[Direction["SSE"] = 7] = "SSE";
                Direction[Direction["S"] = 8] = "S";
                Direction[Direction["SSW"] = 9] = "SSW";
                Direction[Direction["SW"] = 10] = "SW";
                Direction[Direction["WSW"] = 11] = "WSW";
                Direction[Direction["W"] = 12] = "W";
                Direction[Direction["WNW"] = 13] = "WNW";
                Direction[Direction["NW"] = 14] = "NW";
                Direction[Direction["NNW"] = 15] = "NNW";
            })(Direction || (Direction = {}));
            exports_6("Direction", Direction);
            (function (Direction) {
                function opposite(direction) {
                    switch (direction) {
                        case Direction.N: return Direction.S;
                        case Direction.NNE: return Direction.SSW;
                        case Direction.NE: return Direction.SW;
                        case Direction.ENE: return Direction.WSW;
                        case Direction.E: return Direction.W;
                        case Direction.ESE: return Direction.WNW;
                        case Direction.SE: return Direction.NW;
                        case Direction.SSE: return Direction.NNW;
                        case Direction.S: return Direction.N;
                        case Direction.SSW: return Direction.NNE;
                        case Direction.SW: return Direction.NE;
                        case Direction.WSW: return Direction.ENE;
                        case Direction.W: return Direction.E;
                        case Direction.WNW: return Direction.ESE;
                        case Direction.NW: return Direction.SE;
                        case Direction.NNW: return Direction.SSE;
                    }
                }
                Direction.opposite = opposite;
                //
                // Is this Direction a cardinal direction? 
                // NNE, ENE etc. are not cardinal directions.
                // 
                function isCardinal(direction) {
                    switch (direction) {
                        case Direction.N:
                        case Direction.NE:
                        case Direction.E:
                        case Direction.SE:
                        case Direction.S:
                        case Direction.SW:
                        case Direction.W:
                        case Direction.NW:
                            return true;
                    }
                    return false;
                }
                Direction.isCardinal = isCardinal;
                //
                // Convert direction into a vector.
                // Non-cardinal compass directions are converted to cardinal vectors.
                // That is, NNE become N, ENE becomes E etc.
                // 
                function toCardinalVector(direction) {
                    switch (direction) {
                        case Direction.N: return { x: 0, y: -1 };
                        case Direction.NNE: return { x: 0, y: -1 };
                        case Direction.NE: return { x: 1, y: -1 };
                        case Direction.ENE: return { x: 1, y: 0 };
                        case Direction.E: return { x: 1, y: 0 };
                        case Direction.ESE: return { x: 1, y: 0 };
                        case Direction.SE: return { x: 1, y: 1 };
                        case Direction.SSE: return { x: 0, y: 1 };
                        case Direction.S: return { x: 0, y: 1 };
                        case Direction.SSW: return { x: 0, y: 1 };
                        case Direction.SW: return { x: -1, y: 1 };
                        case Direction.WSW: return { x: -1, y: 0 };
                        case Direction.W: return { x: -1, y: 0 };
                        case Direction.WNW: return { x: -1, y: 0 };
                        case Direction.NW: return { x: -1, y: -1 };
                        case Direction.NNW: return { x: 0, y: -1 };
                    }
                }
                Direction.toCardinalVector = toCardinalVector;
                // 
                // Convert Direction into a vector. 
                //
                function toVector(direction) {
                    switch (direction) {
                        case Direction.N: return { x: 0, y: -1 };
                        case Direction.NNE: return { x: 0.5, y: -1 };
                        case Direction.NE: return { x: 1, y: -1 };
                        case Direction.ENE: return { x: 1, y: -0.5 };
                        case Direction.E: return { x: 1, y: 0 };
                        case Direction.ESE: return { x: 1, y: 0.5 };
                        case Direction.SE: return { x: 1, y: 1 };
                        case Direction.SSE: return { x: 0.5, y: 1 };
                        case Direction.S: return { x: 0, y: 1 };
                        case Direction.SSW: return { x: -0.5, y: 1 };
                        case Direction.SW: return { x: -1, y: 1 };
                        case Direction.WSW: return { x: -1, y: 0.5 };
                        case Direction.W: return { x: -1, y: 0 };
                        case Direction.WNW: return { x: -1, y: -0.5 };
                        case Direction.NW: return { x: -1, y: -1 };
                        case Direction.NNW: return { x: -0.5, y: -1 };
                    }
                }
                Direction.toVector = toVector;
                // 
                // Convert Direction into an angle expressed in radians (E = 0).
                // This is used for determining points on ellipses.
                // 
                function toRadians(direction) {
                    switch (direction) {
                        case Direction.N: return Math.PI * 12 / 8;
                        case Direction.NNE: return Math.PI * 13 / 8;
                        case Direction.NE: return Math.PI * 14 / 8;
                        case Direction.ENE: return Math.PI * 15 / 8;
                        case Direction.E: return Math.PI * 0 / 8;
                        case Direction.ESE: return Math.PI * 1 / 8;
                        case Direction.SE: return Math.PI * 2 / 8;
                        case Direction.SSE: return Math.PI * 3 / 8;
                        case Direction.S: return Math.PI * 4 / 8;
                        case Direction.SSW: return Math.PI * 5 / 8;
                        case Direction.SW: return Math.PI * 6 / 8;
                        case Direction.WSW: return Math.PI * 7 / 8;
                        case Direction.W: return Math.PI * 8 / 8;
                        case Direction.WNW: return Math.PI * 9 / 8;
                        case Direction.NW: return Math.PI * 10 / 8;
                        case Direction.NNW: return Math.PI * 11 / 8;
                    }
                }
                Direction.toRadians = toRadians;
                function toCursor(direction) {
                    switch (direction) {
                        case Direction.N: return 'n-resize';
                        case Direction.NE: return 'ne-resize';
                        case Direction.E: return 'e-resize';
                        case Direction.SE: return 'se-resize';
                        case Direction.S: return 's-resize';
                        case Direction.SW: return 'sw-resize';
                        case Direction.W: return 'w-resize';
                        case Direction.NW: return 'nw-resize';
                    }
                }
                Direction.toCursor = toCursor;
                function fromString(s) {
                    s = s.toLowerCase();
                    if (s == 'n')
                        return Direction.N;
                    if (s == 'nne')
                        return Direction.NNE;
                    if (s == 'ne')
                        return Direction.NE;
                    if (s == 'ene')
                        return Direction.ENE;
                    if (s == 'e')
                        return Direction.E;
                    if (s == 'ese')
                        return Direction.ESE;
                    if (s == 'se')
                        return Direction.SE;
                    if (s == 'sse')
                        return Direction.SSE;
                    if (s == 's')
                        return Direction.S;
                    if (s == 'ssw')
                        return Direction.SSW;
                    if (s == 'sw')
                        return Direction.SW;
                    if (s == 'wsw')
                        return Direction.WSW;
                    if (s == 'w')
                        return Direction.W;
                    if (s == 'wnw')
                        return Direction.WNW;
                    if (s == 'nw')
                        return Direction.NW;
                    if (s == 'nnw')
                        return Direction.NNW;
                    return undefined;
                }
                Direction.fromString = fromString;
            })(Direction || (Direction = {}));
            exports_6("Direction", Direction);
        }
    };
});
System.register("enums/connectorHandle", [], function (exports_7, context_7) {
    "use strict";
    var ConnectorHandle;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            (function (ConnectorHandle) {
                ConnectorHandle[ConnectorHandle["Start"] = 0] = "Start";
                ConnectorHandle[ConnectorHandle["End"] = 1] = "End";
            })(ConnectorHandle || (ConnectorHandle = {}));
            exports_7("ConnectorHandle", ConnectorHandle);
        }
    };
});
System.register("enums/connectorType", [], function (exports_8, context_8) {
    "use strict";
    var ConnectorType;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            (function (ConnectorType) {
                ConnectorType[ConnectorType["Default"] = 0] = "Default";
                ConnectorType[ConnectorType["In"] = 1] = "In";
                ConnectorType[ConnectorType["Out"] = 2] = "Out";
                ConnectorType[ConnectorType["Up"] = 3] = "Up";
                ConnectorType[ConnectorType["Down"] = 4] = "Down";
            })(ConnectorType || (ConnectorType = {}));
            exports_8("ConnectorType", ConnectorType);
            (function (ConnectorType) {
                function toString(type) {
                    switch (type) {
                        case ConnectorType.In: return 'in';
                        case ConnectorType.Out: return 'out';
                        case ConnectorType.Up: return 'up';
                        case ConnectorType.Down: return 'dn';
                        default:
                            return '';
                    }
                }
                ConnectorType.toString = toString;
            })(ConnectorType || (ConnectorType = {}));
            exports_8("ConnectorType", ConnectorType);
        }
    };
});
System.register("enums/lineStyle", [], function (exports_9, context_9) {
    "use strict";
    var LineStyle;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
            (function (LineStyle) {
                LineStyle[LineStyle["None"] = 0] = "None";
                LineStyle[LineStyle["Solid"] = 1] = "Solid";
                LineStyle[LineStyle["Dash"] = 2] = "Dash";
                LineStyle[LineStyle["DashDot"] = 3] = "DashDot";
                LineStyle[LineStyle["DashDotDot"] = 4] = "DashDotDot";
                LineStyle[LineStyle["Dot"] = 5] = "Dot";
            })(LineStyle || (LineStyle = {}));
            exports_9("LineStyle", LineStyle);
            (function (LineStyle) {
                function fromString(s) {
                    s = s.toLowerCase();
                    if (s == 'none')
                        return LineStyle.None;
                    if (s == 'solid')
                        return LineStyle.Solid;
                    if (s == 'dash')
                        return LineStyle.Dash;
                    if (s == 'dashdot')
                        return LineStyle.DashDot;
                    if (s == 'dashdotdot')
                        return LineStyle.DashDotDot;
                    if (s == 'dot')
                        return LineStyle.Dot;
                    return undefined;
                }
                LineStyle.fromString = fromString;
                function toArray(style) {
                    switch (style) {
                        case LineStyle.Solid: return [];
                        case LineStyle.Dash: return [8, 4];
                        case LineStyle.DashDot: return [4, 4];
                        case LineStyle.DashDotDot:
                            return [2, 3];
                            ;
                        case LineStyle.Dot: return [3, 2, 2, 2, 4, 2, 2, 2, 3, 2];
                    }
                    return [];
                }
                LineStyle.toArray = toArray;
            })(LineStyle || (LineStyle = {}));
            exports_9("LineStyle", LineStyle);
        }
    };
});
System.register("enums/mouseMode", [], function (exports_10, context_10) {
    "use strict";
    var MouseMode;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            (function (MouseMode) {
                MouseMode[MouseMode["None"] = 0] = "None";
                MouseMode[MouseMode["Select"] = 1] = "Select";
                MouseMode[MouseMode["Drag"] = 2] = "Drag";
                MouseMode[MouseMode["Resize"] = 3] = "Resize";
                MouseMode[MouseMode["Connect"] = 4] = "Connect";
                MouseMode[MouseMode["Scroll"] = 5] = "Scroll";
                MouseMode[MouseMode["AddRoom"] = 6] = "AddRoom";
                MouseMode[MouseMode["AddNote"] = 7] = "AddNote";
                MouseMode[MouseMode["AddBlock"] = 8] = "AddBlock";
            })(MouseMode || (MouseMode = {}));
            exports_10("MouseMode", MouseMode);
        }
    };
});
System.register("enums/objectKind", [], function (exports_11, context_11) {
    "use strict";
    var ObjectKind;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
            (function (ObjectKind) {
                ObjectKind[ObjectKind["PersonMale"] = 0] = "PersonMale";
                ObjectKind[ObjectKind["PersonFemale"] = 1] = "PersonFemale";
                ObjectKind[ObjectKind["PersonNeuter"] = 2] = "PersonNeuter";
                ObjectKind[ObjectKind["ProperNamed"] = 3] = "ProperNamed";
                ObjectKind[ObjectKind["Actor"] = 4] = "Actor";
                ObjectKind[ObjectKind["Item"] = 5] = "Item";
                ObjectKind[ObjectKind["Scenery"] = 6] = "Scenery";
                ObjectKind[ObjectKind["Supporter"] = 7] = "Supporter";
                ObjectKind[ObjectKind["Container"] = 8] = "Container";
                ObjectKind[ObjectKind["SingularNamed"] = 9] = "SingularNamed";
                ObjectKind[ObjectKind["PluralNamed"] = 10] = "PluralNamed";
            })(ObjectKind || (ObjectKind = {}));
            exports_11("ObjectKind", ObjectKind);
        }
    };
});
System.register("enums/roomShape", [], function (exports_12, context_12) {
    "use strict";
    var RoomShape;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
            (function (RoomShape) {
                RoomShape[RoomShape["Rectangle"] = 0] = "Rectangle";
                RoomShape[RoomShape["Ellipse"] = 1] = "Ellipse";
                RoomShape[RoomShape["Octagon"] = 2] = "Octagon";
            })(RoomShape || (RoomShape = {}));
            exports_12("RoomShape", RoomShape);
        }
    };
});
System.register("enums/enums", ["enums/appEvent", "enums/direction", "enums/connectorHandle", "enums/connectorType", "enums/lineStyle", "enums/mouseMode", "enums/objectKind", "enums/roomShape", "enums/Values"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters: [
            function (appEvent_js_2_1) {
                exportStar_1(appEvent_js_2_1);
            },
            function (direction_js_1_1) {
                exportStar_1(direction_js_1_1);
                exportStar_1(direction_js_1_1);
            },
            function (connectorHandle_js_1_1) {
                exportStar_1(connectorHandle_js_1_1);
            },
            function (connectorType_js_1_1) {
                exportStar_1(connectorType_js_1_1);
            },
            function (lineStyle_js_1_1) {
                exportStar_1(lineStyle_js_1_1);
            },
            function (mouseMode_js_1_1) {
                exportStar_1(mouseMode_js_1_1);
            },
            function (objectKind_js_1_1) {
                exportStar_1(objectKind_js_1_1);
            },
            function (roomShape_js_1_1) {
                exportStar_1(roomShape_js_1_1);
            },
            function (values_js_1_1) {
                exportStar_1(values_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("models/mapSettings", ["enums/enums"], function (exports_14, context_14) {
    "use strict";
    var enums_1, fontSettings, MapSettingsGrid, MapSettingsRoom, MapSettingsConnector, MapSettingsNote, MapSettingsBlock, MapSettingsDraw, MapSettings;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }
        ],
        execute: function () {
            fontSettings = /** @class */ (function () {
                function fontSettings() {
                }
                return fontSettings;
            }());
            exports_14("fontSettings", fontSettings);
            MapSettingsGrid = /** @class */ (function () {
                function MapSettingsGrid() {
                    this.visible = true;
                    this.origin = true;
                    this.snap = true;
                    this.size = 32;
                    this.color = '#f0f0f0';
                    this.lineWidth = 1;
                    this.originWidth = 5;
                    this.background = '#ffffff';
                }
                return MapSettingsGrid;
            }());
            MapSettingsRoom = /** @class */ (function () {
                function MapSettingsRoom() {
                    this.width = 96;
                    this.height = 64;
                    this.margin = 6; // todo
                    this.lineWidth = 2;
                    this.lineStyle = enums_1.LineStyle.Solid;
                    this.shape = enums_1.RoomShape.Rectangle;
                    this.rounding = 0;
                    this.darknessSize = 50;
                    this.fillColor = '#ffffff';
                    this.borderColor = '#000000';
                    this.nameColor = '#333333';
                    this.subtitleColor = '#666666';
                    this.darkColor = 'rgba(33, 35, 97, 0.8)';
                    this.startRoomColor = 'green';
                    this.endRoomColor = 'red';
                    this.fontCfg = function (hand, mode) { var res = (hand ? { size: 13.0, family: 'danielbd' } : { size: 14.4, family: 'Roboto' }); return (mode == 'obj' ? res : res.size + "px " + res.family); };
                    this.font2Cfg = function (hand, mode) { var res = (hand ? { size: 11.0, family: 'danielbd' } : { size: 11.8, family: 'Roboto' }); return (mode == 'obj' ? res : res.size + "px " + res.family); };
                }
                return MapSettingsRoom;
            }());
            MapSettingsConnector = /** @class */ (function () {
                function MapSettingsConnector() {
                    this.lineWidth = 1;
                    this.lineStyle = enums_1.LineStyle.Solid;
                    this.isCurve = false;
                    this.color = '#000000';
                    this.stalk = 16;
                    this.arrowSize = 5;
                    this.curveStrength = 0.4;
                    this.labelDistance = 12;
                    this.fontCfg = function (hand, mode) { var res = (hand ? { size: 11.8, family: 'danielbd' } : { size: 12.8, family: 'Roboto' }); return (mode == 'obj' ? res : res.size + "px " + res.family); };
                    this.font2Cfg = function (hand, mode) { var res = (hand ? { size: 9.8, family: 'danielbd' } : { size: 10.8, family: 'Roboto' }); return (mode == 'obj' ? res : res.size + "px " + res.family); };
                }
                return MapSettingsConnector;
            }());
            MapSettingsNote = /** @class */ (function () {
                function MapSettingsNote() {
                    this.minWidth = 64;
                    this.minHeight = 32;
                    this.width = 96;
                    this.height = 64;
                    this.margin = 6; // todo
                    this.lineWidth = 1;
                    this.lineStyle = enums_1.LineStyle.Solid;
                    this.shape = enums_1.RoomShape.Rectangle;
                    this.rounding = 0;
                    this.fillColor = '#ffffff';
                    this.borderColor = '#000000';
                    this.textColor = '#333333';
                    this.fontCfg = function (hand, mode) { var res = (hand ? { size: 13.0, family: 'danielbd' } : { size: 14.4, family: 'Roboto' }); return (mode == 'obj' ? res : res.size + "px " + res.family); };
                }
                return MapSettingsNote;
            }());
            MapSettingsBlock = /** @class */ (function () {
                function MapSettingsBlock() {
                    this.minWidth = 64;
                    this.minHeight = 32;
                    this.width = 96;
                    this.height = 64;
                    this.margin = 6; // todo
                    this.lineWidth = 1;
                    this.lineStyle = enums_1.LineStyle.None;
                    this.shape = enums_1.RoomShape.Rectangle;
                    this.rounding = 0;
                    this.fillColor = '#D5E5D6';
                    this.borderColor = '#000000';
                }
                return MapSettingsBlock;
            }());
            MapSettingsDraw = /** @class */ (function () {
                function MapSettingsDraw() {
                    this.hand = false;
                }
                return MapSettingsDraw;
            }());
            MapSettings = /** @class */ (function () {
                function MapSettings() {
                    this.grid = new MapSettingsGrid();
                    this.room = new MapSettingsRoom();
                    this.connector = new MapSettingsConnector();
                    this.note = new MapSettingsNote();
                    this.block = new MapSettingsBlock();
                    this.draw = new MapSettingsDraw();
                }
                MapSettings.prototype.cloneToTarget = function (src, target) {
                    for (var key in src) {
                        if (src.hasOwnProperty(key)) {
                            target[key] = src[key];
                        }
                    }
                };
                //
                // Given a settings-like object, clone it into a real
                // MapSettings instance and return it.
                // 
                MapSettings.prototype.cloneFrom = function (src) {
                    var settings = src;
                    this.cloneToTarget(settings.grid, this.grid);
                    this.cloneToTarget(settings.room, this.room);
                    this.cloneToTarget(settings.connector, this.connector);
                    this.cloneToTarget(settings.note, this.note);
                    this.cloneToTarget(settings.block, this.block);
                    this.cloneToTarget(settings.draw, this.draw);
                    return this;
                };
                return MapSettings;
            }());
            exports_14("MapSettings", MapSettings);
        }
    };
});
System.register("models/box", ["models/model", "enums/enums"], function (exports_15, context_15) {
    "use strict";
    var model_js_1, enums_js_1, Box;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (model_js_1_1) {
                model_js_1 = model_js_1_1;
            },
            function (enums_js_1_1) {
                enums_js_1 = enums_js_1_1;
            }
        ],
        execute: function () {
            Box = /** @class */ (function (_super) {
                __extends(Box, _super);
                function Box(settings) {
                    var _this = _super.call(this) || this;
                    _this._x = 0;
                    _this._y = 0;
                    return _this;
                }
                Object.defineProperty(Box.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (val) {
                        this._x = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (val) {
                        this._y = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "width", {
                    get: function () {
                        return this._w;
                    },
                    set: function (val) {
                        this._w = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "height", {
                    get: function () {
                        return this._h;
                    },
                    set: function (val) {
                        this._h = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "fillColor", {
                    get: function () {
                        return this._fillColor;
                    },
                    set: function (color) {
                        this._fillColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "borderColor", {
                    get: function () {
                        return this._borderColor;
                    },
                    set: function (color) {
                        this._borderColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "rounding", {
                    get: function () {
                        return this._rounding;
                    },
                    set: function (r) {
                        this._rounding = r;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "shape", {
                    get: function () {
                        return this._shape;
                    },
                    set: function (s) {
                        this._shape = s;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "lineStyle", {
                    get: function () {
                        return this._lineStyle;
                    },
                    set: function (style) {
                        this._lineStyle = style;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Box.prototype, "lineWidth", {
                    get: function () {
                        return this._lineWidth;
                    },
                    set: function (width) {
                        this._lineWidth = width;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Convert a direction to a canvas position on the room's edge.
                // 
                Box.prototype.directionToPos = function (dir, forceRectangle) {
                    var x = 0;
                    var y = 0;
                    if (this.shape == enums_js_1.RoomShape.Rectangle || forceRectangle) {
                        var _a = enums_js_1.Direction.toVector(dir), vx = _a.x, vy = _a.y;
                        x = Math.floor(vx * (this._w / 2) + this._w / 2) + this._x;
                        y = Math.floor(vy * (this._h / 2) + this._h / 2) + this._y;
                        // Find room rounding radius. It must never be greater than 1/4 of the room's side.
                        // The following code does nothing if rounding = 0.
                        var r = this.rounding;
                        if (r > this._w * 0.25)
                            r = this._w * 0.25;
                        if (r > this._h * 0.25)
                            r = this._h * 0.25;
                        // Calculate the shift along the x or y axis.
                        var rdist = r - Math.sqrt(r * r / 2);
                        // Diagonal directions must lie exactly in the middle of the rounded corner;
                        if (dir == enums_js_1.Direction.NW) {
                            x = x + rdist;
                            y = y + rdist;
                        }
                        if (dir == enums_js_1.Direction.NE) {
                            x = x - rdist;
                            y = y + rdist;
                        }
                        if (dir == enums_js_1.Direction.SE) {
                            x = x - rdist;
                            y = y - rdist;
                        }
                        if (dir == enums_js_1.Direction.SW) {
                            x = x + rdist;
                            y = y - rdist;
                        }
                    }
                    else if (this.shape == enums_js_1.RoomShape.Ellipse) {
                        x = Math.floor(Math.cos(enums_js_1.Direction.toRadians(dir)) * (this.width / 2) + this.width / 2) + this.x;
                        y = Math.floor(Math.sin(enums_js_1.Direction.toRadians(dir)) * (this.height / 2) + this.height / 2) + this.y;
                    }
                    else if (this.shape == enums_js_1.RoomShape.Octagon) {
                        var _b = enums_js_1.Direction.toVector(dir), vx = _b.x, vy = _b.y;
                        // If a diagonal direction (NE, SE, SW, NW):
                        if (Math.abs(vx) == 1 && Math.abs(vy) == 1) {
                            vx = vx * 0.75;
                            vy = vy * 0.75;
                        }
                        x = Math.floor(vx * (this.width / 2) + this.width / 2) + this.x;
                        y = Math.floor(vy * (this.height / 2) + this.height / 2) + this.y;
                    }
                    return { x: x, y: y };
                };
                return Box;
            }(model_js_1.Model));
            exports_15("Box", Box);
        }
    };
});
System.register("models/connector", ["models/model", "enums/enums", "models/mapSettings", "enums/connectorType"], function (exports_16, context_16) {
    "use strict";
    var model_js_2, enums_js_2, mapSettings_js_1, connectorType_js_2, Connector;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (model_js_2_1) {
                model_js_2 = model_js_2_1;
            },
            function (enums_js_2_1) {
                enums_js_2 = enums_js_2_1;
            },
            function (mapSettings_js_1_1) {
                mapSettings_js_1 = mapSettings_js_1_1;
            },
            function (connectorType_js_2_1) {
                connectorType_js_2 = connectorType_js_2_1;
            }
        ],
        execute: function () {
            Connector = /** @class */ (function (_super) {
                __extends(Connector, _super);
                function Connector(settings) {
                    var _this = _super.call(this) || this;
                    _this._type = "Connector";
                    _this._name = '';
                    _this._dockStart = null;
                    _this._dockEnd = null;
                    _this._startDir = enums_js_2.Direction.N;
                    _this._endDir = enums_js_2.Direction.S;
                    _this._startX = _this.startY = 0;
                    _this._endX = _this.endY = 0;
                    _this._oneWay = false;
                    _this._startType = connectorType_js_2.ConnectorType.Default;
                    _this._endType = connectorType_js_2.ConnectorType.Default;
                    _this._startLabel = '';
                    _this._endLabel = '';
                    return _this;
                }
                Object.defineProperty(Connector.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "startX", {
                    get: function () {
                        return this._startX;
                    },
                    set: function (value) {
                        this._startX = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "startY", {
                    get: function () {
                        return this._startY;
                    },
                    set: function (value) {
                        this._startY = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "endX", {
                    get: function () {
                        return this._endX;
                    },
                    set: function (value) {
                        this._endX = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "endY", {
                    get: function () {
                        return this._endY;
                    },
                    set: function (value) {
                        this._endY = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "dockStart", {
                    get: function () {
                        return this._dockStart;
                    },
                    set: function (value) {
                        this._dockStart = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "dockEnd", {
                    get: function () {
                        return this._dockEnd;
                    },
                    set: function (value) {
                        this._dockEnd = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "startDir", {
                    get: function () {
                        return this._startDir;
                    },
                    set: function (value) {
                        this._startDir = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "endDir", {
                    get: function () {
                        return this._endDir;
                    },
                    set: function (value) {
                        this._endDir = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "oneWay", {
                    get: function () {
                        return this._oneWay;
                    },
                    set: function (value) {
                        this._oneWay = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "startType", {
                    get: function () {
                        return this._startType;
                    },
                    set: function (value) {
                        this._startType = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "endType", {
                    get: function () {
                        return this._endType;
                    },
                    set: function (value) {
                        this._endType = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "startLabel", {
                    get: function () {
                        return this._startLabel;
                    },
                    set: function (value) {
                        this._startLabel = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "endLabel", {
                    get: function () {
                        return this._endLabel;
                    },
                    set: function (value) {
                        this._endLabel = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "color", {
                    get: function () {
                        return this._color != null ? this._color : this.map.settings.connector.color;
                    },
                    set: function (c) {
                        this._color = c;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "lineStyle", {
                    get: function () {
                        return this._lineStyle != null ? this._lineStyle : this.map.settings.connector.lineStyle;
                    },
                    set: function (style) {
                        this._lineStyle = style;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "lineWidth", {
                    get: function () {
                        return this._lineWidth != null ? this._lineWidth : this.map.settings.connector.lineWidth;
                    },
                    set: function (width) {
                        this._lineWidth = width;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Connector.prototype, "isCurve", {
                    get: function () {
                        return this._isCurve != null ? this._isCurve : this.map.settings.connector.isCurve;
                    },
                    set: function (curve) {
                        this._isCurve = curve;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Connector.prototype.reverse = function () {
                    var _a, _b;
                    if (!this.isDoubleDocked())
                        return;
                    _a = [this.dockStart, this.dockEnd], this.dockEnd = _a[0], this.dockStart = _a[1];
                    _b = [this.startDir, this.endDir], this.endDir = _b[0], this.startDir = _b[1];
                };
                Connector.prototype.isDoubleDocked = function () {
                    return this.dockStart && this.dockEnd;
                };
                Connector.prototype.clone = function () {
                    return this.cloneToTarget(new Connector(new mapSettings_js_1.MapSettings()));
                };
                return Connector;
            }(model_js_2.Model));
            exports_16("Connector", Connector);
        }
    };
});
System.register("models/obj", ["enums/enums", "models/model"], function (exports_17, context_17) {
    "use strict";
    var enums_2, model_1, Obj;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (enums_2_1) {
                enums_2 = enums_2_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            }
        ],
        execute: function () {
            Obj = /** @class */ (function (_super) {
                __extends(Obj, _super);
                function Obj() {
                    var _this = _super.call(this) || this;
                    _this._name = "Object";
                    _this._type = "Object";
                    _this._description = "";
                    _this._kind = enums_2.ObjectKind.Item;
                    _this._content = new Array();
                    return _this;
                }
                Object.defineProperty(Obj.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Obj.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Obj.prototype, "content", {
                    get: function () {
                        return this._content;
                    },
                    set: function (value) {
                        this._content = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Obj.prototype, "kind", {
                    get: function () {
                        return this._kind;
                    },
                    set: function (value) {
                        this._kind = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Obj;
            }(model_1.Model));
            exports_17("Obj", Obj);
        }
    };
});
System.register("models/room", ["models/box", "models/mapSettings", "models/connector"], function (exports_18, context_18) {
    "use strict";
    var box_js_1, mapSettings_js_2, connector_js_1, Room;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (box_js_1_1) {
                box_js_1 = box_js_1_1;
            },
            function (mapSettings_js_2_1) {
                mapSettings_js_2 = mapSettings_js_2_1;
            },
            function (connector_js_1_1) {
                connector_js_1 = connector_js_1_1;
            }
        ],
        execute: function () {
            Room = /** @class */ (function (_super) {
                __extends(Room, _super);
                function Room(settings) {
                    var _this = _super.call(this, settings) || this;
                    _this._type = "Room";
                    _this._name = 'Room';
                    _this._subtitle = '';
                    _this._description = '';
                    _this._dark = false;
                    _this._endroom = false;
                    _this._w = settings.room.width;
                    _this._h = settings.room.height;
                    _this.objects = new Array();
                    return _this;
                }
                Object.defineProperty(Room.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (val) {
                        this._name = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Room.prototype, "subtitle", {
                    get: function () {
                        return this._subtitle;
                    },
                    set: function (val) {
                        this._subtitle = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Room.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (val) {
                        this._description = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Room.prototype, "dark", {
                    get: function () {
                        return this._dark;
                    },
                    set: function (val) {
                        this._dark = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(Room.prototype, "endroom", {
                    get: function () {
                        return this._endroom;
                    },
                    set: function (val) {
                        this._endroom = val;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                ;
                ;
                ;
                ;
                ;
                Object.defineProperty(Room.prototype, "nameColor", {
                    get: function () {
                        if (!this._nameColor)
                            return this.map.settings.room.nameColor;
                        return this._nameColor;
                    },
                    set: function (color) {
                        this._nameColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "subtitleColor", {
                    get: function () {
                        if (!this._subtitleColor)
                            return this.map.settings.room.subtitleColor;
                        return this._subtitleColor;
                    },
                    set: function (color) {
                        this._subtitleColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "fillColor", {
                    get: function () {
                        return this._fillColor ? this._fillColor : this.map.settings.room.fillColor;
                    },
                    set: function (color) {
                        this._fillColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "borderColor", {
                    get: function () {
                        return this._borderColor ? this._borderColor : this.map.settings.room.borderColor;
                    },
                    set: function (color) {
                        this._borderColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "rounding", {
                    get: function () {
                        return this._rounding != null ? this._rounding : this.map.settings.room.rounding;
                    },
                    set: function (r) {
                        this._rounding = r;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "shape", {
                    get: function () {
                        return this._shape != undefined ? this._shape : this.map.settings.room.shape;
                    },
                    set: function (s) {
                        this._shape = s;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "lineStyle", {
                    get: function () {
                        return this._lineStyle != null ? this._lineStyle : this.map.settings.room.lineStyle;
                    },
                    set: function (style) {
                        this._lineStyle = style;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "lineWidth", {
                    get: function () {
                        return this._lineWidth != null ? this._lineWidth : this.map.settings.room.lineWidth;
                    },
                    set: function (width) {
                        this._lineWidth = width;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Room.prototype.isStartRoom = function () {
                    return this.map.startRoom == this;
                };
                Room.prototype.setStartRoom = function (isStartRoom) {
                    if (isStartRoom) {
                        this.map.setStartRoom(this);
                    }
                    else {
                        if (this.isStartRoom)
                            this.map.setStartRoom(null);
                    }
                    this._changed = true;
                };
                // Returns true if this room has a connector in the specified direction.
                Room.prototype.hasConnection = function (dir) {
                    var _this = this;
                    var found = false;
                    this.map.elements.forEach(function (model) {
                        if (model instanceof connector_js_1.Connector) {
                            if (model.dockStart == _this && model.startDir == dir)
                                found = true;
                            if (model.dockEnd == _this && model.endDir == dir)
                                found = true;
                        }
                    });
                    return found;
                };
                Room.prototype.cloneToTargetField = function (target, key) {
                    switch (key) {
                        case 'objects':
                            target[key] = this.objects.slice(0);
                            break;
                        default:
                            _super.prototype.cloneToTargetField.call(this, target, key);
                            break;
                    }
                };
                Room.prototype.clone = function () {
                    return this.cloneToTarget(new Room(new mapSettings_js_2.MapSettings()));
                };
                Object.defineProperty(Room.prototype, "connectors", {
                    // 
                    // List of connectors that connect this room to 
                    // another room.
                    // 
                    get: function () {
                        var _this = this;
                        return this.map.elements.filter(function (conn) {
                            return conn instanceof connector_js_1.Connector
                                && conn.dockStart
                                && conn.dockEnd
                                && (conn.dockStart == _this || conn.dockEnd == _this);
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Room.prototype, "connections", {
                    // 
                    // List of StartDirection, StartType, EndDirection, EndType, Room tuples representing connections
                    // from this room.
                    //
                    // This is of use for code generators who are interested in all connections starting OR
                    // ending at this room.
                    // 
                    get: function () {
                        var _this = this;
                        var connectors = this.connectors;
                        return connectors.map(function (conn) {
                            if (conn.dockStart == _this) {
                                return { startDir: conn.startDir, startType: conn.startType, endDir: conn.endDir, endType: conn.endType, room: conn.dockEnd };
                            }
                            else {
                                return { startDir: conn.endDir, startType: conn.endType, endDir: conn.startDir, endType: conn.startType, room: conn.dockStart };
                            }
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                return Room;
            }(box_js_1.Box));
            exports_18("Room", Room);
        }
    };
});
System.register("models/block", ["models/box", "models/mapSettings"], function (exports_19, context_19) {
    "use strict";
    var box_js_2, mapSettings_js_3, Block;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (box_js_2_1) {
                box_js_2 = box_js_2_1;
            },
            function (mapSettings_js_3_1) {
                mapSettings_js_3 = mapSettings_js_3_1;
            }
        ],
        execute: function () {
            Block = /** @class */ (function (_super) {
                __extends(Block, _super);
                function Block(settings) {
                    var _this = _super.call(this, settings) || this;
                    _this._type = 'Block';
                    _this._w = settings.block.width;
                    _this._h = settings.block.height;
                    return _this;
                }
                Object.defineProperty(Block.prototype, "fillColor", {
                    get: function () {
                        return this._fillColor ? this._fillColor : this.map.settings.block.fillColor;
                    },
                    set: function (color) {
                        this._fillColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Block.prototype, "borderColor", {
                    get: function () {
                        return this._borderColor ? this._borderColor : this.map.settings.block.borderColor;
                    },
                    set: function (color) {
                        this._borderColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Block.prototype, "rounding", {
                    get: function () {
                        return this._rounding != null ? this._rounding : this.map.settings.block.rounding;
                    },
                    set: function (r) {
                        this._rounding = r;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Block.prototype, "shape", {
                    get: function () {
                        return this._shape != null ? this._shape : this.map.settings.block.shape;
                    },
                    set: function (s) {
                        this._shape = s;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Block.prototype, "lineStyle", {
                    get: function () {
                        return this._lineStyle != null ? this._lineStyle : this.map.settings.block.lineStyle;
                    },
                    set: function (style) {
                        this._lineStyle = style;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Block.prototype, "lineWidth", {
                    get: function () {
                        return this._lineWidth != null ? this._lineWidth : this.map.settings.block.lineWidth;
                    },
                    set: function (width) {
                        this._lineWidth = width;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Block.prototype.clone = function () {
                    return this.cloneToTarget(new Block(new mapSettings_js_3.MapSettings()));
                };
                return Block;
            }(box_js_2.Box));
            exports_19("Block", Block);
        }
    };
});
System.register("models/note", ["models/box", "models/mapSettings"], function (exports_20, context_20) {
    "use strict";
    var box_js_3, mapSettings_js_4, Note;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (box_js_3_1) {
                box_js_3 = box_js_3_1;
            },
            function (mapSettings_js_4_1) {
                mapSettings_js_4 = mapSettings_js_4_1;
            }
        ],
        execute: function () {
            Note = /** @class */ (function (_super) {
                __extends(Note, _super);
                function Note(settings) {
                    var _this = _super.call(this, settings) || this;
                    _this.type = 'Note';
                    _this.text = 'Note';
                    _this._w = settings.note.width;
                    _this._h = settings.note.height;
                    return _this;
                }
                Object.defineProperty(Note.prototype, "text", {
                    get: function () {
                        return this._text;
                    },
                    set: function (value) {
                        this._text = value;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "textColor", {
                    get: function () {
                        if (!this._textColor)
                            return this.map.settings.note.textColor;
                        return this._textColor;
                    },
                    set: function (color) {
                        this._textColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "fillColor", {
                    get: function () {
                        return this._fillColor ? this._fillColor : this.map.settings.note.fillColor;
                    },
                    set: function (color) {
                        this._fillColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "borderColor", {
                    get: function () {
                        return this._borderColor ? this._borderColor : this.map.settings.note.borderColor;
                    },
                    set: function (color) {
                        this._borderColor = color;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "rounding", {
                    get: function () {
                        return this._rounding != null ? this._rounding : this.map.settings.note.rounding;
                    },
                    set: function (r) {
                        this._rounding = r;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "shape", {
                    get: function () {
                        return this._shape != null ? this._shape : this.map.settings.note.shape;
                    },
                    set: function (s) {
                        this._shape = s;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "lineStyle", {
                    get: function () {
                        return this._lineStyle != null ? this._lineStyle : this.map.settings.note.lineStyle;
                    },
                    set: function (style) {
                        this._lineStyle = style;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Note.prototype, "lineWidth", {
                    get: function () {
                        return this._lineWidth != null ? this._lineWidth : this.map.settings.note.lineWidth;
                    },
                    set: function (width) {
                        this._lineWidth = width;
                        this._changed = true;
                    },
                    enumerable: true,
                    configurable: true
                });
                Note.prototype.clone = function () {
                    return this.cloneToTarget(new Note(new mapSettings_js_4.MapSettings()));
                };
                return Note;
            }(box_js_3.Box));
            exports_20("Note", Note);
        }
    };
});
System.register("models/map", ["models/room", "models/mapSettings", "models/connector", "models/block", "models/note"], function (exports_21, context_21) {
    "use strict";
    var room_js_1, mapSettings_js_5, connector_js_2, block_js_1, note_js_1, Map;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (room_js_1_1) {
                room_js_1 = room_js_1_1;
            },
            function (mapSettings_js_5_1) {
                mapSettings_js_5 = mapSettings_js_5_1;
            },
            function (connector_js_2_1) {
                connector_js_2 = connector_js_2_1;
            },
            function (block_js_1_1) {
                block_js_1 = block_js_1_1;
            },
            function (note_js_1_1) {
                note_js_1 = note_js_1_1;
            }
        ],
        execute: function () {
            Map = /** @class */ (function () {
                function Map() {
                    this.settings = new mapSettings_js_5.MapSettings();
                    this.title = "";
                    this.author = "";
                    this.description = "";
                    this.elements = new Array();
                    this.startRoom = null;
                }
                Map.prototype.clone = function (from) {
                    Object.assign(this, from);
                };
                Map.prototype.clear = function () {
                    this.elements.length = 0;
                };
                Map.prototype.add = function (element) {
                    this.elements.push(element);
                    element.map = this;
                };
                Map.prototype.remove = function (element) {
                    if (element == this.startRoom)
                        this.startRoom = null;
                    this.elements.splice(this.elements.indexOf(element), 1);
                };
                Map.prototype.findById = function (id, type) {
                    for (var i = 0; i < this.elements.length; i++) {
                        if (this.elements[i] instanceof type && this.elements[i].id == id)
                            return this.elements[i];
                    }
                    return undefined;
                };
                Map.prototype.setStartRoom = function (room) {
                    this.startRoom = room;
                };
                Map.prototype.bringToFront = function (model) {
                    var idx = this.elements.indexOf(model);
                    this.elements.splice(idx, 1);
                    this.elements.push(model);
                };
                Map.prototype.bringForward = function (model) {
                    var idx = this.elements.indexOf(model);
                    if (idx >= this.elements.length)
                        return;
                    this.elements.splice(idx, 1);
                    this.elements.splice(idx + 1, 0, model);
                };
                Map.prototype.sendBackward = function (model) {
                    var idx = this.elements.indexOf(model);
                    if (idx <= 0)
                        return;
                    this.elements.splice(idx, 1);
                    this.elements.splice(idx - 1, 0, model);
                };
                Map.prototype.sendToBack = function (model) {
                    var idx = this.elements.indexOf(model);
                    this.elements.splice(idx, 1);
                    this.elements.unshift(model);
                };
                Map.prototype.isBackward = function (src, dst) {
                    var iSrc;
                    var iDst;
                    if ((src instanceof block_js_1.Block) && (dst instanceof connector_js_2.Connector))
                        return true;
                    if ((src instanceof block_js_1.Block) && ((dst instanceof room_js_1.Room) || (dst instanceof note_js_1.Note)))
                        return true;
                    if (((src instanceof room_js_1.Room) || (src instanceof note_js_1.Note)) && (dst instanceof connector_js_2.Connector))
                        return true;
                    iSrc = this.elements.indexOf(src);
                    iDst = this.elements.indexOf(dst);
                    if ((iSrc < iDst) && (src instanceof block_js_1.Block) && (dst instanceof block_js_1.Block))
                        return true;
                    if ((iSrc < iDst) && ((src instanceof room_js_1.Room) || (src instanceof note_js_1.Note)) && ((dst instanceof room_js_1.Room) || (dst instanceof note_js_1.Note)))
                        return true;
                    if ((iSrc < iDst) && (src instanceof connector_js_2.Connector) && (dst instanceof connector_js_2.Connector))
                        return true;
                    return false;
                };
                Object.defineProperty(Map.prototype, "rooms", {
                    // 
                    // List of rooms on the map.
                    // 
                    get: function () {
                        return this.elements.filter(function (elem) { return elem instanceof room_js_1.Room; });
                    },
                    enumerable: true,
                    configurable: true
                });
                return Map;
            }());
            exports_21("Map", Map);
        }
    };
});
System.register("drawing/IScreen", [], function (exports_22, context_22) {
    "use strict";
    var CapStyle, JoinStyle, TextAlign, TextBaseline;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            (function (CapStyle) {
                CapStyle[CapStyle["Butt"] = 0] = "Butt";
                CapStyle[CapStyle["Round"] = 1] = "Round";
                CapStyle[CapStyle["Square"] = 2] = "Square";
            })(CapStyle || (CapStyle = {}));
            exports_22("CapStyle", CapStyle);
            (function (JoinStyle) {
                JoinStyle[JoinStyle["Miter"] = 0] = "Miter";
                JoinStyle[JoinStyle["Round"] = 1] = "Round";
                JoinStyle[JoinStyle["Bevel"] = 2] = "Bevel";
            })(JoinStyle || (JoinStyle = {}));
            exports_22("JoinStyle", JoinStyle);
            (function (TextAlign) {
                TextAlign[TextAlign["Start"] = 0] = "Start";
                TextAlign[TextAlign["End"] = 1] = "End";
                TextAlign[TextAlign["Left"] = 2] = "Left";
                TextAlign[TextAlign["Right"] = 3] = "Right";
                TextAlign[TextAlign["Center"] = 4] = "Center";
            })(TextAlign || (TextAlign = {}));
            exports_22("TextAlign", TextAlign);
            (function (TextBaseline) {
                TextBaseline[TextBaseline["Alphabetic"] = 0] = "Alphabetic";
                TextBaseline[TextBaseline["Top"] = 1] = "Top";
                TextBaseline[TextBaseline["Hanging"] = 2] = "Hanging";
                TextBaseline[TextBaseline["Middle"] = 3] = "Middle";
                TextBaseline[TextBaseline["Ideographic"] = 4] = "Ideographic";
                TextBaseline[TextBaseline["Bottom"] = 5] = "Bottom";
            })(TextBaseline || (TextBaseline = {}));
            exports_22("TextBaseline", TextBaseline);
        }
    };
});
/*
 * A simple extracted version of comic.js library reduced for:
 * - HTML canvas
 * - rounded rectangles
 * - ellipse
 * - line
 *
 * @author Balint Morvai <balint@morvai.de>
 * Copyright (c) 2014 Balint Morvai
 * @license http://en.wikipedia.org/wiki/MIT_License MIT License
 * @github https://github.com/balint42/comic.js/
 * @web http://www.morvai.de/comicjs/mixer.html
 */
System.register("drawing/drawContext", [], function (exports_23, context_23) {
    "use strict";
    var FuzzDrawing, DrawContext;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [],
        execute: function () {/*
             * A simple extracted version of comic.js library reduced for:
             * - HTML canvas
             * - rounded rectangles
             * - ellipse
             * - line
             *
             * @author Balint Morvai <balint@morvai.de>
             * Copyright (c) 2014 Balint Morvai
             * @license http://en.wikipedia.org/wiki/MIT_License MIT License
             * @github https://github.com/balint42/comic.js/
             * @web http://www.morvai.de/comicjs/mixer.html
             */
            FuzzDrawing = /** @class */ (function () {
                function FuzzDrawing() {
                    this.fsteps = 15; // number of pixels per step: smaller -> fuzzier
                    this.msteps = 2; // min number of steps: bigger -> fuzzier
                    this.ff = 3.0; // fuzz factor for line drawing: bigger -> fuzzier
                    this.ffc = 2.0; // fuzz factor for curve drawing: bigger -> fuzzier
                }
                return FuzzDrawing;
            }());
            exports_23("FuzzDrawing", FuzzDrawing);
            DrawContext = /** @class */ (function () {
                function DrawContext(ctx, config) {
                    this.ctx = ctx;
                    this.fd = new FuzzDrawing();
                    this.fuzzNormal = {
                        count: 0,
                        rnds: [0, 0]
                    };
                    if (config)
                        Object.assign(this, config);
                }
                DrawContext.prototype.fuzz = function (val, f) {
                    // get random number
                    var i = this.fuzzNormal.count;
                    var rnd = (Math.random() - 0.5);
                    if (++this.fuzzNormal.count == 2)
                        this.fuzzNormal.count = 0;
                    var res = val + f * (rnd - this.fuzzNormal.rnds[i]);
                    this.fuzzNormal.rnds[i] = rnd;
                    return res;
                };
                DrawContext.prototype.dist2 = function (x0, y0, x1, y1) {
                    var dx = x1 - x0;
                    var dy = y1 - y0;
                    return Math.sqrt(dx * dx + dy * dy);
                };
                DrawContext.prototype.hdLine = function (x0, y0, x1, y1) {
                    var ft; // store this outside function to preserve
                    function handMovement(x0, x1, t) {
                        // calculate ft or use old value if no "t" given
                        if (typeof t != "undefined") {
                            var pow3 = Math.pow(t, 3);
                            var pow4 = pow3 * t;
                            var pow5 = pow4 * t;
                            ft = (15 * pow4 -
                                6 * pow5 -
                                10 * pow3);
                        }
                        return x0 + (x0 - x1) * ft;
                    }
                    // calculate number of steps
                    var d = this.dist2(x0, y0, x1, y1);
                    var steps = Math.ceil(d / this.fd.fsteps);
                    if (steps < this.fd.msteps) {
                        steps = this.fd.msteps;
                    }
                    // fuzz factor
                    var f = this.fd.ff / ((steps == this.fd.msteps) ? 1.4 : 1); // reduce for small lines
                    // draw line step by step using quadratic Bézier path
                    var xt1 = handMovement(x0, x1, 0); // bezier control point
                    var yt1 = handMovement(y0, y1); // bezier control point (reuse t0)
                    for (var i = 1; i <= steps; i++) {
                        var t1 = i / steps;
                        var xt0 = xt1; // bezier control point
                        var yt0 = yt1; // bezier control point
                        var xt1 = handMovement(x0, x1, t1); // bezier end point
                        var yt1 = handMovement(y0, y1); // bezier end point (reuse t1)
                        //path.call(this, xt0, yt0, fuzz((xt0 + xt1) / 2, f), fuzz((yt0 + yt1) / 2, f), xt1, yt1);
                        //this.ctx.moveTo(this.fd.doodle?x0:xt0, this.fd.doodle?y0:yt0);
                        this.ctx.quadraticCurveTo(this.fuzz((xt0 + xt1) / 2, f), this.fuzz((yt0 + yt1) / 2, f), xt1, yt1);
                    }
                    return this;
                };
                DrawContext.prototype.hdRoundedRect = function (x, y, width, height, rh, rv) {
                    var halfPI = Math.PI / 2;
                    var x0 = x;
                    var y0 = y;
                    var x1 = x + width;
                    var y1 = y + height;
                    rh = rh || 0;
                    rv = rv || (rh || 0);
                    this.hdLine(x0 + rh, y0, x1 - rh, y0);
                    if (rh > 0) {
                        halfPI = Math.PI / 2;
                        this.hdEllipse(x1 - rh, y0 + rv, rh, rv, 0, halfPI * 3, Math.PI * 2);
                    }
                    this.hdLine(x1, y0 + rv, x1, y1 - rv);
                    if (rh > 0) {
                        this.hdEllipse(x1 - rh, y1 - rv, rh, rv, 0, 0, halfPI);
                    }
                    this.hdLine(x1 - rh, y1, x0 + rh, y1);
                    if (rh > 0) {
                        this.hdEllipse(x0 + rh, y1 - rv, rh, rv, 0, halfPI, Math.PI);
                    }
                    this.hdLine(x0, y1 - rv, x0, y0 + rv);
                    if (rh > 0) {
                        this.hdEllipse(x0 + rh, y0 + rv, rh, rv, 0, Math.PI, halfPI * 3);
                    }
                    return this;
                };
                DrawContext.prototype.hdEllipse = function (x, y, rh, rv, rot, start, end) {
                    var PI2 = Math.PI * 2;
                    // sanitize input
                    start = start || 0;
                    end = end || PI2;
                    rot = rot || 0;
                    // rotation
                    var cosRot = Math.cos(rot);
                    var sinRot = Math.sin(rot);
                    // number of steps
                    var steps = this.fd.msteps + ((rh + rv) / 2) * this.fd.fsteps / 10;
                    // fuzzyness dependent on on radius
                    var fh = this.fd.ffc * Math.pow(rh, 0.5) * 0.3 / Math.pow(steps, 0.25);
                    var fv = this.fd.ffc * Math.pow(rv, 0.5) * 0.3 / Math.pow(steps, 0.25);
                    // distortion of the ellipse
                    var xs = 0.95 + Math.random() * 0.1;
                    var ys = 0.95 + Math.random() * 0.1;
                    var rxs = rh * xs;
                    var rys = rv * ys;
                    // lenght of one segment
                    var arcLength = end - start;
                    var segLength = arcLength / steps;
                    // initial values for i = 0
                    var t1 = start;
                    var cosT1rxs = rxs * Math.cos(t1);
                    var sinT1rys = rys * Math.sin(t1);
                    var x1 = x + cosT1rxs * cosRot - sinT1rys * sinRot;
                    var y1 = y + cosT1rxs * sinRot + sinT1rys * cosRot;
                    // correct startpoint deviation (through fuzzed radius) by drawing a line
                    this.hdLine(x + rh * Math.cos(t1) * cosRot - rv * Math.sin(t1) * sinRot, // would be start x
                    y + rh * Math.cos(t1) * sinRot + rv * Math.sin(t1) * cosRot, // would be start y
                    x1, // actual start x
                    y1 // actual start y
                    );
                    for (var i = 1; i <= steps; i++) {
                        t1 = t1 + segLength;
                        var x0 = x1;
                        var y0 = y1;
                        var cosT1rxs = rxs * Math.cos(t1);
                        var sinT1rys = rys * Math.sin(t1);
                        x1 = x + cosT1rxs * cosRot - sinT1rys * sinRot;
                        y1 = y + cosT1rxs * sinRot + sinT1rys * cosRot;
                        //this.ctx.moveTo(x0, y0);
                        this.ctx.quadraticCurveTo(this.fuzz((x0 + x1) / 2, fh), this.fuzz((y0 + y1) / 2, fv), x1, y1);
                    }
                    // correct endpoint deviation (through fuzzed radius) by drawing a line
                    this.hdLine(x1, // actual end x
                    y1, // actual end y
                    x + rh * Math.cos(end) * cosRot - rv * Math.sin(end) * sinRot, // would be end x
                    y + rh * Math.cos(end) * sinRot + rv * Math.sin(end) * cosRot // would be end y
                    );
                    return this;
                };
                DrawContext.prototype.hdOctagon = function (x, y, width, height) {
                    this.hdLine(x, y + height * 0.25, x + width * 0.25, y);
                    this.hdLine(x + width * 0.25, y, x + width * 0.75, y);
                    this.hdLine(x + width * 0.75, y, x + width, y + height * 0.25);
                    this.hdLine(x + width, y + height * 0.25, x + width, y + height * 0.75);
                    this.hdLine(x + width, y + height * 0.75, x + width * 0.75, y + height);
                    this.hdLine(x + width * 0.75, y + height, x + width * 0.25, y + height);
                    this.hdLine(x + width * 0.25, y + height, x, y + height * 0.75);
                    this.hdLine(x, y + height * 0.75, x, y + height * 0.25);
                    return this;
                };
                DrawContext.prototype.bsplit = function (points, t0) {
                    var n = points.length - 1; // number of control points
                    var b = []; // coefficients as in De Casteljau's algorithm
                    var res1 = []; // first curve resulting control points
                    var res2 = []; // second curve resulting control points
                    var t1 = 1 - t0;
                    // multiply point with scalar factor
                    function pf(p, f) {
                        var res = [];
                        for (var i = 0; i < p.length; i++) {
                            res.push(f * p[i]);
                        }
                        return res;
                    }
                    ;
                    // add points as vectors
                    function pp(p1, p2) {
                        var res = [];
                        for (var i = 0; i < Math.min(p1.length, p2.length); i++) {
                            res.push(p1[i] + p2[i]);
                        }
                        return res;
                    }
                    ;
                    // set original coefficients: b[i][0] = points[i]
                    for (var i = 0; i <= n; i++) {
                        points[i] = (typeof points[i] == "object") ? points[i] : [points[i]];
                        b.push([points[i]]);
                    }
                    // get all coefficients
                    for (var j = 1; j <= n; j++) {
                        for (var i = 0; i <= (n - j); i++) {
                            b[i].push(pp(pf(b[i][j - 1], t1), pf(b[i + 1][j - 1], t0)));
                        }
                    }
                    // set result: res1 & res2
                    for (var j = 0; j <= n; j++) {
                        res1.push(b[0][j]);
                        res2.push(b[j][n - j]);
                    }
                    return [res1, res2];
                };
                ;
                DrawContext.prototype.hdBezier3 = function (x0, y0, cx0, cy0, cx1, cy1, x1, y1) {
                    // number of steps - this is a very primitive approach to
                    // estimate the Bezier arc length
                    var d = this.dist2(x0, y0, x1, y1) * 3;
                    var steps = Math.ceil(Math.pow(d / this.fd.fsteps, 0.9));
                    // fuzzyness
                    var f = this.fd.ff * 0.8;
                    var p0 = [x0, y0];
                    var pc0 = [cx0, cy0];
                    var pc1 = [cx1, cy1];
                    var p1 = [x1, y1];
                    var curve2 = [p0, pc0, pc1, p1];
                    for (var i = steps; i > 0; i--) {
                        // split curve2
                        var points = this.bsplit(curve2, 1 / i);
                        var curve1 = points[0];
                        var curve2 = points[1];
                        // set points for drawing from curve1
                        p0 = curve1[0];
                        pc0 = curve1[1];
                        pc1 = curve1[2];
                        p1 = curve1[3];
                        /* path.call(this, p0[0], p0[1],
                            fuzz((pc0[0]+pc1[0])/2, f), // just make one control point
                            fuzz((pc0[1]+pc1[1])/2, f),
                            p1[0], p1[1]); */
                        this.ctx.moveTo(p0[0], p0[1]);
                        this.ctx.quadraticCurveTo(this.fuzz((pc0[0] + pc1[0]) / 2, f), this.fuzz((pc0[1] + pc1[1]) / 2, f), p1[0], p1[1]);
                    }
                    return this;
                };
                DrawContext.prototype.hdBezier2 = function (x0, y0, cx, cy, x1, y1) {
                    // number of steps - this is a very primitive approach to
                    // estimate the Bezier arc length
                    var d = this.dist2(x0, y0, x1, y1) * 3;
                    var steps = Math.ceil(Math.pow(d / this.fd.fsteps, 0.9));
                    // fuzzyness
                    var f = this.fd.ff * 0.8;
                    var p0 = [x0, y0];
                    var pc = [cx, cy];
                    var p1 = [x1, y1];
                    var curve2 = [p0, pc, p1];
                    for (var i = steps; i > 0; i--) {
                        // split curve2
                        var points = this.bsplit(curve2, 1 / i);
                        var curve1 = points[0];
                        curve2 = points[1];
                        // set points for drawing from curve1
                        p0 = curve1[0];
                        pc = curve1[1];
                        p1 = curve1[2];
                        //path.call(this, p0[0], p0[1], fuzz(pc[0], f), fuzz(pc[1], f), p1[0], p1[1]);
                        this.ctx.moveTo(p0[0], p0[1]);
                        this.ctx.quadraticCurveTo(this.fuzz(pc[0], f), this.fuzz(pc[1], f), p1[0], p1[1]);
                    }
                    return this;
                };
                return DrawContext;
            }());
            exports_23("DrawContext", DrawContext);
        }
    };
});
System.register("drawing/canvas", ["drawing/IScreen", "enums/enums", "app", "drawing/drawContext"], function (exports_24, context_24) {
    "use strict";
    var IScreen_js_1, enums_js_3, app_js_1, drawContext_js_1, Canvas;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (IScreen_js_1_1) {
                IScreen_js_1 = IScreen_js_1_1;
            },
            function (enums_js_3_1) {
                enums_js_3 = enums_js_3_1;
            },
            function (app_js_1_1) {
                app_js_1 = app_js_1_1;
            },
            function (drawContext_js_1_1) {
                drawContext_js_1 = drawContext_js_1_1;
            }
        ],
        execute: function () {
            Canvas = /** @class */ (function () {
                function Canvas(ctx) {
                    this.ctx = ctx;
                    this.ctx = ctx;
                    this.drawer = new drawContext_js_1.DrawContext(this.ctx);
                }
                Canvas.prototype.save = function () {
                    this.ctx.save();
                    return this;
                };
                Canvas.prototype.restore = function () {
                    this.ctx.restore();
                    return this;
                };
                Canvas.prototype.translate = function (x, y) {
                    this.ctx.translate(x, y);
                    return this;
                };
                Canvas.prototype.rotate = function (angle) {
                    this.ctx.rotate(angle);
                    return this;
                };
                Canvas.prototype.scale = function (x, y) {
                    if (y === undefined)
                        y = x;
                    this.ctx.scale(x, y);
                    return this;
                };
                Canvas.prototype.moveTo = function (x, y) {
                    this.ctx.moveTo(x, y);
                    return this;
                };
                Canvas.prototype.beginPath = function () {
                    this.ctx.beginPath();
                    return this;
                };
                Canvas.prototype.closePath = function () {
                    this.ctx.closePath();
                    return this;
                };
                Canvas.prototype.stroke = function () {
                    this.ctx.stroke();
                    return this;
                };
                Canvas.prototype.fill = function () {
                    this.ctx.fill();
                    return this;
                };
                Canvas.prototype.fillStyle = function (color) {
                    this.ctx.fillStyle = color;
                    return this;
                };
                Canvas.prototype.strokeStyle = function (color) {
                    this.ctx.strokeStyle = color;
                    return this;
                };
                Canvas.prototype.fillRect = function (x, y, width, height) {
                    this.ctx.fillRect(x, y, width, height);
                    return this;
                };
                Canvas.prototype.strokeRect = function (x, y, width, height) {
                    this.ctx.strokeRect(x, y, width, height);
                    return this;
                };
                Canvas.prototype.clearRect = function (x, y, width, height) {
                    this.ctx.clearRect(x, y, width, height);
                    return this;
                };
                Canvas.prototype.lineWidth = function (width) {
                    this.ctx.lineWidth = width;
                    return this;
                };
                Canvas.prototype.lineCap = function (style) {
                    switch (style) {
                        case IScreen_js_1.CapStyle.Butt:
                            this.ctx.lineCap = 'butt';
                            break;
                        case IScreen_js_1.CapStyle.Round:
                            this.ctx.lineCap = 'round';
                            break;
                        case IScreen_js_1.CapStyle.Square:
                            this.ctx.lineCap = 'square';
                            break;
                    }
                    return this;
                };
                Canvas.prototype.lineJoin = function (style) {
                    switch (style) {
                        case IScreen_js_1.JoinStyle.Miter:
                            this.ctx.lineJoin = 'miter';
                            break;
                        case IScreen_js_1.JoinStyle.Round:
                            this.ctx.lineJoin = 'round';
                            break;
                        case IScreen_js_1.JoinStyle.Bevel:
                            this.ctx.lineJoin = 'bevel';
                            break;
                    }
                    return this;
                };
                Canvas.prototype.lineDash = function (style) {
                    switch (style) {
                        case enums_js_3.LineStyle.Solid:
                            this.ctx.setLineDash([]);
                            break;
                        case enums_js_3.LineStyle.Dash:
                            this.ctx.setLineDash([8, 4]);
                            break;
                        case enums_js_3.LineStyle.DashDot:
                            this.ctx.setLineDash([4, 4]);
                            break;
                        case enums_js_3.LineStyle.DashDotDot:
                            this.ctx.setLineDash([2, 3]);
                            break;
                        case enums_js_3.LineStyle.Dot:
                            this.ctx.setLineDash([3, 2, 2, 2, 4, 2, 2, 2, 3, 2]);
                            break;
                    }
                    return this;
                };
                Canvas.prototype.lineTo = function (x, y) {
                    this.ctx.lineTo(x, y);
                    return this;
                };
                Canvas.prototype.line = function (x0, y0, x1, y1) {
                    if (app_js_1.App.map.settings.draw.hand)
                        this.drawer.hdLine(x0, y0, x1, y1);
                    else {
                        this.ctx.moveTo(x0, y0);
                        this.ctx.lineTo(x1, y1);
                    }
                    return this;
                };
                Canvas.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
                    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise ? anticlockwise : false);
                    return this;
                };
                Canvas.prototype.arcTo = function (x1, y1, x2, y2, radius) {
                    this.ctx.arcTo(x1, y1, x2, y2, radius);
                    return this;
                };
                Canvas.prototype.ellipse = function (x, y, width, height) {
                    this.beginPath();
                    if (app_js_1.App.map.settings.draw.hand) {
                        this.drawer.hdEllipse(x + width / 2, y + height / 2, width / 2, height / 2);
                    }
                    else {
                        var kappa = .5522848, ox = (width / 2) * kappa, // control point offset horizontal
                        oy = (height / 2) * kappa, // control point offset vertical
                        xe = x + width, // x-end
                        ye = y + height, // y-end
                        xm = x + width / 2, // x-middle
                        ym = y + height / 2; // y-middle
                        this.moveTo(x, ym)
                            .bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
                            .bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
                            .bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
                            .bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                    }
                    this.closePath();
                    return this;
                };
                Canvas.prototype.roundedRect = function (x, y, width, height, radius) {
                    if (width < 4 * radius)
                        radius = width / 4;
                    if (height < 4 * radius)
                        radius = height / 4;
                    this.beginPath();
                    if (app_js_1.App.map.settings.draw.hand) {
                        this.drawer.hdRoundedRect(x, y, width, height, radius);
                    }
                    else {
                        this.moveTo(x + radius, y)
                            .arcTo(x + width, y, x + width, y + height, radius)
                            .arcTo(x + width, y + height, x, y + height, radius)
                            .arcTo(x, y + height, x, y, radius)
                            .arcTo(x, y, x + width, y, radius);
                    }
                    this.closePath();
                    return this;
                };
                Canvas.prototype.octagon = function (x, y, width, height) {
                    this.beginPath();
                    if (app_js_1.App.map.settings.draw.hand) {
                        this.drawer.hdOctagon(x, y, width, height);
                    }
                    else {
                        this.moveTo(x, y + height * 0.25)
                            .lineTo(x + width * 0.25, y)
                            .lineTo(x + width * 0.75, y)
                            .lineTo(x + width, y + height * 0.25)
                            .lineTo(x + width, y + height * 0.75)
                            .lineTo(x + width * 0.75, y + height)
                            .lineTo(x + width * 0.25, y + height)
                            .lineTo(x, y + height * 0.75);
                    }
                    this.closePath();
                    return this;
                };
                Canvas.prototype.quadraticCurveTo = function (cp1x, cp1y, x, y) {
                    this.ctx.quadraticCurveTo(cp1x, cp1y, x, y);
                    return this;
                };
                Canvas.prototype.bezier2 = function (x0, y0, cx, cy, x1, y1) {
                    if (app_js_1.App.map.settings.draw.hand) {
                        this.drawer.hdBezier2(x0, y0, cx, cy, x1, y1);
                    }
                    else {
                        this.moveTo(x0, y0);
                        this.quadraticCurveTo(cx, cy, x1, y1);
                    }
                    return this;
                };
                Canvas.prototype.getQuadraticXY = function (t, sx, sy, cp1x, cp1y, ex, ey) {
                    return {
                        x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
                        y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey
                    };
                };
                Canvas.prototype.getQuadraticAngle = function (t, sx, sy, cp1x, cp1y, ex, ey) {
                    var dx = 2 * (1 - t) * (cp1x - sx) + 2 * t * (ex - cp1x);
                    var dy = 2 * (1 - t) * (cp1y - sy) + 2 * t * (ey - cp1y);
                    return -Math.atan2(dx, dy) + 0.5 * Math.PI;
                };
                Canvas.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                    return this;
                };
                Canvas.prototype.bezier3 = function (x0, y0, cx0, cy0, cx1, cy1, x1, y1) {
                    if (app_js_1.App.map.settings.draw.hand) {
                        this.drawer.hdBezier3(x0, y0, cx0, cy0, cx1, cy1, x1, y1);
                    }
                    else {
                        this.moveTo(x0, y0);
                        this.bezierCurveTo(cx0, cy0, cx1, cy1, x1, y1);
                    }
                    return this;
                };
                Canvas.prototype.getBezierXY = function (t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
                    return {
                        x: Math.pow(1 - t, 3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
                        y: Math.pow(1 - t, 3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
                    };
                };
                Canvas.prototype.getBezierAngle = function (t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
                    var dx = Math.pow(1 - t, 2) * (cp1x - sx) + 2 * t * (1 - t) * (cp2x - cp1x) + t * t * (ex - cp2x);
                    var dy = Math.pow(1 - t, 2) * (cp1y - sy) + 2 * t * (1 - t) * (cp2y - cp1y) + t * t * (ey - cp2y);
                    return -Math.atan2(dx, dy) + 0.5 * Math.PI;
                };
                Canvas.prototype.rect = function (x, y, width, height) {
                    var x1 = x + width;
                    var y1 = y + height;
                    this.beginPath();
                    if (app_js_1.App.map.settings.draw.hand) {
                        this.drawer.hdLine(x, y, x1, y);
                        this.drawer.hdLine(x1, y, x1, y1);
                        this.drawer.hdLine(x, y1, x1, y1);
                        this.drawer.hdLine(x, y1, x, y);
                    }
                    else
                        this.ctx.rect(x, y, width, height);
                    this.closePath();
                    return this;
                };
                Canvas.prototype.textAlign = function (align) {
                    switch (align) {
                        case IScreen_js_1.TextAlign.End:
                            this.ctx.textAlign = 'end';
                            break;
                        case IScreen_js_1.TextAlign.Left:
                            this.ctx.textAlign = 'left';
                            break;
                        case IScreen_js_1.TextAlign.Right:
                            this.ctx.textAlign = 'right';
                            break;
                        case IScreen_js_1.TextAlign.Center:
                            this.ctx.textAlign = 'center';
                            break;
                        default:
                            this.ctx.textAlign = 'start';
                            break;
                    }
                    return this;
                };
                Canvas.prototype.textBaseline = function (baseline) {
                    switch (baseline) {
                        case IScreen_js_1.TextBaseline.Bottom:
                            this.ctx.textBaseline = 'bottom';
                            break;
                        case IScreen_js_1.TextBaseline.Hanging:
                            this.ctx.textBaseline = 'hanging';
                            break;
                        case IScreen_js_1.TextBaseline.Ideographic:
                            this.ctx.textBaseline = 'ideographic';
                            break;
                        case IScreen_js_1.TextBaseline.Middle:
                            this.ctx.textBaseline = 'middle';
                            break;
                        case IScreen_js_1.TextBaseline.Top:
                            this.ctx.textBaseline = 'top';
                            break;
                        default:
                            this.ctx.textBaseline = 'alphabetic';
                    }
                    return this;
                };
                Canvas.prototype.fillText = function (text, x, y, font, align, baseline, maxwidth) {
                    this.ctx.font = font;
                    this.textAlign(align);
                    this.textBaseline(baseline);
                    this.ctx.fillText(text, x, y, maxwidth);
                    return this;
                };
                Canvas.prototype.strokeText = function (text, x, y, font, align, baseline, maxwidth) {
                    this.ctx.font = font;
                    this.textAlign(align);
                    this.textBaseline(baseline);
                    this.ctx.strokeText(text, x, y, maxwidth);
                    return this;
                };
                // Take a string of text and split it into a number of lines,
                // working with a maximum width (minimum 50).
                Canvas.prototype.splitText = function (maxWidth, text) {
                    if (maxWidth < 50)
                        maxWidth = 50;
                    var words = text.trim().split(' ');
                    var line = '';
                    var lines = new Array();
                    for (var n = 0; n < words.length; n++) {
                        var testLine = line + words[n] + ' ';
                        var metrics = this.ctx.measureText(testLine);
                        var testWidth = metrics.width;
                        if (testWidth > maxWidth && n > 0) {
                            lines.push(line.trim());
                            line = words[n] + ' ';
                        }
                        else {
                            line = testLine;
                        }
                    }
                    lines.push(line.trim());
                    return lines;
                };
                // Draw text centered at (x, y), inside an area no wider than <maxWidth>
                Canvas.prototype.drawText = function (x, y, width, height, fontSize, font, text) {
                    var fontStr = fontSize + "px " + font;
                    this.ctx.font = fontStr;
                    var lineHeight = Math.ceil(fontSize) + 1;
                    var lines = this.splitText(width, text);
                    var xPos = x + width / 2;
                    var yPos = y - (lines.length - 1) * lineHeight / 2 + height / 2;
                    for (var i = 0; i < lines.length; i++) {
                        this.fillText(lines[i], xPos, yPos, fontStr, IScreen_js_1.TextAlign.Center, IScreen_js_1.TextBaseline.Middle);
                        yPos += lineHeight;
                    }
                    return this;
                };
                Canvas.prototype.drawTextBottom = function (x, y, width, height, fontSize, font, text) {
                    var fontStr = fontSize + "px " + font;
                    this.ctx.font = fontStr;
                    var lineHeight = Math.ceil(fontSize) + 1;
                    var lines = this.splitText(width, text);
                    var xPos = x + width / 2;
                    var yPos = y + height - (lines.length - 1) * lineHeight;
                    for (var i = 0; i < lines.length; i++) {
                        this.fillText(lines[i], xPos, yPos, fontStr, IScreen_js_1.TextAlign.Center, IScreen_js_1.TextBaseline.Bottom);
                        yPos += lineHeight;
                    }
                    return this;
                };
                Canvas.prototype.textWidth = function (text, font) {
                    this.ctx.font = font;
                    return this.ctx.measureText(text).width;
                };
                Canvas.prototype.clip = function (region) {
                    this.ctx.clip(region);
                    return this;
                };
                Canvas.prototype.getImageData = function (x, y, width, height) {
                    return this.ctx.getImageData(x, y, width, height);
                };
                return Canvas;
            }());
            exports_24("Canvas", Canvas);
        }
    };
});
System.register("grid", ["app"], function (exports_25, context_25) {
    "use strict";
    var app_js_2, Grid;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [
            function (app_js_2_1) {
                app_js_2 = app_js_2_1;
            }
        ],
        execute: function () {
            Grid = /** @class */ (function () {
                function Grid() {
                }
                Grid.prototype.drawGridLineV = function (htmlCanvas, canvas, x) {
                    var y1 = Math.floor(-htmlCanvas.offsetHeight) + 0.5;
                    var y2 = Math.floor(htmlCanvas.offsetHeight) + 0.5;
                    x = Math.floor(x) + 0.5;
                    canvas
                        .beginPath()
                        .moveTo(x, y1)
                        .lineTo(x, y2)
                        .stroke();
                };
                Grid.prototype.drawGridLineH = function (htmlCanvas, canvas, y) {
                    var x1 = Math.floor(-htmlCanvas.offsetWidth) + 0.5;
                    var x2 = Math.floor(htmlCanvas.offsetWidth) + 0.5;
                    y = Math.floor(y) + 0.5;
                    canvas
                        .beginPath()
                        .moveTo(x1, y)
                        .lineTo(x2, y)
                        .stroke();
                };
                Grid.prototype.draw = function (htmlCanvas, canvas) {
                    // Do not draw grid if grid not visible.
                    var settings = app_js_2.App.map.settings.grid;
                    if (!settings.visible)
                        return;
                    canvas
                        .save()
                        .strokeStyle(settings.color)
                        .lineWidth(settings.lineWidth);
                    var x = htmlCanvas.offsetWidth / 2 + app_js_2.App.centerX;
                    while (x > 0) {
                        this.drawGridLineV(htmlCanvas, canvas, x);
                        x -= settings.size * app_js_2.App.zoom;
                    }
                    var x = htmlCanvas.offsetWidth / 2 + app_js_2.App.centerX + settings.size * app_js_2.App.zoom;
                    while (x < htmlCanvas.offsetWidth) {
                        this.drawGridLineV(htmlCanvas, canvas, x);
                        x += settings.size * app_js_2.App.zoom;
                    }
                    var y = htmlCanvas.offsetHeight / 2 + app_js_2.App.centerY;
                    while (y > 0) {
                        this.drawGridLineH(htmlCanvas, canvas, y);
                        y -= settings.size * app_js_2.App.zoom;
                    }
                    var y = htmlCanvas.offsetHeight / 2 + app_js_2.App.centerY + settings.size * app_js_2.App.zoom;
                    while (y < htmlCanvas.offsetHeight) {
                        this.drawGridLineH(htmlCanvas, canvas, y);
                        y += settings.size * app_js_2.App.zoom;
                    }
                    // Draw origin if necessary
                    if (settings.origin) {
                        x = Math.floor(htmlCanvas.offsetWidth / 2) + app_js_2.App.centerX;
                        y = Math.floor(htmlCanvas.offsetHeight / 2) + app_js_2.App.centerY;
                        canvas
                            .beginPath()
                            .lineWidth(settings.originWidth)
                            .moveTo(x, y - settings.size * app_js_2.App.zoom)
                            .lineTo(x, y + settings.size * app_js_2.App.zoom)
                            .moveTo(x - settings.size * app_js_2.App.zoom, y)
                            .lineTo(x + settings.size * app_js_2.App.zoom, y)
                            .stroke();
                    }
                    canvas.restore();
                };
                Grid.snap = function (a) {
                    var settings = app_js_2.App.map.settings.grid;
                    if (!settings.snap)
                        return a;
                    return Math.floor(a / settings.size) * settings.size;
                };
                return Grid;
            }());
            exports_25("Grid", Grid);
        }
    };
});
System.register("util/rect", [], function (exports_26, context_26) {
    "use strict";
    var Rect;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
            Rect = /** @class */ (function () {
                // Create a rectangle given two coordinates.
                // Coordinates are automatically swapped if necessary.
                function Rect(x, y, x2, y2) {
                    this.set(x, y, x2, y2);
                }
                Rect.prototype.set = function (x, y, x2, y2) {
                    this.x = Math.min(x, x2);
                    this.y = Math.min(y, y2);
                    this.width = Math.abs(x2 - x);
                    this.height = Math.abs(y2 - y);
                };
                Rect.prototype.maximize = function (r) {
                    this.set(Math.min(this.x, r.x), Math.min(this.y, r.y), Math.max(this.x + this.width, r.x + r.width), Math.max(this.y + this.height, r.y + r.height));
                };
                Rect.prototype.expande = function (w, h) {
                    h = h || w;
                    this.set(this.x - w, this.y - h, this.x + this.width + 2 * w, this.y + this.height + 2 * h);
                };
                // Returns true if the rectangle contains the coordinate.
                Rect.prototype.contains = function (x, y) {
                    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
                };
                return Rect;
            }());
            exports_26("Rect", Rect);
        }
    };
});
System.register("views/view", [], function (exports_27, context_27) {
    "use strict";
    var View;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
            View = /** @class */ (function () {
                function View() {
                    this.selected = false;
                }
                View.prototype.getModel = function () {
                    return null;
                };
                View.prototype.draw = function (canvas, hover) {
                };
                View.prototype.clear = function (canvas) {
                    return;
                };
                View.prototype.drawSimple = function (canvas, hover) {
                };
                View.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                };
                Object.defineProperty(View.prototype, "movingSelectable", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                View.prototype.isSelected = function () {
                    return this.selected;
                };
                View.prototype.select = function () {
                    this.selected = true;
                };
                View.prototype.unselect = function () {
                    this.selected = false;
                };
                View.prototype.isIn = function (x, y, width, height) {
                    return false;
                };
                View.prototype.isPointIn = function (x, y) {
                    return false;
                };
                return View;
            }());
            exports_27("View", View);
        }
    };
});
System.register("util/util", ["util/rect"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_28(exports);
    }
    return {
        setters: [
            function (rect_js_1_1) {
                exportStar_2(rect_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("views/boxView", ["views/view", "util/util", "enums/enums"], function (exports_29, context_29) {
    "use strict";
    var view_js_1, util_js_1, enums_js_4, BoxView;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [
            function (view_js_1_1) {
                view_js_1 = view_js_1_1;
            },
            function (util_js_1_1) {
                util_js_1 = util_js_1_1;
            },
            function (enums_js_4_1) {
                enums_js_4 = enums_js_4_1;
            }
        ],
        execute: function () {
            BoxView = /** @class */ (function (_super) {
                __extends(BoxView, _super);
                function BoxView(box) {
                    var _this = _super.call(this) || this;
                    _this.box = box;
                    _this.oldX = _this.oldY = 0;
                    _this.oldWidth = _this.oldHeight = 0;
                    return _this;
                }
                BoxView.prototype.getModel = function () {
                    return this.box;
                };
                BoxView.prototype.clear = function (canvas) {
                    var margin = enums_js_4.Values.DIMEN_ROOM_MARGIN;
                    var rect = new util_js_1.Rect(this.box.x - margin, this.box.y - margin, this.box.x - margin + this.box.width + margin * 2, this.box.y - margin + this.box.height + margin * 2);
                    canvas.clearRect(rect.x, rect.y, rect.width, rect.height);
                    return rect;
                };
                BoxView.prototype.makeShape = function (canvas, addMargin) {
                    var margin = addMargin ? enums_js_4.Values.DIMEN_ROOM_MARGIN : 0;
                    switch (this.box.shape) {
                        case enums_js_4.RoomShape.Ellipse:
                            canvas.ellipse(-margin, -margin, this.box.width + margin * 2, this.box.height + margin * 2);
                            break;
                        case enums_js_4.RoomShape.Octagon:
                            canvas.octagon(-margin, -margin, this.box.width + margin * 2, this.box.height + margin * 2);
                            break;
                        default:
                            canvas.roundedRect(-margin, -margin, this.box.width + margin * 2, this.box.height + margin * 2, this.box.rounding);
                            break;
                    }
                };
                BoxView.prototype.drawResizeHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    canvas
                        .save()
                        .lineWidth(1);
                    // Resize handles
                    if (this.selected && selectionSize == 1) {
                        canvas.fillStyle(enums_js_4.Values.COLOR_RESIZE).strokeStyle(enums_js_4.Values.COLOR_LINE);
                        for (var i = 0; i < 16; i++) {
                            if (!enums_js_4.Direction.isCardinal(i))
                                continue;
                            var _a = this.box.directionToPos(i, false), x = _a.x, y = _a.y;
                            // If mouse is over resize handle, then highlight it.
                            if (mouseX >= x - enums_js_4.Values.DIMEN_RESIZE_HANDLE && mouseX <= x + enums_js_4.Values.DIMEN_RESIZE_HANDLE
                                && mouseY >= y - enums_js_4.Values.DIMEN_RESIZE_HANDLE && mouseY <= y + enums_js_4.Values.DIMEN_RESIZE_HANDLE) {
                                canvas.fillStyle(enums_js_4.Values.COLOR_RESIZE_HIGHLIGHT);
                            }
                            else {
                                canvas.fillStyle(enums_js_4.Values.COLOR_RESIZE);
                            }
                            canvas
                                .beginPath()
                                .moveTo(x - enums_js_4.Values.DIMEN_RESIZE_HANDLE, y - enums_js_4.Values.DIMEN_RESIZE_HANDLE)
                                .fillRect(x - enums_js_4.Values.DIMEN_RESIZE_HANDLE, y - enums_js_4.Values.DIMEN_RESIZE_HANDLE, enums_js_4.Values.DIMEN_RESIZE_HANDLE * 2, enums_js_4.Values.DIMEN_RESIZE_HANDLE * 2)
                                .strokeRect(x - enums_js_4.Values.DIMEN_RESIZE_HANDLE, y - enums_js_4.Values.DIMEN_RESIZE_HANDLE, enums_js_4.Values.DIMEN_RESIZE_HANDLE * 2, enums_js_4.Values.DIMEN_RESIZE_HANDLE * 2);
                        }
                    }
                    canvas.restore();
                };
                BoxView.prototype.drawConnectorHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    if (!hover || selectionSize != 0)
                        return;
                    canvas
                        .save()
                        .lineWidth(1)
                        .strokeStyle(enums_js_4.Values.COLOR_LINE);
                    for (var i = 0; i < 16; i++) {
                        var _a = this.box.directionToPos(i, false), x = _a.x, y = _a.y;
                        // If mouse is over connector handle, then highlight it.
                        if (mouseX >= x - enums_js_4.Values.DIMEN_CONNECTOR_HANDLE && mouseX <= x + enums_js_4.Values.DIMEN_CONNECTOR_HANDLE
                            && mouseY >= y - enums_js_4.Values.DIMEN_CONNECTOR_HANDLE && mouseY <= y + enums_js_4.Values.DIMEN_CONNECTOR_HANDLE) {
                            canvas.fillStyle(enums_js_4.Values.COLOR_CONNECTOR_HIGHLIGHT);
                        }
                        else {
                            canvas.fillStyle(enums_js_4.Values.COLOR_CONNECTOR);
                        }
                        canvas
                            .beginPath()
                            .moveTo(x + enums_js_4.Values.DIMEN_CONNECTOR_HANDLE, y) // move must end on right perimeter of arc.
                            .arc(x, y, enums_js_4.Values.DIMEN_CONNECTOR_HANDLE, 0, Math.PI * 2, true)
                            .fill()
                            .stroke();
                    }
                    canvas.restore();
                };
                BoxView.prototype.isResizeHandle = function (x, y) {
                    for (var i = 0; i < 16; i++) {
                        if (!enums_js_4.Direction.isCardinal(i))
                            continue;
                        var _a = this.box.directionToPos(i, false), px = _a.x, py = _a.y;
                        if (x >= px - enums_js_4.Values.DIMEN_RESIZE_HANDLE
                            && x <= px + enums_js_4.Values.DIMEN_RESIZE_HANDLE
                            && y >= py - enums_js_4.Values.DIMEN_RESIZE_HANDLE
                            && y <= py + enums_js_4.Values.DIMEN_RESIZE_HANDLE)
                            return i;
                    }
                    return undefined;
                };
                BoxView.prototype.isConnectorHandle = function (x, y) {
                    for (var i = 0; i < 16; i++) {
                        var _a = this.box.directionToPos(i, false), px = _a.x, py = _a.y;
                        if (x >= px - enums_js_4.Values.DIMEN_CONNECTOR_HANDLE
                            && x <= px + enums_js_4.Values.DIMEN_CONNECTOR_HANDLE
                            && y >= py - enums_js_4.Values.DIMEN_CONNECTOR_HANDLE
                            && y <= py + enums_js_4.Values.DIMEN_CONNECTOR_HANDLE)
                            return i;
                    }
                    return undefined;
                };
                // Used to determine if a Room is inside a selection area. For simplicity,
                // a rectangular approximation of the Room is used.
                BoxView.prototype.isIn = function (x, y, width, height) {
                    var r = new util_js_1.Rect(x, y, x + width, y + height);
                    if (r.contains(this.box.x, this.box.y))
                        return true;
                    if (r.contains(this.box.x + this.box.width, this.box.y))
                        return true;
                    if (r.contains(this.box.x, this.box.y + this.box.height))
                        return true;
                    if (r.contains(this.box.x + this.box.width, this.box.y + this.box.height))
                        return true;
                    return false;
                };
                BoxView.prototype.isPointIn = function (x, y) {
                    return (x >= this.box.x && x <= this.box.x + this.box.width
                        && y >= this.box.y && y <= this.box.y + this.box.height);
                };
                // Resize box in given direction toward (x, y).
                // Clamps on minimum box width and height.
                BoxView.prototype.resize = function (direction, x, y) {
                    var width = 0;
                    var height = 0;
                    if (direction == enums_js_4.Direction.N || direction == enums_js_4.Direction.NE || direction == enums_js_4.Direction.NW) {
                        height = this.oldY + this.oldHeight - y;
                        if (height < enums_js_4.Values.DIMEN_ROOM_MIN_HEIGHT) {
                            y = y - (enums_js_4.Values.DIMEN_ROOM_MIN_HEIGHT - height);
                            height = enums_js_4.Values.DIMEN_ROOM_MIN_HEIGHT;
                        }
                        this.box.y = y;
                        this.box.height = height;
                    }
                    if (direction == enums_js_4.Direction.W || direction == enums_js_4.Direction.NW || direction == enums_js_4.Direction.SW) {
                        width = this.oldX + this.oldWidth - x;
                        if (width < enums_js_4.Values.DIMEN_ROOM_MIN_WIDTH) {
                            x = x - (enums_js_4.Values.DIMEN_ROOM_MIN_WIDTH - width);
                            width = enums_js_4.Values.DIMEN_ROOM_MIN_WIDTH;
                        }
                        this.box.x = x;
                        this.box.width = width;
                    }
                    if (direction == enums_js_4.Direction.E || direction == enums_js_4.Direction.NE || direction == enums_js_4.Direction.SE) {
                        width = x - this.oldX;
                        if (width < enums_js_4.Values.DIMEN_ROOM_MIN_WIDTH) {
                            x = x - (enums_js_4.Values.DIMEN_ROOM_MIN_WIDTH - width);
                            width = enums_js_4.Values.DIMEN_ROOM_MIN_WIDTH;
                        }
                        this.box.width = width;
                    }
                    if (direction == enums_js_4.Direction.S || direction == enums_js_4.Direction.SE || direction == enums_js_4.Direction.SW) {
                        height = y - this.oldY;
                        if (height < enums_js_4.Values.DIMEN_ROOM_MIN_HEIGHT) {
                            y = y - (enums_js_4.Values.DIMEN_ROOM_MIN_HEIGHT - height);
                            height = enums_js_4.Values.DIMEN_ROOM_MIN_HEIGHT;
                        }
                        this.box.height = height;
                    }
                };
                BoxView.prototype.save = function () {
                    this.oldX = this.box.x;
                    this.oldY = this.box.y;
                    this.oldWidth = this.box.width;
                    this.oldHeight = this.box.height;
                };
                return BoxView;
            }(view_js_1.View));
            exports_29("BoxView", BoxView);
        }
    };
});
System.register("views/roomView", ["app", "views/boxView", "enums/enums", "drawing/IScreen"], function (exports_30, context_30) {
    "use strict";
    var app_js_3, boxView_js_1, enums_js_5, IScreen_js_2, RoomView;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (app_js_3_1) {
                app_js_3 = app_js_3_1;
            },
            function (boxView_js_1_1) {
                boxView_js_1 = boxView_js_1_1;
            },
            function (enums_js_5_1) {
                enums_js_5 = enums_js_5_1;
            },
            function (IScreen_js_2_1) {
                IScreen_js_2 = IScreen_js_2_1;
            }
        ],
        execute: function () {
            RoomView = /** @class */ (function (_super) {
                __extends(RoomView, _super);
                function RoomView(room) {
                    var _this = _super.call(this, room) || this;
                    _this.room = room;
                    return _this;
                }
                RoomView.prototype.getModel = function () {
                    return this.room;
                };
                Object.defineProperty(RoomView.prototype, "movingSelectable", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                RoomView.prototype.draw = function (canvas, hover) {
                    // Translate to room's coordinates, so we can offset everything from (0,0).
                    canvas
                        .save()
                        .translate(this.room.x, this.room.y);
                    this.makeShape(canvas, true);
                    // Nearly transparent background (for selection purposes):
                    canvas
                        .fillStyle(enums_js_5.Values.COLOR_TRANSPARENT)
                        .fill();
                    // Selection glow
                    if (this.selected) {
                        canvas
                            .fillStyle(enums_js_5.Values.COLOR_SELECTED_GLOW)
                            .fill();
                    }
                    // Start room glow
                    if (this.room.isStartRoom()) {
                        canvas
                            .fillStyle(enums_js_5.Values.COLOR_STARTROOM)
                            .fill();
                    }
                    // End room glow
                    if (this.room.endroom) {
                        canvas
                            .fillStyle(enums_js_5.Values.COLOR_ENDROOM)
                            .fill();
                    }
                    // Room fill
                    this.makeShape(canvas, false);
                    canvas
                        .fillStyle(this.room.fillColor)
                        .fill();
                    // Darkness stripe
                    canvas.save(); // before clip
                    canvas.clip();
                    this.makeShape(canvas, false);
                    if (this.room.dark) {
                        var darknessSize = this.room.map.settings.room.darknessSize;
                        canvas
                            .fillStyle(this.room.map.settings.room.darkColor)
                            .beginPath()
                            .moveTo(this.room.width, 0)
                            .lineTo(this.room.width - this.room.height * darknessSize / 100, 0)
                            .lineTo(this.room.width, this.room.height * darknessSize / 100)
                            .fill();
                    }
                    canvas.restore(); // remove clip
                    // Room border
                    if (this.room.lineStyle != enums_js_5.LineStyle.None) {
                        this.makeShape(canvas, false);
                        canvas
                            .strokeStyle(this.room.borderColor)
                            .lineWidth(this.room.lineWidth)
                            .lineDash(this.room.lineStyle)
                            .stroke();
                    }
                    // Room name
                    var f = app_js_3.App.map.settings.room.fontCfg(app_js_3.App.map.settings.draw.hand, 'obj');
                    var f2 = app_js_3.App.map.settings.room.font2Cfg(app_js_3.App.map.settings.draw.hand, 'obj');
                    canvas
                        .fillStyle(this.room.nameColor)
                        .drawText(0, 0, this.room.width, this.room.height, f.size, f.family, this.room.name);
                    // Room subtitle
                    if (this.room.subtitle) {
                        canvas
                            .fillStyle(this.room.subtitle)
                            .drawTextBottom(0, 0, this.room.width, this.room.height - 5, f2.size, f2.family, this.room.subtitle);
                    }
                    // Objects in room
                    var x = this.room.width * 0.8;
                    var y = this.room.height + 20;
                    canvas.fillStyle(this.room.nameColor);
                    this.drawObjects(canvas, x, y, this.room.objects);
                    canvas.restore();
                };
                RoomView.prototype.drawObjects = function (canvas, x, y, objList) {
                    var _this = this;
                    objList.forEach(function (obj) {
                        canvas.fillText(obj.name, x, y, app_js_3.App.map.settings.room.font2Cfg(app_js_3.App.map.settings.draw.hand, 'string'), IScreen_js_2.TextAlign.Left, IScreen_js_2.TextBaseline.Middle);
                        y += 14;
                        y = _this.drawObjects(canvas, x + 10, y, obj.content);
                    });
                    return y;
                };
                RoomView.prototype.drawSimple = function (canvas, hover) {
                    // Translate to room's coordinates, so we can offset everything from (0,0).
                    canvas
                        .save()
                        .translate(this.room.x, this.room.y);
                    this.makeShape(canvas, true);
                    // Nearly transparent background (for selection purposes):
                    canvas
                        .fillStyle(enums_js_5.Values.COLOR_TRANSPARENT)
                        .fill();
                    canvas.restore();
                };
                RoomView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
                    this.drawConnectorHandles(canvas, mouseX, mouseY, selectionSize, hover);
                };
                return RoomView;
            }(boxView_js_1.BoxView));
            exports_30("RoomView", RoomView);
        }
    };
});
System.register("util/point", [], function (exports_31, context_31) {
    "use strict";
    var Point;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [],
        execute: function () {
            Point = /** @class */ (function () {
                // Create a point given two coordinates.
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                return Point;
            }());
            exports_31("Point", Point);
        }
    };
});
System.register("views/connectorView", ["app", "views/view", "util/util", "enums/enums", "drawing/IScreen", "util/point"], function (exports_32, context_32) {
    "use strict";
    var app_js_4, view_js_2, util_js_2, enums_js_6, IScreen_js_3, point_js_1, ConnectorView;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (app_js_4_1) {
                app_js_4 = app_js_4_1;
            },
            function (view_js_2_1) {
                view_js_2 = view_js_2_1;
            },
            function (util_js_2_1) {
                util_js_2 = util_js_2_1;
            },
            function (enums_js_6_1) {
                enums_js_6 = enums_js_6_1;
            },
            function (IScreen_js_3_1) {
                IScreen_js_3 = IScreen_js_3_1;
            },
            function (point_js_1_1) {
                point_js_1 = point_js_1_1;
            }
        ],
        execute: function () {
            ConnectorView = /** @class */ (function (_super) {
                __extends(ConnectorView, _super);
                function ConnectorView(connection) {
                    var _this = _super.call(this) || this;
                    _this.connector = connection;
                    return _this;
                }
                ConnectorView.prototype.getModel = function () {
                    return this.connector;
                };
                Object.defineProperty(ConnectorView.prototype, "movingSelectable", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                ConnectorView.prototype.drawConnectorHandle = function (canvas, x, y, mouseX, mouseY) {
                    // If mouse is over connector handle, then highlight it.
                    if (mouseX >= x - enums_js_6.Values.DIMEN_CONNECTOR_HANDLE && mouseX <= x + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && mouseY >= y - enums_js_6.Values.DIMEN_CONNECTOR_HANDLE && mouseY <= y + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE) {
                        canvas.fillStyle(enums_js_6.Values.COLOR_CONNECTOR_HIGHLIGHT);
                    }
                    else {
                        canvas.fillStyle(enums_js_6.Values.COLOR_CONNECTOR);
                    }
                    canvas
                        .beginPath()
                        .moveTo(x + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE, y) // move must end on right perimeter of arc.
                        .arc(x, y, enums_js_6.Values.DIMEN_CONNECTOR_HANDLE, 0, Math.PI * 2, true)
                        .fill()
                        .stroke();
                };
                ConnectorView.prototype.dockToPoints = function (dock, dir) {
                    var _a = dock.directionToPos(dir, false), x = _a.x, y = _a.y;
                    // Treat room temporarily as a rectangle (true) to get the right endpoint for the stalk.
                    var _b = dock.directionToPos(dir, true), rx = _b.x, ry = _b.y;
                    var dx = rx + enums_js_6.Direction.toCardinalVector(dir).x * app_js_4.App.map.settings.connector.stalk;
                    var dy = ry + enums_js_6.Direction.toCardinalVector(dir).y * app_js_4.App.map.settings.connector.stalk;
                    return { x: x, y: y, dx: dx, dy: dy };
                };
                ConnectorView.prototype.drawArrow = function (canvas, x, y, angle) {
                    var arrowSize = app_js_4.App.map.settings.connector.arrowSize;
                    canvas.save();
                    canvas.translate(x, y);
                    canvas.rotate(angle);
                    canvas.translate(-x, -y);
                    canvas.beginPath();
                    canvas.moveTo(x - arrowSize, y - arrowSize);
                    canvas.lineTo(x - arrowSize, y + arrowSize);
                    canvas.lineTo(x + arrowSize, y);
                    canvas.closePath();
                    canvas.fill();
                    canvas.restore();
                };
                ConnectorView.prototype.draw = function (canvas, hover) {
                    var dockStartX = this.connector.startX;
                    var dockStartY = this.connector.startY;
                    var dockEndX = this.connector.endX;
                    var dockEndY = this.connector.endY;
                    var startX = this.connector.startX;
                    var startY = this.connector.startY;
                    var endX = this.connector.endX;
                    var endY = this.connector.endY;
                    var arrow1x;
                    var arrow1y;
                    var arrow1a;
                    var arrow2x;
                    var arrow2y;
                    var arrow2a;
                    var centerx;
                    var centery;
                    canvas
                        .save()
                        .beginPath();
                    // There are 4 possibilities:
                    // - undocked to undocked: can only be a straight line
                    // - docked to undocked: can be quadratic or straight
                    // - undocked to docked: can be quadratic or straight
                    // - docked to docked: can be bezier or straight
                    // Calculate (x,y) coordinates of dockStart, start, end and dockEnd
                    // Undocked -> Undocked
                    if (!this.connector.dockStart && !this.connector.dockEnd) {
                    }
                    // Docked -> Docked
                    else if (this.connector.dockStart && this.connector.dockEnd) {
                        var _a = this.dockToPoints(this.connector.dockStart, this.connector.startDir), dockStartX = _a.x, dockStartY = _a.y, startX = _a.dx, startY = _a.dy;
                        var _b = this.dockToPoints(this.connector.dockEnd, this.connector.endDir), dockEndX = _b.x, dockEndY = _b.y, endX = _b.dx, endY = _b.dy;
                    }
                    // Docked -> Undocked
                    else if (this.connector.dockStart && !this.connector.dockEnd) {
                        var _c = this.dockToPoints(this.connector.dockStart, this.connector.startDir), dockStartX = _c.x, dockStartY = _c.y, startX = _c.dx, startY = _c.dy;
                    }
                    // Undocked -> Docked
                    else {
                        var _d = this.dockToPoints(this.connector.dockEnd, this.connector.endDir), dockEndX = _d.x, dockEndY = _d.y, endX = _d.dx, endY = _d.dy;
                    }
                    arrow1x = startX + (endX - startX) * 0.1;
                    arrow1y = startY + (endY - startY) * 0.1;
                    arrow2x = startX + (endX - startX) * 0.9;
                    arrow2y = startY + (endY - startY) * 0.9;
                    arrow1a = arrow2a = Math.atan2(endY - startY, endX - startX);
                    centerx = startX + (endX - startX) * 0.5;
                    centery = startY + (endY - startY) * 0.5;
                    // Undocked -> Undocked
                    if (!this.connector.dockStart && !this.connector.dockEnd) {
                        canvas.line(startX, startY, endX, endY);
                        this.clearRegion = new util_js_2.Rect(startX, startY, endX, endY);
                        //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
                    }
                    // Docked -> Docked:
                    else if (this.connector.dockStart && this.connector.dockEnd) {
                        canvas.line(dockStartX, dockStartY, startX, startY);
                        this.clearRegion = new util_js_2.Rect(dockStartX, dockStartY, startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_4.App.map.settings.connector.curveStrength;
                            var cp1x = startX + enums_js_6.Direction.toCardinalVector(this.connector.startDir).x * dist;
                            var cp1y = startY + enums_js_6.Direction.toCardinalVector(this.connector.startDir).y * dist;
                            var cp2x = endX + enums_js_6.Direction.toCardinalVector(this.connector.endDir).x * dist;
                            var cp2y = endY + enums_js_6.Direction.toCardinalVector(this.connector.endDir).y * dist;
                            canvas.bezier3(startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
                            var r = this.getRectBezier3(startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
                            this.clearRegion.maximize(r);
                            var _e = canvas.getBezierXY(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY), arrow1x = _e.x, arrow1y = _e.y;
                            var arrow1a = canvas.getBezierAngle(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
                            var _f = canvas.getBezierXY(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY), arrow2x = _f.x, arrow2y = _f.y;
                            var arrow2a = canvas.getBezierAngle(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
                            var _g = canvas.getBezierXY(0.5, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY), centerx = _g.x, centery = _g.y;
                        }
                        else {
                            canvas.line(startX, startY, endX, endY);
                            this.clearRegion.maximize(new util_js_2.Rect(startX, startY, endX, endY));
                        }
                        canvas.line(endX, endY, dockEndX, dockEndY);
                        this.clearRegion.maximize(new util_js_2.Rect(endX, endY, dockEndX, dockEndY));
                        //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
                    }
                    // Docked -> Undocked:
                    else if (this.connector.dockStart && !this.connector.dockEnd) {
                        canvas.line(dockStartX, dockStartY, startX, startY);
                        this.clearRegion = new util_js_2.Rect(dockStartX, dockStartY, startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_4.App.map.settings.connector.curveStrength;
                            var cp1x = startX + enums_js_6.Direction.toCardinalVector(this.connector.startDir).x * dist;
                            var cp1y = startY + enums_js_6.Direction.toCardinalVector(this.connector.startDir).y * dist;
                            canvas.bezier2(startX, startY, cp1x, cp1y, endX, endY);
                            var r = this.getRectBezier2(startX, startY, cp1x, cp1y, endX, endY);
                            this.clearRegion.maximize(r);
                            var _h = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY), arrow1x = _h.x, arrow1y = _h.y;
                            var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
                            var _j = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY), arrow2x = _j.x, arrow2y = _j.y;
                            var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);
                            var _k = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY), centerx = _k.x, centery = _k.y;
                        }
                        else {
                            canvas.line(startX, startY, endX, endY);
                            this.clearRegion.maximize(new util_js_2.Rect(startX, startY, endX, endY));
                        }
                        //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
                    }
                    // Undocked -> Docked:
                    else {
                        //canvas.moveTo(startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_4.App.map.settings.connector.curveStrength;
                            var cp1x = endX + enums_js_6.Direction.toCardinalVector(this.connector.endDir).x * dist;
                            var cp1y = endY + enums_js_6.Direction.toCardinalVector(this.connector.endDir).y * dist;
                            canvas.bezier2(startX, startY, cp1x, cp1y, endX, endY);
                            this.clearRegion = this.getRectBezier2(startX, startY, cp1x, cp1y, endX, endY);
                            var _l = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY), arrow1x = _l.x, arrow1y = _l.y;
                            var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
                            var _m = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY), arrow2x = _m.x, arrow2y = _m.y;
                            var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);
                            var _o = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY), centerx = _o.x, centery = _o.y;
                        }
                        else {
                            canvas.line(startX, startY, endX, endY);
                            this.clearRegion = new util_js_2.Rect(startX, startY, endX, endY);
                        }
                        canvas.line(endX, endY, dockEndX, dockEndY);
                        this.clearRegion.maximize(new util_js_2.Rect(endX, endY, dockEndX, dockEndY));
                        //canvas.strokeRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
                    }
                    // Stroke path with wide, nearly transparent background (for selection purposes):
                    canvas
                        .lineWidth(enums_js_6.Values.DIMEN_CONNECTOR_WIDE)
                        .lineCap(IScreen_js_3.CapStyle.Round)
                        .lineJoin(IScreen_js_3.JoinStyle.Round)
                        .strokeStyle(enums_js_6.Values.COLOR_TRANSPARENT)
                        .stroke();
                    // Stroke with visible line: 
                    canvas
                        .lineWidth(this.connector.lineWidth)
                        .strokeStyle(this.selected ? enums_js_6.Values.COLOR_SELECTED : (hover ? enums_js_6.Values.COLOR_HOVER : this.connector.color))
                        .lineDash(this.connector.lineStyle)
                        .stroke();
                    // Draw one-way arrows:
                    if (this.connector.oneWay) {
                        canvas.fillStyle(this.selected ? enums_js_6.Values.COLOR_SELECTED : (hover ? enums_js_6.Values.COLOR_HOVER : this.connector.color));
                        this.drawArrow(canvas, arrow1x, arrow1y, arrow1a);
                        this.drawArrow(canvas, arrow2x, arrow2y, arrow2a);
                    }
                    // Draw name (if any)
                    if (this.connector.name) {
                        var textWidth = canvas.textWidth(this.connector.name, app_js_4.App.map.settings.connector.fontCfg(app_js_4.App.map.settings.draw.hand, 'string'));
                        canvas
                            .lineWidth(1)
                            .lineDash(enums_js_6.LineStyle.Solid)
                            .strokeStyle('#000')
                            .fillStyle('#fff')
                            .roundedRect(centerx - textWidth / 2 - 5, centery - 11, textWidth + 10, 20, 3)
                            .fill()
                            .stroke()
                            .fillStyle('#333')
                            .fillText(this.connector.name, centerx, centery, app_js_4.App.map.settings.connector.fontCfg(app_js_4.App.map.settings.draw.hand, 'string'), IScreen_js_3.TextAlign.Center, IScreen_js_3.TextBaseline.Middle);
                    }
                    // Draw start and end types
                    canvas
                        .beginPath()
                        .fillStyle(this.connector.color)
                        .fillText(this.connector.startLabel ? this.connector.startLabel : enums_js_6.ConnectorType.toString(this.connector.startType), arrow1x + Math.cos(arrow1a - Math.PI / 2) * app_js_4.App.map.settings.connector.labelDistance, arrow1y + Math.sin(arrow1a - Math.PI / 2) * app_js_4.App.map.settings.connector.labelDistance, app_js_4.App.map.settings.connector.font2Cfg(app_js_4.App.map.settings.draw.hand, 'string'), IScreen_js_3.TextAlign.Center, IScreen_js_3.TextBaseline.Middle)
                        .fillText(this.connector.endLabel ? this.connector.endLabel : enums_js_6.ConnectorType.toString(this.connector.endType), arrow2x + Math.cos(arrow2a + Math.PI / 2) * app_js_4.App.map.settings.connector.labelDistance, arrow2y + Math.sin(arrow2a + Math.PI / 2) * app_js_4.App.map.settings.connector.labelDistance, app_js_4.App.map.settings.connector.font2Cfg(app_js_4.App.map.settings.draw.hand, 'string'), IScreen_js_3.TextAlign.Center, IScreen_js_3.TextBaseline.Middle);
                    canvas.restore();
                };
                ConnectorView.prototype.drawSimple = function (canvas, hover) {
                    var dockStartX = this.connector.startX;
                    var dockStartY = this.connector.startY;
                    var dockEndX = this.connector.endX;
                    var dockEndY = this.connector.endY;
                    var startX = this.connector.startX;
                    var startY = this.connector.startY;
                    var endX = this.connector.endX;
                    var endY = this.connector.endY;
                    canvas
                        .save()
                        .beginPath();
                    // There are 4 possibilities:
                    // - undocked to undocked: can only be a straight line
                    // - docked to undocked: can be quadratic or straight
                    // - undocked to docked: can be quadratic or straight
                    // - docked to docked: can be bezier or straight
                    // Calculate (x,y) coordinates of dockStart, start, end and dockEnd
                    // Undocked -> Undocked
                    if (!this.connector.dockStart && !this.connector.dockEnd) {
                    }
                    // Docked -> Docked
                    else if (this.connector.dockStart && this.connector.dockEnd) {
                        var _a = this.dockToPoints(this.connector.dockStart, this.connector.startDir), dockStartX = _a.x, dockStartY = _a.y, startX = _a.dx, startY = _a.dy;
                        var _b = this.dockToPoints(this.connector.dockEnd, this.connector.endDir), dockEndX = _b.x, dockEndY = _b.y, endX = _b.dx, endY = _b.dy;
                    }
                    // Docked -> Undocked
                    else if (this.connector.dockStart && !this.connector.dockEnd) {
                        var _c = this.dockToPoints(this.connector.dockStart, this.connector.startDir), dockStartX = _c.x, dockStartY = _c.y, startX = _c.dx, startY = _c.dy;
                    }
                    // Undocked -> Docked
                    else {
                        var _d = this.dockToPoints(this.connector.dockEnd, this.connector.endDir), dockEndX = _d.x, dockEndY = _d.y, endX = _d.dx, endY = _d.dy;
                    }
                    // Docked -> undocked
                    if (!this.connector.dockStart && !this.connector.dockEnd) {
                        canvas.moveTo(startX, startY);
                        canvas.lineTo(endX, endY);
                    }
                    // Docked to docked:
                    else if (this.connector.dockStart && this.connector.dockEnd) {
                        canvas.moveTo(dockStartX, dockStartY);
                        canvas.lineTo(startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_4.App.map.settings.connector.curveStrength;
                            var cp1x = startX + enums_js_6.Direction.toCardinalVector(this.connector.startDir).x * dist;
                            var cp1y = startY + enums_js_6.Direction.toCardinalVector(this.connector.startDir).y * dist;
                            var cp2x = endX + enums_js_6.Direction.toCardinalVector(this.connector.endDir).x * dist;
                            var cp2y = endY + enums_js_6.Direction.toCardinalVector(this.connector.endDir).y * dist;
                            canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
                        }
                        else {
                            canvas.lineTo(endX, endY);
                        }
                        canvas.lineTo(dockEndX, dockEndY);
                    }
                    // Docked to undocked:
                    else if (this.connector.dockStart && !this.connector.dockEnd) {
                        canvas.moveTo(dockStartX, dockStartY);
                        canvas.lineTo(startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_4.App.map.settings.connector.curveStrength;
                            var cp1x = startX + enums_js_6.Direction.toCardinalVector(this.connector.startDir).x * dist;
                            var cp1y = startY + enums_js_6.Direction.toCardinalVector(this.connector.startDir).y * dist;
                            canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
                        }
                        else {
                            canvas.lineTo(endX, endY);
                        }
                    }
                    // Undocked to docked:
                    else {
                        canvas.moveTo(startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_4.App.map.settings.connector.curveStrength;
                            var cp1x = endX + enums_js_6.Direction.toCardinalVector(this.connector.endDir).x * dist;
                            var cp1y = endY + enums_js_6.Direction.toCardinalVector(this.connector.endDir).y * dist;
                            canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
                        }
                        else {
                            canvas.lineTo(endX, endY);
                        }
                        canvas.lineTo(dockEndX, dockEndY);
                    }
                    // Stroke path with wide, nearly transparent background (for selection purposes):
                    canvas
                        .lineWidth(20)
                        .lineCap(IScreen_js_3.CapStyle.Round)
                        .lineJoin(IScreen_js_3.JoinStyle.Round)
                        .strokeStyle(enums_js_6.Values.COLOR_TRANSPARENT)
                        .stroke();
                    canvas.restore();
                };
                ConnectorView.prototype.clear = function (canvas) {
                    var margin = enums_js_6.Values.DIMEN_CONNECTOR_WIDE;
                    if (!this.clearRegion)
                        return;
                    this.clearRegion.expande(margin);
                    canvas.clearRect(this.clearRegion.x, this.clearRegion.y, this.clearRegion.width, this.clearRegion.height);
                    return this.clearRegion;
                };
                ConnectorView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    if (!this.selected || selectionSize != 1)
                        return;
                    canvas
                        .save()
                        .lineWidth(1)
                        .strokeStyle(enums_js_6.Values.COLOR_LINE);
                    var _a = this.getStartHandleLocation(), x = _a.x, y = _a.y;
                    this.drawConnectorHandle(canvas, x, y, mouseX, mouseY);
                    var _b = this.getEndHandleLocation(), x = _b.x, y = _b.y;
                    this.drawConnectorHandle(canvas, x, y, mouseX, mouseY);
                    canvas.restore();
                };
                ConnectorView.prototype.isIn = function (x, y, width, height) {
                    var r = new util_js_2.Rect(x, y, x + width, y + height);
                    var _a = this.getStartHandleLocation(), x = _a.x, y = _a.y;
                    if (r.contains(x, y))
                        return true;
                    var _b = this.getEndHandleLocation(), x = _b.x, y = _b.y;
                    if (r.contains(x, y))
                        return true;
                    return false;
                };
                ConnectorView.prototype.getStartHandleLocation = function () {
                    if (this.connector.dockStart) {
                        var _a = this.connector.dockStart.directionToPos(this.connector.startDir, false), x = _a.x, y = _a.y;
                    }
                    else {
                        var x = this.connector.startX;
                        var y = this.connector.startY;
                    }
                    return { x: x, y: y };
                };
                ConnectorView.prototype.getEndHandleLocation = function () {
                    if (this.connector.dockEnd) {
                        var _a = this.connector.dockEnd.directionToPos(this.connector.endDir, false), x = _a.x, y = _a.y;
                    }
                    else {
                        var x = this.connector.endX;
                        var y = this.connector.endY;
                    }
                    return { x: x, y: y };
                };
                ConnectorView.prototype.isConnectorHandle = function (x, y) {
                    var _a = this.getStartHandleLocation(), px = _a.x, py = _a.y;
                    if (x >= px - enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && x <= px + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && y >= py - enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && y <= py + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE)
                        return enums_js_6.ConnectorHandle.Start;
                    var _b = this.getEndHandleLocation(), px = _b.x, py = _b.y;
                    if (x >= px - enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && x <= px + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && y >= py - enums_js_6.Values.DIMEN_CONNECTOR_HANDLE
                        && y <= py + enums_js_6.Values.DIMEN_CONNECTOR_HANDLE)
                        return enums_js_6.ConnectorHandle.End;
                    return undefined;
                };
                ConnectorView.prototype.getRectBezier2 = function (px0, py0, cx, cy, px1, py1) {
                    function pointOnCurve(t, px0, py0, cx, cy, px1, py1) {
                        if (t <= 0 || 1 <= t || isNaN(t))
                            return;
                        var c1 = new point_js_1.Point(px0 + (cx - px0) * t, py0 + (cy - py0) * t);
                        var c2 = new point_js_1.Point(cx + (px1 - cx) * t, cy + (py1 - cy) * t);
                        return new point_js_1.Point(c1.x + (c2.x - c1.x) * t, c1.y + (c2.y - c1.y) * t);
                    }
                    var tx = (px0 - cx) / (px0 - 2 * cx + px1);
                    var ty = (py0 - cy) / (py0 - 2 * cy + py1);
                    var ex = pointOnCurve(tx, px0, py0, cx, cy, px1, py1);
                    var xMin = ex ? Math.min(px0, px1, ex.x) : Math.min(px0, px1);
                    var xMax = ex ? Math.max(px0, px1, ex.x) : Math.max(px0, px1);
                    var ey = pointOnCurve(ty, px0, py0, cx, cy, px1, py1);
                    var yMin = ey ? Math.min(py0, py1, ey.y) : Math.min(py0, py1);
                    var yMax = ey ? Math.max(py0, py1, ey.y) : Math.max(py0, py1);
                    return new util_js_2.Rect(xMin, yMin, xMax, yMax);
                };
                ConnectorView.prototype.getRectBezier3 = function (px0, py0, cx0, cy0, cx1, cy1, px1, py1) {
                    var tvalues = [], xvalues = [], yvalues = [], a, b, c, t, t1, t2, b2ac, sqrtb2ac;
                    for (var i = 0; i < 2; ++i) {
                        if (i == 0) {
                            b = 6 * px0 - 12 * cx0 + 6 * cx1;
                            a = -3 * px0 + 9 * cx0 - 9 * cx1 + 3 * px1;
                            c = 3 * cx0 - 3 * px0;
                        }
                        else {
                            b = 6 * py0 - 12 * cy0 + 6 * cy1;
                            a = -3 * py0 + 9 * cy0 - 9 * cy1 + 3 * py1;
                            c = 3 * cy0 - 3 * py0;
                        }
                        if (Math.abs(a) < 1e-12) {
                            if (Math.abs(b) < 1e-12) {
                                continue;
                            }
                            t = -c / b;
                            if (0 < t && t < 1) {
                                tvalues.push(t);
                            }
                            continue;
                        }
                        b2ac = b * b - 4 * c * a;
                        if (b2ac < 0) {
                            if (Math.abs(b2ac) < 1e-12) {
                                t = -b / (2 * a);
                                if (0 < t && t < 1) {
                                    tvalues.push(t);
                                }
                            }
                            continue;
                        }
                        sqrtb2ac = Math.sqrt(b2ac);
                        t1 = (-b + sqrtb2ac) / (2 * a);
                        if (0 < t1 && t1 < 1) {
                            tvalues.push(t1);
                        }
                        t2 = (-b - sqrtb2ac) / (2 * a);
                        if (0 < t2 && t2 < 1) {
                            tvalues.push(t2);
                        }
                    }
                    var j = tvalues.length, mt;
                    while (j--) {
                        t = tvalues[j];
                        mt = 1 - t;
                        xvalues[j] = (mt * mt * mt * px0) + (3 * mt * mt * t * cx0) + (3 * mt * t * t * cx1) + (t * t * t * px1);
                        yvalues[j] = (mt * mt * mt * py0) + (3 * mt * mt * t * cy0) + (3 * mt * t * t * cy1) + (t * t * t * py1);
                    }
                    xvalues.push(px0, px1);
                    yvalues.push(py0, py1);
                    return new util_js_2.Rect(Math.min.apply(Math, xvalues), Math.min.apply(Math, yvalues), Math.max.apply(Math, xvalues), Math.max.apply(Math, yvalues));
                };
                return ConnectorView;
            }(view_js_2.View));
            exports_32("ConnectorView", ConnectorView);
        }
    };
});
System.register("views/noteView", ["views/boxView", "enums/enums", "app"], function (exports_33, context_33) {
    "use strict";
    var boxView_js_2, enums_js_7, app_js_5, NoteView;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (boxView_js_2_1) {
                boxView_js_2 = boxView_js_2_1;
            },
            function (enums_js_7_1) {
                enums_js_7 = enums_js_7_1;
            },
            function (app_js_5_1) {
                app_js_5 = app_js_5_1;
            }
        ],
        execute: function () {
            NoteView = /** @class */ (function (_super) {
                __extends(NoteView, _super);
                function NoteView(note) {
                    var _this = _super.call(this, note) || this;
                    _this.note = note;
                    return _this;
                }
                NoteView.prototype.getModel = function () {
                    return this.note;
                };
                NoteView.prototype.draw = function (canvas, hover) {
                    // Translate to note's coordinates, so we can offset everything from (0,0).
                    canvas
                        .save()
                        .translate(this.note.x, this.note.y);
                    this.makeShape(canvas, true);
                    // Nearly transparent background (for selection purposes):
                    canvas
                        .fillStyle(enums_js_7.Values.COLOR_TRANSPARENT)
                        .fill();
                    // Selection glow
                    if (this.selected) {
                        canvas
                            .fillStyle(enums_js_7.Values.COLOR_SELECTED_GLOW)
                            .fill();
                    }
                    // Note fill:
                    this.makeShape(canvas, false);
                    canvas
                        .fillStyle(this.note.fillColor)
                        .fill();
                    // Note fold (drawn using clipping)
                    canvas.clip();
                    this.makeShape(canvas, false);
                    canvas
                        .lineWidth(this.note.lineWidth / 2)
                        .strokeStyle(this.note.borderColor)
                        .beginPath()
                        .moveTo(this.note.width - this.note.height * 0.6, 0)
                        .lineTo(this.note.width, this.note.height * 0.6)
                        .stroke();
                    // Note border:
                    if (this.note.lineStyle != enums_js_7.LineStyle.None) {
                        this.makeShape(canvas, false);
                        canvas
                            .strokeStyle(this.note.borderColor)
                            .lineWidth(this.note.lineWidth)
                            .lineDash(this.note.lineStyle)
                            .stroke();
                    }
                    var f = app_js_5.App.map.settings.room.fontCfg(app_js_5.App.map.settings.draw.hand, 'obj');
                    canvas
                        .fillStyle(this.note.textColor)
                        .drawText(0, 0, this.note.width, this.note.height, f.size, f.family, this.note.text);
                    canvas.restore();
                };
                NoteView.prototype.drawSimple = function (canvas, hover) {
                    // Translate to note's coordinates, so we can offset everything from (0,0).
                    canvas
                        .save()
                        .translate(this.note.x, this.note.y);
                    this.makeShape(canvas, true);
                    // Nearly transparent background (for selection purposes):
                    canvas
                        .fillStyle(enums_js_7.Values.COLOR_TRANSPARENT)
                        .fill();
                    canvas.restore();
                };
                NoteView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
                };
                return NoteView;
            }(boxView_js_2.BoxView));
            exports_33("NoteView", NoteView);
        }
    };
});
System.register("views/blockView", ["views/boxView", "enums/enums"], function (exports_34, context_34) {
    "use strict";
    var boxView_js_3, enums_js_8, BlockView;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (boxView_js_3_1) {
                boxView_js_3 = boxView_js_3_1;
            },
            function (enums_js_8_1) {
                enums_js_8 = enums_js_8_1;
            }
        ],
        execute: function () {
            BlockView = /** @class */ (function (_super) {
                __extends(BlockView, _super);
                function BlockView(block) {
                    var _this = _super.call(this, block) || this;
                    _this.block = block;
                    return _this;
                }
                BlockView.prototype.getModel = function () {
                    return this.block;
                };
                BlockView.prototype.draw = function (canvas, hover) {
                    // Translate to block's coordinates, so we can offset everything from (0,0).
                    canvas
                        .save()
                        .translate(this.block.x, this.block.y);
                    this.makeShape(canvas, true);
                    // Nearly transparent background (for selection purposes):
                    canvas
                        .fillStyle(enums_js_8.Values.COLOR_TRANSPARENT)
                        .fill();
                    // Selection glow
                    if (this.selected) {
                        canvas
                            .fillStyle(enums_js_8.Values.COLOR_SELECTED_GLOW)
                            .fill();
                    }
                    // Block fill:
                    this.makeShape(canvas, false);
                    canvas
                        .fillStyle(this.block.fillColor)
                        .fill();
                    // Block border:
                    if (this.block.lineStyle != enums_js_8.LineStyle.None) {
                        this.makeShape(canvas, false);
                        canvas
                            .strokeStyle(this.block.borderColor)
                            .lineWidth(this.block.lineWidth)
                            .lineDash(this.block.lineStyle)
                            .stroke();
                    }
                    canvas.restore();
                };
                BlockView.prototype.drawSimple = function (canvas, hover) {
                    // Translate to block's coordinates, so we can offset everything from (0,0).
                    canvas
                        .save()
                        .translate(this.block.x, this.block.y);
                    this.makeShape(canvas, true);
                    // Nearly transparent background (for selection purposes):
                    canvas
                        .fillStyle(enums_js_8.Values.COLOR_TRANSPARENT)
                        .fill();
                    canvas.restore();
                };
                BlockView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
                };
                return BlockView;
            }(boxView_js_3.BoxView));
            exports_34("BlockView", BlockView);
        }
    };
});
System.register("views/viewFactory", ["models/room", "models/note", "models/connector", "views/roomView", "views/noteView", "views/connectorView", "models/block", "views/blockView"], function (exports_35, context_35) {
    "use strict";
    var room_1, note_1, connector_1, roomView_1, noteView_1, connectorView_1, block_1, blockView_1, ViewFactory;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [
            function (room_1_1) {
                room_1 = room_1_1;
            },
            function (note_1_1) {
                note_1 = note_1_1;
            },
            function (connector_1_1) {
                connector_1 = connector_1_1;
            },
            function (roomView_1_1) {
                roomView_1 = roomView_1_1;
            },
            function (noteView_1_1) {
                noteView_1 = noteView_1_1;
            },
            function (connectorView_1_1) {
                connectorView_1 = connectorView_1_1;
            },
            function (block_1_1) {
                block_1 = block_1_1;
            },
            function (blockView_1_1) {
                blockView_1 = blockView_1_1;
            }
        ],
        execute: function () {
            ViewFactory = /** @class */ (function () {
                function ViewFactory() {
                }
                // Given a Model instance, return a View for it.
                ViewFactory.create = function (model) {
                    if (model instanceof room_1.Room)
                        return new roomView_1.RoomView(model);
                    if (model instanceof note_1.Note)
                        return new noteView_1.NoteView(model);
                    if (model instanceof connector_1.Connector)
                        return new connectorView_1.ConnectorView(model);
                    if (model instanceof block_1.Block)
                        return new blockView_1.BlockView(model);
                    throw ("No view registered for model.");
                };
                return ViewFactory;
            }());
            exports_35("ViewFactory", ViewFactory);
        }
    };
});
System.register("maps/zorkMap", [], function (exports_36, context_36) {
    "use strict";
    var ZorkMap;
    var __moduleName = context_36 && context_36.id;
    return {
        setters: [],
        execute: function () {
            ZorkMap = /** @class */ (function () {
                function ZorkMap() {
                }
                ZorkMap.json = "{\"settings\":{\"grid\":{\"visible\":true,\"origin\":true,\"snap\":true,\"size\":32,\"color\":\"#f0f0f0\",\"lineWidth\":1,\"originWidth\":5},\"room\":{\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":3,\"lineStyle\":1,\"shape\":0,\"rounding\":5,\"darknessSize\":50,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"nameColor\":\"#333333\",\"subtitleColor\":\"#666666\",\"darkColor\":\"rgba(33, 35, 97, 0.8)\",\"startRoomColor\":\"green\",\"endRoomColor\":\"red\"},\"connector\":{\"lineWidth\":2,\"lineStyle\":1,\"isCurve\":false,\"color\":\"#000000\",\"stalk\":16,\"labelDistance\":12,\"arrowSize\":5,\"curveStrength\":0.4},\"note\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"textColor\":\"#333333\"},\"block\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":0,\"shape\":0,\"rounding\":0,\"fillColor\":\"#D5E5D6\",\"borderColor\":\"#000000\"},\"background\":\"wood\"},\"title\":\"Untitled map\",\"author\":\"\",\"description\":\"\",\"elements\":[{\"id\":1,\"x\":-256,\"y\":-160,\"type\":\"Block\",\"width\":480,\"height\":320,\"_lineStyle\":2},{\"id\":2,\"x\":-384,\"y\":-64,\"type\":\"Room\",\"name\":\"West of house\",\"subtitle\":\"\",\"description\":\"You are standing in an open field west of a white house, with a boarded front door.\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":192,\"objects\":[{\"name\":\"mailbox\",\"type\":\"Object\",\"content\":[],\"kind\":5}]},{\"id\":3,\"x\":-160,\"y\":-288,\"type\":\"Room\",\"name\":\"North of house\",\"subtitle\":\"\",\"description\":\"You are facing the north side of a white house. There is no door here, and all the windows are boarded up. To the north a narrow path winds through the trees.\",\"dark\":false,\"endroom\":false,\"width\":256,\"height\":64,\"objects\":[]},{\"id\":4,\"x\":256,\"y\":-64,\"type\":\"Room\",\"name\":\"Behind house\",\"subtitle\":\"\",\"description\":\"You are behind the white house. A path leads into the forest to the east. In one corner of the house there is a small window which is slightly ajar.\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":192,\"objects\":[]},{\"id\":5,\"x\":-192,\"y\":224,\"type\":\"Room\",\"name\":\"South of house\",\"subtitle\":\"\",\"description\":\"You are facing the south side of a white house. There is no door here, and all the windows are boarded.\",\"dark\":false,\"endroom\":false,\"width\":288,\"height\":64,\"objects\":[]},{\"id\":6,\"x\":-192,\"y\":0,\"type\":\"Room\",\"name\":\"Living room\",\"subtitle\":\"\",\"description\":\"You are in the living room. There is a doorway to the east, a wooden door with strange gothic lettering to the west, which appears to be nailed shut, a trophy case, and a large oriental rug in the center of the room.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[{\"name\":\"trophy case\",\"type\":\"Object\",\"content\":[],\"kind\":5},{\"name\":\"lamp\",\"type\":\"Object\",\"content\":[],\"kind\":5},{\"name\":\"sword\",\"type\":\"Object\",\"content\":[],\"kind\":5}]},{\"id\":7,\"x\":0,\"y\":0,\"type\":\"Room\",\"name\":\"Kitchen\",\"subtitle\":\"\",\"description\":\"You are in the kitchen of the white house. A table seems to have been used recently for the preparation of food. A passage leads to the west and a dark staircase can be seen leading upward. A dark chimney leads down and to the east is a small window which is open.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[{\"name\":\"glass bottle\",\"type\":\"Object\",\"content\":[{\"name\":\"brown sack\",\"type\":\"Object\",\"content\":[{\"name\":\"block of cheese\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"kind\":5}],\"kind\":5}]},{\"id\":8,\"x\":0,\"y\":-128,\"type\":\"Room\",\"name\":\"Attic\",\"subtitle\":\"\",\"description\":\"This is the attic. The only exit is a stairway leading down.\",\"dark\":true,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[{\"name\":\"rope\",\"type\":\"Object\",\"content\":[],\"kind\":5},{\"name\":\"nasty knife\",\"type\":\"Object\",\"content\":[],\"kind\":5}]},{\"id\":9,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":3,\"startDir\":0,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":10,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":3,\"dockEnd\":4,\"startDir\":4,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":11,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":5,\"startDir\":8,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":12,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":5,\"startDir\":8,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":96,\"endX\":-192,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":13,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":6,\"dockEnd\":7,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":14,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":8,\"dockEnd\":7,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":15,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":7,\"dockEnd\":4,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":352,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":16,\"x\":480,\"y\":0,\"type\":\"Room\",\"name\":\"Grove\",\"subtitle\":\"\",\"description\":\"You are in a small clearing in a well marked forest path that extends to the east and west.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":17,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":16,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":18,\"x\":480,\"y\":-416,\"type\":\"Room\",\"name\":\"Forest (2)\",\"subtitle\":\"\",\"description\":\"This is a dimly lit forest, with large trees all around.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":19,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":16,\"dockEnd\":18,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":20,\"x\":704,\"y\":-416,\"type\":\"Room\",\"name\":\"Forest (4)\",\"subtitle\":\"\",\"description\":\"This is a dimly lit forest, with large trees all around.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":21,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":18,\"dockEnd\":20,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":22,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":6,\"dockEnd\":0,\"startDir\":8,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":128,\"endX\":-128,\"oneWay\":false,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"(to Cellar)\",\"_lineStyle\":2},{\"id\":23,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":0,\"dockEnd\":6,\"startDir\":4,\"endDir\":12,\"startY\":32,\"startX\":-224,\"endY\":0,\"endX\":-160,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"(to Strange Pasage)\",\"_lineStyle\":2},{\"id\":24,\"x\":-192,\"y\":-128,\"type\":\"Note\",\"text\":\"House\",\"width\":96,\"height\":64},{\"id\":25,\"x\":-608,\"y\":192,\"type\":\"Room\",\"name\":\"Stone Barrow\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":160,\"height\":64,\"objects\":[]},{\"id\":26,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":25,\"dockEnd\":2,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":128,\"endX\":-416,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":27,\"x\":-768,\"y\":192,\"type\":\"Room\",\"name\":\"Inside the Barrow\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":28,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":25,\"dockEnd\":27,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":29,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":27,\"dockEnd\":0,\"startDir\":8,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":320,\"endX\":-704,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"to Zork II\",\"_isCurve\":false},{\"id\":30,\"x\":480,\"y\":384,\"type\":\"Room\",\"name\":\"Forest (3)\",\"subtitle\":\"\",\"description\":\"This is a dimly lit forest, with large trees all around.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":31,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":16,\"dockEnd\":30,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":32,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":5,\"dockEnd\":30,\"startDir\":8,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":64,\"endX\":416,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":33,\"x\":672,\"y\":160,\"type\":\"Room\",\"name\":\"Canyon View\",\"subtitle\":\"\",\"description\":\"You are at the top of the Great Canyon on its west wall. From here there is a marvelous view of the canyon and parts of the Frigid River upstream. Across the canyon, the walls of the White Cliffs join the mighty ramparts of the Flathead Mountains to the east. Following the Canyon upstream to the north, Aragain Falls may be seen, complete with rainbow. The mighty Frigid River flows out from a great dark cavern. To the west and south can be seen an immense forest, stretching for miles around. A path leads northwest. It is possible to climb down into the canyon from here.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":34,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":16,\"dockEnd\":33,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":35,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":33,\"dockEnd\":30,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":416,\"endX\":544,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":36,\"x\":672,\"y\":288,\"type\":\"Room\",\"name\":\"Rocky Ledge\",\"subtitle\":\"\",\"description\":\"You are on a ledge about halfway up the wall of the river canyon. You can see from here that the main flow from Aragain Falls twists along a passage which it is impossible for you to enter. Below you is the canyon bottom. Above you is more cliff, which appears climbable.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":37,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":33,\"dockEnd\":36,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":38,\"x\":704,\"y\":416,\"type\":\"Room\",\"name\":\"Canyon Bottom\",\"subtitle\":\"\",\"description\":\"You are beneath the walls of the river canyon which may be climbable here. The lesser part of the runoff of Aragain Falls flows by below. To the north is a narrow path.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":39,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":36,\"dockEnd\":38,\"startDir\":8,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":416,\"endX\":672,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":40,\"x\":832,\"y\":288,\"type\":\"Room\",\"name\":\"End of Rainbow\",\"subtitle\":\"\",\"description\":\"You are on a small, rocky beach on the continuation of the Frigid River past the Falls. The beach is narrow due to the presence of the White Cliffs. The river canyon opens here and sunlight shines in from above. A rainbow crosses over the falls to the east and a narrow path continues to the southwest.\",\"dark\":false,\"endroom\":true,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":41,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":38,\"dockEnd\":40,\"startDir\":0,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":42,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":0,\"dockEnd\":0,\"startDir\":4,\"endDir\":4,\"startY\":320,\"startX\":1056,\"endY\":320,\"endX\":960,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"(to On the Rainbow)\",\"_lineStyle\":2},{\"id\":43,\"x\":-544,\"y\":-416,\"type\":\"Room\",\"name\":\"Forest (1)\",\"subtitle\":\"\",\"description\":\"This is a forest, with trees in all directions. To the east, there appears to be sunlight.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":44,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":43,\"startDir\":12,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":-160,\"endX\":-448,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":45,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":43,\"dockEnd\":30,\"startDir\":8,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":448,\"endX\":512,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":46,\"x\":-96,\"y\":-416,\"type\":\"Room\",\"name\":\"Forest Path\",\"subtitle\":\"\",\"description\":\"This is a path winding through a dimly lit forest. The path heads north-south here. One particularly large tree with some low branches stands at the edge of the path.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[]},{\"id\":47,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":3,\"dockEnd\":46,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":48,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":43,\"dockEnd\":46,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-384,\"endX\":-96,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":49,\"x\":-96,\"y\":-672,\"type\":\"Room\",\"name\":\"Clearing\",\"subtitle\":\"\",\"description\":\"You are in a clearing, with a forest surrounding you on all sides. A path leads south.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[{\"name\":\"pile of leaves\",\"type\":\"Object\",\"content\":[],\"kind\":5}]},{\"id\":50,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":46,\"dockEnd\":49,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":51,\"x\":96,\"y\":-544,\"type\":\"Room\",\"name\":\"Up a Tree\",\"subtitle\":\"\",\"description\":\"You are about 10 feet above the ground nestled among some large branches. The nearest branch above you is above your reach.\",\"dark\":false,\"endroom\":false,\"width\":128,\"height\":64,\"objects\":[{\"name\":\"bird's nest\",\"type\":\"Object\",\"content\":[{\"name\":\"jewel-encrusted egg\",\"type\":\"Object\",\"content\":[],\"kind\":5,\"description\":\"The egg is covered with fine gold inlay, and ornamented in lapis lazuli and mother-of-pearl. Unlike most eggs, this one is hinged and closed with a delicate looking clasp. The egg appears extremely fragile.\"}],\"kind\":5}]},{\"id\":52,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":46,\"dockEnd\":51,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":53,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":49,\"dockEnd\":0,\"startDir\":10,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":-544,\"endX\":-160,\"oneWay\":false,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"(to Grating Room)\"},{\"id\":54,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":43,\"dockEnd\":49,\"startDir\":0,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-640,\"endX\":-128,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":55,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":49,\"dockEnd\":18,\"startDir\":4,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-448,\"endX\":416,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":56,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":46,\"dockEnd\":18,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-384,\"endX\":416,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":57,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":30,\"dockEnd\":0,\"startDir\":12,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":416,\"endX\":384,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"(to Forest 1)\"},{\"id\":58,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":7,\"dockEnd\":0,\"startDir\":9,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":128,\"endX\":32,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"(from Studio)\",\"endLabel\":\"\"}],\"startRoom\":2}";
                return ZorkMap;
            }());
            exports_36("ZorkMap", ZorkMap);
        }
    };
});
System.register("io/mapJSON", ["models/map", "models/room", "models/note", "models/connector", "models/block", "models/mapSettings"], function (exports_37, context_37) {
    "use strict";
    var map_js_2, room_js_2, note_js_2, connector_js_3, block_js_2, mapSettings_js_6, MapJSON;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [
            function (map_js_2_1) {
                map_js_2 = map_js_2_1;
            },
            function (room_js_2_1) {
                room_js_2 = room_js_2_1;
            },
            function (note_js_2_1) {
                note_js_2 = note_js_2_1;
            },
            function (connector_js_3_1) {
                connector_js_3 = connector_js_3_1;
            },
            function (block_js_2_1) {
                block_js_2 = block_js_2_1;
            },
            function (mapSettings_js_6_1) {
                mapSettings_js_6 = mapSettings_js_6_1;
            }
        ],
        execute: function () {
            MapJSON = /** @class */ (function () {
                function MapJSON() {
                }
                MapJSON.save = function (map) {
                    // Generate unique keys for all map elements.
                    var id = 1;
                    map.elements.forEach(function (elem) { return elem.id = id++; });
                    // Convert the map to JSON. During the conversion, with replace
                    // the dockStart and dockEnd properties of Connector with ID numbers
                    // using a replacer function.
                    // Also, the map property of the map elements is not saved.
                    var json = JSON.stringify(map, function (key, value) {
                        // In the replacer, the value of "this" is the object being serialized.
                        if (key == 'map')
                            return undefined; // avoid circular references to map.
                        if (key == '_dockStart' || key == 'dockStart') { // replace room references with IDs
                            if (this._dockStart == null)
                                return 0;
                            return this._dockStart.id;
                        }
                        if (key == '_dockEnd' || key == 'dockEnd') { // replace room references with IDs
                            if (this._dockEnd == null)
                                return 0;
                            return this._dockEnd.id;
                        }
                        if (key == '_startRoom' || key == 'startRoom') { // replace room references with IDs
                            if (this._startRoom == null)
                                return 0;
                            return this._startRoom.id;
                        }
                        return value;
                    });
                    return json;
                };
                //
                // Copy fields from a source object into a target object.
                //
                MapJSON.clone = function (target, source) {
                    var keys = Object.keys(source);
                    for (var i = 0; i < keys.length; i++) {
                        target[keys[i]] = source[keys[i]];
                    }
                    return target;
                };
                //
                // Given a JSON string, parse it into a Map instance.
                //
                MapJSON.load = function (text) {
                    var _this = this;
                    // Parse the json text. If will return a tree of ordinary objects,
                    // not instances of Map, Room or Connector.
                    // We clone the root object into a Map instance.
                    var map = this.clone(new map_js_2.Map(), JSON.parse(text));
                    // The map settings are an ordinary object. Clone it into a real MapSettings
                    // instance.
                    map.settings = new mapSettings_js_6.MapSettings().cloneFrom(map.settings);
                    // The elements array of the Map now contains a list of ordinary objects.
                    // We remove the list contents from the Map, then loop through the list
                    // to create a new list with Room and Connector instances based on the 
                    // "type" field of each list element.
                    var elements = map.elements;
                    map.elements = new Array();
                    elements.forEach(function (element) {
                        var model = null;
                        var type = (element.type || element["_type"]); // _type is protected but present in the json
                        if (type == 'Room')
                            model = _this.clone(new room_js_2.Room(map.settings), element);
                        else if (type == 'Note')
                            model = _this.clone(new note_js_2.Note(map.settings), element);
                        else if (type == 'Block')
                            model = _this.clone(new block_js_2.Block(map.settings), element);
                        else if (type == 'Connector')
                            model = _this.clone(new connector_js_3.Connector(map.settings), element);
                        else {
                            throw (new TypeError("Element type " + type + " is unknown."));
                        }
                        map.add(model);
                    });
                    // The startRoom property still contains a room ID. 
                    // If the ID is not 0, replace it with an actual room.
                    // Otherwise set to null.
                    if (map.startRoom) {
                        map.startRoom = map.findById(map.startRoom, room_js_2.Room);
                    }
                    else {
                        map.startRoom = null;
                    }
                    // The connectors still contain IDs for dockStart and dockEnd references.
                    // Loop through all map elements,converting Connectors' dockStart and 
                    // dockEnd IDs to references.
                    map.elements.forEach(function (elem) {
                        if (elem instanceof connector_js_3.Connector) {
                            if (elem.dockStart != 0) {
                                elem.dockStart = map.findById(elem.dockStart, room_js_2.Room);
                            }
                            else {
                                elem.dockStart = null;
                            }
                            if (elem.dockEnd != 0) {
                                elem.dockEnd = map.findById(elem.dockEnd, room_js_2.Room);
                            }
                            else {
                                elem.dockEnd = null;
                            }
                        }
                    });
                    // Return the parsed map instance.
                    return map;
                };
                return MapJSON;
            }());
            exports_37("MapJSON", MapJSON);
        }
    };
});
System.register("maps/adventureMap", [], function (exports_38, context_38) {
    "use strict";
    var AdventureMap;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [],
        execute: function () {
            AdventureMap = /** @class */ (function () {
                function AdventureMap() {
                }
                AdventureMap.json = "{\"settings\":{\"grid\":{\"visible\":true,\"origin\":true,\"snap\":true,\"size\":32,\"color\":\"#f0f0f0\",\"lineWidth\":1,\"originWidth\":5},\"room\":{\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":8,\"darknessSize\":50,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"nameColor\":\"#333333\",\"subtitleColor\":\"#666666\",\"darkColor\":\"rgba(33, 35, 97, 0.8)\",\"startRoomColor\":\"green\",\"endRoomColor\":\"red\"},\"connector\":{\"lineWidth\":1,\"lineStyle\":1,\"isCurve\":false,\"color\":\"#000000\",\"stalk\":16,\"arrowSize\":5,\"curveStrength\":0.4,\"labelDistance\":12},\"note\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"textColor\":\"#333333\"},\"block\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":0,\"shape\":0,\"rounding\":0,\"fillColor\":\"#D5E5D6\",\"borderColor\":\"#000000\"},\"background\":\"wood\"},\"title\":\"Untitled map\",\"author\":\"\",\"description\":\"\",\"elements\":[{\"id\":1,\"x\":0,\"y\":-32,\"type\":\"Room\",\"name\":\"Building\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"keys\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]},{\"name\":\"lamp\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]},{\"name\":\"food\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]},{\"name\":\"bottle\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":2,\"x\":-160,\"y\":-32,\"type\":\"Room\",\"name\":\"End of a Road\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":3,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":1,\"dockEnd\":2,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":2,\"endType\":1,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":4,\"x\":-352,\"y\":-32,\"type\":\"Room\",\"name\":\"Hill in Road\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":5,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":4,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":6,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":2,\"startDir\":0,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-64,\"endX\":-192,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":7,\"x\":-160,\"y\":96,\"type\":\"Room\",\"name\":\"Valley\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":8,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":7,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":9,\"x\":-160,\"y\":224,\"type\":\"Room\",\"name\":\"Slit in Streambed\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":10,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":7,\"dockEnd\":9,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":11,\"x\":-160,\"y\":352,\"type\":\"Room\",\"name\":\"Outside Grate\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":12,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":9,\"dockEnd\":11,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":13,\"x\":-160,\"y\":480,\"type\":\"Room\",\"name\":\"Below the Grate\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":14,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":11,\"dockEnd\":13,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":15,\"x\":-320,\"y\":96,\"type\":\"Room\",\"name\":\"In Forest (1)\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":16,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":7,\"dockEnd\":15,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":17,\"x\":-480,\"y\":-32,\"type\":\"Room\",\"name\":\"In Forest (2)\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":18,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":15,\"dockEnd\":17,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":19,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":17,\"dockEnd\":2,\"startDir\":0,\"endDir\":15,\"startY\":0,\"startX\":0,\"endY\":-64,\"endX\":-160,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":20,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":15,\"startDir\":0,\"endDir\":1,\"startY\":0,\"startX\":0,\"endY\":64,\"endX\":-416,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":21,\"x\":-320,\"y\":480,\"type\":\"Room\",\"name\":\"Cobble Crawl\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"cage\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":22,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":13,\"dockEnd\":21,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":23,\"x\":-480,\"y\":480,\"type\":\"Room\",\"name\":\"Debris Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"rod\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":24,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":21,\"dockEnd\":23,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":25,\"x\":-640,\"y\":480,\"type\":\"Room\",\"name\":\"Awkward sloping E/W Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":26,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":23,\"dockEnd\":25,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":27,\"x\":-800,\"y\":480,\"type\":\"Room\",\"name\":\"Bird Chamber\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"bird\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":28,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":25,\"dockEnd\":27,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":29,\"x\":-960,\"y\":480,\"type\":\"Room\",\"name\":\"Top of Small Pit\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":30,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":27,\"dockEnd\":29,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":31,\"x\":-960,\"y\":608,\"type\":\"Room\",\"name\":\"Hall of Mists\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":32,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":29,\"dockEnd\":31,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":33,\"x\":-1120,\"y\":608,\"type\":\"Room\",\"name\":\"East Bank of Fissure\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":34,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":31,\"dockEnd\":33,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":35,\"x\":-1280,\"y\":608,\"type\":\"Room\",\"name\":\"West Side of Fissure\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"diamonds\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"#F8DFD0\"},{\"id\":36,\"type\":\"Connector\",\"name\":\"use rod\",\"dockStart\":33,\"dockEnd\":35,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":37,\"x\":-1440,\"y\":608,\"type\":\"Room\",\"name\":\"West End of Hall of Mists\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":38,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":35,\"dockEnd\":37,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":39,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":37,\"dockEnd\":35,\"startDir\":0,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":576,\"endX\":-1280,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":40,\"x\":-960,\"y\":736,\"type\":\"Room\",\"name\":\"Nugget of Gold Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"nugget\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"#F8DFD0\"},{\"id\":41,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":31,\"dockEnd\":40,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":42,\"x\":-1600,\"y\":608,\"type\":\"Room\",\"name\":\"East End of Long Hall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":43,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":37,\"dockEnd\":42,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":44,\"x\":-1760,\"y\":608,\"type\":\"Room\",\"name\":\"West end of Long Hall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":45,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":42,\"dockEnd\":44,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":46,\"x\":-1760,\"y\":480,\"type\":\"Room\",\"name\":\"Crossover, High NS, Low EW\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":47,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":44,\"dockEnd\":46,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":48,\"x\":-1760,\"y\":352,\"type\":\"Room\",\"name\":\"Dead End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":49,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":46,\"dockEnd\":48,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":50,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":46,\"dockEnd\":42,\"startDir\":12,\"endDir\":13,\"startY\":0,\"startX\":0,\"endY\":640,\"endX\":-1632,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":51,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":42,\"dockEnd\":46,\"startDir\":0,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":640,\"endX\":-1664,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":52,\"x\":-1760,\"y\":736,\"type\":\"Room\",\"name\":\"Maze of Passages, All Different\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[],\"_shape\":1},{\"id\":53,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":44,\"dockEnd\":52,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":54,\"x\":-1760,\"y\":864,\"type\":\"Room\",\"name\":\"Dead End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"vending machine\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":55,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":52,\"dockEnd\":54,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":56,\"x\":-1440,\"y\":736,\"type\":\"Room\",\"name\":\"Maze of Passages, All Alike\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[],\"_shape\":1},{\"id\":57,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":37,\"dockEnd\":56,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":58,\"x\":-1600,\"y\":864,\"type\":\"Room\",\"name\":\"Dead End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":59,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":56,\"dockEnd\":58,\"startDir\":10,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":60,\"x\":-1280,\"y\":864,\"type\":\"Room\",\"name\":\"Brink of Pit\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":61,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":56,\"dockEnd\":60,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":62,\"x\":-1280,\"y\":992,\"type\":\"Room\",\"name\":\"Dead End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":63,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":60,\"dockEnd\":62,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":64,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":60,\"dockEnd\":27,\"startDir\":4,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":544,\"endX\":-736,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":65,\"x\":-960,\"y\":1248,\"type\":\"Room\",\"name\":\"Hall of the Mountain King\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"snake\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]}]},{\"id\":66,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":31,\"dockEnd\":65,\"startDir\":6,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":992,\"endX\":-864,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":67,\"x\":-960,\"y\":1120,\"type\":\"Room\",\"name\":\"Low N/S At Hole\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"silver\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":68,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":65,\"dockEnd\":67,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":69,\"x\":-960,\"y\":992,\"type\":\"Room\",\"name\":\"Y2\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":70,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":67,\"dockEnd\":69,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":71,\"x\":-1120,\"y\":992,\"type\":\"Room\",\"name\":\"Window on Pit\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"figure\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":72,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":69,\"dockEnd\":71,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":73,\"x\":-800,\"y\":960,\"type\":\"Room\",\"name\":\"Jumble of Rock\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":74,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":69,\"dockEnd\":73,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":75,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":73,\"dockEnd\":31,\"startDir\":0,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":640,\"endX\":-864,\"oneWay\":true,\"startType\":3,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":76,\"type\":\"Connector\",\"name\":\"PLUGH\",\"dockStart\":69,\"dockEnd\":1,\"startDir\":5,\"endDir\":7,\"startY\":992,\"startX\":-864,\"endY\":32,\"endX\":32,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true,\"_lineWidth\":2,\"_lineStyle\":5},{\"id\":77,\"type\":\"Connector\",\"name\":\"XYZZY\",\"dockStart\":1,\"dockEnd\":23,\"startDir\":8,\"endDir\":14,\"startY\":32,\"startX\":32,\"endY\":544,\"endX\":-448,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true,\"_lineWidth\":2,\"_lineStyle\":5},{\"id\":78,\"x\":-1216,\"y\":1248,\"type\":\"Room\",\"name\":\"West Side Chaimber\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"coins\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"rgb(246, 213, 213)\"},{\"id\":79,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":65,\"dockEnd\":78,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":80,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":78,\"dockEnd\":46,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":512,\"endX\":-1664,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":81,\"x\":-960,\"y\":1376,\"type\":\"Room\",\"name\":\"South Side Chamber\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"jewelry\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"rgb(246, 213, 213)\"},{\"id\":82,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":65,\"dockEnd\":81,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":83,\"x\":-1120,\"y\":1376,\"type\":\"Room\",\"name\":\"Secret E/W Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":84,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":65,\"dockEnd\":83,\"startDir\":10,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":85,\"x\":-1280,\"y\":1376,\"type\":\"Room\",\"name\":\"Secret Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"dragon\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]},{\"name\":\"rug\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":86,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":83,\"dockEnd\":85,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":87,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":85,\"dockEnd\":160,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":1184,\"endX\":-1856,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":false},{\"id\":88,\"x\":-480,\"y\":1504,\"type\":\"Room\",\"name\":\"Dirty Passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":89,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":67,\"dockEnd\":88,\"startDir\":4,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":90,\"x\":-320,\"y\":1504,\"type\":\"Room\",\"name\":\"Brink of Small Climbable Pit\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":91,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":88,\"dockEnd\":90,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":92,\"x\":-320,\"y\":1632,\"type\":\"Room\",\"name\":\"Bottom of Pit with Stream\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"water\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":93,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":90,\"dockEnd\":92,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":94,\"x\":-640,\"y\":1504,\"type\":\"Room\",\"name\":\"Dusty Rock Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":95,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":88,\"dockEnd\":94,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":96,\"x\":-800,\"y\":1728,\"type\":\"Room\",\"name\":\"Complex Junction\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":97,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":94,\"dockEnd\":96,\"startDir\":9,\"endDir\":3,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":98,\"x\":-640,\"y\":1856,\"type\":\"Room\",\"name\":\"Anteroom\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"magazine\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":99,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":96,\"dockEnd\":98,\"startDir\":4,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":3,\"startLabel\":\"e\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":100,\"x\":-480,\"y\":1856,\"type\":\"Room\",\"name\":\"Witt's End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[],\"_shape\":1},{\"id\":101,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":98,\"dockEnd\":100,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":102,\"x\":-800,\"y\":1504,\"type\":\"Room\",\"name\":\"Shell Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"clam\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":103,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":96,\"dockEnd\":102,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":104,\"x\":-640,\"y\":1376,\"type\":\"Room\",\"name\":\"Arched Hall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"sea water\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":105,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":102,\"dockEnd\":104,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":106,\"x\":-960,\"y\":1504,\"type\":\"Room\",\"name\":\"Long Sloping Corridor, Ragged Walls\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":107,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":102,\"dockEnd\":106,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":108,\"x\":-1120,\"y\":1504,\"type\":\"Room\",\"name\":\"Cul-de-sac\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"pearl\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"rgb(246, 213, 213)\"},{\"id\":109,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":106,\"dockEnd\":108,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":110,\"x\":-960,\"y\":1728,\"type\":\"Room\",\"name\":\"Bedquilt\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":111,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":96,\"dockEnd\":110,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":112,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":110,\"dockEnd\":94,\"startDir\":1,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":1568,\"endX\":-640,\"oneWay\":true,\"startType\":3,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":113,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":110,\"dockEnd\":98,\"startDir\":6,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":1792,\"endX\":-672,\"oneWay\":false,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":114,\"x\":-1600,\"y\":1632,\"type\":\"Room\",\"name\":\"Large Low Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":115,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":110,\"dockEnd\":114,\"startDir\":0,\"endDir\":3,\"startY\":0,\"startX\":0,\"endY\":1632,\"endX\":-1504,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":116,\"x\":-1120,\"y\":1920,\"type\":\"Room\",\"name\":\"Swiss Cheese Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":117,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":110,\"dockEnd\":116,\"startDir\":12,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":118,\"x\":-960,\"y\":1920,\"type\":\"Room\",\"name\":\"Soft Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"pillow\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":119,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":116,\"dockEnd\":118,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":120,\"x\":-1120,\"y\":2176,\"type\":\"Room\",\"name\":\"Tall E/W Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":121,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":116,\"dockEnd\":120,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":122,\"x\":-960,\"y\":2304,\"type\":\"Room\",\"name\":\"Wide Place in Tight Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":123,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":120,\"dockEnd\":122,\"startDir\":4,\"endDir\":0,\"startY\":1920,\"startX\":-1024,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":124,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":83,\"dockEnd\":122,\"startDir\":10,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":2144,\"endX\":-864,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":125,\"x\":-1280,\"y\":2048,\"type\":\"Room\",\"name\":\"Mass of Boulders\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":126,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":120,\"dockEnd\":125,\"startDir\":12,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":127,\"x\":-1440,\"y\":1920,\"type\":\"Room\",\"name\":\"East End of Two Pit Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":128,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":116,\"dockEnd\":127,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":129,\"x\":-1600,\"y\":1920,\"type\":\"Room\",\"name\":\"West End of Two Pit Room (Hole)\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":130,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":127,\"dockEnd\":129,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":131,\"x\":-1440,\"y\":2048,\"type\":\"Room\",\"name\":\"East Pit\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"oil\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":132,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":127,\"dockEnd\":131,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":133,\"x\":-1600,\"y\":2048,\"type\":\"Room\",\"name\":\"West Pit\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"plant\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":134,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":129,\"dockEnd\":133,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":135,\"x\":-1760,\"y\":1920,\"type\":\"Room\",\"name\":\"Slab Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":136,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":129,\"dockEnd\":135,\"startDir\":12,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":1696,\"endX\":-1728,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":137,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":110,\"dockEnd\":135,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":1600,\"endX\":-1696,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":138,\"x\":-1440,\"y\":1504,\"type\":\"Room\",\"name\":\"Oriental Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"vase\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"rgb(246, 213, 213)\"},{\"id\":139,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":114,\"dockEnd\":138,\"startDir\":6,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":1760,\"endX\":-1216,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":140,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":138,\"dockEnd\":116,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":1888,\"endX\":-1152,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":141,\"x\":-1600,\"y\":1504,\"type\":\"Room\",\"name\":\"Dead End Crawl\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":142,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":114,\"dockEnd\":141,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":143,\"x\":-1440,\"y\":1248,\"type\":\"Room\",\"name\":\"Misty Cavern\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":144,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":138,\"dockEnd\":143,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":145,\"x\":-1600,\"y\":1376,\"type\":\"Room\",\"name\":\"Alcove (Easy Squeeze)\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":146,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":143,\"dockEnd\":145,\"startDir\":12,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":1344,\"endX\":-1632,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":147,\"x\":-1920,\"y\":2048,\"type\":\"Room\",\"name\":\"Narrow Corridor\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":148,\"type\":\"Connector\",\"name\":\"CLIMB\",\"dockStart\":147,\"dockEnd\":133,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":2080,\"endX\":-1632,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":149,\"x\":-2080,\"y\":1920,\"type\":\"Room\",\"name\":\"Giant Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"eggs\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"rgb(246, 213, 213)\"},{\"id\":150,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":147,\"dockEnd\":149,\"startDir\":12,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":151,\"x\":-1920,\"y\":1792,\"type\":\"Room\",\"name\":\"Recent Cave-in\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":152,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":149,\"dockEnd\":151,\"startDir\":4,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":1856,\"endX\":-1888,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":153,\"x\":-2080,\"y\":1792,\"type\":\"Room\",\"name\":\"Immense N/S Passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"iron door\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":154,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":149,\"dockEnd\":153,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":155,\"x\":-2080,\"y\":1664,\"type\":\"Room\",\"name\":\"Cavern with Waterfall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"trident\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]},{\"name\":\"water\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":156,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":153,\"dockEnd\":155,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":157,\"x\":-2240,\"y\":1792,\"type\":\"Room\",\"name\":\"Steep Incline Above Large Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":158,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":155,\"dockEnd\":157,\"startDir\":12,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":159,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":157,\"dockEnd\":114,\"startDir\":8,\"endDir\":12,\"startY\":1792,\"startX\":-2144,\"endY\":1696,\"endX\":-1632,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":160,\"x\":-1760,\"y\":1248,\"type\":\"Room\",\"name\":\"Secret N/S Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":161,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":160,\"dockEnd\":135,\"startDir\":9,\"endDir\":15,\"startY\":0,\"startX\":0,\"endY\":1888,\"endX\":-1760,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":162,\"x\":-1760,\"y\":1120,\"type\":\"Room\",\"name\":\"Mirror Canyon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":163,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":160,\"dockEnd\":162,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":164,\"x\":-1760,\"y\":992,\"type\":\"Room\",\"name\":\"Reservoir\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"water\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":165,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":162,\"dockEnd\":164,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":166,\"x\":-3008,\"y\":1504,\"type\":\"Room\",\"name\":\"Sloping Corridor\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":167,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":166,\"dockEnd\":114,\"startDir\":4,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":1696,\"endX\":-1632,\"oneWay\":false,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":168,\"x\":-2848,\"y\":1376,\"type\":\"Room\",\"name\":\"SW Side of Chasm\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"troll\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]}]},{\"id\":169,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":166,\"dockEnd\":168,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":170,\"x\":-2688,\"y\":1248,\"type\":\"Room\",\"name\":\"NE Side of Chasm\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"troll\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]}]},{\"id\":171,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":168,\"dockEnd\":170,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":172,\"x\":-2528,\"y\":1120,\"type\":\"Room\",\"name\":\"Corridor\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":173,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":170,\"dockEnd\":172,\"startDir\":2,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":1184,\"endX\":-2176,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":174,\"x\":-2368,\"y\":1120,\"type\":\"Room\",\"name\":\"Fork in Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":175,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":172,\"dockEnd\":174,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":176,\"x\":-2208,\"y\":1248,\"type\":\"Room\",\"name\":\"Limestone Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":177,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":174,\"dockEnd\":176,\"startDir\":6,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":178,\"x\":-2048,\"y\":1376,\"type\":\"Room\",\"name\":\"Front of Barren Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":179,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":176,\"dockEnd\":178,\"startDir\":8,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":180,\"x\":-1888,\"y\":1376,\"type\":\"Room\",\"name\":\"Barren Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"bear\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]},{\"name\":\"chain\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":181,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":178,\"dockEnd\":180,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":182,\"x\":-2208,\"y\":992,\"type\":\"Room\",\"name\":\"Junction with Warm Walls\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":183,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":174,\"dockEnd\":182,\"startDir\":2,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":1056,\"endX\":-2176,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":184,\"x\":-2048,\"y\":992,\"type\":\"Room\",\"name\":\"Chamber of Boulders\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"spices\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}],\"_fillColor\":\"#F8DFD0\"},{\"id\":185,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":182,\"dockEnd\":184,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":186,\"x\":-2208,\"y\":864,\"type\":\"Room\",\"name\":\"Breath-taking View\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"volcano\",\"type\":\"Object\",\"description\":\"\",\"kind\":6,\"content\":[]}]},{\"id\":187,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":182,\"dockEnd\":186,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"}],\"startRoom\":0}";
                return AdventureMap;
            }());
            exports_38("AdventureMap", AdventureMap);
        }
    };
});
System.register("maps/castleofdoomMap", [], function (exports_39, context_39) {
    "use strict";
    var CastleofdoomMap;
    var __moduleName = context_39 && context_39.id;
    return {
        setters: [],
        execute: function () {
            CastleofdoomMap = /** @class */ (function () {
                function CastleofdoomMap() {
                }
                CastleofdoomMap.json = "{\"settings\":{\"grid\":{\"visible\":true,\"origin\":true,\"snap\":true,\"size\":32,\"color\":\"#f0f0f0\",\"lineWidth\":1,\"originWidth\":5,\"background\":\"#ffffff\"},\"room\":{\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":2,\"lineStyle\":1,\"shape\":0,\"rounding\":6,\"darknessSize\":50,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"nameColor\":\"#333333\",\"subtitleColor\":\"#666666\",\"darkColor\":\"rgba(33, 35, 97, 0.8)\",\"startRoomColor\":\"green\",\"endRoomColor\":\"red\"},\"connector\":{\"lineWidth\":2,\"lineStyle\":1,\"isCurve\":false,\"color\":\"rgb(0, 1, 41)\",\"stalk\":16,\"arrowSize\":5,\"curveStrength\":0.4,\"labelDistance\":12},\"note\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"textColor\":\"#333333\"},\"block\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":0,\"shape\":0,\"rounding\":0,\"fillColor\":\"#D5E5D6\",\"borderColor\":\"#000000\"}},\"title\":\"Castle of Doom\",\"author\":\"John Metcalf\",\"description\":\"\",\"elements\":[{\"id\":1,\"x\":-32,\"y\":-32,\"type\":\"Room\",\"name\":\"Entrance to South Wing\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":2,\"x\":-32,\"y\":96,\"type\":\"Room\",\"name\":\"Circular Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":3,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":1,\"dockEnd\":2,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":4,\"x\":-32,\"y\":-160,\"type\":\"Room\",\"name\":\"Courtyard\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"coin\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":5,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":1,\"dockEnd\":4,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":6,\"x\":128,\"y\":-160,\"type\":\"Room\",\"name\":\"Entrace to East Wing\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":7,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":6,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":8,\"x\":288,\"y\":-160,\"type\":\"Room\",\"name\":\"North End of Tunnel\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":9,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":6,\"dockEnd\":8,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":10,\"x\":-32,\"y\":-288,\"type\":\"Room\",\"name\":\"Inside Main Gates\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"guard\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]}]},{\"id\":11,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":10,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":12,\"x\":128,\"y\":-288,\"type\":\"Room\",\"name\":\"Guardroom\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"key\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":13,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":10,\"dockEnd\":12,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":14,\"x\":-32,\"y\":-416,\"type\":\"Room\",\"name\":\"Outside Main Gates\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"pass\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":15,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":10,\"dockEnd\":14,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":16,\"x\":448,\"y\":-160,\"type\":\"Room\",\"name\":\"Dining Hall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":17,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":8,\"dockEnd\":16,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":18,\"x\":448,\"y\":-288,\"type\":\"Room\",\"name\":\"Kitchen\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"knife\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":19,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":16,\"dockEnd\":18,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":20,\"x\":288,\"y\":-32,\"type\":\"Room\",\"name\":\"North to South Tunnel\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":21,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":8,\"dockEnd\":20,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":22,\"x\":448,\"y\":-32,\"type\":\"Room\",\"name\":\"Bedroom\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"nail file\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":23,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":20,\"dockEnd\":22,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":24,\"x\":288,\"y\":96,\"type\":\"Room\",\"name\":\"Dead End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"bottle\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":25,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":20,\"dockEnd\":24,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":26,\"x\":128,\"y\":96,\"type\":\"Room\",\"name\":\"Armoury\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":27,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":26,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":28,\"x\":128,\"y\":224,\"type\":\"Room\",\"name\":\"Bottom of Staircase\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":29,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":26,\"dockEnd\":28,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":30,\"x\":288,\"y\":224,\"type\":\"Room\",\"name\":\"Spiral Staircase\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":31,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":28,\"dockEnd\":30,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":32,\"x\":448,\"y\":224,\"type\":\"Room\",\"name\":\"Spiral Staircase\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":33,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":30,\"dockEnd\":32,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":34,\"x\":608,\"y\":224,\"type\":\"Room\",\"name\":\"Small Circular Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"sorcerer\",\"type\":\"Object\",\"description\":\"\",\"kind\":4,\"content\":[]}]},{\"id\":35,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":32,\"dockEnd\":34,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":36,\"x\":-192,\"y\":96,\"type\":\"Room\",\"name\":\"Bottom of Staircase\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":37,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":36,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":38,\"x\":-192,\"y\":224,\"type\":\"Room\",\"name\":\"Narrow Corridor\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":39,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":36,\"dockEnd\":38,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":40,\"x\":-352,\"y\":224,\"type\":\"Room\",\"name\":\"Small Cavern\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":41,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":38,\"dockEnd\":40,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":42,\"x\":-352,\"y\":352,\"type\":\"Room\",\"name\":\"Dungeon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":43,\"type\":\"Connector\",\"name\":\"open grate\",\"dockStart\":40,\"dockEnd\":42,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":44,\"x\":-192,\"y\":352,\"type\":\"Room\",\"name\":\"Maze of Tunnels\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":45,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":38,\"dockEnd\":44,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":46,\"x\":-32,\"y\":480,\"type\":\"Room\",\"name\":\"Maze of Tunnels\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"paper\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":47,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":44,\"dockEnd\":46,\"startDir\":8,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":48,\"x\":-192,\"y\":-160,\"type\":\"Room\",\"name\":\"Entrance to West Wing\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":49,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":48,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":50,\"x\":-192,\"y\":-32,\"type\":\"Room\",\"name\":\"Chapel\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":51,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":48,\"dockEnd\":50,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":52,\"x\":-352,\"y\":-32,\"type\":\"Room\",\"name\":\"Vestry\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[{\"name\":\"mirror\",\"type\":\"Object\",\"description\":\"\",\"kind\":5,\"content\":[]}]},{\"id\":53,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":50,\"dockEnd\":52,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"}],\"startRoom\":0}";
                return CastleofdoomMap;
            }());
            exports_39("CastleofdoomMap", CastleofdoomMap);
        }
    };
});
System.register("maps/hhg", [], function (exports_40, context_40) {
    "use strict";
    var HitchhikersguideMap;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [],
        execute: function () {
            HitchhikersguideMap = /** @class */ (function () {
                function HitchhikersguideMap() {
                }
                HitchhikersguideMap.json = "{\"settings\":{\"grid\":{\"visible\":true,\"origin\":true,\"snap\":true,\"size\":32,\"color\":\"#f0f0f0\",\"lineWidth\":1,\"originWidth\":5,\"background\":\"#ffffff\"},\"room\":{\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"darknessSize\":50,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"nameColor\":\"#333333\",\"subtitleColor\":\"#666666\",\"darkColor\":\"rgba(33, 35, 97, 0.8)\",\"startRoomColor\":\"green\",\"endRoomColor\":\"red\"},\"connector\":{\"lineWidth\":1,\"lineStyle\":1,\"isCurve\":false,\"color\":\"#000000\",\"stalk\":16,\"arrowSize\":5,\"curveStrength\":0.4,\"labelDistance\":12},\"note\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"textColor\":\"#333333\"},\"block\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":0,\"shape\":0,\"rounding\":0,\"fillColor\":\"#D5E5D6\",\"borderColor\":\"#000000\"}},\"title\":\"Hitch Hiker's Guide to the Galaxy\",\"author\":\"Alexander van Oostenrijk\",\"description\":\"\",\"elements\":[{\"id\":1,\"x\":-608,\"y\":-352,\"type\":\"Room\",\"name\":\"Back of House\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":2,\"x\":-608,\"y\":-224,\"type\":\"Room\",\"name\":\"Bedroom\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":3,\"x\":-608,\"y\":-96,\"type\":\"Room\",\"name\":\"Front Porch\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":4,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":3,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":5,\"x\":-608,\"y\":32,\"type\":\"Room\",\"name\":\"Front of House\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":6,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":3,\"dockEnd\":5,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":7,\"x\":-608,\"y\":160,\"type\":\"Room\",\"name\":\"Country Lane\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":8,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":5,\"dockEnd\":7,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":9,\"x\":-768,\"y\":160,\"type\":\"Room\",\"name\":\"Pub\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":10,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":7,\"dockEnd\":9,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":11,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":5,\"dockEnd\":1,\"startDir\":4,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":-256,\"endX\":-64,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":12,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":5,\"dockEnd\":1,\"startDir\":12,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-224,\"endX\":-192,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":13,\"x\":-192,\"y\":-352,\"type\":\"Room\",\"name\":\"Captain's Quarters\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":14,\"x\":-32,\"y\":-352,\"type\":\"Room\",\"name\":\"Vogon Hold\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":15,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":13,\"dockEnd\":14,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":16,\"x\":128,\"y\":-352,\"type\":\"Room\",\"name\":\"Airlock\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":17,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":14,\"dockEnd\":16,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":18,\"x\":-800,\"y\":-384,\"type\":\"Block\",\"width\":384,\"height\":672},{\"id\":19,\"x\":-768,\"y\":-352,\"type\":\"Note\",\"text\":\"Earth\",\"width\":96,\"height\":64,\"_shape\":0,\"_fillColor\":\"rgb(223, 223, 223)\",\"_lineWidth\":3},{\"id\":20,\"x\":-384,\"y\":-384,\"type\":\"Block\",\"width\":800,\"height\":128},{\"id\":21,\"x\":-352,\"y\":-352,\"type\":\"Note\",\"text\":\"Vogon Ship\",\"width\":96,\"height\":64,\"_textColor\":\"rgb(51, 51, 51)\",\"_lineWidth\":3,\"_fillColor\":\"rgb(223, 223, 223)\"},{\"id\":22,\"x\":-352,\"y\":-64,\"type\":\"Note\",\"text\":\"Heart of Gold\",\"width\":96,\"height\":64,\"_lineWidth\":3,\"_fillColor\":\"rgb(223, 223, 223)\"},{\"id\":23,\"x\":-192,\"y\":-192,\"type\":\"Room\",\"name\":\"Bridge\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":24,\"x\":-192,\"y\":-64,\"type\":\"Room\",\"name\":\"Galley\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":25,\"x\":-192,\"y\":64,\"type\":\"Room\",\"name\":\"Marvin's Party\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":26,\"x\":-32,\"y\":64,\"type\":\"Room\",\"name\":\"Corridor Aft End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":27,\"x\":128,\"y\":64,\"type\":\"Room\",\"name\":\"Hatchway\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":28,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":26,\"dockEnd\":27,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":29,\"x\":288,\"y\":64,\"type\":\"Room\",\"name\":\"Access Space\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":30,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":27,\"dockEnd\":29,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":31,\"x\":128,\"y\":192,\"type\":\"Room\",\"name\":\"Ramp\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":32,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":27,\"dockEnd\":31,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":33,\"x\":-32,\"y\":192,\"type\":\"Room\",\"name\":\"Engine Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":34,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":26,\"dockEnd\":33,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":35,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":26,\"dockEnd\":25,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":64,\"endX\":-128,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":36,\"x\":-32,\"y\":-64,\"type\":\"Room\",\"name\":\"Corridor Fore End\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":37,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":26,\"dockEnd\":36,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":38,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":24,\"dockEnd\":36,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-64,\"endX\":-96,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":39,\"x\":-32,\"y\":-192,\"type\":\"Room\",\"name\":\"Entry Bay 2\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":40,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":36,\"dockEnd\":39,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":41,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":36,\"dockEnd\":23,\"startDir\":14,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":-160,\"endX\":-128,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":42,\"type\":\"Connector\",\"name\":\"To Sauna\",\"dockStart\":23,\"dockEnd\":0,\"startDir\":12,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-160,\"endX\":-352,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":43,\"x\":-384,\"y\":-224,\"type\":\"Block\",\"width\":800,\"height\":512},{\"id\":44,\"x\":640,\"y\":-352,\"type\":\"Room\",\"name\":\"Lair\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":45,\"x\":480,\"y\":-224,\"type\":\"Room\",\"name\":\"Inner Lair\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":46,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":44,\"dockEnd\":45,\"startDir\":10,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":47,\"x\":800,\"y\":-352,\"type\":\"Room\",\"name\":\"Beast's Outer Lair\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":48,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":44,\"dockEnd\":47,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":49,\"x\":480,\"y\":-352,\"type\":\"Note\",\"text\":\"Traal\",\"width\":96,\"height\":64,\"_fillColor\":\"rgb(223, 223, 223)\",\"_lineWidth\":3},{\"id\":50,\"x\":448,\"y\":-384,\"type\":\"Block\",\"width\":480,\"height\":256},{\"id\":51,\"x\":480,\"y\":352,\"type\":\"Note\",\"text\":\"Damogran\",\"width\":96,\"height\":64,\"_lineWidth\":3,\"_fillColor\":\"rgb(223, 223, 223)\"},{\"id\":52,\"x\":640,\"y\":224,\"type\":\"Room\",\"name\":\"Dais\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":53,\"x\":640,\"y\":352,\"type\":\"Room\",\"name\":\"Presidential Speedboat\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":54,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":52,\"dockEnd\":53,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":55,\"type\":\"Connector\",\"name\":\"To Heart of Gold\",\"dockStart\":52,\"dockEnd\":0,\"startDir\":12,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":256,\"endX\":480,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_lineStyle\":2},{\"id\":56,\"x\":448,\"y\":192,\"type\":\"Block\",\"width\":480,\"height\":256},{\"id\":57,\"x\":480,\"y\":-64,\"type\":\"Note\",\"text\":\"Party\",\"width\":96,\"height\":64,\"_fillColor\":\"rgb(223, 223, 223)\",\"_lineWidth\":3},{\"id\":58,\"x\":640,\"y\":-64,\"type\":\"Room\",\"name\":\"Dining Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":59,\"x\":800,\"y\":-64,\"type\":\"Room\",\"name\":\"Living Room\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":60,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":58,\"dockEnd\":59,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":61,\"x\":640,\"y\":64,\"type\":\"Room\",\"name\":\"Kitchen\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":62,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":59,\"dockEnd\":61,\"startDir\":10,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":63,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":61,\"dockEnd\":58,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":-32,\"endX\":640,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":64,\"x\":448,\"y\":-96,\"type\":\"Block\",\"width\":480,\"height\":256},{\"id\":65,\"x\":-352,\"y\":352,\"type\":\"Note\",\"text\":\"War Chamber & Maze\",\"width\":96,\"height\":64,\"_lineWidth\":3,\"_fillColor\":\"rgb(223, 223, 223)\"},{\"id\":66,\"x\":-32,\"y\":352,\"type\":\"Room\",\"name\":\"Maze\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":67,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":0,\"endDir\":1,\"startY\":0,\"startX\":0,\"endY\":384,\"endX\":-128,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":68,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":2,\"endDir\":3,\"startY\":0,\"startX\":0,\"endY\":416,\"endX\":-96,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":69,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":4,\"endDir\":5,\"startY\":0,\"startX\":0,\"endY\":448,\"endX\":-96,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":70,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":7,\"endDir\":6,\"startY\":480,\"startX\":-128,\"endY\":480,\"endX\":-128,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":71,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":8,\"endDir\":9,\"startY\":0,\"startX\":0,\"endY\":480,\"endX\":-192,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":72,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":10,\"endDir\":11,\"startY\":0,\"startX\":0,\"endY\":448,\"endX\":-224,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":73,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":12,\"endDir\":13,\"startY\":0,\"startX\":0,\"endY\":416,\"endX\":-224,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":74,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":66,\"dockEnd\":66,\"startDir\":14,\"endDir\":15,\"startY\":0,\"startX\":0,\"endY\":384,\"endX\":-192,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":75,\"x\":-192,\"y\":352,\"type\":\"Room\",\"name\":\"War Chamber\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":76,\"x\":-384,\"y\":320,\"type\":\"Block\",\"width\":800,\"height\":128},{\"id\":77,\"x\":-800,\"y\":320,\"type\":\"Note\",\"text\":\"Hitch's Hikers Guide to the Galaxy\",\"width\":384,\"height\":128,\"_rounding\":30,\"_shape\":0,\"_lineWidth\":4,\"_fillColor\":\"#D0E0F2\"}],\"startRoom\":0}";
                return HitchhikersguideMap;
            }());
            exports_40("HitchhikersguideMap", HitchhikersguideMap);
        }
    };
});
System.register("maps/hobbitMap", [], function (exports_41, context_41) {
    "use strict";
    var HobbitMap;
    var __moduleName = context_41 && context_41.id;
    return {
        setters: [],
        execute: function () {
            HobbitMap = /** @class */ (function () {
                function HobbitMap() {
                }
                HobbitMap.json = "{\"settings\":{\"grid\":{\"visible\":true,\"origin\":true,\"snap\":true,\"size\":32,\"color\":\"#f0f0f0\",\"lineWidth\":1,\"originWidth\":5,\"background\":\"#ffffff\"},\"room\":{\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"darknessSize\":50,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"nameColor\":\"#333333\",\"subtitleColor\":\"#666666\",\"darkColor\":\"rgba(33, 35, 97, 0.8)\",\"startRoomColor\":\"green\",\"endRoomColor\":\"red\"},\"connector\":{\"lineWidth\":1,\"lineStyle\":1,\"isCurve\":false,\"color\":\"#000000\",\"stalk\":16,\"arrowSize\":5,\"curveStrength\":0.4,\"labelDistance\":12},\"note\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":1,\"shape\":0,\"rounding\":0,\"fillColor\":\"#ffffff\",\"borderColor\":\"#000000\",\"textColor\":\"#333333\"},\"block\":{\"minWidth\":64,\"minHeight\":32,\"width\":96,\"height\":64,\"margin\":6,\"lineWidth\":1,\"lineStyle\":0,\"shape\":0,\"rounding\":0,\"fillColor\":\"#D5E5D6\",\"borderColor\":\"#000000\"}},\"title\":\"The Hobbit\",\"author\":\"Alexander van Oostenrijk\",\"description\":\"\",\"elements\":[{\"id\":1,\"x\":-352,\"y\":-64,\"type\":\"Room\",\"name\":\"Tunnel-like hall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":2,\"x\":-192,\"y\":-64,\"type\":\"Room\",\"name\":\"Lonelands\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":3,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":1,\"dockEnd\":2,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":4,\"x\":-192,\"y\":-192,\"type\":\"Room\",\"name\":\"Trolls Clearing\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":5,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":4,\"startDir\":0,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":-128,\"endX\":-224,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":6,\"x\":-192,\"y\":-320,\"type\":\"Room\",\"name\":\"Trolls Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":7,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":6,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":8,\"x\":-192,\"y\":-448,\"type\":\"Room\",\"name\":\"Trolls cave\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":9,\"type\":\"Connector\",\"name\":\"rock door\",\"dockStart\":6,\"dockEnd\":8,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":10,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":6,\"startDir\":2,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":-256,\"endX\":-96,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":11,\"x\":32,\"y\":-64,\"type\":\"Room\",\"name\":\"Rivendell\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":12,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":2,\"dockEnd\":4,\"startDir\":4,\"endDir\":5,\"startY\":0,\"startX\":0,\"endY\":-192,\"endX\":-96,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":13,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":11,\"dockEnd\":4,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":-160,\"endX\":-96,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":14,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":4,\"dockEnd\":11,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-64,\"endX\":-32,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":15,\"x\":192,\"y\":-64,\"type\":\"Room\",\"name\":\"Misty Mountain\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":16,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":11,\"dockEnd\":15,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":17,\"x\":192,\"y\":-192,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":18,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":15,\"dockEnd\":17,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":19,\"x\":352,\"y\":-320,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":20,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":17,\"dockEnd\":19,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":21,\"x\":192,\"y\":64,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":22,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":15,\"dockEnd\":21,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":23,\"x\":608,\"y\":64,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":24,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":21,\"dockEnd\":23,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":25,\"x\":608,\"y\":-192,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":26,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":23,\"dockEnd\":25,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":27,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":17,\"dockEnd\":25,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-160,\"endX\":320,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":28,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":25,\"dockEnd\":19,\"startDir\":14,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":-288,\"endX\":448,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":29,\"x\":352,\"y\":-448,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":30,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":19,\"dockEnd\":29,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":31,\"x\":512,\"y\":-320,\"type\":\"Room\",\"name\":\"Narrow Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":32,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":29,\"dockEnd\":31,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":33,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":31,\"dockEnd\":25,\"startDir\":10,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":-224,\"endX\":512,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":34,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":19,\"dockEnd\":15,\"startDir\":8,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":-64,\"endX\":288,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":35,\"x\":928,\"y\":-64,\"type\":\"Room\",\"name\":\"Narrow place\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":36,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":15,\"dockEnd\":35,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":37,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":31,\"dockEnd\":38,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":160,\"endX\":384,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":38,\"x\":416,\"y\":-128,\"type\":\"Room\",\"name\":\"Steep Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":39,\"x\":416,\"y\":0,\"type\":\"Room\",\"name\":\"Steep Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":40,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":38,\"dockEnd\":39,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":41,\"x\":416,\"y\":128,\"type\":\"Room\",\"name\":\"Steep Path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":42,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":39,\"dockEnd\":41,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":43,\"x\":416,\"y\":256,\"type\":\"Room\",\"name\":\"Deep misty valley\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":44,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":41,\"dockEnd\":43,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":45,\"x\":608,\"y\":256,\"type\":\"Room\",\"name\":\"Deep misty valley\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":46,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":43,\"dockEnd\":45,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":47,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":45,\"dockEnd\":23,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":128,\"endX\":640,\"oneWay\":true,\"startType\":3,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":48,\"x\":1056,\"y\":-160,\"type\":\"Room\",\"name\":\"Large dry cave\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":49,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":35,\"dockEnd\":48,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":50,\"x\":1088,\"y\":-64,\"type\":\"Room\",\"name\":\"Dangerous narrow path\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":51,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":35,\"dockEnd\":50,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":52,\"x\":1344,\"y\":-160,\"type\":\"Room\",\"name\":\"Beorn's house\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":53,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":50,\"dockEnd\":52,\"startDir\":4,\"endDir\":10,\"startY\":-32,\"startX\":1184,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":54,\"x\":768,\"y\":-320,\"type\":\"Room\",\"name\":\"Outside Goblins Gate\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":55,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":52,\"dockEnd\":54,\"startDir\":14,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":false},{\"id\":56,\"x\":928,\"y\":-320,\"type\":\"Room\",\"name\":\"Treeless opening\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":57,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":54,\"dockEnd\":56,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":58,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":56,\"dockEnd\":52,\"startDir\":4,\"endDir\":15,\"startY\":0,\"startX\":0,\"endY\":-224,\"endX\":1344,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":false},{\"id\":59,\"x\":768,\"y\":384,\"type\":\"Room\",\"name\":\"Inside Goblins Gate\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":60,\"type\":\"Connector\",\"name\":\"back door\",\"dockStart\":54,\"dockEnd\":59,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":61,\"x\":1024,\"y\":384,\"type\":\"Room\",\"name\":\"Big goblins cavern\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":62,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":59,\"dockEnd\":61,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":63,\"x\":1024,\"y\":512,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":64,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":61,\"dockEnd\":63,\"startDir\":9,\"endDir\":15,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":65,\"x\":864,\"y\":256,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":66,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":65,\"dockEnd\":63,\"startDir\":6,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":416,\"endX\":896,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":67,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":59,\"dockEnd\":65,\"startDir\":3,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":160,\"endX\":960,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":68,\"x\":1184,\"y\":256,\"type\":\"Room\",\"name\":\"Dark winding passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":69,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":61,\"dockEnd\":68,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":70,\"x\":1376,\"y\":384,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":71,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":68,\"dockEnd\":70,\"startDir\":6,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":224,\"endX\":1344,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":72,\"x\":1376,\"y\":256,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":73,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":70,\"dockEnd\":72,\"startDir\":1,\"endDir\":7,\"startY\":0,\"startX\":0,\"endY\":192,\"endX\":1376,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":74,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":72,\"dockEnd\":70,\"startDir\":10,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":224,\"endX\":1280,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":75,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":72,\"dockEnd\":65,\"startDir\":14,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":128,\"endX\":896,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":false},{\"id\":76,\"x\":1344,\"y\":128,\"type\":\"Room\",\"name\":\"Goblins dungeon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":77,\"type\":\"Connector\",\"name\":\"window\",\"dockStart\":68,\"dockEnd\":76,\"startDir\":0,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":32,\"endX\":1312,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":78,\"type\":\"Connector\",\"name\":\"door\",\"dockStart\":76,\"dockEnd\":61,\"startDir\":0,\"endDir\":6,\"startY\":32,\"startX\":1312,\"endY\":320,\"endX\":1120,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":79,\"x\":1536,\"y\":384,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":80,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":70,\"dockEnd\":79,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":81,\"x\":1696,\"y\":512,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":82,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":79,\"dockEnd\":81,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":83,\"x\":1856,\"y\":512,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":84,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":81,\"dockEnd\":83,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":85,\"x\":2016,\"y\":352,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":86,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":83,\"dockEnd\":85,\"startDir\":0,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":87,\"x\":2016,\"y\":512,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":88,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":87,\"dockEnd\":85,\"startDir\":2,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":320,\"endX\":2080,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":89,\"x\":2016,\"y\":640,\"type\":\"Room\",\"name\":\"Deep dark lake\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":90,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":87,\"dockEnd\":89,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":91,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":85,\"dockEnd\":89,\"startDir\":10,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":480,\"endX\":1952,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":92,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":87,\"dockEnd\":83,\"startDir\":10,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":448,\"endX\":1888,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":93,\"x\":1536,\"y\":512,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":94,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":93,\"dockEnd\":79,\"startDir\":2,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":288,\"endX\":1600,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":95,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":63,\"dockEnd\":79,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":320,\"endX\":1536,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":false},{\"id\":96,\"x\":1696,\"y\":640,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":97,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":93,\"dockEnd\":96,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":480,\"endX\":1696,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":98,\"x\":1696,\"y\":768,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":99,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":96,\"dockEnd\":98,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":100,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":85,\"dockEnd\":96,\"startDir\":7,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":544,\"endX\":1760,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":101,\"x\":1696,\"y\":384,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":102,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":83,\"dockEnd\":101,\"startDir\":14,\"endDir\":6,\"startY\":0,\"startX\":0,\"endY\":288,\"endX\":1760,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":103,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":87,\"dockEnd\":101,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":256,\"endX\":1760,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":104,\"x\":1696,\"y\":256,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":105,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":101,\"dockEnd\":104,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":106,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":104,\"dockEnd\":79,\"startDir\":9,\"endDir\":1,\"startY\":0,\"startX\":0,\"endY\":224,\"endX\":1600,\"oneWay\":false,\"startType\":4,\"endType\":3,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":107,\"x\":1696,\"y\":128,\"type\":\"Room\",\"name\":\"Dark stuffy passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":108,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":101,\"dockEnd\":107,\"startDir\":14,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":192,\"endX\":1504,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":109,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":72,\"dockEnd\":85,\"startDir\":4,\"endDir\":8,\"startY\":128,\"startX\":1472,\"endY\":320,\"endX\":1984,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"west\",\"endLabel\":\"\",\"_isCurve\":false},{\"id\":110,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":93,\"dockEnd\":48,\"startDir\":12,\"endDir\":6,\"startY\":352,\"startX\":1632,\"endY\":-128,\"endX\":1024,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":111,\"x\":1344,\"y\":-288,\"type\":\"Room\",\"name\":\"Great river\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":112,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":52,\"dockEnd\":111,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":113,\"x\":1504,\"y\":-160,\"type\":\"Room\",\"name\":\"Forest gate\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":114,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":52,\"dockEnd\":113,\"startDir\":2,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":115,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":111,\"dockEnd\":113,\"startDir\":4,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-192,\"endX\":1504,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":116,\"x\":1504,\"y\":-32,\"type\":\"Room\",\"name\":\"Forest road\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":117,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":113,\"dockEnd\":116,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":118,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":52,\"dockEnd\":116,\"startDir\":8,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":1472,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":119,\"x\":1984,\"y\":-32,\"type\":\"Room\",\"name\":\"Forest road\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":120,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":116,\"dockEnd\":119,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":121,\"x\":2784,\"y\":-32,\"type\":\"Room\",\"name\":\"Forest\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":122,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":119,\"dockEnd\":121,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":123,\"x\":1504,\"y\":-416,\"type\":\"Room\",\"name\":\"Mountains\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":124,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":111,\"dockEnd\":123,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":125,\"x\":1664,\"y\":-288,\"type\":\"Room\",\"name\":\"Forest river\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[],\"_fillColor\":\"rgb(255, 255, 255)\"},{\"id\":126,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":123,\"dockEnd\":125,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":127,\"x\":1952,\"y\":-416,\"type\":\"Room\",\"name\":\"Empty place\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":128,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":123,\"dockEnd\":127,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":129,\"x\":2752,\"y\":-992,\"type\":\"Room\",\"name\":\"Empty place\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":130,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":129,\"dockEnd\":127,\"startDir\":0,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":-576,\"endX\":1824,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":131,\"x\":1664,\"y\":-160,\"type\":\"Room\",\"name\":\"Bewitched gloomy place\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":132,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":113,\"dockEnd\":131,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":133,\"x\":1824,\"y\":-160,\"type\":\"Room\",\"name\":\"West bank\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":134,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":131,\"dockEnd\":133,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":135,\"x\":1984,\"y\":-160,\"type\":\"Room\",\"name\":\"East bank\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":136,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":133,\"dockEnd\":135,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":137,\"x\":2144,\"y\":-160,\"type\":\"Room\",\"name\":\"Green forest\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":138,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":135,\"dockEnd\":137,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":139,\"x\":2304,\"y\":-160,\"type\":\"Room\",\"name\":\"Smothering forest\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":140,\"type\":\"Connector\",\"name\":\"web\",\"dockStart\":139,\"dockEnd\":137,\"startDir\":12,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":141,\"x\":2304,\"y\":-288,\"type\":\"Room\",\"name\":\"Spider threads place\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":142,\"type\":\"Connector\",\"name\":\"web\",\"dockStart\":139,\"dockEnd\":141,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":143,\"type\":\"Connector\",\"name\":\"web\",\"dockStart\":137,\"dockEnd\":141,\"startDir\":2,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-256,\"endX\":2272,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":144,\"x\":2464,\"y\":-288,\"type\":\"Room\",\"name\":\"Deep bog\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":145,\"type\":\"Connector\",\"name\":\"web\",\"dockStart\":141,\"dockEnd\":144,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":146,\"x\":2144,\"y\":-416,\"type\":\"Room\",\"name\":\"Levelled elvish clearing\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":147,\"type\":\"Connector\",\"name\":\"web\",\"dockStart\":141,\"dockEnd\":146,\"startDir\":0,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":-416,\"endX\":2240,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":148,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":146,\"dockEnd\":131,\"startDir\":12,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":-192,\"endX\":1760,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":149,\"x\":2464,\"y\":-672,\"type\":\"Room\",\"name\":\"Elvenkings great halls\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":150,\"type\":\"Connector\",\"name\":\"magic door\",\"dockStart\":146,\"dockEnd\":149,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":151,\"x\":2464,\"y\":-544,\"type\":\"Room\",\"name\":\"Elvenkings cellar\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":152,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":149,\"dockEnd\":151,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":153,\"x\":2464,\"y\":-416,\"type\":\"Room\",\"name\":\"Forest river\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":154,\"type\":\"Connector\",\"name\":\"trap door\",\"dockStart\":151,\"dockEnd\":153,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":4,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":155,\"x\":2624,\"y\":-672,\"type\":\"Room\",\"name\":\"Dark dungeon\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":156,\"type\":\"Connector\",\"name\":\"door\",\"dockStart\":149,\"dockEnd\":155,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":157,\"type\":\"Connector\",\"name\":\"door\",\"dockStart\":151,\"dockEnd\":155,\"startDir\":2,\"endDir\":10,\"startY\":0,\"startX\":0,\"endY\":-608,\"endX\":2592,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":158,\"x\":2944,\"y\":-32,\"type\":\"Room\",\"name\":\"Waterfall\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":159,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":121,\"dockEnd\":158,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":160,\"x\":2944,\"y\":96,\"type\":\"Room\",\"name\":\"Running river\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":161,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":158,\"dockEnd\":160,\"startDir\":8,\"endDir\":0,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":162,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":160,\"dockEnd\":121,\"startDir\":12,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":32,\"endX\":1920,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":163,\"x\":2944,\"y\":-160,\"type\":\"Room\",\"name\":\"Long lake and Lake Town\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":164,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":158,\"dockEnd\":163,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":165,\"type\":\"Connector\",\"name\":\"portcullis\",\"dockStart\":153,\"dockEnd\":163,\"startDir\":4,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-192,\"endX\":2784,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":166,\"x\":2944,\"y\":-288,\"type\":\"Room\",\"name\":\"Running river\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":167,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":163,\"dockEnd\":166,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":168,\"x\":2944,\"y\":-416,\"type\":\"Room\",\"name\":\"Dragon's Desolation\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":169,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":166,\"dockEnd\":168,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":170,\"x\":2944,\"y\":-544,\"type\":\"Room\",\"name\":\"Dale Valley\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":171,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":168,\"dockEnd\":170,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":172,\"x\":2784,\"y\":-672,\"type\":\"Room\",\"name\":\"Ravenhill\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":173,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":174,\"dockEnd\":172,\"startDir\":12,\"endDir\":4,\"startY\":-640,\"startX\":2912,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":174,\"x\":2944,\"y\":-672,\"type\":\"Room\",\"name\":\"Front gate\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":175,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":170,\"dockEnd\":174,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":176,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":170,\"dockEnd\":172,\"startDir\":14,\"endDir\":5,\"startY\":0,\"startX\":0,\"endY\":-640,\"endX\":2880,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":177,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":172,\"dockEnd\":168,\"startDir\":6,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-448,\"endX\":2912,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":178,\"x\":2944,\"y\":-800,\"type\":\"Room\",\"name\":\"Lower Halls\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":179,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":174,\"dockEnd\":178,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":180,\"x\":2944,\"y\":-928,\"type\":\"Room\",\"name\":\"Lonely Mountain\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":181,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":178,\"dockEnd\":180,\"startDir\":1,\"endDir\":7,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":3,\"endType\":4,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":182,\"x\":3072,\"y\":-864,\"type\":\"Room\",\"name\":\"Smooth straight passage\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":183,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":182,\"dockEnd\":178,\"startDir\":4,\"endDir\":4,\"startY\":0,\"startX\":0,\"endY\":-768,\"endX\":3040,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true},{\"id\":184,\"x\":2752,\"y\":-864,\"type\":\"Room\",\"name\":\"Side door\",\"subtitle\":\"\",\"description\":\"\",\"dark\":false,\"endroom\":false,\"width\":96,\"height\":64,\"objects\":[]},{\"id\":185,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":172,\"dockEnd\":184,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":0,\"endX\":0,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":186,\"type\":\"Connector\",\"name\":\"door\",\"dockStart\":184,\"dockEnd\":182,\"startDir\":4,\"endDir\":12,\"startY\":0,\"startX\":0,\"endY\":-864,\"endX\":3072,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":187,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":180,\"dockEnd\":172,\"startDir\":10,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":-704,\"endX\":2848,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":188,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":184,\"dockEnd\":129,\"startDir\":0,\"endDir\":8,\"startY\":0,\"startX\":0,\"endY\":-928,\"endX\":2784,\"oneWay\":false,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":189,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":180,\"dockEnd\":184,\"startDir\":12,\"endDir\":2,\"startY\":0,\"startX\":0,\"endY\":-896,\"endX\":2848,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\"},{\"id\":190,\"type\":\"Connector\",\"name\":\"\",\"dockStart\":180,\"dockEnd\":174,\"startDir\":8,\"endDir\":14,\"startY\":0,\"startX\":0,\"endY\":-704,\"endX\":2944,\"oneWay\":true,\"startType\":0,\"endType\":0,\"startLabel\":\"\",\"endLabel\":\"\",\"_isCurve\":true}],\"startRoom\":0}";
                return HobbitMap;
            }());
            exports_41("HobbitMap", HobbitMap);
        }
    };
});
//
// This is a base class for custom HTML elements. To instantiate,
// you pass in either an HTML element, or a selector string. 
// With a selector string, you can also provide a base element
// that querySelector will run on.
System.register("controls/control", ["dispatcher", "enums/enums"], function (exports_42, context_42) {
    "use strict";
    var dispatcher_1, enums_3, Control;
    var __moduleName = context_42 && context_42.id;
    return {
        setters: [
            function (dispatcher_1_1) {
                dispatcher_1 = dispatcher_1_1;
            },
            function (enums_3_1) {
                enums_3 = enums_3_1;
            }
        ],
        execute: function () {//
            // This is a base class for custom HTML elements. To instantiate,
            // you pass in either an HTML element, or a selector string. 
            // With a selector string, you can also provide a base element
            // that querySelector will run on.
            // 
            Control = /** @class */ (function () {
                function Control(elem, base) {
                    var _this = this;
                    this.show = function () {
                        _this.elem.style.display = 'block';
                    };
                    this.hide = function () {
                        _this.elem.style.display = 'none';
                    };
                    this.setVisible = function (visible) {
                        if (visible) {
                            _this.show();
                        }
                        else {
                            _this.hide();
                        }
                    };
                    if (elem instanceof HTMLElement) {
                        this.elem = elem;
                    }
                    else {
                        if (!base) {
                            this.elem = document.querySelector(elem);
                        }
                        else {
                            this.elem = base.querySelector(elem);
                        }
                    }
                    if (!this.elem) {
                        throw ("Failed to instantiate control: element or selector " + elem + " not found in DOM.");
                    }
                }
                //
                // Add an event listener to the element.
                // Returns reference to self for easy chaining.
                // 
                Control.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_1.Dispatcher.notify(enums_3.AppEvent.Redraw, null); } : f);
                    this.elem.addEventListener(type, ff);
                    return this;
                };
                return Control;
            }());
            exports_42("Control", Control);
        }
    };
});
System.register("controls/idInput/idInput", ["controls/control", "dispatcher", "enums/enums"], function (exports_43, context_43) {
    "use strict";
    var control_1, dispatcher_2, enums_4, IdInput;
    var __moduleName = context_43 && context_43.id;
    return {
        setters: [
            function (control_1_1) {
                control_1 = control_1_1;
            },
            function (dispatcher_2_1) {
                dispatcher_2 = dispatcher_2_1;
            },
            function (enums_4_1) {
                enums_4 = enums_4_1;
            }
        ],
        execute: function () {
            IdInput = /** @class */ (function (_super) {
                __extends(IdInput, _super);
                // 
                // Create a new instance of IdInput by providing a query selector that
                // yields an id-input element.
                //
                function IdInput(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Get label attribute:
                    var label = _this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idInput({ label: label });
                    // Save inner <input> element so we can attach
                    // an event listener to it.
                    _this.input = _this.elem.querySelector('input');
                    return _this;
                }
                Object.defineProperty(IdInput.prototype, "value", {
                    //
                    // Return the input's value.
                    // 
                    get: function () {
                        return this.input.value;
                    },
                    // 
                    // Set the input's value.
                    // 
                    set: function (value) {
                        this.input.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Move focus to input element
                // Returns this for easy chaining.
                // 
                IdInput.prototype.focus = function () {
                    this.input.focus();
                    return this;
                };
                //
                // Select all text in input element
                // Returns this for easy chaining.
                // 
                IdInput.prototype.select = function () {
                    this.input.select();
                    return this;
                };
                //
                // Add an event listener to the inner <input>
                // Returns reference to self for easy chaining.
                // 
                IdInput.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_2.Dispatcher.notify(enums_4.AppEvent.Redraw, null); } : f);
                    this.input.addEventListener(type, ff);
                    return this;
                };
                return IdInput;
            }(control_1.Control));
            exports_43("IdInput", IdInput);
        }
    };
});
System.register("controls/idTextarea/idTextarea", ["controls/control", "dispatcher", "enums/enums"], function (exports_44, context_44) {
    "use strict";
    var control_2, dispatcher_3, enums_5, IdTextarea;
    var __moduleName = context_44 && context_44.id;
    return {
        setters: [
            function (control_2_1) {
                control_2 = control_2_1;
            },
            function (dispatcher_3_1) {
                dispatcher_3 = dispatcher_3_1;
            },
            function (enums_5_1) {
                enums_5 = enums_5_1;
            }
        ],
        execute: function () {
            IdTextarea = /** @class */ (function (_super) {
                __extends(IdTextarea, _super);
                // 
                // Create a new instance of IdTextarea by providing a query selector that
                // yields an id-textarea element.
                //
                function IdTextarea(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Get label attribute:
                    var label = _this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idTextarea({ label: label });
                    // Save inner <textarea> element so we can attach
                    // an event listener to it.
                    _this.textarea = _this.elem.querySelector('textarea');
                    return _this;
                }
                Object.defineProperty(IdTextarea.prototype, "value", {
                    //
                    // Return the textarea's value.
                    // 
                    get: function () {
                        return this.textarea.value;
                    },
                    // 
                    // Set the textarea's value.
                    // 
                    set: function (value) {
                        this.textarea.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Move focus to input element
                // Returns this for easy chaining.
                // 
                IdTextarea.prototype.focus = function () {
                    this.textarea.focus();
                    return this;
                };
                //
                // Select all text in input element
                // Returns this for easy chaining.
                // 
                IdTextarea.prototype.select = function () {
                    this.textarea.select();
                    return this;
                };
                //
                // Add an event listener to the inner <textarea>
                // Returns reference to self for easy chaining.
                // 
                IdTextarea.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = false; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_3.Dispatcher.notify(enums_5.AppEvent.Redraw, null); } : f);
                    this.textarea.addEventListener(type, ff);
                    return this;
                };
                return IdTextarea;
            }(control_2.Control));
            exports_44("IdTextarea", IdTextarea);
        }
    };
});
System.register("controls/idCheck/idCheck", ["controls/control", "dispatcher", "enums/enums"], function (exports_45, context_45) {
    "use strict";
    var control_3, dispatcher_4, enums_6, IdCheck;
    var __moduleName = context_45 && context_45.id;
    return {
        setters: [
            function (control_3_1) {
                control_3 = control_3_1;
            },
            function (dispatcher_4_1) {
                dispatcher_4 = dispatcher_4_1;
            },
            function (enums_6_1) {
                enums_6 = enums_6_1;
            }
        ],
        execute: function () {
            IdCheck = /** @class */ (function (_super) {
                __extends(IdCheck, _super);
                // 
                // Create a new instance of IdCheck by providing a query selector that
                // yields an id-check element.
                //
                function IdCheck(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Get label attribute:
                    var label = _this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idCheck({ label: label });
                    // Save inner <input> element so we can attach
                    // an event listener to it.
                    _this.input = _this.elem.querySelector('input');
                    return _this;
                }
                Object.defineProperty(IdCheck.prototype, "checked", {
                    //
                    // Return the check's value.
                    // 
                    get: function () {
                        return this.input.checked;
                    },
                    // 
                    // Set the check's value.
                    // 
                    set: function (checked) {
                        this.input.checked = checked;
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Add an event listener to the inner <input>
                // Returns reference to self for easy chaining.
                // 
                IdCheck.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_4.Dispatcher.notify(enums_6.AppEvent.Redraw, null); } : f);
                    this.input.addEventListener(type, ff);
                    return this;
                };
                return IdCheck;
            }(control_3.Control));
            exports_45("IdCheck", IdCheck);
        }
    };
});
System.register("controls/idRange/idRange", ["controls/control", "dispatcher", "enums/enums"], function (exports_46, context_46) {
    "use strict";
    var control_4, dispatcher_5, enums_7, IdRange;
    var __moduleName = context_46 && context_46.id;
    return {
        setters: [
            function (control_4_1) {
                control_4 = control_4_1;
            },
            function (dispatcher_5_1) {
                dispatcher_5 = dispatcher_5_1;
            },
            function (enums_7_1) {
                enums_7 = enums_7_1;
            }
        ],
        execute: function () {
            //
            // IdRange support the following data-attributes:
            // - data-min: Min value (default 0)
            // - data-max: Max value (default 100)
            // - data-label: Input label
            // 
            IdRange = /** @class */ (function (_super) {
                __extends(IdRange, _super);
                // 
                // Create a new instance of IdRange by providing a query selector that
                // yields an id-range element.
                //
                function IdRange(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Get min/max values. If not specified, assume 0..100
                    var min = _this.elem.dataset.min;
                    if (!min)
                        min = "0";
                    var max = _this.elem.dataset.max;
                    if (!max)
                        max = "100";
                    // Get label attribute:
                    var label = _this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idRange({ min: min, max: max, label: label });
                    _this.input = _this.elem.querySelector('input');
                    _this.label = _this.elem.querySelector('.range-label');
                    // Default value is min.
                    _this.input.value = min;
                    _this.updateLabel();
                    // Whenever the input changes, update the label.
                    _this.input.addEventListener('input', function () {
                        _this.updateLabel();
                    });
                    return _this;
                }
                IdRange.prototype.updateLabel = function () {
                    this.label.innerHTML = this.input.value;
                };
                Object.defineProperty(IdRange.prototype, "value", {
                    //
                    // Return the range's value.
                    // 
                    get: function () {
                        return parseFloat(this.input.value);
                    },
                    // 
                    // Set the range's value.
                    // 
                    set: function (value) {
                        this.input.value = value.toString();
                        this.updateLabel();
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Add an event listener to the inner <input>
                // Returns reference to self for easy chaining.
                // 
                IdRange.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_5.Dispatcher.notify(enums_7.AppEvent.Redraw, null); } : f);
                    this.input.addEventListener(type, ff);
                    return this;
                };
                return IdRange;
            }(control_4.Control));
            exports_46("IdRange", IdRange);
        }
    };
});
System.register("controls/idColorPicker/idColorPicker", ["controls/controls", "enums/enums", "controls/control"], function (exports_47, context_47) {
    "use strict";
    var controls_1, enums_8, control_5, IdColorPicker;
    var __moduleName = context_47 && context_47.id;
    return {
        setters: [
            function (controls_1_1) {
                controls_1 = controls_1_1;
            },
            function (enums_8_1) {
                enums_8 = enums_8_1;
            },
            function (control_5_1) {
                control_5 = control_5_1;
            }
        ],
        execute: function () {
            IdColorPicker = /** @class */ (function (_super) {
                __extends(IdColorPicker, _super);
                // 
                // Create a new instance of IdColorPicker by providing a query selector that
                // yields an id-colorpicker element.
                //
                function IdColorPicker(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    _this.currentHue = 180;
                    _this.currentHSLX = 150;
                    _this.currentHSLY = 75;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idColorPicker({
                        'recentcolors': IdColorPicker.recentColors,
                        'standardcolors': enums_8.Values.COLORS_STANDARD
                    });
                    // Get references to various sub-elements:
                    var canvases = _this.elem.querySelectorAll('canvas');
                    _this.canvasHue = canvases[1];
                    _this.canvasHSL = canvases[0];
                    _this.ctxHue = _this.canvasHue.getContext('2d');
                    _this.ctxHSL = _this.canvasHSL.getContext('2d');
                    _this.currentColorElem = _this.elem.querySelector('.current-color');
                    _this.hoverColorElem = _this.elem.querySelector('.hover-color');
                    // Add recent colors:
                    var btns = _this.elem.querySelectorAll('.recent id-popup');
                    _this.recentButtons = new Array();
                    var _loop_1 = function (i) {
                        var button = new controls_1.IdPopup(btns[i]);
                        button.backgroundColor = IdColorPicker.recentColors[i];
                        button.addEventListener('click', function () { _this.pickColor(IdColorPicker.recentColors[i]); });
                        this_1.recentButtons.push(button);
                    };
                    var this_1 = this;
                    for (var i = 0; i < btns.length; i++) {
                        _loop_1(i);
                    }
                    // Add standard colors:
                    btns = _this.elem.querySelectorAll('.standard id-popup');
                    var _loop_2 = function (i) {
                        var button = new controls_1.IdPopup(btns[i]);
                        button.backgroundColor = enums_8.Values.COLORS_STANDARD[i];
                        button.addEventListener('click', function () {
                            _this.addToRecent(enums_8.Values.COLORS_STANDARD[i]);
                            _this.pickColor(enums_8.Values.COLORS_STANDARD[i]);
                        });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_2(i);
                    }
                    // Draw colors into canvases:
                    _this.drawHue();
                    _this.drawHSL();
                    // When the hue canvas is clicked:
                    // hue canvas is redrawn (to show hue selection)
                    // hsl canvas is redrawn (to show new gradient)
                    _this.canvasHue.addEventListener('click', function (e) {
                        _this.currentHue = 360 - (e.clientY - _this.findObjCoordinates(_this.canvasHue).y) * 360 / _this.canvasHue.clientHeight;
                        _this.currentHSLX = -100;
                        _this.currentHSLY = -100;
                        _this.drawHue();
                        _this.drawHSL();
                    });
                    // When the hsl canvas is hovered, the hovercolor is updated.
                    _this.canvasHSL.addEventListener('mousemove', function (e) {
                        _this.hoverColorElem.style.backgroundColor = _this.getColorAtMouse(e.clientX, e.clientY, false);
                    });
                    // When the hsl canvas is clicked, the currentcolor is updated.
                    _this.canvasHSL.addEventListener('click', function (e) {
                        var color = _this.getColorAtMouse(e.clientX, e.clientY, true);
                        _this.drawHSL();
                        _this.addToRecent(color);
                        _this.pickColor(color);
                    });
                    window.addEventListener('id-recent-colors-changed', function () { _this.updateRecentColors(); });
                    return _this;
                }
                IdColorPicker.prototype.pickColor = function (color) {
                    this.color = color;
                    var evt = new CustomEvent('change');
                    this.elem.dispatchEvent(evt);
                };
                Object.defineProperty(IdColorPicker.prototype, "color", {
                    get: function () {
                        return this.currentColorElem.style.backgroundColor;
                    },
                    set: function (color) {
                        this.currentColorElem.style.backgroundColor = color;
                    },
                    enumerable: true,
                    configurable: true
                });
                IdColorPicker.prototype.addToRecent = function (color) {
                    // Shift the new color into the front of the list
                    // of recent colors.
                    IdColorPicker.recentColors.unshift(color);
                    IdColorPicker.recentColors.pop();
                    // Fire a global event to tell all IdColorpicker instances that
                    // the recent colors have changed.
                    var evt = new CustomEvent('id-recent-colors-changed');
                    window.dispatchEvent(evt);
                };
                // 
                // Update the colors of the recent color buttons.
                // This happens when a colorpicker anywhere on the page changed
                // the array of recent colors.
                // 
                IdColorPicker.prototype.updateRecentColors = function () {
                    for (var i = 0; i < this.recentButtons.length; i++) {
                        this.recentButtons[i].backgroundColor = IdColorPicker.recentColors[i];
                    }
                };
                // Return the rgb color on the HSL canvas at the given mouse position
                IdColorPicker.prototype.getColorAtMouse = function (mouseX, mouseY, updateHSLpos) {
                    var _a = this.findObjCoordinates(this.canvasHSL), x = _a.x, y = _a.y;
                    // Determine where the mouse is, in canvas coordinates:
                    x = Math.floor((mouseX - x) * this.canvasHSL.width / this.canvasHSL.clientWidth);
                    y = Math.floor((mouseY - y) * this.canvasHSL.height / this.canvasHSL.clientHeight);
                    if (updateHSLpos) {
                        this.currentHSLX = x;
                        this.currentHSLY = y;
                    }
                    // Get the canvas image data, containing just one pixel at the point (x,y)
                    var pixelData = this.ctxHSL.getImageData(x, y, 1, 1);
                    var color = "rgb(" + pixelData.data[0] + ", " + pixelData.data[1] + ", " + pixelData.data[2] + ")";
                    return color;
                };
                IdColorPicker.prototype.findObjCoordinates = function (obj) {
                    var curleft = 0;
                    var curtop = 0;
                    if (obj.offsetParent) {
                        do {
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop;
                        } while (obj = obj.offsetParent);
                    }
                    return {
                        x: curleft,
                        y: curtop
                    };
                };
                // Draw the hue rainbox into the hue canvas.
                // This happens only once.
                IdColorPicker.prototype.drawHue = function () {
                    this.ctxHue.save();
                    // Make canvas same size as its display area,
                    // but only if currently visible.
                    if (this.canvasHue.offsetWidth > 0 && this.canvasHue.offsetHeight > 0) {
                        this.canvasHue.width = this.canvasHue.offsetWidth;
                        this.canvasHue.height = this.canvasHue.offsetHeight;
                    }
                    // Draw hue rainbox:
                    for (var i = 0; i < this.canvasHue.height; i++) {
                        var perc = 360 - i / this.canvasHue.height * 360;
                        this.ctxHue.strokeStyle = "hsl(" + perc + ",100%,50%)";
                        this.ctxHue.beginPath();
                        this.ctxHue.moveTo(0, i);
                        this.ctxHue.lineTo(this.canvasHue.width, i);
                        this.ctxHue.stroke();
                    }
                    // Draw hue selection circle:
                    // (if the canvas is currently invisible/not interacted with, don't draw
                    // or the scale will be off.)
                    if (this.canvasHue.offsetWidth != 0) {
                        this.ctxHue.strokeStyle = '#000';
                        this.ctxHue.lineWidth = 1;
                        this.ctxHue.beginPath();
                        var x = this.canvasHue.width / 2;
                        var y = (360 - this.currentHue) / 360 * this.canvasHue.height;
                        this.ctxHue.moveTo(x + 5, y);
                        this.ctxHue.arc(x, y, 5, 0, Math.PI * 2, false);
                        this.ctxHue.stroke();
                    }
                    this.ctxHue.restore();
                };
                // Draw the HSL gradient into the HSL canvas.
                // This happens each time the hue changes.
                IdColorPicker.prototype.drawHSL = function () {
                    this.ctxHSL.save();
                    // Make canvas same size as its display area,
                    // but only if currently visible.
                    if (this.canvasHSL.offsetWidth > 0 && this.canvasHSL.offsetHeight > 0) {
                        this.canvasHSL.width = this.canvasHSL.offsetWidth;
                        this.canvasHSL.height = this.canvasHSL.offsetHeight;
                    }
                    for (var i = 0; i < this.canvasHSL.height; i++) {
                        var grad = this.ctxHSL.createLinearGradient(0, 0, this.canvasHSL.width, 0);
                        var perc = (this.canvasHSL.height - i) * 100 / this.canvasHSL.height;
                        grad.addColorStop(0, "hsl(" + this.currentHue + ", 100%, " + perc + "%)");
                        grad.addColorStop(1, "hsl(" + this.currentHue + ", 0%, " + perc + "%)");
                        this.ctxHSL.fillStyle = grad;
                        this.ctxHSL.fillRect(0, i, this.canvasHSL.width, 1);
                    }
                    // Draw HSL selection circle:
                    // (if the canvas is currently invisible/not interacted with, don't draw
                    // or the scale will be off.)
                    if (this.canvasHSL.offsetWidth != 0) {
                        this.ctxHSL.strokeStyle = '#000';
                        this.ctxHSL.lineWidth = 1;
                        this.ctxHSL.beginPath();
                        var x = this.currentHSLX;
                        var y = this.currentHSLY;
                        this.ctxHSL.moveTo(x + 5, y);
                        this.ctxHSL.arc(x, y, 5, 0, Math.PI * 2, false);
                        this.ctxHSL.stroke();
                    }
                    this.ctxHSL.restore();
                };
                IdColorPicker.recentColors = ['#ffffff', '#ffffff', '#ffffff'];
                return IdColorPicker;
            }(control_5.Control));
            exports_47("IdColorPicker", IdColorPicker);
        }
    };
});
System.register("controls/idPopup/idPopup", ["controls/control"], function (exports_48, context_48) {
    "use strict";
    var control_6, IdPopup;
    var __moduleName = context_48 && context_48.id;
    return {
        setters: [
            function (control_6_1) {
                control_6 = control_6_1;
            }
        ],
        execute: function () {
            IdPopup = /** @class */ (function (_super) {
                __extends(IdPopup, _super);
                // 
                // Create a new instance of IdPopup by providing a query selector that
                // yields an id-popup element.
                //
                function IdPopup(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Find element's children and remove them.
                    var children = new Array();
                    for (var i = 0; i < _this.elem.children.length; i++) {
                        children.push(_this.elem.children[i]);
                    }
                    children.forEach(function (child) { child.remove(); });
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idPopup({});
                    // Get a reference to the button's div:
                    _this.div = _this.elem.querySelector('div');
                    // Store button data-type field, if any
                    _this.dataType = _this.elem.dataset.type;
                    // Add the children back:
                    children.forEach(function (child) { _this.div.appendChild(child); });
                    _this.setupOverlay();
                    return _this;
                }
                IdPopup.prototype.findObjCoordinates = function (obj) {
                    var curleft = 0;
                    var curtop = 0;
                    if (obj.offsetParent) {
                        do {
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop;
                        } while (obj = obj.offsetParent);
                    }
                    return {
                        x: curleft,
                        y: curtop
                    };
                };
                IdPopup.prototype.setupOverlay = function () {
                    var _this = this;
                    // See if button has a .popup-overlay child.
                    var child = this.elem.querySelector('.popup-overlay');
                    // Abort if child not present.
                    if (!child)
                        return;
                    // Add a click event that shows/hides the child overlay.
                    child.style.display = 'none';
                    this.elem.addEventListener('click', function (e) {
                        window.getSelection().removeAllRanges(); // strangely, contents of overlay sometimes get selected.
                        if (child.style.display == 'none') {
                            // Hide all popup overlays in the Document except this one.
                            var overlayNodes = document.querySelectorAll('.popup-overlay');
                            for (var j = 0; j < overlayNodes.length; j++) {
                                overlayNodes[j].style.display = 'none';
                            }
                            child.style.display = 'block';
                            var _a = _this.findObjCoordinates(_this.elem), x = _a.x, y = _a.y;
                            if (x + child.offsetWidth > window.innerWidth) {
                                child.style.left = (window.innerWidth - (x + child.offsetWidth)) + "px";
                            }
                        }
                        else {
                            child.style.display = 'none';
                        }
                    });
                    // Clicking on the overlay itself does not cause it to close,
                    // because the click event is never propagated up the DOM tree:
                    child.addEventListener('click', function (e) {
                        e.stopPropagation();
                    });
                };
                Object.defineProperty(IdPopup.prototype, "backgroundColor", {
                    get: function () {
                        return this.div.style.backgroundColor;
                    },
                    set: function (color) {
                        this.div.style.backgroundColor = color;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(IdPopup.prototype, "selected", {
                    get: function () {
                        return this.elem.classList.contains('selected');
                    },
                    set: function (select) {
                        if (select) {
                            this.elem.classList.add('selected');
                        }
                        else {
                            this.elem.classList.remove('selected');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(IdPopup.prototype, "type", {
                    get: function () {
                        return this.dataType;
                    },
                    enumerable: true,
                    configurable: true
                });
                return IdPopup;
            }(control_6.Control));
            exports_48("IdPopup", IdPopup);
        }
    };
});
System.register("controls/idRadio/idRadio", ["controls/control", "dispatcher", "enums/enums"], function (exports_49, context_49) {
    "use strict";
    var control_7, dispatcher_6, enums_9, IdRadio;
    var __moduleName = context_49 && context_49.id;
    return {
        setters: [
            function (control_7_1) {
                control_7 = control_7_1;
            },
            function (dispatcher_6_1) {
                dispatcher_6 = dispatcher_6_1;
            },
            function (enums_9_1) {
                enums_9 = enums_9_1;
            }
        ],
        execute: function () {
            IdRadio = /** @class */ (function (_super) {
                __extends(IdRadio, _super);
                // 
                // Create a new instance of IdRadio by providing a query selector that
                // yields an id-radio element.
                //
                function IdRadio(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Get label attribute:
                    var label = _this.elem.dataset.label;
                    // Get name attribute:
                    var name = _this.elem.dataset.name;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idRadio({ label: label, name: name });
                    // Save the inner <input> element so we can attach an
                    // event listener to it.
                    _this.input = _this.elem.querySelector('input');
                    return _this;
                }
                Object.defineProperty(IdRadio.prototype, "checked", {
                    //
                    // Return the check's value.
                    // 
                    get: function () {
                        return this.input.checked;
                    },
                    // 
                    // Set the check's value.
                    // 
                    set: function (checked) {
                        this.input.checked = checked;
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Add an event listener to the inner <input>
                // Returns reference to self for easy chaining.
                // 
                IdRadio.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_6.Dispatcher.notify(enums_9.AppEvent.Redraw, null); } : f);
                    this.input.addEventListener(type, ff);
                    return this;
                };
                return IdRadio;
            }(control_7.Control));
            exports_49("IdRadio", IdRadio);
        }
    };
});
System.register("controls/idConnectorType/idConnectorType", ["controls/idRadio/idRadio", "enums/connectorType", "controls/control", "dispatcher", "enums/enums"], function (exports_50, context_50) {
    "use strict";
    var idRadio_1, connectorType_1, control_8, dispatcher_7, enums_10, IdConnectorType;
    var __moduleName = context_50 && context_50.id;
    return {
        setters: [
            function (idRadio_1_1) {
                idRadio_1 = idRadio_1_1;
            },
            function (connectorType_1_1) {
                connectorType_1 = connectorType_1_1;
            },
            function (control_8_1) {
                control_8 = control_8_1;
            },
            function (dispatcher_7_1) {
                dispatcher_7 = dispatcher_7_1;
            },
            function (enums_10_1) {
                enums_10 = enums_10_1;
            }
        ],
        execute: function () {
            IdConnectorType = /** @class */ (function (_super) {
                __extends(IdConnectorType, _super);
                // 
                // Create a new instance of IdConnectorType by providing a query selector that
                // yields an id-connector-type element.
                //
                function IdConnectorType(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Expand a handlebars template into the top element.
                    // Every connectortype has a unique ID.
                    _this.elem.innerHTML = Handlebars.templates.idConnectorType({ name: "connector" + IdConnectorType.id });
                    IdConnectorType.id++;
                    _this.radioDefault = new idRadio_1.IdRadio('.js-default', _this.elem);
                    _this.radioIn = new idRadio_1.IdRadio('.js-in', _this.elem);
                    _this.radioOut = new idRadio_1.IdRadio('.js-out', _this.elem);
                    _this.radioUp = new idRadio_1.IdRadio('.js-up', _this.elem);
                    _this.radioDown = new idRadio_1.IdRadio('.js-down', _this.elem);
                    return _this;
                }
                Object.defineProperty(IdConnectorType.prototype, "value", {
                    get: function () {
                        if (this.radioIn.checked)
                            return connectorType_1.ConnectorType.In;
                        if (this.radioOut.checked)
                            return connectorType_1.ConnectorType.Out;
                        if (this.radioUp.checked)
                            return connectorType_1.ConnectorType.Up;
                        if (this.radioDown.checked)
                            return connectorType_1.ConnectorType.Down;
                        return connectorType_1.ConnectorType.Default;
                    },
                    set: function (type) {
                        switch (type) {
                            case connectorType_1.ConnectorType.Default:
                                this.radioDefault.checked = true;
                                break;
                            case connectorType_1.ConnectorType.In:
                                this.radioIn.checked = true;
                                break;
                            case connectorType_1.ConnectorType.Out:
                                this.radioOut.checked = true;
                                break;
                            case connectorType_1.ConnectorType.Up:
                                this.radioUp.checked = true;
                                break;
                            case connectorType_1.ConnectorType.Down:
                                this.radioDown.checked = true;
                                break;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                //
                // Add an event listener to the inner <radio> elements.
                // Returns reference to self for easy chaining.
                // 
                IdConnectorType.prototype.addEventListener = function (type, f, refresh) {
                    if (refresh === void 0) { refresh = true; }
                    var ff = (refresh ? function (e) { f(e); dispatcher_7.Dispatcher.notify(enums_10.AppEvent.Redraw, null); } : f);
                    this.radioDefault.addEventListener(type, ff);
                    this.radioIn.addEventListener(type, ff);
                    this.radioOut.addEventListener(type, ff);
                    this.radioUp.addEventListener(type, ff);
                    this.radioDown.addEventListener(type, ff);
                    return this;
                };
                IdConnectorType.id = 0;
                return IdConnectorType;
            }(control_8.Control));
            exports_50("IdConnectorType", IdConnectorType);
        }
    };
});
System.register("controls/optionsGroup", ["controls/control", "controls/controls"], function (exports_51, context_51) {
    "use strict";
    var control_9, controls_2, OptionsGroup;
    var __moduleName = context_51 && context_51.id;
    return {
        setters: [
            function (control_9_1) {
                control_9 = control_9_1;
            },
            function (controls_2_1) {
                controls_2 = controls_2_1;
            }
        ],
        execute: function () {
            OptionsGroup = /** @class */ (function (_super) {
                __extends(OptionsGroup, _super);
                // 
                // Create a new instance of IdLineStyle by providing a query selector that
                // yields an id-linestyle element.
                //
                function OptionsGroup(elem, elements, base) {
                    var _this = _super.call(this, elem, base) || this;
                    _this._values = {};
                    _this.elem.innerHTML = _this.template;
                    elements.forEach(function (el) {
                        _this._values[el.value] = new controls_2.IdPopup(el.htmlEl, _this.elem).addEventListener('click', function () { _this.value = el.value; });
                    });
                    return _this;
                }
                Object.defineProperty(OptionsGroup.prototype, "dataset", {
                    get: function () {
                        return {};
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OptionsGroup.prototype, "template", {
                    get: function () {
                        return '';
                    },
                    enumerable: true,
                    configurable: true
                });
                OptionsGroup.prototype.selectValue = function (val) {
                    for (var v in this._values) {
                        if (this._values.hasOwnProperty(v)) {
                            this._values[v].selected = false;
                        }
                    }
                    this._values[val].selected = true;
                };
                OptionsGroup.prototype.setValue = function (val) {
                    this._value = val;
                    this.selectValue(this._value);
                    var evt = new CustomEvent('change');
                    this.elem.dispatchEvent(evt);
                };
                Object.defineProperty(OptionsGroup.prototype, "value", {
                    get: function () {
                        return this._value;
                    },
                    set: function (val) {
                        this.setValue(val);
                    },
                    enumerable: true,
                    configurable: true
                });
                return OptionsGroup;
            }(control_9.Control));
            exports_51("OptionsGroup", OptionsGroup);
        }
    };
});
System.register("controls/idLineStyle/idLineStyle", ["enums/enums", "controls/optionsGroup"], function (exports_52, context_52) {
    "use strict";
    var enums_11, optionsGroup_1, IdLineStyle;
    var __moduleName = context_52 && context_52.id;
    return {
        setters: [
            function (enums_11_1) {
                enums_11 = enums_11_1;
            },
            function (optionsGroup_1_1) {
                optionsGroup_1 = optionsGroup_1_1;
            }
        ],
        execute: function () {
            IdLineStyle = /** @class */ (function (_super) {
                __extends(IdLineStyle, _super);
                // 
                // Create a new instance of IdLineStyle by providing a query selector that
                // yields an id-linestyle element.
                //
                function IdLineStyle(elem, base) {
                    return _super.call(this, elem, [
                        { value: enums_11.LineStyle.Solid, htmlEl: '.js-linestyle-solid' },
                        { value: enums_11.LineStyle.Dash, htmlEl: '.js-linestyle-dash' },
                        { value: enums_11.LineStyle.DashDot, htmlEl: '.js-linestyle-dashdot' },
                        { value: enums_11.LineStyle.DashDotDot, htmlEl: '.js-linestyle-dashdotdot' },
                        { value: enums_11.LineStyle.Dot, htmlEl: '.js-linestyle-dot' },
                        { value: enums_11.LineStyle.None, htmlEl: '.js-linestyle-none' },
                    ], base) || this;
                }
                Object.defineProperty(IdLineStyle.prototype, "template", {
                    get: function () {
                        return Handlebars.templates.idLineStyle({ noneDisplay: this.dataset['hasNone'] ? 'block' : 'none', label: this.dataset['label'] });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(IdLineStyle.prototype, "dataset", {
                    get: function () {
                        return {
                            label: this.elem.dataset.label,
                            hasNone: this.elem.dataset.none || false,
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                return IdLineStyle;
            }(optionsGroup_1.OptionsGroup));
            exports_52("IdLineStyle", IdLineStyle);
        }
    };
});
System.register("controls/idQuickColor/idQuickColor", ["controls/control", "controls/controls", "enums/enums"], function (exports_53, context_53) {
    "use strict";
    var control_10, controls_3, enums_12, IdQuickColor;
    var __moduleName = context_53 && context_53.id;
    return {
        setters: [
            function (control_10_1) {
                control_10 = control_10_1;
            },
            function (controls_3_1) {
                controls_3 = controls_3_1;
            },
            function (enums_12_1) {
                enums_12 = enums_12_1;
            }
        ],
        execute: function () {
            IdQuickColor = /** @class */ (function (_super) {
                __extends(IdQuickColor, _super);
                // 
                // Create a new instance of IdQuickColor by providing a query selector that
                // yields an id-quick-color element.
                //
                function IdQuickColor(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idQuickColor({ colors: enums_12.Values.COLORS_STANDARD });
                    var btns = _this.elem.querySelectorAll('id-popup');
                    var _loop_3 = function () {
                        var popup = new controls_3.IdPopup(btns[i]);
                        var color = enums_12.Values.COLORS_STANDARD[i];
                        popup.backgroundColor = color;
                        popup.addEventListener('click', function () { _this.value = color; });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_3();
                    }
                    return _this;
                }
                Object.defineProperty(IdQuickColor.prototype, "value", {
                    get: function () {
                        return this.color;
                    },
                    set: function (color) {
                        this.color = color;
                        var evt = new CustomEvent('change');
                        this.elem.dispatchEvent(evt);
                    },
                    enumerable: true,
                    configurable: true
                });
                return IdQuickColor;
            }(control_10.Control));
            exports_53("IdQuickColor", IdQuickColor);
        }
    };
});
System.register("controls/idShape/idShape", ["enums/enums", "controls/optionsGroup"], function (exports_54, context_54) {
    "use strict";
    var enums_13, optionsGroup_2, IdShape;
    var __moduleName = context_54 && context_54.id;
    return {
        setters: [
            function (enums_13_1) {
                enums_13 = enums_13_1;
            },
            function (optionsGroup_2_1) {
                optionsGroup_2 = optionsGroup_2_1;
            }
        ],
        execute: function () {
            IdShape = /** @class */ (function (_super) {
                __extends(IdShape, _super);
                // 
                // Create a new instance of IdShape by providing a query selector that
                // yields an id-shape element.
                //
                function IdShape(elem, base) {
                    return _super.call(this, elem, [
                        { value: enums_13.RoomShape.Rectangle, htmlEl: '.js-rectangle' },
                        { value: enums_13.RoomShape.Ellipse, htmlEl: '.js-ellipse' },
                        { value: enums_13.RoomShape.Octagon, htmlEl: '.js-octagon' },
                    ], base) || this;
                }
                Object.defineProperty(IdShape.prototype, "dataset", {
                    get: function () {
                        return {
                            label: this.elem.dataset.label,
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(IdShape.prototype, "template", {
                    get: function () {
                        return Handlebars.templates.idShape({ label: this.dataset['label'] });
                    },
                    enumerable: true,
                    configurable: true
                });
                return IdShape;
            }(optionsGroup_2.OptionsGroup));
            exports_54("IdShape", IdShape);
        }
    };
});
System.register("controls/idToast/idToast", ["controls/control"], function (exports_55, context_55) {
    "use strict";
    var control_11, toast, IdToast;
    var __moduleName = context_55 && context_55.id;
    return {
        setters: [
            function (control_11_1) {
                control_11 = control_11_1;
            }
        ],
        execute: function () {
            toast = null;
            IdToast = /** @class */ (function (_super) {
                __extends(IdToast, _super);
                // 
                // Create a new instance of IdToast by providing a query selector that
                // yields an id-toast element.
                //
                function IdToast(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    _this.handleClose = function () {
                        _this.elem.style.display = 'none';
                    };
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idToast({});
                    // Keep a reference to toast text to be able to set the text:
                    _this.title = _this.elem.querySelector('h3');
                    _this.text = _this.elem.querySelector('p');
                    // Close toast when close-icon is clicked:
                    _this.elem.querySelector('span').addEventListener('click', _this.handleClose);
                    return _this;
                }
                IdToast.prototype.setText = function (title, text, autoWidth) {
                    // Make sure element is visible (toast may have been closed previously):
                    this.elem.style.display = 'block';
                    this.title.innerHTML = title;
                    this.text.innerHTML = text;
                    if (autoWidth) {
                        this.elem.style.width = 'auto';
                    }
                    else {
                        this.elem.style.width = '250px';
                    }
                };
                IdToast.toast = function (title, text, autoWidth) {
                    if (toast == null)
                        toast = new IdToast("#toast");
                    toast.setText(title, text, !!autoWidth);
                };
                return IdToast;
            }(control_11.Control));
            exports_55("IdToast", IdToast);
        }
    };
});
System.register("controls/tabs", [], function (exports_56, context_56) {
    "use strict";
    var Tabs, Tab;
    var __moduleName = context_56 && context_56.id;
    return {
        setters: [],
        execute: function () {
            Tabs = /** @class */ (function () {
                function Tabs(elem) {
                    this.elem = elem;
                    this.tabs = new Array();
                    // Find all tab elements inside the Tabs.
                    var tabList = this.elem.querySelectorAll('.tab');
                    for (var i = 0; i < tabList.length; i++) {
                        // For each element found, create a new Tab instance.
                        this.tabs.push(new Tab(this, tabList[i]));
                    }
                }
                //
                // Create a Tabs instance for each element with
                // class .tabs in the Document.
                //
                Tabs.initialize = function () {
                    // Find all the Tabs elements in the document.
                    var tabsList = document.querySelectorAll('.tabs');
                    for (var i = 0; i < tabsList.length; i++) {
                        // For each element found, create a new Tabs instance.
                        new Tabs(tabsList[i]);
                    }
                };
                //
                // Called by Tab when a Tab is selected.
                // Selects new tab, unselects other tabs.
                //
                Tabs.prototype.select = function (tab) {
                    for (var i = 0; i < this.tabs.length; i++) {
                        if (this.tabs[i] == tab) {
                            this.tabs[i].select();
                        }
                        else {
                            this.tabs[i].unselect();
                        }
                    }
                };
                return Tabs;
            }());
            exports_56("Tabs", Tabs);
            Tab = /** @class */ (function () {
                function Tab(tabs, elem) {
                    var _this = this;
                    this.tabs = tabs;
                    this.elem = elem;
                    // Find data-body attribute
                    var bodyID = this.elem.dataset.body;
                    // Find the body element
                    this.body = document.getElementById(bodyID);
                    if (!this.body) {
                        console.log("Tabs error: body not found.");
                        return;
                    }
                    // Show/hide the body element depending on presence of 'selected' class on tab.
                    if (this.elem.classList.contains('selected'))
                        this.select();
                    // Make tab clickable
                    this.elem.addEventListener('click', function () {
                        _this.tabs.select(_this);
                    });
                }
                Tab.prototype.select = function () {
                    this.elem.classList.add('selected');
                    this.body.classList.add("selected");
                };
                Tab.prototype.unselect = function () {
                    this.elem.classList.remove('selected');
                    this.body.classList.remove("selected");
                };
                return Tab;
            }());
        }
    };
});
//
// Window class.
//
// Open a window by creating an instance of the Window class:
//
//     new Window('Error', 'An error occurred.', true, false);
//
// If the onOK argument is true, there will be an OK button. If the 
// onCancel argument is true, then there will be a cancel button.
// Any button closes the window when clicked.
//
// onOK and onCancel can also be functions. In this case, the function
// is called when the button is clicked (and the window also closes):
//
//     new Window('Delete room?', 'Are you sure...', () => { ... }, false);
//
System.register("controls/window", [], function (exports_57, context_57) {
    "use strict";
    var Window;
    var __moduleName = context_57 && context_57.id;
    return {
        setters: [],
        execute: function () {//
            // Window class.
            //
            // Open a window by creating an instance of the Window class:
            //
            //     new Window('Error', 'An error occurred.', true, false);
            //
            // If the onOK argument is true, there will be an OK button. If the 
            // onCancel argument is true, then there will be a cancel button.
            // Any button closes the window when clicked.
            //
            // onOK and onCancel can also be functions. In this case, the function
            // is called when the button is clicked (and the window also closes):
            //
            //     new Window('Delete room?', 'Are you sure...', () => { ... }, false);
            //
            Window = /** @class */ (function () {
                function Window(title, content, onOK, onCancel) {
                    var _this = this;
                    // When OK is pressed, hide the window, and call OK callback if provided:
                    this.handleOK = function () {
                        _this.close();
                        if (_this.onOK instanceof Function)
                            _this.onOK();
                    };
                    // When Cancel is pressed, hide the window, and call Cancel callback if provided:
                    this.handleCancel = function () {
                        _this.close();
                        if (_this.onCancel instanceof Function)
                            _this.onCancel();
                    };
                    this.elem = document.getElementById('window');
                    this.elem.querySelector('.title').innerHTML = title;
                    this.elem.querySelector('.content').innerHTML = content;
                    this.onOK = onOK;
                    this.onCancel = onCancel;
                    this.open();
                }
                Window.prototype.open = function () {
                    // Show OK button if required, and add event listener for it:
                    var ok = this.elem.querySelector('.ok');
                    ok.style.display = this.onOK ? 'block' : 'none';
                    this.elem.querySelector('.ok').addEventListener('click', this.handleOK);
                    // Show Cancel button if required, and add event listener for it:
                    var cancel = this.elem.querySelector('.cancel');
                    cancel.style.display = this.onCancel ? 'block' : 'none';
                    this.elem.querySelector('.cancel').addEventListener('click', this.handleCancel);
                    // Show window:
                    this.elem.style.display = 'flex';
                };
                Window.prototype.close = function () {
                    // Remove event listeners for OK and Cancel buttons:
                    this.elem.querySelector('.ok').removeEventListener('click', this.handleOK);
                    this.elem.querySelector('.cancel').removeEventListener('click', this.handleCancel);
                    // Hide window:
                    this.elem.style.display = 'none';
                };
                return Window;
            }());
            exports_57("Window", Window);
        }
    };
});
System.register("controls/controls", ["controls/idInput/idInput", "controls/idTextarea/idTextarea", "controls/idCheck/idCheck", "controls/idRange/idRange", "controls/idColorPicker/idColorPicker", "controls/idPopup/idPopup", "controls/idConnectorType/idConnectorType", "controls/idLineStyle/idLineStyle", "controls/idQuickColor/idQuickColor", "controls/idShape/idShape", "controls/idToast/idToast", "controls/tabs", "controls/window"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_58(exports);
    }
    return {
        setters: [
            function (idInput_1_1) {
                exportStar_3(idInput_1_1);
            },
            function (idTextarea_1_1) {
                exportStar_3(idTextarea_1_1);
            },
            function (idCheck_1_1) {
                exportStar_3(idCheck_1_1);
            },
            function (idRange_1_1) {
                exportStar_3(idRange_1_1);
            },
            function (idColorPicker_1_1) {
                exportStar_3(idColorPicker_1_1);
            },
            function (idPopup_1_1) {
                exportStar_3(idPopup_1_1);
            },
            function (idConnectorType_1_1) {
                exportStar_3(idConnectorType_1_1);
            },
            function (idLineStyle_1_1) {
                exportStar_3(idLineStyle_1_1);
            },
            function (idQuickColor_1_1) {
                exportStar_3(idQuickColor_1_1);
            },
            function (idShape_1_1) {
                exportStar_3(idShape_1_1);
            },
            function (idToast_1_1) {
                exportStar_3(idToast_1_1);
            },
            function (tabs_1_1) {
                exportStar_3(tabs_1_1);
            },
            function (window_1_1) {
                exportStar_3(window_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("panels/panel", ["app"], function (exports_59, context_59) {
    "use strict";
    var app_1, Panel;
    var __moduleName = context_59 && context_59.id;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            //
            // Panel is a base class for closable panels.
            // 
            Panel = /** @class */ (function () {
                // Panels are instantiated by providing their DOM id
                // and a reference to a Handlebars template
                function Panel(id, template, args) {
                    var _this = this;
                    this.id = id;
                    this.elem = document.getElementById(id);
                    Handlebars.registerPartial('closePanel', Handlebars.templates.closePanel);
                    this.elem.innerHTML = template(args);
                    // Find the close button and make it clickable.
                    // (Some panels may not include a close button.)
                    var closeButton = document.querySelector("#" + id + " .panel-close");
                    if (closeButton)
                        closeButton.addEventListener('click', function () { _this.close(); });
                    // Close self when mouse is down on editor canvas:
                    app_1.App.mainHTMLCanvas.addEventListener('mousedown', function () {
                        _this.close();
                    });
                }
                Panel.prototype.open = function () {
                    this.elem.classList.add('show');
                };
                Panel.prototype.close = function () {
                    this.elem.classList.remove('show');
                };
                Panel.prototype.toggle = function () {
                    if (this.elem.classList.contains('show')) {
                        this.close();
                    }
                    else {
                        this.open();
                    }
                };
                return Panel;
            }());
            exports_59("Panel", Panel);
        }
    };
});
System.register("panels/blockPanel/blockPanel", ["dispatcher", "enums/appEvent", "models/block", "panels/panels", "controls/controls"], function (exports_60, context_60) {
    "use strict";
    var dispatcher_js_2, appEvent_js_3, block_js_3, panels_js_1, controls_js_1, BlockPanel;
    var __moduleName = context_60 && context_60.id;
    return {
        setters: [
            function (dispatcher_js_2_1) {
                dispatcher_js_2 = dispatcher_js_2_1;
            },
            function (appEvent_js_3_1) {
                appEvent_js_3 = appEvent_js_3_1;
            },
            function (block_js_3_1) {
                block_js_3 = block_js_3_1;
            },
            function (panels_js_1_1) {
                panels_js_1 = panels_js_1_1;
            },
            function (controls_js_1_1) {
                controls_js_1 = controls_js_1_1;
            }
        ],
        execute: function () {
            BlockPanel = /** @class */ (function (_super) {
                __extends(BlockPanel, _super);
                function BlockPanel() {
                    var _this = _super.call(this, 'blockpanel', Handlebars.templates.blockPanel, {}) || this;
                    dispatcher_js_2.Dispatcher.subscribe(_this);
                    _this.colorPicker = new controls_js_1.IdColorPicker('.js-color', _this.elem).addEventListener('change', function () { _this.setNoteColor(_this.colorPicker.color); });
                    _this.ctrlShape = new controls_js_1.IdShape('.js-shape', _this.elem).addEventListener('change', function () { _this.block.shape = _this.ctrlShape.value; });
                    _this.ctrlRounding = new controls_js_1.IdRange('.js-rounding', _this.elem).addEventListener('input', function () { _this.block.rounding = _this.ctrlRounding.value; });
                    _this.ctrlLineStyle = new controls_js_1.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.block.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLineWidth = new controls_js_1.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.block.lineWidth = _this.ctrlLineWidth.value; });
                    // Find color buttons:
                    var buttons = _this.elem.querySelectorAll(".colortype");
                    _this.colorButtons = new Array();
                    var _loop_4 = function (i) {
                        var popup = new controls_js_1.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_2.colorType = popup.type;
                        this_2.colorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onColorButton(popup); });
                    };
                    var this_2 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_4(i);
                    }
                    return _this;
                }
                BlockPanel.prototype.notify = function (event, obj) {
                    /* if(event == AppEvent.Select) {
                      this.close();
                    } */
                    if (event == appEvent_js_3.AppEvent.More) {
                        if (obj instanceof block_js_3.Block) {
                            var block = obj;
                            this.block = block;
                            this.open();
                            // Show block data.
                            this.ctrlRounding.value = this.block.rounding;
                            this.ctrlShape.value = this.block.shape;
                            this.ctrlLineStyle.value = this.block.lineStyle;
                            this.ctrlLineWidth.value = this.block.lineWidth;
                            // Set color from currently selected color button:
                            this.setColor();
                        }
                        else {
                            this.close();
                        }
                    }
                };
                BlockPanel.prototype.onColorButton = function (button) {
                    // Unselect all buttons.
                    this.colorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.colorType = button.type;
                    // Set colorPicker to color.
                    this.setColor();
                };
                BlockPanel.prototype.setColor = function () {
                    if (this.colorType == 'fill')
                        this.colorPicker.color = this.block.fillColor;
                    if (this.colorType == 'border')
                        this.colorPicker.color = this.block.borderColor;
                    dispatcher_js_2.Dispatcher.notify(appEvent_js_3.AppEvent.Refresh, null);
                };
                BlockPanel.prototype.setNoteColor = function (color) {
                    if (this.colorType == 'fill')
                        this.block.fillColor = color;
                    if (this.colorType == 'border')
                        this.block.borderColor = color;
                    dispatcher_js_2.Dispatcher.notify(appEvent_js_3.AppEvent.Refresh, null);
                };
                return BlockPanel;
            }(panels_js_1.Panel));
            exports_60("BlockPanel", BlockPanel);
        }
    };
});
System.register("panels/connectorPanel/connectorPanel", ["dispatcher", "enums/appEvent", "models/connector", "app", "panels/panels", "controls/controls", "controls/idConnectorType/idConnectorType"], function (exports_61, context_61) {
    "use strict";
    var dispatcher_js_3, appEvent_js_4, connector_js_4, app_js_6, panels_js_2, controls_js_2, idConnectorType_js_1, ConnectorPanel;
    var __moduleName = context_61 && context_61.id;
    return {
        setters: [
            function (dispatcher_js_3_1) {
                dispatcher_js_3 = dispatcher_js_3_1;
            },
            function (appEvent_js_4_1) {
                appEvent_js_4 = appEvent_js_4_1;
            },
            function (connector_js_4_1) {
                connector_js_4 = connector_js_4_1;
            },
            function (app_js_6_1) {
                app_js_6 = app_js_6_1;
            },
            function (panels_js_2_1) {
                panels_js_2 = panels_js_2_1;
            },
            function (controls_js_2_1) {
                controls_js_2 = controls_js_2_1;
            },
            function (idConnectorType_js_1_1) {
                idConnectorType_js_1 = idConnectorType_js_1_1;
            }
        ],
        execute: function () {
            ConnectorPanel = /** @class */ (function (_super) {
                __extends(ConnectorPanel, _super);
                function ConnectorPanel() {
                    var _this = _super.call(this, 'connectorpanel', Handlebars.templates.connectorPanel, {}) || this;
                    dispatcher_js_3.Dispatcher.subscribe(_this);
                    _this.ctrlName = new controls_js_2.IdInput('.js-name', _this.elem).addEventListener('input', function () { _this.connector.name = _this.ctrlName.value; });
                    _this.ctrlCurve = new controls_js_2.IdCheck('.js-curve', _this.elem).addEventListener('input', function () { _this.connector.isCurve = _this.ctrlCurve.checked; });
                    _this.ctrlOneWay = new controls_js_2.IdCheck('.js-oneway', _this.elem).addEventListener('input', function () { _this.connector.oneWay = _this.ctrlOneWay.checked; });
                    _this.ctrlLineStyle = new controls_js_2.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.connector.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLineWidth = new controls_js_2.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.connector.lineWidth = _this.ctrlLineWidth.value; });
                    _this.ctrlColor = new controls_js_2.IdColorPicker('.js-color', _this.elem).addEventListener('change', function () { _this.connector.color = _this.ctrlColor.color; });
                    _this.btnReverse = _this.elem.querySelector('.js-reverse');
                    _this.btnReverse.addEventListener('click', function () { app_js_6.App.pushUndo(); _this.connector.reverse(); dispatcher_js_3.Dispatcher.notify(appEvent_js_4.AppEvent.Refresh, null); });
                    _this.ctrlStartType = new idConnectorType_js_1.IdConnectorType('.js-starttype', _this.elem).addEventListener('input', function () { _this.connector.startType = _this.ctrlStartType.value; });
                    _this.ctrlEndType = new idConnectorType_js_1.IdConnectorType('.js-endtype', _this.elem).addEventListener('input', function () { _this.connector.endType = _this.ctrlEndType.value; });
                    _this.ctrlStartLabel = new controls_js_2.IdInput('.js-startlabel', _this.elem).addEventListener('input', function () { _this.connector.startLabel = _this.ctrlStartLabel.value; });
                    _this.ctrlEndLabel = new controls_js_2.IdInput('.js-endlabel', _this.elem).addEventListener('input', function () { _this.connector.endLabel = _this.ctrlEndLabel.value; });
                    return _this;
                }
                ConnectorPanel.prototype.notify = function (event, obj) {
                    var _this = this;
                    if (event == appEvent_js_4.AppEvent.Select) {
                        this.close();
                    }
                    if (event == appEvent_js_4.AppEvent.More) {
                        if (obj instanceof connector_js_4.Connector) {
                            var connector = obj;
                            this.connector = connector;
                            this.open();
                            //  Update connector data.
                            this.ctrlName.value = connector.name;
                            this.ctrlCurve.checked = connector.isCurve;
                            this.ctrlOneWay.checked = connector.oneWay;
                            this.ctrlLineStyle.value = connector.lineStyle;
                            this.ctrlLineWidth.value = connector.lineWidth;
                            this.ctrlColor.color = connector.color;
                            this.btnReverse.style.display = connector.isDoubleDocked() ? 'block' : 'none';
                            this.ctrlStartType.value = connector.startType;
                            this.ctrlEndType.value = connector.endType;
                            this.ctrlStartLabel.value = connector.startLabel;
                            this.ctrlEndLabel.value = connector.endLabel;
                            setTimeout(function () {
                                _this.ctrlName.focus().select();
                            }, 100);
                        }
                        else {
                            this.close();
                        }
                    }
                };
                return ConnectorPanel;
            }(panels_js_2.Panel));
            exports_61("ConnectorPanel", ConnectorPanel);
        }
    };
});
System.register("panels/mapPanel/mapPanel", ["dispatcher", "enums/appEvent", "app", "panels/panels", "controls/controls", "models/map"], function (exports_62, context_62) {
    "use strict";
    var dispatcher_js_4, appEvent_js_5, app_js_7, panels_js_3, controls_js_3, map_js_3, MapPanel;
    var __moduleName = context_62 && context_62.id;
    return {
        setters: [
            function (dispatcher_js_4_1) {
                dispatcher_js_4 = dispatcher_js_4_1;
            },
            function (appEvent_js_5_1) {
                appEvent_js_5 = appEvent_js_5_1;
            },
            function (app_js_7_1) {
                app_js_7 = app_js_7_1;
            },
            function (panels_js_3_1) {
                panels_js_3 = panels_js_3_1;
            },
            function (controls_js_3_1) {
                controls_js_3 = controls_js_3_1;
            },
            function (map_js_3_1) {
                map_js_3 = map_js_3_1;
            }
        ],
        execute: function () {
            MapPanel = /** @class */ (function (_super) {
                __extends(MapPanel, _super);
                function MapPanel() {
                    var _this = _super.call(this, 'mappanel', Handlebars.templates.mapPanel, {}) || this;
                    dispatcher_js_4.Dispatcher.subscribe(_this);
                    _this.ctrlTitle = new controls_js_3.IdInput('.js-title', _this.elem).addEventListener('input', function () { app_js_7.App.map.title = _this.ctrlTitle.value; app_js_7.App.header.title = _this.ctrlTitle.value; });
                    _this.ctrlAuthor = new controls_js_3.IdInput('.js-author', _this.elem).addEventListener('input', function () { app_js_7.App.map.author = _this.ctrlAuthor.value; app_js_7.App.header.content = app_js_7.App.author(_this.ctrlAuthor.value); });
                    _this.ctrlDescription = new controls_js_3.IdTextarea('.js-description', _this.elem).addEventListener('input', function () { app_js_7.App.map.description = _this.ctrlDescription.value; });
                    return _this;
                }
                MapPanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_5.AppEvent.More) {
                        if (obj instanceof map_js_3.Map) {
                            this.open();
                            // Place map data in controls:
                            this.ctrlTitle.value = app_js_7.App.map.title;
                            this.ctrlAuthor.value = app_js_7.App.map.author;
                            this.ctrlDescription.value = app_js_7.App.map.description;
                        }
                        else {
                            this.close();
                        }
                    }
                };
                return MapPanel;
            }(panels_js_3.Panel));
            exports_62("MapPanel", MapPanel);
        }
    };
});
System.register("io/mapXML", ["models/map", "models/room", "models/connector", "enums/enums"], function (exports_63, context_63) {
    "use strict";
    var map_js_4, room_js_3, connector_js_5, enums_js_9, MapXMLLoader;
    var __moduleName = context_63 && context_63.id;
    return {
        setters: [
            function (map_js_4_1) {
                map_js_4 = map_js_4_1;
            },
            function (room_js_3_1) {
                room_js_3 = room_js_3_1;
            },
            function (connector_js_5_1) {
                connector_js_5 = connector_js_5_1;
            },
            function (enums_js_9_1) {
                enums_js_9 = enums_js_9_1;
            }
        ],
        execute: function () {
            MapXMLLoader = /** @class */ (function () {
                function MapXMLLoader() {
                }
                MapXMLLoader.getAttr = function (node, name, defaultValue, transform) {
                    // Get attribute.
                    var attr = node.getAttribute(name);
                    // If attribute does not exist or is empty, return the default value.
                    if (!attr)
                        return defaultValue;
                    // Transform the attribute if a transform function was given.
                    if (transform)
                        attr = transform(attr);
                    // Return the attribute's value.
                    return attr;
                };
                MapXMLLoader.getContent = function (node, path, defaultValue, transform) {
                    // Find the node using the path:
                    var subnode = node.querySelector(path);
                    // If the node does not exist, return the default value.
                    if (!subnode)
                        return defaultValue;
                    // Get the node's text value
                    var value = subnode.textContent;
                    // Transform the value if a transform function was given.
                    if (transform)
                        value = transform(value);
                    // Return the (transformed) value:
                    return value;
                };
                MapXMLLoader.loadRoom = function (map, node) {
                    /* let r = new Room();
                    XmlMap.load(r, node);
                    console.log("xml loaded", r); */
                    var room = new room_js_3.Room(map.settings);
                    map.add(room);
                    room.id = this.getAttr(node, 'id', 0, parseInt);
                    room.x = this.getAttr(node, 'x', 0, parseFloat);
                    room.y = this.getAttr(node, 'y', 0, parseFloat);
                    room.name = this.getAttr(node, 'name', '');
                    room.subtitle = this.getAttr(node, 'subtitle', '');
                    room.description = this.getAttr(node, 'description', '');
                    room.width = this.getAttr(node, 'w', map.settings.room.width, parseFloat);
                    room.height = this.getAttr(node, 'h', map.settings.room.height, parseFloat);
                    room.lineStyle = this.getAttr(node, 'borderstyle', map.settings.room.lineStyle, function (s) { return enums_js_9.LineStyle.fromString(s); });
                    room.dark = this.getAttr(node, 'isDark', false, function (s) { return s == 'yes'; });
                    room.endroom = this.getAttr(node, 'isEndRoom', false, function (s) { return s == 'yes'; });
                    room.fillColor = this.getAttr(node, 'roomFill', map.settings.room.fillColor);
                    room.borderColor = this.getAttr(node, 'roomBorder', map.settings.room.borderColor);
                    room.nameColor = this.getAttr(node, 'roomLargeText', map.settings.room.nameColor);
                    room.subtitleColor = this.getAttr(node, 'roomSubtitleColor', map.settings.room.subtitleColor);
                    room.rounding = this.getAttr(node, 'cornerTopLeft', map.settings.room.rounding, parseInt);
                    // Room shapes:
                    if (node.getAttribute('ellipse') == 'yes')
                        room.shape = enums_js_9.RoomShape.Ellipse;
                    if (node.getAttribute('octagonal') == 'yes')
                        room.shape = enums_js_9.RoomShape.Octagon;
                };
                MapXMLLoader.loadConnector = function (map, node) {
                    var connector = new connector_js_5.Connector(map.settings);
                    map.add(connector);
                    connector.id = this.getAttr(node, 'id', 0, parseInt);
                    connector.name = this.getAttr(node, 'name', '');
                    // Trizbort seems to support only solid and dotted (called "dashed") lines.
                    connector.lineStyle = this.getAttr(node, 'style', map.settings.connector.lineStyle, function (s) { return s == 'dashed' ? enums_js_9.LineStyle.Dash : enums_js_9.LineStyle.Solid; });
                    var dockNodes = node.querySelectorAll('dock');
                    var startDone = false;
                    for (var d = 0; d < node.children.length; d++) {
                        var childNode = node.children[d];
                        if (childNode.nodeName == 'dock') {
                            var room = map.findById(parseInt(childNode.getAttribute('id')), room_js_3.Room);
                            var dir = enums_js_9.Direction.fromString(childNode.getAttribute('port'));
                            if (!startDone) {
                                connector.dockStart = room;
                                connector.startDir = dir;
                                startDone = true;
                            }
                            else {
                                connector.dockEnd = room;
                                connector.endDir = dir;
                            }
                        }
                        else if (childNode.nodeName == 'point') {
                            var x = parseFloat(childNode.getAttribute('x'));
                            var y = parseFloat(childNode.getAttribute('y'));
                            if (!startDone) {
                                connector.startX = x;
                                connector.startY = y;
                                startDone = true;
                            }
                            else {
                                connector.endX = x;
                                connector.endY = y;
                            }
                        }
                    }
                };
                MapXMLLoader.load = function (text) {
                    // Parse XML to Document.
                    var xml = new DOMParser().parseFromString(text, 'text/xml');
                    // Create an empty map.
                    var map = new map_js_4.Map();
                    var mapNode = xml.querySelector('map');
                    var trizbort = xml.querySelector('trizbort');
                    // Process map
                    map.title = this.getContent(trizbort, 'info title', '');
                    map.author = this.getContent(trizbort, 'info author', '');
                    map.description = this.getContent(trizbort, 'info description', '');
                    map.settings.grid.visible = this.getContent(trizbort, 'settings grid visible', map.settings.grid.visible, function (s) { return s == 'yes'; });
                    map.settings.grid.origin = this.getContent(trizbort, 'settings grid showOrigin', map.settings.grid.origin, function (s) { return s == 'yes'; });
                    map.settings.grid.snap = this.getContent(trizbort, 'settings grid snapTo', map.settings.grid.snap, function (s) { return s == 'yes'; });
                    map.settings.grid.size = this.getContent(trizbort, 'settings grid size', map.settings.grid.size, parseInt);
                    map.settings.room.borderColor = this.getContent(trizbort, 'settings colors border', map.settings.room.borderColor);
                    map.settings.room.subtitleColor = this.getContent(trizbort, 'settings colors subTitle', map.settings.room.subtitleColor);
                    map.settings.room.startRoomColor = this.getContent(trizbort, 'settings colors startRoom', map.settings.room.startRoomColor);
                    map.settings.room.endRoomColor = this.getContent(trizbort, 'settings colors endRoom', map.settings.room.endRoomColor);
                    map.settings.room.shape = this.getContent(trizbort, 'settings rooms defaultRoomShape', map.settings.room.shape, function (s) { var x = parseInt(s); if (x > 0)
                        x--; return x; });
                    map.settings.connector.color = this.getContent(trizbort, 'settings colors line', map.settings.connector.color);
                    map.settings.connector.lineWidth = this.getContent(trizbort, 'settings lines width', map.settings.connector.lineWidth, parseInt);
                    map.settings.connector.stalk = this.getContent(trizbort, 'settings rooms connectionStalkLength', map.settings.connector.stalk, parseInt);
                    // Process rooms.
                    var roomNodes = mapNode.querySelectorAll("room");
                    for (var i = 0; i < roomNodes.length; i++) {
                        this.loadRoom(map, roomNodes[i]);
                    }
                    // Process connectors.
                    var connectorNodes = mapNode.querySelectorAll("line");
                    for (var i = 0; i < connectorNodes.length; i++) {
                        this.loadConnector(map, connectorNodes[i]);
                    }
                    return map;
                };
                return MapXMLLoader;
            }());
            exports_63("MapXMLLoader", MapXMLLoader);
        }
    };
});
System.register("exporter", ["drawing/canvas", "views/viewFactory", "views/blockView", "views/connectorView", "views/roomView", "views/noteView", "views/boxView"], function (exports_64, context_64) {
    "use strict";
    var canvas_1, viewFactory_1, blockView_2, connectorView_2, roomView_2, noteView_2, boxView_1, Exporter;
    var __moduleName = context_64 && context_64.id;
    return {
        setters: [
            function (canvas_1_1) {
                canvas_1 = canvas_1_1;
            },
            function (viewFactory_1_1) {
                viewFactory_1 = viewFactory_1_1;
            },
            function (blockView_2_1) {
                blockView_2 = blockView_2_1;
            },
            function (connectorView_2_1) {
                connectorView_2 = connectorView_2_1;
            },
            function (roomView_2_1) {
                roomView_2 = roomView_2_1;
            },
            function (noteView_2_1) {
                noteView_2 = noteView_2_1;
            },
            function (boxView_1_1) {
                boxView_1 = boxView_1_1;
            }
        ],
        execute: function () {
            //
            // The Exporter exports the a map to an image file.
            // 
            Exporter = /** @class */ (function () {
                function Exporter(map) {
                    this.map = map;
                    this.canvasElem = document.getElementById('export');
                    this.ctx = this.canvasElem.getContext('2d');
                    this.canvas = new canvas_1.Canvas(this.ctx);
                    // Assume a canvas of 100x100.
                    // This will avoid problems in case of an empty map.
                    this.left = 0;
                    this.top = 0;
                    this.width = 100;
                    this.height = 100;
                }
                //
                // Render all views to the export canvas, either with a transparent
                // background (for margin testing) or with a solid background.
                // 
                Exporter.prototype.render = function (withBackground) {
                    var _this = this;
                    this.canvasElem.width = this.width;
                    this.canvasElem.height = this.height;
                    this.canvas.save();
                    if (withBackground) {
                        this.canvas
                            .fillStyle(this.map.settings.grid.background)
                            .fillRect(0, 0, this.width, this.height);
                    }
                    else {
                        this.canvas
                            .clearRect(0, 0, this.width, this.height);
                    }
                    this.canvas.translate(this.left, this.top);
                    // Draw all blocks:
                    this.views.forEach(function (view) {
                        if (view instanceof blockView_2.BlockView) {
                            view.draw(_this.canvas, false);
                        }
                    });
                    // Draw all connectors:
                    this.views.forEach(function (view) {
                        if (view instanceof connectorView_2.ConnectorView) {
                            view.draw(_this.canvas, false);
                        }
                    });
                    // Draw all rooms and notes:
                    this.views.forEach(function (view) {
                        if (view instanceof roomView_2.RoomView || view instanceof noteView_2.NoteView) {
                            view.draw(_this.canvas, false);
                        }
                    });
                    this.canvas.restore();
                };
                // 
                // If there is no whitespace at the top, return true.
                // 
                Exporter.prototype.hasPixelsTop = function () {
                    var myImageData = this.ctx.getImageData(0, 0, this.width, 1);
                    for (var i = 0; i < this.width; i++) {
                        if (myImageData.data[i * 4 + 3] > 0)
                            return true;
                    }
                    return false;
                };
                // 
                // If there is no whitespace at the bottom, return true.
                //   
                Exporter.prototype.hasPixelsBottom = function () {
                    var myImageData = this.ctx.getImageData(0, this.height - 1, this.width, 1);
                    for (var i = 0; i < this.width; i++) {
                        if (myImageData.data[i * 4 + 3] > 0)
                            return true;
                    }
                    return false;
                };
                // 
                // If there is no whitespace on the left, return true.
                //   
                Exporter.prototype.hasPixelsLeft = function () {
                    var myImageData = this.ctx.getImageData(0, 0, 1, this.height);
                    for (var i = 0; i < this.height; i++) {
                        if (myImageData.data[i * 4 + 3] > 0)
                            return true;
                    }
                    return false;
                };
                // 
                // If there is no whitespace on the right, return true.
                //   
                Exporter.prototype.hasPixelsRight = function () {
                    var myImageData = this.ctx.getImageData(this.width - 1, 0, 1, this.height);
                    for (var i = 0; i < this.height; i++) {
                        if (myImageData.data[i * 4 + 3] > 0)
                            return true;
                    }
                    return false;
                };
                // 
                // Export the current map to a PNG file, which is offered
                // for download.
                // 
                Exporter.prototype.export = function () {
                    var _this = this;
                    // Create views for all models.
                    this.views = [];
                    this.map.elements.forEach(function (model) {
                        _this.views.push(viewFactory_1.ViewFactory.create(model));
                    });
                    // If there are any box views...
                    if (this.views.length > 0) {
                        // Determine bounding box of all box views:
                        var minX_1 = 99999;
                        var minY_1 = 99999;
                        var maxX_1 = -99999;
                        var maxY_1 = -99999;
                        this.views.forEach(function (view) {
                            if (view instanceof boxView_1.BoxView) {
                                var box = view.getModel();
                                if (box.x < minX_1)
                                    minX_1 = box.x;
                                if (box.y < minY_1)
                                    minY_1 = box.y;
                                if (box.x + box.width > maxX_1)
                                    maxX_1 = box.x + box.width;
                                if (box.y + box.height > maxY_1)
                                    maxY_1 = box.y + box.height;
                            }
                        });
                        // Determine canvas dimensions based on bounding box:
                        this.left = -minX_1;
                        this.top = -minY_1;
                        this.width = Math.abs(maxX_1 - minX_1);
                        this.height = Math.abs(maxY_1 - minY_1);
                    }
                    // Do render passes, checking after each pass if anything is drawn
                    // on the border pixels of the image. If so, enlarge the canvas
                    // in that direction.
                    do {
                        this.render(false);
                        var hasTop = this.hasPixelsTop();
                        var hasBottom = this.hasPixelsBottom();
                        var hasRight = this.hasPixelsRight();
                        var hasLeft = this.hasPixelsLeft();
                        if (hasTop) {
                            this.top += 50;
                            this.height += 50;
                        }
                        if (hasBottom) {
                            this.height += 50;
                        }
                        if (hasLeft) {
                            this.left += 50;
                            this.width += 50;
                        }
                        if (hasRight) {
                            this.width += 50;
                        }
                    } while (hasTop || hasBottom || hasRight || hasLeft);
                    // Do a final render with solid background:
                    this.render(true);
                    // Download result blob:
                    this.downloadAsBlob();
                };
                // 
                // Convert the canvas contents to a blob and download it.
                // 
                Exporter.prototype.downloadAsBlob = function () {
                    var _this = this;
                    // Create blob. The browser takes a callback function for this:
                    var blob = this.toBlob(function (blob) { _this.downloadAsBlobCallback(blob); }, "image/png", 1);
                };
                Exporter.prototype.downloadAsBlobCallback = function (blob) {
                    // Create filename based on map title:
                    var title = this.map.title;
                    if (!title)
                        title = "untitled";
                    // IE supports msSaveBlob:
                    if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(blob, title + ".png");
                    }
                    // Other browsers create a temporary link with the blob as URL,
                    // click it, and then remove it.
                    else {
                        var a = window.document.createElement("a");
                        a.href = window.URL.createObjectURL(blob);
                        a.download = title + ".png";
                        document.body.appendChild(a);
                        a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                        document.body.removeChild(a);
                    }
                };
                //
                // Some browsers have a toBlob method on the Canvas element, but
                // IE does not. This is a low-performance polyfill for browsers
                // that don't support the toBlob method.
                // (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)
                // 
                Exporter.prototype.toBlob = function (callback, type, quality) {
                    if (this.canvasElem.toBlob) {
                        return this.canvasElem.toBlob(callback, type, quality);
                    }
                    else {
                        var canv_1 = this.canvasElem;
                        setTimeout(function () {
                            var binStr = atob(canv_1.toDataURL(type, quality).split(',')[1]);
                            var len = binStr.length;
                            var arr = new Uint8Array(len);
                            for (var i = 0; i < len; i++) {
                                arr[i] = binStr.charCodeAt(i);
                            }
                            callback(new Blob([arr], { type: type || 'image/png' }));
                        });
                    }
                };
                return Exporter;
            }());
            exports_64("Exporter", Exporter);
        }
    };
});
System.register("codegen/CodeGenerator", ["enums/enums"], function (exports_65, context_65) {
    "use strict";
    var enums_14, CodeGenerator;
    var __moduleName = context_65 && context_65.id;
    return {
        setters: [
            function (enums_14_1) {
                enums_14 = enums_14_1;
            }
        ],
        execute: function () {
            CodeGenerator = /** @class */ (function () {
                function CodeGenerator(map) {
                    this.map = map;
                }
                //
                // Override this in concrete generator implementations.
                //
                CodeGenerator.prototype.generate = function () {
                    return "";
                };
                //
                // Replace diacritics in a string with ordinary letters.
                // 
                CodeGenerator.prototype.removeAccents = function (str) {
                    if (typeof str !== "string")
                        return str;
                    var accents = "ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź";
                    var accentsOut = "AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz";
                    return str
                        .split("")
                        .map(function (letter, index) {
                        var accentIndex = accents.indexOf(letter);
                        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
                    })
                        .join("");
                };
                // 
                // Remove any special (non-word) characters from a string.
                // 
                CodeGenerator.prototype.removeSpecialChars = function (str) {
                    if (typeof str !== "string")
                        return str;
                    return str.replace(/[^\w\s]/gi, '');
                };
                //
                // Convert a string to camelCase.
                // "Tree house door" => "treeHouseDoor"
                // 
                CodeGenerator.prototype.camelCase = function (str) {
                    if (typeof str !== "string")
                        return str;
                    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, reg1, reg2) {
                        if (typeof reg2 !== "undefined" && reg2) {
                            return reg2.toUpperCase();
                        }
                        else {
                            return reg1.toLowerCase();
                        }
                    });
                };
                //
                // Capitalize a string:
                // "hello world" => "Hello world"
                // 
                CodeGenerator.prototype.capitalize = function (str) {
                    if (typeof str !== "string")
                        return str;
                    return str.charAt(0).toUpperCase() + str.slice(1);
                };
                //
                // Convert a string to a class name:
                // "hello world" => "HelloWorld"
                // 
                CodeGenerator.prototype.className = function (str) {
                    return new Handlebars.SafeString(this.capitalize(this.camelCase(this.removeSpecialChars(this.removeAccents(str)))));
                };
                CodeGenerator.prototype.dirToStr = function (dir, type) {
                    // Special connections:
                    switch (type) {
                        case enums_14.ConnectorType.Down: return "down";
                        case enums_14.ConnectorType.Up: return "up";
                        case enums_14.ConnectorType.In: return "in";
                        case enums_14.ConnectorType.Out: return "out";
                    }
                    // Compass connections:
                    switch (dir) {
                        case enums_14.Direction.N: return "north";
                        case enums_14.Direction.NNE: return "northnortheast";
                        case enums_14.Direction.NE: return "northeast";
                        case enums_14.Direction.ENE: return "eastnortheast";
                        case enums_14.Direction.E: return "east";
                        case enums_14.Direction.ESE: return "eastsoutheast";
                        case enums_14.Direction.SE: return "southeast";
                        case enums_14.Direction.SSE: return "southsoutheast";
                        case enums_14.Direction.S: return "south";
                        case enums_14.Direction.SSW: return "southsouthwest";
                        case enums_14.Direction.SW: return "southwest";
                        case enums_14.Direction.WSW: return "westsouthwest";
                        case enums_14.Direction.W: return "west";
                        case enums_14.Direction.WNW: return "westnorthwest";
                        case enums_14.Direction.NW: return "northwest";
                        case enums_14.Direction.NNW: return "northnorthwest";
                        default: return "";
                    }
                };
                return CodeGenerator;
            }());
            exports_65("CodeGenerator", CodeGenerator);
        }
    };
});
System.register("codegen/alan2/alan2Generator", ["codegen/CodeGenerator"], function (exports_66, context_66) {
    "use strict";
    var CodeGenerator_1, Alan2Generator;
    var __moduleName = context_66 && context_66.id;
    return {
        setters: [
            function (CodeGenerator_1_1) {
                CodeGenerator_1 = CodeGenerator_1_1;
            }
        ],
        execute: function () {
            Alan2Generator = /** @class */ (function (_super) {
                __extends(Alan2Generator, _super);
                function Alan2Generator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('className', function (name) { return _this.className(name); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('objName', function (name) { return _this.objName(name); });
                    return _this;
                }
                Alan2Generator.prototype.objName = function (name) {
                    var str = "";
                    var words = name.split(' ');
                    words.forEach(function (word) {
                        str = str + "'" + word.trim().replace("'", "''") + "' ";
                    });
                    return str;
                };
                Alan2Generator.prototype.generate = function () {
                    return Handlebars.templates.alan2({ map: this.map });
                };
                return Alan2Generator;
            }(CodeGenerator_1.CodeGenerator));
            exports_66("Alan2Generator", Alan2Generator);
        }
    };
});
System.register("codegen/alan3/alan3Generator", ["codegen/CodeGenerator"], function (exports_67, context_67) {
    "use strict";
    var CodeGenerator_2, Alan3Generator;
    var __moduleName = context_67 && context_67.id;
    return {
        setters: [
            function (CodeGenerator_2_1) {
                CodeGenerator_2 = CodeGenerator_2_1;
            }
        ],
        execute: function () {
            Alan3Generator = /** @class */ (function (_super) {
                __extends(Alan3Generator, _super);
                function Alan3Generator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('className', function (name) { return _this.className(name); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('objName', function (name) { return _this.objName(name); });
                    Handlebars.registerPartial('alan3Object', Handlebars.templates.alan3Object);
                    return _this;
                }
                Alan3Generator.prototype.objName = function (name) {
                    var str = "";
                    var words = name.split(' ');
                    words.forEach(function (word) {
                        str = str + "'" + word.trim().replace("'", "''") + "' ";
                    });
                    return str;
                };
                Alan3Generator.prototype.generate = function () {
                    return Handlebars.templates.alan3({ map: this.map });
                };
                return Alan3Generator;
            }(CodeGenerator_2.CodeGenerator));
            exports_67("Alan3Generator", Alan3Generator);
        }
    };
});
System.register("codegen/inform7/Inform7Generator", ["codegen/CodeGenerator"], function (exports_68, context_68) {
    "use strict";
    var CodeGenerator_3, Inform7Generator;
    var __moduleName = context_68 && context_68.id;
    return {
        setters: [
            function (CodeGenerator_3_1) {
                CodeGenerator_3 = CodeGenerator_3_1;
            }
        ],
        execute: function () {
            Inform7Generator = /** @class */ (function (_super) {
                __extends(Inform7Generator, _super);
                function Inform7Generator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('validName', function (str) { return new Handlebars.SafeString(_this.removeSpecialChars(str)); });
                    Handlebars.registerHelper('capitalize', function (str) { return new Handlebars.SafeString(_this.capitalize(str)); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('isStartRoom', function (room) { return room.isStartRoom(); });
                    Handlebars.registerPartial('inform7Object', Handlebars.templates.inform7Object);
                    return _this;
                }
                Inform7Generator.prototype.generate = function () {
                    return Handlebars.templates.inform7({ map: this.map });
                };
                return Inform7Generator;
            }(CodeGenerator_3.CodeGenerator));
            exports_68("Inform7Generator", Inform7Generator);
        }
    };
});
System.register("codegen/quest/questGenerator", ["codegen/CodeGenerator"], function (exports_69, context_69) {
    "use strict";
    var CodeGenerator_4, QuestGenerator;
    var __moduleName = context_69 && context_69.id;
    return {
        setters: [
            function (CodeGenerator_4_1) {
                CodeGenerator_4 = CodeGenerator_4_1;
            }
        ],
        execute: function () {
            QuestGenerator = /** @class */ (function (_super) {
                __extends(QuestGenerator, _super);
                function QuestGenerator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('isStartRoom', function (room) { return room.isStartRoom(); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerPartial('questObject', Handlebars.templates.questObject);
                    Handlebars.registerHelper('gridWidth', function (width) { return Math.max(1, Math.floor(width / map.settings.room.width)); });
                    Handlebars.registerHelper('gridLength', function (height) { return Math.max(1, Math.floor(height / map.settings.room.height)); });
                    return _this;
                }
                QuestGenerator.prototype.generate = function () {
                    return Handlebars.templates.quest({ map: this.map });
                };
                return QuestGenerator;
            }(CodeGenerator_4.CodeGenerator));
            exports_69("QuestGenerator", QuestGenerator);
        }
    };
});
System.register("codegen/tads/TadsGenerator", ["enums/enums", "codegen/CodeGenerator"], function (exports_70, context_70) {
    "use strict";
    var enums_15, CodeGenerator_5, TadsGenerator;
    var __moduleName = context_70 && context_70.id;
    return {
        setters: [
            function (enums_15_1) {
                enums_15 = enums_15_1;
            },
            function (CodeGenerator_5_1) {
                CodeGenerator_5 = CodeGenerator_5_1;
            }
        ],
        execute: function () {
            TadsGenerator = /** @class */ (function (_super) {
                __extends(TadsGenerator, _super);
                function TadsGenerator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('className', function (name) { return _this.className(name); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('kindToStr', function (kind) { return _this.kindToStr(kind); });
                    Handlebars.registerPartial('tadsObject', Handlebars.templates.tadsObject);
                    Handlebars.registerHelper('buildObject', function (obj) {
                        return _this.buildObject(obj);
                    });
                    return _this;
                }
                TadsGenerator.prototype.kindToStr = function (dir) {
                    switch (dir) {
                        case enums_15.ObjectKind.Actor: return "Actor";
                        case enums_15.ObjectKind.Item: return "Item";
                        case enums_15.ObjectKind.Scenery: return "Decoration";
                        default: return "";
                    }
                };
                TadsGenerator.prototype.buildObject = function (obj, level) {
                    var _this = this;
                    if (!level)
                        level = 1;
                    var str = "";
                    for (var i = 0; i < level; i++)
                        str += "+";
                    str = str + Handlebars.templates.tadsObject({ obj: obj });
                    obj.content.forEach(function (o) {
                        str = str + _this.buildObject(o, level + 1);
                    });
                    return new Handlebars.SafeString(str);
                };
                TadsGenerator.prototype.generate = function () {
                    return Handlebars.templates.tads({ map: this.map });
                };
                return TadsGenerator;
            }(CodeGenerator_5.CodeGenerator));
            exports_70("TadsGenerator", TadsGenerator);
        }
    };
});
System.register("codegen/textadventurejs/TextadventurejsGenerator", ["enums/enums", "codegen/CodeGenerator"], function (exports_71, context_71) {
    "use strict";
    var enums_16, CodeGenerator_6, TextadventurejsGenerator;
    var __moduleName = context_71 && context_71.id;
    return {
        setters: [
            function (enums_16_1) {
                enums_16 = enums_16_1;
            },
            function (CodeGenerator_6_1) {
                CodeGenerator_6 = CodeGenerator_6_1;
            }
        ],
        execute: function () {
            TextadventurejsGenerator = /** @class */ (function (_super) {
                __extends(TextadventurejsGenerator, _super);
                function TextadventurejsGenerator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('capitalizeDirToStr', function (dir, type) { return _this.capitalize(_this.dirToStr(dir, type)); });
                    Handlebars.registerHelper('className', function (name) { return _this.className(name); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('kindToStr', function (kind) { return _this.kindToStr(kind); });
                    Handlebars.registerHelper('buildObject', function (obj) {
                        return _this.buildObject(obj);
                    });
                    return _this;
                }
                TextadventurejsGenerator.prototype.kindToStr = function (dir) {
                    switch (dir) {
                        case enums_16.ObjectKind.Actor: return "Actor";
                        case enums_16.ObjectKind.Item: return "Item";
                        case enums_16.ObjectKind.Scenery: return "Decoration";
                        default: return "";
                    }
                };
                TextadventurejsGenerator.prototype.buildObject = function (obj, level) {
                    var _this = this;
                    if (!level)
                        level = 1;
                    var str = "";
                    for (var i = 0; i < level; i++)
                        str += "+";
                    str = str + Handlebars.templates.tadsObject({ obj: obj });
                    obj.content.forEach(function (o) {
                        str = str + _this.buildObject(o, level + 1);
                    });
                    return new Handlebars.SafeString(str);
                };
                TextadventurejsGenerator.prototype.generate = function () {
                    return Handlebars.templates.textadventurejs({ map: this.map });
                };
                return TextadventurejsGenerator;
            }(CodeGenerator_6.CodeGenerator));
            exports_71("TextadventurejsGenerator", TextadventurejsGenerator);
        }
    };
});
System.register("codegen/yaml/YamlGenerator", ["enums/enums", "codegen/CodeGenerator"], function (exports_72, context_72) {
    "use strict";
    var enums_17, CodeGenerator_7, YamlGenerator;
    var __moduleName = context_72 && context_72.id;
    return {
        setters: [
            function (enums_17_1) {
                enums_17 = enums_17_1;
            },
            function (CodeGenerator_7_1) {
                CodeGenerator_7 = CodeGenerator_7_1;
            }
        ],
        execute: function () {
            YamlGenerator = /** @class */ (function (_super) {
                __extends(YamlGenerator, _super);
                function YamlGenerator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('className', function (name) { return _this.className(name); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('kindToStr', function (kind) { return _this.kindToStr(kind); });
                    Handlebars.registerPartial('DescriptionPartial', Handlebars.templates.yamlDescription);
                    Handlebars.registerPartial('yamlObject', Handlebars.templates.yamlObject);
                    return _this;
                }
                YamlGenerator.prototype.kindToStr = function (dir) {
                    switch (dir) {
                        case enums_17.ObjectKind.Actor: return "actor";
                        case enums_17.ObjectKind.Item: return "item";
                        case enums_17.ObjectKind.Scenery: return "decoration";
                        default: return "";
                    }
                };
                YamlGenerator.prototype.generate = function () {
                    return Handlebars.templates.yaml({ map: this.map });
                };
                return YamlGenerator;
            }(CodeGenerator_7.CodeGenerator));
            exports_72("YamlGenerator", YamlGenerator);
        }
    };
});
System.register("codegen/zil/ZilGenerator", ["enums/enums", "codegen/CodeGenerator"], function (exports_73, context_73) {
    "use strict";
    var enums_18, CodeGenerator_8, ZilGenerator;
    var __moduleName = context_73 && context_73.id;
    return {
        setters: [
            function (enums_18_1) {
                enums_18 = enums_18_1;
            },
            function (CodeGenerator_8_1) {
                CodeGenerator_8 = CodeGenerator_8_1;
            }
        ],
        execute: function () {
            ZilGenerator = /** @class */ (function (_super) {
                __extends(ZilGenerator, _super);
                function ZilGenerator(map) {
                    var _this = _super.call(this, map) || this;
                    Handlebars.registerHelper('zilName', function (str) { return _this.zilName(str); });
                    Handlebars.registerHelper('upperDirToStr', function (dir, type) { return _this.dirToStr(dir, type).toUpperCase(); });
                    Handlebars.registerHelper('dirToStr', function (dir, type) { return _this.dirToStr(dir, type); });
                    Handlebars.registerHelper('isItem', function (kind) { return _this.isItem(kind); });
                    Handlebars.registerPartial('zilObject', Handlebars.templates.zilObject);
                    return _this;
                }
                //
                // Returns the kebab-case form of `str`.
                // kekbabCase("hello world") -> "hello-world"
                // 
                ZilGenerator.prototype.kebabCase = function (str) {
                    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
                };
                //
                // Returns ZIL format of a name.
                // zilName('living room') -> "LIVING-ROOM"
                // 
                ZilGenerator.prototype.zilName = function (str) {
                    return new Handlebars.SafeString(this.kebabCase(this.removeAccents(str)).toUpperCase());
                };
                ZilGenerator.prototype.isItem = function (kind) {
                    return kind == enums_18.ObjectKind.Item;
                };
                ZilGenerator.prototype.generate = function () {
                    return Handlebars.templates.zil({ map: this.map });
                };
                return ZilGenerator;
            }(CodeGenerator_8.CodeGenerator));
            exports_73("ZilGenerator", ZilGenerator);
        }
    };
});
System.register("codegen/CodeGeneration", ["codegen/CodeGenerator", "codegen/alan2/alan2Generator", "codegen/alan3/alan3Generator", "codegen/inform7/Inform7Generator", "codegen/quest/questGenerator", "codegen/tads/TadsGenerator", "codegen/textadventurejs/TextadventurejsGenerator", "codegen/yaml/YamlGenerator", "codegen/zil/ZilGenerator"], function (exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_74(exports);
    }
    return {
        setters: [
            function (CodeGenerator_9_1) {
                exportStar_4(CodeGenerator_9_1);
            },
            function (alan2Generator_1_1) {
                exportStar_4(alan2Generator_1_1);
            },
            function (alan3Generator_1_1) {
                exportStar_4(alan3Generator_1_1);
            },
            function (Inform7Generator_1_1) {
                exportStar_4(Inform7Generator_1_1);
            },
            function (questGenerator_1_1) {
                exportStar_4(questGenerator_1_1);
            },
            function (TadsGenerator_1_1) {
                exportStar_4(TadsGenerator_1_1);
            },
            function (TextadventurejsGenerator_1_1) {
                exportStar_4(TextadventurejsGenerator_1_1);
            },
            function (YamlGenerator_1_1) {
                exportStar_4(YamlGenerator_1_1);
            },
            function (ZilGenerator_1_1) {
                exportStar_4(ZilGenerator_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("panels/menuPanel/menuPanel", ["app", "controls/window", "io/mapXML", "dispatcher", "enums/enums", "io/mapJSON", "panels/panels", "models/map", "exporter", "codegen/CodeGeneration", "controls/controls"], function (exports_75, context_75) {
    "use strict";
    var app_2, window_2, mapXML_1, dispatcher_8, enums_19, mapJSON_1, panels_1, map_1, exporter_1, CodeGeneration_1, controls_4, MenuPanel;
    var __moduleName = context_75 && context_75.id;
    return {
        setters: [
            function (app_2_1) {
                app_2 = app_2_1;
            },
            function (window_2_1) {
                window_2 = window_2_1;
            },
            function (mapXML_1_1) {
                mapXML_1 = mapXML_1_1;
            },
            function (dispatcher_8_1) {
                dispatcher_8 = dispatcher_8_1;
            },
            function (enums_19_1) {
                enums_19 = enums_19_1;
            },
            function (mapJSON_1_1) {
                mapJSON_1 = mapJSON_1_1;
            },
            function (panels_1_1) {
                panels_1 = panels_1_1;
            },
            function (map_1_1) {
                map_1 = map_1_1;
            },
            function (exporter_1_1) {
                exporter_1 = exporter_1_1;
            },
            function (CodeGeneration_1_1) {
                CodeGeneration_1 = CodeGeneration_1_1;
            },
            function (controls_4_1) {
                controls_4 = controls_4_1;
            }
        ],
        execute: function () {
            MenuPanel = /** @class */ (function (_super) {
                __extends(MenuPanel, _super);
                function MenuPanel() {
                    var _this = _super.call(this, 'menupanel', Handlebars.templates.menuPanel, {}) || this;
                    _this.handleInputLoad = function () {
                        _this.load(_this.inputLoad.files, _this.loadMap);
                        _this.inputLoad.value = null;
                    };
                    _this.handleInputImport = function () {
                        _this.load(_this.inputImport.files, _this.importMap);
                        _this.inputImport.value = null;
                    };
                    var btnMenu = document.querySelector('#menu');
                    btnMenu.addEventListener('click', function () {
                        _this.toggle();
                    });
                    _this.inputLoad = document.getElementById('inputLoad');
                    _this.inputImport = document.getElementById('inputImport');
                    _this.createMenuGroup('#group-file');
                    _this.createMenuItem('#menu-new', function () { _this.actionNewMap(); });
                    _this.createMenuItem('#menu-load', function () { _this.actionLoadMap(); });
                    _this.createMenuItem('#menu-save', function () { _this.actionSaveMap(); });
                    _this.createMenuItem('#menu-import', function () { _this.actionImportMap(); });
                    _this.createMenuItem('#menu-image', function () { _this.actionExport(); });
                    _this.createMenuGroup('#group-settings');
                    _this.createMenuItem('#menu-map', function () { _this.actionMapSettings(); });
                    _this.createMenuItem('#menu-render', function () { _this.actionRenderSettings(); });
                    _this.createMenuGroup('#group-export');
                    _this.createMenuItem('#menu-export-tads', function () { _this.actionGenerateCode(new CodeGeneration_1.TadsGenerator(app_2.App.map), 't3'); });
                    _this.createMenuItem('#menu-export-inform7', function () { _this.actionGenerateCode(new CodeGeneration_1.Inform7Generator(app_2.App.map), 'ni'); });
                    _this.createMenuItem('#menu-export-alan2', function () { _this.actionGenerateCode(new CodeGeneration_1.Alan2Generator(app_2.App.map), 'a2c'); });
                    _this.createMenuItem('#menu-export-alan3', function () { _this.actionGenerateCode(new CodeGeneration_1.Alan3Generator(app_2.App.map), 'a3c'); });
                    _this.createMenuItem('#menu-export-quest', function () { _this.actionGenerateCode(new CodeGeneration_1.QuestGenerator(app_2.App.map), 'aslx'); });
                    _this.createMenuItem('#menu-export-textadventurejs', function () { _this.actionGenerateCode(new CodeGeneration_1.TextadventurejsGenerator(app_2.App.map), 'js'); });
                    _this.createMenuItem('#menu-export-yaml', function () { _this.actionGenerateCode(new CodeGeneration_1.YamlGenerator(app_2.App.map), 'yaml'); });
                    _this.createMenuItem('#menu-export-zil', function () { _this.actionGenerateCode(new CodeGeneration_1.ZilGenerator(app_2.App.map), 'zil'); });
                    _this.createMenuGroup('#group-help');
                    _this.createMenuItem('#menu-help', function () { _this.actionHelp(); });
                    _this.inputLoad.addEventListener('change', _this.handleInputLoad);
                    _this.inputImport.addEventListener('change', _this.handleInputImport);
                    return _this;
                }
                MenuPanel.prototype.createMenuItem = function (selector, f) {
                    var elem = document.querySelector(selector);
                    if (f)
                        elem.addEventListener('click', f);
                    elem.addEventListener('click', function () { elem.classList.toggle('open'); });
                };
                MenuPanel.prototype.createMenuGroup = function (selector) {
                    var _this = this;
                    var elem = document.querySelector(selector);
                    elem.addEventListener('click', function (e) {
                        // Hide all group nodes:
                        var nodes = _this.elem.querySelectorAll(".menugroup > div");
                        for (var i = 0; i < nodes.length; i++) {
                            nodes[i].style.display = 'none';
                        }
                        // Show node for clicked group:
                        var node = elem.parentElement.querySelector("div");
                        node.style.display = 'block';
                    });
                };
                MenuPanel.prototype.actionExport = function () {
                    var exporter = new exporter_1.Exporter(app_2.App.map);
                    exporter.export();
                };
                MenuPanel.prototype.actionNewMap = function () {
                    new window_2.Window('New map', 'This will erase all editor contents. Proceed?', function () {
                        // OK
                        app_2.App.map = new map_1.Map();
                        dispatcher_8.Dispatcher.notify(enums_19.AppEvent.Load, null);
                    }, function () {
                        // Cancel
                    });
                };
                MenuPanel.prototype.actionLoadMap = function () {
                    this.inputLoad.click();
                };
                MenuPanel.prototype.actionSaveMap = function () {
                    var json = mapJSON_1.MapJSON.save(app_2.App.map);
                    var blob = new Blob([json], { type: "text/plain; charset:utf-8" });
                    var title = app_2.App.map.title;
                    if (!title)
                        title = "untitled";
                    window.saveAs(blob, title + ".json");
                };
                MenuPanel.prototype.actionImportMap = function () {
                    this.inputImport.click();
                };
                MenuPanel.prototype.load = function (files, callback) {
                    // Are there no files? Then abort.
                    if (files.length == 0)
                        return;
                    // Work only on the first file.
                    var file = files[0];
                    var reader = new FileReader();
                    reader.addEventListener('load', function () {
                        callback(reader.result);
                    });
                    reader.readAsText(file);
                };
                MenuPanel.prototype.loadMap = function (text) {
                    var map = null;
                    try {
                        map = mapJSON_1.MapJSON.load(text);
                    }
                    catch (error) {
                        console.error(error);
                        new window_2.Window('Map loading error', 'Unfortunately, an error occurred and map loading could not proceed. Perhaps the map file is in the wrong format?', true, false);
                        return;
                    }
                    app_2.App.map = map;
                    // Broadcast that we've loaded a new map:
                    dispatcher_8.Dispatcher.notify(enums_19.AppEvent.Load, null);
                };
                MenuPanel.prototype.importMap = function (text) {
                    var map = null;
                    try {
                        map = mapXML_1.MapXMLLoader.load(text);
                    }
                    catch (_a) {
                        new window_2.Window('Map import error', 'Unfortunately, an error occurred and map import could not proceed. Perhaps the map file is in the wrong format?', true, false);
                        return;
                    }
                    app_2.App.map = map;
                    // Broadcast that we've loaded a new map:
                    dispatcher_8.Dispatcher.notify(enums_19.AppEvent.Load, null);
                };
                MenuPanel.prototype.actionMapSettings = function () {
                    dispatcher_8.Dispatcher.notify(enums_19.AppEvent.More, app_2.App.map);
                };
                MenuPanel.prototype.actionRenderSettings = function () {
                    dispatcher_8.Dispatcher.notify(enums_19.AppEvent.More, app_2.App.map.settings);
                };
                MenuPanel.prototype.actionHelp = function () {
                    controls_4.IdToast.toast("Keyboard help", "\n    <table>\n      <tbody>\n        <tr>\n          <th>\n            <h4>Selection</h4>\n            <table>\n              <tbody>\n                <tr>\n                  <td><kbd>Ctrl</kbd><kbd>A</kbd></td>\n                  <td>Select all</td>\n                </tr>\n                <tr>\n                  <td><kbd>Esc</kbd></td>\n                  <td>Unselect all</td>\n                </tr>        \n                <tr>\n                  <td><kbd>Ctrl</kbd><kbd>C</kbd></td>\n                  <td>Copy selection</td>\n                </tr>        \n                <tr>\n                  <td><kbd>Ctrl</kbd><kbd>V</kbd></td>\n                  <td>Paste selection</td>\n                </tr>        \n                <tr>\n                  <td><kbd>Del</kbd></td>\n                  <td>Delete current selection</td>\n                </tr>\n                <tr>\n                  <td><kbd>Ctrl</kbd><kbd>Z</kbd></td>\n                  <td>Undo</td>\n                </tr>\n                <tr>\n                  <td><kbd>Enter</kbd> or <kbd>F2</kbd></td>\n                  <td>Open detail panel</td>\n                </tr>\n              </tbody>\n            </table>   \n          </th>\n          <th>\n            <h4>Navigation</h4>\n            <table>\n              <tbody>\n                <tr>\n                  <td><svg><use xlink:href=\"dist/icons.svg#arrows\"></use></svg></td>\n                  <td>Pan map</td>\n                </tr>\n                <tr>\n                  <td><kbd>+</kbd></td>\n                  <td>Zoom in</td>\n                </tr>        \n                <tr>\n                  <td><kbd>-</kbd></td>\n                  <td>Zoom out</td>\n                </tr>        \n                <tr>\n                  <td><kbd>0</kbd></td>\n                  <td>Zoom 100%</td>\n                </tr>        \n                <tr>\n                  <td><kbd>Ins</kbd></td>\n                  <td>Center map</td>\n                </tr>\n                <tr>\n                  <td><kbd>Shift</kbd><kbd>Enter</kbd></td>\n                  <td>Center map</td>\n                </tr>\n              </tbody>\n            </table>   \n          </th>\n          <th>\n            <h4>Construction</h4>\n            <table>\n              <tbody>\n                <tr>\n                  <td><kbd>Shift</kbd> <svg><use xlink:href=\"dist/icons.svg#arrows\"></use></svg></td>\n                  <td>Create room in dir</td>\n                </tr>\n                <tr>\n                  <td><kbd>R</kbd></td>\n                  <td>Add room</td>\n                </tr>        \n                <tr>\n                  <td><kbd>N</kbd></td>\n                  <td>Add note</td>\n                </tr>        \n                <tr>\n                  <td><kbd>B</kbd></td>\n                  <td>Add block</td>\n                </tr>        \n                <tr>\n                  <td><kbd>A</kbd></td>\n                  <td>Toggle one-way</td>\n                </tr>\n                <tr>\n                  <td><kbd>V</kbd></td>\n                  <td>Reverse connector</td>\n                </tr>\n                <tr>\n                  <td><kbd>K</kbd></td>\n                  <td>Toggle darkness</td>\n                </tr>\n              </tbody>\n            </table>   \n          </th>          \n        </tr>\n      </tbody>\n    </table>\n \n \n    ", true);
                };
                MenuPanel.prototype.actionGenerateCode = function (generator, extension) {
                    var code = generator.generate();
                    var blob = new Blob([code], { type: "text/plain; charset:utf-8" });
                    var title = app_2.App.map.title;
                    if (!title)
                        title = "untitled";
                    window.saveAs(blob, title + "." + extension);
                };
                return MenuPanel;
            }(panels_1.Panel));
            exports_75("MenuPanel", MenuPanel);
        }
    };
});
System.register("panels/notePanel/notePanel", ["dispatcher", "enums/appEvent", "models/note", "panels/panels", "controls/controls"], function (exports_76, context_76) {
    "use strict";
    var dispatcher_js_5, appEvent_js_6, note_js_3, panels_js_4, controls_js_4, NotePanel;
    var __moduleName = context_76 && context_76.id;
    return {
        setters: [
            function (dispatcher_js_5_1) {
                dispatcher_js_5 = dispatcher_js_5_1;
            },
            function (appEvent_js_6_1) {
                appEvent_js_6 = appEvent_js_6_1;
            },
            function (note_js_3_1) {
                note_js_3 = note_js_3_1;
            },
            function (panels_js_4_1) {
                panels_js_4 = panels_js_4_1;
            },
            function (controls_js_4_1) {
                controls_js_4 = controls_js_4_1;
            }
        ],
        execute: function () {
            NotePanel = /** @class */ (function (_super) {
                __extends(NotePanel, _super);
                function NotePanel() {
                    var _this = _super.call(this, 'notepanel', Handlebars.templates.notePanel, {}) || this;
                    dispatcher_js_5.Dispatcher.subscribe(_this);
                    _this.ctrlText = new controls_js_4.IdTextarea('.js-text', _this.elem).addEventListener('input', function () { _this.note.text = _this.ctrlText.value; });
                    _this.colorPicker = new controls_js_4.IdColorPicker('.js-color', _this.elem).addEventListener('change', function () { _this.setNoteColor(_this.colorPicker.color); });
                    _this.ctrlLineStyle = new controls_js_4.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.note.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLineWidth = new controls_js_4.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.note.lineWidth = _this.ctrlLineWidth.value; });
                    _this.ctrlShape = new controls_js_4.IdShape('.js-shape', _this.elem).addEventListener('change', function () { _this.note.shape = _this.ctrlShape.value; });
                    _this.ctrlRounding = new controls_js_4.IdRange('.js-rounding', _this.elem).addEventListener('input', function () { _this.note.rounding = _this.ctrlRounding.value; });
                    // Find color buttons:
                    var buttons = _this.elem.querySelectorAll(".colortype");
                    _this.colorButtons = new Array();
                    var _loop_5 = function (i) {
                        var popup = new controls_js_4.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_3.colorType = popup.type;
                        this_3.colorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onColorButton(popup); });
                    };
                    var this_3 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_5(i);
                    }
                    return _this;
                }
                NotePanel.prototype.notify = function (event, obj) {
                    /* if(event == AppEvent.Select) {
                      this.close();
                    } */
                    var _this = this;
                    if (event == appEvent_js_6.AppEvent.More) {
                        if (obj instanceof note_js_3.Note) {
                            var note = obj;
                            this.note = note;
                            this.open();
                            // Show note data.
                            this.ctrlText.value = note.text;
                            this.ctrlShape.value = note.shape;
                            this.ctrlLineStyle.value = note.lineStyle;
                            this.ctrlLineWidth.value = note.lineWidth;
                            this.ctrlRounding.value = note.rounding;
                            // Set color from currently selected color button:
                            this.setColor();
                            setTimeout(function () {
                                _this.ctrlText.focus().select();
                            }, 100);
                        }
                        else {
                            this.close();
                        }
                    }
                };
                NotePanel.prototype.onColorButton = function (button) {
                    // Unselect all buttons.
                    this.colorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.colorType = button.type;
                    // Set colorPicker to color.
                    this.setColor();
                };
                NotePanel.prototype.setColor = function () {
                    if (this.colorType == 'fill')
                        this.colorPicker.color = this.note.fillColor;
                    if (this.colorType == 'border')
                        this.colorPicker.color = this.note.borderColor;
                    if (this.colorType == 'text')
                        this.colorPicker.color = this.note.textColor;
                    dispatcher_js_5.Dispatcher.notify(appEvent_js_6.AppEvent.Refresh, null);
                };
                NotePanel.prototype.setNoteColor = function (color) {
                    if (this.colorType == 'fill')
                        this.note.fillColor = color;
                    if (this.colorType == 'border')
                        this.note.borderColor = color;
                    if (this.colorType == 'text')
                        this.note.textColor = color;
                    dispatcher_js_5.Dispatcher.notify(appEvent_js_6.AppEvent.Refresh, null);
                };
                return NotePanel;
            }(panels_js_4.Panel));
            exports_76("NotePanel", NotePanel);
        }
    };
});
System.register("themes/obsidianTheme", ["enums/enums", "models/mapSettings"], function (exports_77, context_77) {
    "use strict";
    var enums_20, mapSettings_1, ObsidianTheme;
    var __moduleName = context_77 && context_77.id;
    return {
        setters: [
            function (enums_20_1) {
                enums_20 = enums_20_1;
            },
            function (mapSettings_1_1) {
                mapSettings_1 = mapSettings_1_1;
            }
        ],
        execute: function () {
            ObsidianTheme = /** @class */ (function (_super) {
                __extends(ObsidianTheme, _super);
                function ObsidianTheme() {
                    var _this = _super.call(this) || this;
                    _this.grid.background = '#000';
                    _this.grid.color = '#333';
                    _this.room.fillColor = '#333';
                    _this.room.borderColor = '#fff';
                    _this.room.nameColor = '#fff';
                    _this.room.subtitleColor = '#fff';
                    _this.room.rounding = 4;
                    _this.room.shape = enums_20.RoomShape.Rectangle;
                    _this.room.lineWidth = 2;
                    _this.connector.color = '#fff';
                    _this.note.fillColor = '#333';
                    _this.note.borderColor = '#fff';
                    _this.note.textColor = '#fff';
                    _this.note.rounding = 4;
                    _this.note.shape = enums_20.RoomShape.Rectangle;
                    _this.note.lineWidth = 2;
                    _this.block.fillColor = '#333';
                    _this.block.borderColor = '#fff';
                    _this.block.shape = enums_20.RoomShape.Rectangle;
                    _this.block.rounding = 4;
                    _this.block.lineStyle = enums_20.LineStyle.Dash;
                    _this.block.lineWidth = 2;
                    return _this;
                }
                return ObsidianTheme;
            }(mapSettings_1.MapSettings));
            exports_77("ObsidianTheme", ObsidianTheme);
        }
    };
});
System.register("themes/themes", ["themes/obsidianTheme"], function (exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    function exportStar_5(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_78(exports);
    }
    return {
        setters: [
            function (obsidianTheme_js_1_1) {
                exportStar_5(obsidianTheme_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("themes/handDrawnTheme", ["enums/enums", "models/mapSettings"], function (exports_79, context_79) {
    "use strict";
    var enums_21, mapSettings_2, HandDrawnTheme;
    var __moduleName = context_79 && context_79.id;
    return {
        setters: [
            function (enums_21_1) {
                enums_21 = enums_21_1;
            },
            function (mapSettings_2_1) {
                mapSettings_2 = mapSettings_2_1;
            }
        ],
        execute: function () {
            HandDrawnTheme = /** @class */ (function (_super) {
                __extends(HandDrawnTheme, _super);
                function HandDrawnTheme() {
                    var _this = _super.call(this) || this;
                    _this.grid.background = '#ffffff';
                    _this.grid.color = '#f0f0f0';
                    _this.room.fillColor = '#ffffff';
                    _this.room.borderColor = '#000000';
                    _this.room.nameColor = '#333333';
                    _this.room.subtitleColor = '#666666';
                    _this.room.rounding = 0;
                    _this.room.shape = enums_21.RoomShape.Rectangle;
                    _this.room.lineWidth = 2;
                    _this.connector.color = '#000000';
                    _this.note.fillColor = '#ffffff';
                    _this.note.borderColor = '#000000';
                    _this.note.textColor = '#333333';
                    _this.note.rounding = 0;
                    _this.note.shape = enums_21.RoomShape.Rectangle;
                    _this.note.lineWidth = 1;
                    _this.block.fillColor = '#D5E5D6';
                    _this.block.borderColor = '#000000';
                    _this.block.shape = enums_21.RoomShape.Rectangle;
                    _this.block.rounding = 0;
                    _this.block.lineStyle = enums_21.LineStyle.Dash;
                    _this.block.lineWidth = 1;
                    _this.draw.hand = true;
                    return _this;
                }
                return HandDrawnTheme;
            }(mapSettings_2.MapSettings));
            exports_79("HandDrawnTheme", HandDrawnTheme);
        }
    };
});
System.register("panels/renderPanel/renderPanel", ["dispatcher", "enums/appEvent", "app", "panels/panels", "controls/controls", "models/mapSettings", "controls/window", "themes/themes", "themes/handDrawnTheme"], function (exports_80, context_80) {
    "use strict";
    var dispatcher_js_6, appEvent_js_7, app_js_8, panels_js_5, controls_js_5, mapSettings_js_7, window_js_1, themes_js_1, handDrawnTheme_js_1, RenderPanel;
    var __moduleName = context_80 && context_80.id;
    return {
        setters: [
            function (dispatcher_js_6_1) {
                dispatcher_js_6 = dispatcher_js_6_1;
            },
            function (appEvent_js_7_1) {
                appEvent_js_7 = appEvent_js_7_1;
            },
            function (app_js_8_1) {
                app_js_8 = app_js_8_1;
            },
            function (panels_js_5_1) {
                panels_js_5 = panels_js_5_1;
            },
            function (controls_js_5_1) {
                controls_js_5 = controls_js_5_1;
            },
            function (mapSettings_js_7_1) {
                mapSettings_js_7 = mapSettings_js_7_1;
            },
            function (window_js_1_1) {
                window_js_1 = window_js_1_1;
            },
            function (themes_js_1_1) {
                themes_js_1 = themes_js_1_1;
            },
            function (handDrawnTheme_js_1_1) {
                handDrawnTheme_js_1 = handDrawnTheme_js_1_1;
            }
        ],
        execute: function () {
            RenderPanel = /** @class */ (function (_super) {
                __extends(RenderPanel, _super);
                function RenderPanel() {
                    var _this = _super.call(this, 'renderpanel', Handlebars.templates.renderPanel, {}) || this;
                    dispatcher_js_6.Dispatcher.subscribe(_this);
                    _this.ctrlGridVisible = new controls_js_5.IdCheck('.js-grid-visible', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.grid.visible = _this.ctrlGridVisible.checked; });
                    _this.ctrlGridOrigin = new controls_js_5.IdCheck('.js-grid-origin', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.grid.origin = _this.ctrlGridOrigin.checked; });
                    _this.ctrlGridSnap = new controls_js_5.IdCheck('.js-grid-snap', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.grid.snap = _this.ctrlGridSnap.checked; });
                    _this.ctrlGridSize = new controls_js_5.IdRange('.js-grid-size', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.grid.size = _this.ctrlGridSize.value; });
                    _this.mapColorPicker = new controls_js_5.IdColorPicker('.js-map-color', _this.elem).addEventListener('change', function () { _this.setMapColor(_this.mapColorPicker.color); });
                    // Find map color buttons:
                    var buttons = _this.elem.querySelectorAll('.map-colortype');
                    _this.mapColorButtons = new Array();
                    var _loop_6 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_4.mapColorType = popup.type;
                        this_4.mapColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onMapColorButton(popup); });
                    };
                    var this_4 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_6(i);
                    }
                    _this.elem.querySelector('.js-theme-default').addEventListener('click', function () { _this.applyTheme('default'); });
                    _this.elem.querySelector('.js-theme-obsidian').addEventListener('click', function () { _this.applyTheme('obsidian'); });
                    _this.elem.querySelector('.js-theme-hand-drawn').addEventListener('click', function () { _this.applyTheme('hand-drawn'); });
                    _this.ctrlRoomWidth = new controls_js_5.IdRange('.js-room-width', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.room.width = _this.ctrlRoomWidth.value; });
                    _this.ctrlRoomHeight = new controls_js_5.IdRange('.js-room-height', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.room.height = _this.ctrlRoomHeight.value; });
                    _this.ctrlRoomLinewidth = new controls_js_5.IdRange('.js-room-linewidth', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.room.lineWidth = _this.ctrlRoomLinewidth.value; });
                    _this.ctrlRoomRounding = new controls_js_5.IdRange('.js-room-rounding', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.room.rounding = _this.ctrlRoomRounding.value; });
                    _this.ctrlRoomDarknessSize = new controls_js_5.IdRange('.js-room-darkness-size', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.room.darknessSize = _this.ctrlRoomDarknessSize.value; });
                    _this.ctrlRoomShape = new controls_js_5.IdShape('.js-room-shape', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.room.shape = _this.ctrlRoomShape.value; });
                    _this.ctrlRoomLine = new controls_js_5.IdLineStyle('.js-room-line', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.room.lineStyle = _this.ctrlRoomLine.value; });
                    _this.roomColorPicker = new controls_js_5.IdColorPicker('.js-room-color', _this.elem).addEventListener('change', function () { _this.setRoomColor(_this.roomColorPicker.color); });
                    // Find room color buttons:
                    var buttons = _this.elem.querySelectorAll('.room-colortype');
                    _this.roomColorButtons = new Array();
                    var _loop_7 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_5.roomColorType = popup.type;
                        this_5.roomColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onRoomColorButton(popup); });
                    };
                    var this_5 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_7(i);
                    }
                    _this.ctrlConnectorLinewidth = new controls_js_5.IdRange('.js-connector-linewidth', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.connector.lineWidth = _this.ctrlConnectorLinewidth.value; });
                    _this.ctrlConnectorStalk = new controls_js_5.IdRange('.js-connector-stalk', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.connector.stalk = _this.ctrlConnectorStalk.value; });
                    _this.ctrlConnectorLabelDistance = new controls_js_5.IdRange('.js-connector-label-distance', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.connector.labelDistance = _this.ctrlConnectorLabelDistance.value; });
                    _this.ctrlConnectorArrowSize = new controls_js_5.IdRange('.js-connector-arrow-size', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.connector.arrowSize = _this.ctrlConnectorArrowSize.value; });
                    _this.ctrlConnectorCurve = new controls_js_5.IdCheck('.js-connector-curve', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.connector.isCurve = _this.ctrlConnectorCurve.checked; });
                    _this.ctrlConnectorCurveStrength = new controls_js_5.IdRange('.js-connector-curve-strength', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.connector.curveStrength = _this.ctrlConnectorCurveStrength.value / 10; });
                    _this.ctrlConnectorLine = new controls_js_5.IdLineStyle('.js-connector-line', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.connector.lineStyle = _this.ctrlConnectorLine.value; });
                    _this.connectorColorPicker = new controls_js_5.IdColorPicker('.js-connector-color', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.connector.color = _this.connectorColorPicker.color; });
                    _this.ctrlNoteWidth = new controls_js_5.IdRange('.js-note-width', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.note.width = _this.ctrlNoteWidth.value; });
                    _this.ctrlNoteHeight = new controls_js_5.IdRange('.js-note-height', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.note.height = _this.ctrlNoteHeight.value; });
                    _this.ctrlNoteLinewidth = new controls_js_5.IdRange('.js-note-linewidth', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.note.lineWidth = _this.ctrlNoteLinewidth.value; });
                    _this.ctrlNoteRounding = new controls_js_5.IdRange('.js-note-rounding', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.note.rounding = _this.ctrlNoteRounding.value; });
                    _this.ctrlNoteShape = new controls_js_5.IdShape('.js-note-shape', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.note.shape = _this.ctrlNoteShape.value; });
                    _this.ctrlNoteLine = new controls_js_5.IdLineStyle('.js-note-line', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.note.lineStyle = _this.ctrlNoteLine.value; });
                    _this.noteColorPicker = new controls_js_5.IdColorPicker('.js-note-color', _this.elem).addEventListener('change', function () { _this.setNoteColor(_this.noteColorPicker.color); });
                    // Find note color buttons:
                    var buttons = _this.elem.querySelectorAll(".note-colortype");
                    _this.noteColorButtons = new Array();
                    var _loop_8 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_6.noteColorType = popup.type;
                        this_6.noteColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onNoteColorButton(popup); });
                    };
                    var this_6 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_8(i);
                    }
                    _this.ctrlBlockWidth = new controls_js_5.IdRange('.js-block-width', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.block.width = _this.ctrlBlockWidth.value; });
                    _this.ctrlBlockHeight = new controls_js_5.IdRange('.js-block-height', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.block.height = _this.ctrlBlockHeight.value; });
                    _this.ctrlBlockLinewidth = new controls_js_5.IdRange('.js-block-linewidth', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.block.lineWidth = _this.ctrlBlockLinewidth.value; });
                    _this.ctrlBlockRounding = new controls_js_5.IdRange('.js-block-rounding', _this.elem).addEventListener('input', function () { app_js_8.App.map.settings.block.rounding = _this.ctrlBlockRounding.value; });
                    _this.ctrlBlockShape = new controls_js_5.IdShape('.js-block-shape', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.block.shape = _this.ctrlBlockShape.value; });
                    _this.ctrlBlockLine = new controls_js_5.IdLineStyle('.js-block-line', _this.elem).addEventListener('change', function () { app_js_8.App.map.settings.block.lineStyle = _this.ctrlBlockLine.value; });
                    _this.blockColorPicker = new controls_js_5.IdColorPicker('.js-block-color', _this.elem).addEventListener('change', function () { _this.setBlockColor(_this.blockColorPicker.color); });
                    // Find block color buttons:
                    var buttons = _this.elem.querySelectorAll('.block-colortype');
                    _this.blockColorButtons = new Array();
                    var _loop_9 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_7.blockColorType = popup.type;
                        this_7.blockColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onBlockColorButton(popup); });
                    };
                    var this_7 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_9(i);
                    }
                    return _this;
                }
                RenderPanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_7.AppEvent.More) {
                        if (obj instanceof mapSettings_js_7.MapSettings) {
                            this.open();
                            this.settings = obj;
                            // Place settings data in controls:
                            this.ctrlGridVisible.checked = app_js_8.App.map.settings.grid.visible;
                            this.ctrlGridOrigin.checked = app_js_8.App.map.settings.grid.origin;
                            this.ctrlGridSnap.checked = app_js_8.App.map.settings.grid.snap;
                            this.ctrlGridSize.value = app_js_8.App.map.settings.grid.size;
                            this.ctrlRoomWidth.value = app_js_8.App.map.settings.room.width;
                            this.ctrlRoomHeight.value = app_js_8.App.map.settings.room.height;
                            this.ctrlRoomLinewidth.value = app_js_8.App.map.settings.room.lineWidth;
                            this.ctrlRoomRounding.value = app_js_8.App.map.settings.room.rounding;
                            this.ctrlRoomDarknessSize.value = app_js_8.App.map.settings.room.darknessSize;
                            this.setRoomPickerColor();
                            this.ctrlConnectorLinewidth.value = app_js_8.App.map.settings.connector.lineWidth;
                            this.ctrlConnectorStalk.value = app_js_8.App.map.settings.connector.stalk;
                            this.ctrlConnectorLabelDistance.value = app_js_8.App.map.settings.connector.labelDistance;
                            this.ctrlConnectorArrowSize.value = app_js_8.App.map.settings.connector.arrowSize;
                            this.ctrlConnectorCurve.checked = app_js_8.App.map.settings.connector.isCurve;
                            this.ctrlConnectorCurveStrength.value = Math.floor(app_js_8.App.map.settings.connector.curveStrength * 10);
                            this.connectorColorPicker.color = app_js_8.App.map.settings.connector.color;
                            this.ctrlNoteWidth.value = app_js_8.App.map.settings.note.width;
                            this.ctrlNoteHeight.value = app_js_8.App.map.settings.note.height;
                            this.ctrlNoteLinewidth.value = app_js_8.App.map.settings.note.lineWidth;
                            this.ctrlNoteRounding.value = app_js_8.App.map.settings.note.rounding;
                            this.setNotePickerColor();
                            this.ctrlBlockWidth.value = app_js_8.App.map.settings.block.width;
                            this.ctrlBlockHeight.value = app_js_8.App.map.settings.block.height;
                            this.ctrlBlockLinewidth.value = app_js_8.App.map.settings.block.lineWidth;
                            this.ctrlBlockRounding.value = app_js_8.App.map.settings.block.rounding;
                            this.setBlockPickerColor();
                        }
                        else {
                            this.close();
                        }
                    }
                };
                RenderPanel.prototype.applyTheme = function (theme) {
                    new window_js_1.Window('Apply theme', 'Applying a new theme will overwrite all render settings. Proceed?', function () {
                        // OK
                        switch (theme) {
                            case 'obsidian':
                                app_js_8.App.map.settings = new mapSettings_js_7.MapSettings().cloneFrom(new themes_js_1.ObsidianTheme());
                                break;
                            case 'hand-drawn':
                                app_js_8.App.map.settings = new mapSettings_js_7.MapSettings().cloneFrom(new handDrawnTheme_js_1.HandDrawnTheme());
                                break;
                            default:
                                app_js_8.App.map.settings = new mapSettings_js_7.MapSettings();
                                break;
                        }
                        dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                    }, function () {
                        // Cancel
                    });
                };
                RenderPanel.prototype.onMapColorButton = function (button) {
                    // Unselect all buttons.
                    this.mapColorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.mapColorType = button.type;
                    // Set colorPicker to color.
                    this.setMapPickerColor();
                };
                RenderPanel.prototype.setMapPickerColor = function () {
                    if (this.mapColorType == 'background')
                        this.mapColorPicker.color = app_js_8.App.map.settings.grid.background;
                    if (this.mapColorType == 'grid')
                        this.mapColorPicker.color = app_js_8.App.map.settings.grid.color;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                RenderPanel.prototype.setMapColor = function (color) {
                    if (this.mapColorType == 'background')
                        app_js_8.App.map.settings.grid.background = color;
                    if (this.mapColorType == 'grid')
                        app_js_8.App.map.settings.grid.color = color;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                RenderPanel.prototype.onRoomColorButton = function (button) {
                    // Unselect all buttons.
                    this.roomColorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.roomColorType = button.type;
                    // Set colorPicker to color.
                    this.setRoomPickerColor();
                };
                RenderPanel.prototype.setRoomPickerColor = function () {
                    if (this.roomColorType == 'fill')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.fillColor;
                    if (this.roomColorType == 'border')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.borderColor;
                    if (this.roomColorType == 'name')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.nameColor;
                    if (this.roomColorType == 'subtitle')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.subtitleColor;
                    if (this.roomColorType == 'dark')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.darkColor;
                    if (this.roomColorType == 'start')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.startRoomColor;
                    if (this.roomColorType == 'end')
                        this.roomColorPicker.color = app_js_8.App.map.settings.room.endRoomColor;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                RenderPanel.prototype.setRoomColor = function (color) {
                    if (this.roomColorType == 'fill')
                        app_js_8.App.map.settings.room.fillColor = color;
                    if (this.roomColorType == 'border')
                        app_js_8.App.map.settings.room.borderColor = color;
                    if (this.roomColorType == 'name')
                        app_js_8.App.map.settings.room.nameColor = color;
                    if (this.roomColorType == 'subtitle')
                        app_js_8.App.map.settings.room.subtitleColor = color;
                    if (this.roomColorType == 'dark')
                        app_js_8.App.map.settings.room.darkColor = color;
                    if (this.roomColorType == 'start')
                        app_js_8.App.map.settings.room.startRoomColor = color;
                    if (this.roomColorType == 'end')
                        app_js_8.App.map.settings.room.endRoomColor = color;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                RenderPanel.prototype.onNoteColorButton = function (button) {
                    // Unselect all buttons.
                    this.noteColorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.noteColorType = button.type;
                    // Set colorPicker to color.
                    this.setNotePickerColor();
                };
                RenderPanel.prototype.setNotePickerColor = function () {
                    if (this.noteColorType == 'fill')
                        this.noteColorPicker.color = app_js_8.App.map.settings.note.fillColor;
                    if (this.noteColorType == 'border')
                        this.noteColorPicker.color = app_js_8.App.map.settings.note.borderColor;
                    if (this.noteColorType == 'text')
                        this.noteColorPicker.color = app_js_8.App.map.settings.note.textColor;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                RenderPanel.prototype.setNoteColor = function (color) {
                    if (this.noteColorType == 'fill')
                        app_js_8.App.map.settings.note.fillColor = color;
                    if (this.noteColorType == 'border')
                        app_js_8.App.map.settings.note.borderColor = color;
                    if (this.noteColorType == 'text')
                        app_js_8.App.map.settings.note.textColor = color;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                RenderPanel.prototype.onBlockColorButton = function (button) {
                    // Unselect all buttons.
                    this.blockColorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.blockColorType = button.type;
                    // Set colorPicker to color.
                    this.setBlockPickerColor();
                };
                RenderPanel.prototype.setBlockPickerColor = function () {
                    if (this.blockColorType == 'fill')
                        this.blockColorPicker.color = app_js_8.App.map.settings.block.fillColor;
                    if (this.blockColorType == 'border')
                        this.blockColorPicker.color = app_js_8.App.map.settings.block.borderColor;
                };
                RenderPanel.prototype.setBlockColor = function (color) {
                    if (this.blockColorType == 'fill')
                        app_js_8.App.map.settings.block.fillColor = color;
                    if (this.blockColorType == 'border')
                        app_js_8.App.map.settings.block.borderColor = color;
                    dispatcher_js_6.Dispatcher.notify(appEvent_js_7.AppEvent.Refresh, null);
                };
                return RenderPanel;
            }(panels_js_5.Panel));
            exports_80("RenderPanel", RenderPanel);
        }
    };
});
System.register("controls/idObjectEditor/idObjectEditor", ["controls/control", "controls/controls", "enums/enums"], function (exports_81, context_81) {
    "use strict";
    var control_12, controls_5, enums_22, IdObjectEditor;
    var __moduleName = context_81 && context_81.id;
    return {
        setters: [
            function (control_12_1) {
                control_12 = control_12_1;
            },
            function (controls_5_1) {
                controls_5 = controls_5_1;
            },
            function (enums_22_1) {
                enums_22 = enums_22_1;
            }
        ],
        execute: function () {
            IdObjectEditor = /** @class */ (function (_super) {
                __extends(IdObjectEditor, _super);
                // 
                // Create a new instance of IdObjectEditor by providing a query selector that
                // yields an id-object-editor element.
                //
                function IdObjectEditor(elem, base) {
                    var _this = _super.call(this, elem, base) || this;
                    // Expand a handlebars template into the top element.
                    _this.elem.innerHTML = Handlebars.templates.idObjectEditor({});
                    // The drag handle is used to initiate dragging. When
                    // the mouse is pressed on it, set the 'draggable' attribute
                    // on the object editor.
                    var handle = _this.elem.querySelector('.handle');
                    handle.addEventListener('mousedown', function (e) {
                        _this.elem.setAttribute('draggable', 'true');
                    });
                    handle.addEventListener('mouseup', function (e) {
                        _this.elem.setAttribute('draggable', 'false');
                    });
                    // Object editor dragstart and dragend:
                    _this.elem.addEventListener('dragstart', function (e) {
                        e.dataTransfer.setData('text', 'foo');
                        IdObjectEditor.dragObj = _this.obj;
                        IdObjectEditor.dragParent = _this.elem.parentElement;
                        _this.elem.classList.add('dragged');
                        IdObjectEditor.dragParent.classList.add('dragging');
                    });
                    _this.elem.addEventListener('dragend', function (e) {
                        _this.elem.setAttribute('draggable', 'false'); // Editor must not remain draggable
                        _this.elem.classList.remove('dragged');
                        IdObjectEditor.dragParent.classList.remove('dragging');
                    });
                    _this.dropDiv = _this.elem.querySelector('.drop');
                    _this.dropAsChildDiv = _this.elem.querySelector('.drop-child');
                    var me = _this;
                    _this.dropDiv.addEventListener('dragover', function (e) { return _this.handleDragOver(e); }, false);
                    _this.dropAsChildDiv.addEventListener('dragover', function (e) { return _this.handleDragOver(e); }, false);
                    _this.dropDiv.addEventListener('dragenter', function (e) { return me.handleDragEnter(this); });
                    _this.dropAsChildDiv.addEventListener('dragenter', function (e) { return me.handleDragEnter(this); });
                    _this.dropDiv.addEventListener('dragleave', function (e) { return me.handleDragLeave(this); });
                    _this.dropAsChildDiv.addEventListener('dragleave', function (e) { return me.handleDragLeave(this); });
                    _this.dropDiv.addEventListener('drop', function (e) { return me.handleDrop(e, this); });
                    _this.dropAsChildDiv.addEventListener('drop', function (e) { return me.handleDropAsChild(e, this); });
                    // Text inputs:
                    _this.ctrlName = new controls_5.IdInput('.js-name', _this.elem).addEventListener('input', function () { _this.obj.name = _this.ctrlName.value; });
                    _this.ctrlDescription = new controls_5.IdInput('.js-description', _this.elem).addEventListener('input', function () { _this.obj.description = _this.ctrlDescription.value; });
                    // Delete button:
                    _this.btnDelete = _this.elem.querySelector('a');
                    _this.btnDelete.addEventListener('click', function () { _this.delete(); });
                    // Object type buttons:
                    _this.btnItem = new controls_5.IdPopup('.js-item', _this.elem).addEventListener('click', function () { _this.setKind(enums_22.ObjectKind.Item); });
                    _this.btnScenery = new controls_5.IdPopup('.js-scenery', _this.elem).addEventListener('click', function () { _this.setKind(enums_22.ObjectKind.Scenery); });
                    _this.btnActor = new controls_5.IdPopup('.js-actor', _this.elem).addEventListener('click', function () { _this.setKind(enums_22.ObjectKind.Actor); });
                    return _this;
                }
                IdObjectEditor.prototype.handleDragOver = function (e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    return false;
                };
                IdObjectEditor.prototype.handleDragEnter = function (elem) {
                    elem.classList.add('over');
                };
                IdObjectEditor.prototype.handleDragLeave = function (elem) {
                    elem.classList.remove('over');
                };
                IdObjectEditor.prototype.handleDrop = function (e, elem) {
                    e.preventDefault();
                    e.stopPropagation();
                    var evt = new CustomEvent('drop', { detail: IdObjectEditor.dragObj });
                    this.elem.dispatchEvent(evt);
                    return false;
                };
                IdObjectEditor.prototype.handleDropAsChild = function (e, elem) {
                    e.preventDefault();
                    e.stopPropagation();
                    var evt = new CustomEvent('dropAsChild', { detail: IdObjectEditor.dragObj });
                    this.elem.dispatchEvent(evt);
                    return false;
                };
                IdObjectEditor.prototype.setKind = function (kind) {
                    this.btnActor.selected = kind == enums_22.ObjectKind.Actor;
                    this.btnItem.selected = kind == enums_22.ObjectKind.Item;
                    this.btnScenery.selected = kind == enums_22.ObjectKind.Scenery;
                    this.obj.kind = kind;
                };
                Object.defineProperty(IdObjectEditor.prototype, "value", {
                    get: function () {
                        return this.obj;
                    },
                    set: function (obj) {
                        this.obj = obj;
                        this.ctrlName.value = obj.name;
                        this.ctrlDescription.value = obj.description;
                        this.setKind(obj.kind);
                    },
                    enumerable: true,
                    configurable: true
                });
                IdObjectEditor.prototype.delete = function () {
                    var evt = new CustomEvent('delete');
                    this.elem.dispatchEvent(evt);
                };
                return IdObjectEditor;
            }(control_12.Control));
            exports_81("IdObjectEditor", IdObjectEditor);
        }
    };
});
System.register("panels/roomPanel/roomPanel", ["dispatcher", "enums/appEvent", "models/room", "panels/panels", "controls/controls", "models/obj", "controls/idObjectEditor/idObjectEditor"], function (exports_82, context_82) {
    "use strict";
    var dispatcher_js_7, appEvent_js_8, room_js_4, panels_js_6, controls_js_6, obj_js_1, idObjectEditor_js_1, RoomPanel;
    var __moduleName = context_82 && context_82.id;
    return {
        setters: [
            function (dispatcher_js_7_1) {
                dispatcher_js_7 = dispatcher_js_7_1;
            },
            function (appEvent_js_8_1) {
                appEvent_js_8 = appEvent_js_8_1;
            },
            function (room_js_4_1) {
                room_js_4 = room_js_4_1;
            },
            function (panels_js_6_1) {
                panels_js_6 = panels_js_6_1;
            },
            function (controls_js_6_1) {
                controls_js_6 = controls_js_6_1;
            },
            function (obj_js_1_1) {
                obj_js_1 = obj_js_1_1;
            },
            function (idObjectEditor_js_1_1) {
                idObjectEditor_js_1 = idObjectEditor_js_1_1;
            }
        ],
        execute: function () {
            RoomPanel = /** @class */ (function (_super) {
                __extends(RoomPanel, _super);
                function RoomPanel() {
                    var _this = _super.call(this, 'roompanel', Handlebars.templates.roomPanel, {}) || this;
                    _this.objectsCreated = 0;
                    dispatcher_js_7.Dispatcher.subscribe(_this);
                    _this.ctrlName = new controls_js_6.IdInput('.js-name', _this.elem).addEventListener('input', function () { _this.room.name = _this.ctrlName.value; });
                    _this.ctrlSubtitle = new controls_js_6.IdInput('.js-subtitle', _this.elem).addEventListener('input', function () { _this.room.subtitle = _this.ctrlSubtitle.value; });
                    _this.ctrlDark = new controls_js_6.IdCheck('.js-dark', _this.elem).addEventListener('input', function () { _this.room.dark = _this.ctrlDark.checked; });
                    _this.ctrlStartroom = new controls_js_6.IdCheck('.js-startroom', _this.elem).addEventListener('input', function () { _this.room.setStartRoom(_this.ctrlStartroom.checked); });
                    _this.ctrlEndroom = new controls_js_6.IdCheck('.js-endroom', _this.elem).addEventListener('input', function () { _this.room.endroom = _this.ctrlEndroom.checked; });
                    _this.ctrlDescription = new controls_js_6.IdTextarea('.js-description', _this.elem).addEventListener('input', function () { _this.room.description = _this.ctrlDescription.value; });
                    _this.ctrlLineStyle = new controls_js_6.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.room.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLineWidth = new controls_js_6.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.room.lineWidth = _this.ctrlLineWidth.value; });
                    _this.colorPicker = new controls_js_6.IdColorPicker('.js-color', _this.elem).addEventListener('change', function () { _this.setRoomColor(_this.colorPicker.color); });
                    _this.ctrlShape = new controls_js_6.IdShape('.js-shape', _this.elem).addEventListener('change', function () { _this.room.shape = _this.ctrlShape.value; });
                    _this.ctrlRounding = new controls_js_6.IdRange('.js-rounding', _this.elem).addEventListener('input', function () { _this.room.rounding = _this.ctrlRounding.value; });
                    // Find color buttons:
                    var buttons = _this.elem.querySelectorAll(".colortype");
                    _this.colorButtons = new Array();
                    var _loop_10 = function (i) {
                        var popup = new controls_js_6.IdPopup(buttons[i]);
                        if (popup.selected)
                            this_8.colorType = popup.type;
                        this_8.colorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onColorButton(popup); });
                    };
                    var this_8 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_10(i);
                    }
                    _this.objList = _this.elem.querySelector('.js-object-list');
                    _this.elem.querySelector('.js-add-object').addEventListener('click', function () { _this.newObject(); });
                    return _this;
                }
                RoomPanel.prototype.newObject = function () {
                    var obj = new obj_js_1.Obj();
                    this.room.objects.push(obj);
                    this.refreshObjList();
                    // Show help for first object created.
                    if (this.objectsCreated == 0) {
                        controls_js_6.IdToast.toast("Container objects", "You've just created your first object. When creating multiple objects in a room, you can <b>drag</b> one object into another one to establish a containment relationship.");
                    }
                    this.objectsCreated++;
                };
                // 
                // Find the array in which the specified Obj lives.
                //
                RoomPanel.prototype.findObjList = function (obj, src) {
                    // For recursion:
                    if (!src)
                        src = this.room.objects;
                    // Is obj in the current list? Then return the list.
                    var idx = src.indexOf(obj);
                    if (idx != -1)
                        return src;
                    // Check the sublists:
                    for (var i = 0; i < src.length; i++) {
                        var lst = this.findObjList(obj, src[i].content);
                        if (lst != null)
                            return lst;
                    }
                    // Object not found.
                    return null;
                };
                RoomPanel.prototype.isChildOf = function (parent, child) {
                    var idx = parent.content.indexOf(child);
                    if (idx != -1)
                        return true;
                    for (var i = 0; i < parent.content.length; i++) {
                        if (this.isChildOf(parent.content[i], child))
                            return true;
                    }
                    return false;
                };
                RoomPanel.prototype.removeObject = function (obj) {
                    var lst = this.findObjList(obj);
                    var idx = lst.indexOf(obj);
                    lst.splice(idx, 1);
                };
                RoomPanel.prototype.addObjectAfter = function (obj, afterObj) {
                    // Is the dragged object a child of the "after" object? Then abort.
                    if (this.isChildOf(obj, afterObj))
                        return;
                    this.removeObject(obj);
                    // Find list and position of "after" object.
                    var lst = this.findObjList(afterObj);
                    var idx = lst.indexOf(afterObj);
                    // Add object after "after" object.
                    lst.splice(idx + 1, 0, obj);
                };
                RoomPanel.prototype.addObjectIn = function (obj, inObj) {
                    // Is the dragged object a child of the "in" object? Then abort.
                    if (this.isChildOf(obj, inObj))
                        return;
                    this.removeObject(obj);
                    inObj.content.push(obj);
                };
                RoomPanel.prototype.refreshObjList = function () {
                    this.objList.innerHTML = "";
                    if (this.room.objects.length == 0) {
                        this.objList.innerHTML = "<p>There are no objects in this location.</p>";
                    }
                    else {
                        this.addEditors(this.room.objects, 0);
                    }
                    dispatcher_js_7.Dispatcher.notify(appEvent_js_8.AppEvent.Refresh, null);
                };
                RoomPanel.prototype.addEditors = function (objs, indent) {
                    var _this = this;
                    objs.forEach(function (obj) {
                        _this.createObjEditor(obj, indent);
                        _this.addEditors(obj.content, indent + 1);
                    });
                };
                RoomPanel.prototype.createObjEditor = function (obj, indent) {
                    var _this = this;
                    var div = document.createElement('div');
                    div.style.marginLeft = indent * 40 + "px";
                    this.objList.appendChild(div);
                    var editor = new idObjectEditor_js_1.IdObjectEditor(div);
                    editor.value = obj;
                    editor.addEventListener('delete', function () { _this.removeObject(obj); _this.refreshObjList(); });
                    editor.addEventListener('drop', function (e) { _this.addObjectAfter(e.detail, obj); _this.refreshObjList(); });
                    editor.addEventListener('dropAsChild', function (e) { _this.addObjectIn(e.detail, obj); _this.refreshObjList(); });
                };
                RoomPanel.prototype.notify = function (event, obj) {
                    /* if(event == AppEvent.Select) {
                      this.close();
                    } */
                    var _this = this;
                    if (event == appEvent_js_8.AppEvent.More) {
                        if (obj instanceof room_js_4.Room) {
                            var room = obj;
                            this.room = obj;
                            this.open();
                            // Show room data.
                            this.ctrlName.value = room.name;
                            this.ctrlSubtitle.value = room.subtitle;
                            this.ctrlDark.checked = room.dark;
                            this.ctrlStartroom.checked = room.isStartRoom();
                            this.ctrlEndroom.checked = room.endroom;
                            this.ctrlShape.value = this.room.shape;
                            this.ctrlRounding.value = room.rounding;
                            this.ctrlDescription.value = room.description;
                            this.ctrlLineStyle.value = room.lineStyle;
                            this.ctrlLineWidth.value = room.lineWidth;
                            // Set color from currently selected color button:
                            this.setColor();
                            // Place objects in object list
                            this.refreshObjList();
                            setTimeout(function () {
                                _this.ctrlName.focus().select();
                            }, 100);
                        }
                        else {
                            this.close();
                        }
                    }
                };
                RoomPanel.prototype.onColorButton = function (button) {
                    // Unselect all buttons.
                    this.colorButtons.forEach(function (button) {
                        button.selected = false;
                    });
                    // Select this button.
                    button.selected = true;
                    // Make the buttons' data-type the current color type.
                    this.colorType = button.type;
                    // Set colorPicker to color.
                    this.setColor();
                };
                RoomPanel.prototype.setColor = function () {
                    if (this.colorType == 'fill')
                        this.colorPicker.color = this.room.fillColor;
                    if (this.colorType == 'border')
                        this.colorPicker.color = this.room.borderColor;
                    if (this.colorType == 'name')
                        this.colorPicker.color = this.room.nameColor;
                    if (this.colorType == 'subtitle')
                        this.colorPicker.color = this.room.subtitleColor;
                };
                RoomPanel.prototype.setRoomColor = function (color) {
                    if (this.colorType == 'fill')
                        this.room.fillColor = color;
                    if (this.colorType == 'border')
                        this.room.borderColor = color;
                    if (this.colorType == 'name')
                        this.room.nameColor = color;
                    if (this.colorType == 'subtitle')
                        this.room.subtitleColor = color;
                    dispatcher_js_7.Dispatcher.notify(appEvent_js_8.AppEvent.Refresh, null);
                };
                return RoomPanel;
            }(panels_js_6.Panel));
            exports_82("RoomPanel", RoomPanel);
        }
    };
});
System.register("panels/toolPanel/toolPanel", ["enums/enums", "app", "controls/optionsGroup", "dispatcher"], function (exports_83, context_83) {
    "use strict";
    var enums_js_10, app_js_9, optionsGroup_js_1, dispatcher_js_8, ToolPanel;
    var __moduleName = context_83 && context_83.id;
    return {
        setters: [
            function (enums_js_10_1) {
                enums_js_10 = enums_js_10_1;
            },
            function (app_js_9_1) {
                app_js_9 = app_js_9_1;
            },
            function (optionsGroup_js_1_1) {
                optionsGroup_js_1 = optionsGroup_js_1_1;
            },
            function (dispatcher_js_8_1) {
                dispatcher_js_8 = dispatcher_js_8_1;
            }
        ],
        execute: function () {
            ToolPanel = /** @class */ (function (_super) {
                __extends(ToolPanel, _super);
                function ToolPanel() {
                    var _this = this;
                    var elem = document.getElementById('toolpanel');
                    _this = _super.call(this, elem, [
                        { value: enums_js_10.MouseMode.None, htmlEl: '#toolpanel .tool-none' },
                        { value: enums_js_10.MouseMode.AddRoom, htmlEl: '#toolpanel .tool-room' },
                        { value: enums_js_10.MouseMode.AddNote, htmlEl: '#toolpanel .tool-note' },
                        { value: enums_js_10.MouseMode.AddBlock, htmlEl: '#toolpanel .tool-block' },
                    ]) || this;
                    dispatcher_js_8.Dispatcher.subscribe(_this);
                    _this.value = enums_js_10.MouseMode.None;
                    return _this;
                }
                Object.defineProperty(ToolPanel.prototype, "template", {
                    get: function () {
                        return Handlebars.templates.toolPanel({});
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ToolPanel.prototype, "value", {
                    set: function (val) {
                        this.setValue(val);
                        app_js_9.App.mouseMode = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                ToolPanel.prototype.notify = function (event, obj) {
                    if (event == enums_js_10.AppEvent.Added) {
                        this.value = enums_js_10.MouseMode.None;
                    }
                };
                return ToolPanel;
            }(optionsGroup_js_1.OptionsGroup));
            exports_83("ToolPanel", ToolPanel);
        }
    };
});
System.register("panels/panels", ["panels/panel", "panels/blockPanel/blockPanel", "panels/connectorPanel/connectorPanel", "panels/mapPanel/mapPanel", "panels/menuPanel/menuPanel", "panels/notePanel/notePanel", "panels/renderPanel/renderPanel", "panels/roomPanel/roomPanel", "panels/toolPanel/toolPanel"], function (exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    function exportStar_6(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_84(exports);
    }
    return {
        setters: [
            function (panel_js_1_1) {
                exportStar_6(panel_js_1_1);
            },
            function (blockPanel_js_1_1) {
                exportStar_6(blockPanel_js_1_1);
            },
            function (connectorPanel_js_1_1) {
                exportStar_6(connectorPanel_js_1_1);
            },
            function (mapPanel_js_1_1) {
                exportStar_6(mapPanel_js_1_1);
            },
            function (menuPanel_js_1_1) {
                exportStar_6(menuPanel_js_1_1);
            },
            function (notePanel_js_1_1) {
                exportStar_6(notePanel_js_1_1);
            },
            function (renderPanel_js_1_1) {
                exportStar_6(renderPanel_js_1_1);
            },
            function (roomPanel_js_1_1) {
                exportStar_6(roomPanel_js_1_1);
            },
            function (toolPanel_js_1_1) {
                exportStar_6(toolPanel_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("editor", ["app", "dispatcher", "enums/enums", "grid", "models/room", "models/connector", "views/roomView", "views/connectorView", "models/note", "views/noteView", "views/boxView", "views/viewFactory", "drawing/canvas", "models/block", "views/blockView", "maps/zorkMap", "io/mapJSON", "maps/adventureMap", "maps/castleofdoomMap", "maps/hhg", "maps/hobbitMap", "controls/controls", "util/rect"], function (exports_85, context_85) {
    "use strict";
    var app_js_10, dispatcher_js_9, enums_js_11, grid_js_1, room_js_5, connector_js_6, roomView_js_1, connectorView_js_1, note_js_4, noteView_js_1, boxView_js_4, viewFactory_js_1, canvas_js_1, block_js_4, blockView_js_1, zorkMap_js_1, mapJSON_js_1, adventureMap_js_1, castleofdoomMap_js_1, hhg_js_1, hobbitMap_js_1, controls_js_7, rect_js_2, Editor;
    var __moduleName = context_85 && context_85.id;
    return {
        setters: [
            function (app_js_10_1) {
                app_js_10 = app_js_10_1;
            },
            function (dispatcher_js_9_1) {
                dispatcher_js_9 = dispatcher_js_9_1;
            },
            function (enums_js_11_1) {
                enums_js_11 = enums_js_11_1;
            },
            function (grid_js_1_1) {
                grid_js_1 = grid_js_1_1;
            },
            function (room_js_5_1) {
                room_js_5 = room_js_5_1;
            },
            function (connector_js_6_1) {
                connector_js_6 = connector_js_6_1;
            },
            function (roomView_js_1_1) {
                roomView_js_1 = roomView_js_1_1;
            },
            function (connectorView_js_1_1) {
                connectorView_js_1 = connectorView_js_1_1;
            },
            function (note_js_4_1) {
                note_js_4 = note_js_4_1;
            },
            function (noteView_js_1_1) {
                noteView_js_1 = noteView_js_1_1;
            },
            function (boxView_js_4_1) {
                boxView_js_4 = boxView_js_4_1;
            },
            function (viewFactory_js_1_1) {
                viewFactory_js_1 = viewFactory_js_1_1;
            },
            function (canvas_js_1_1) {
                canvas_js_1 = canvas_js_1_1;
            },
            function (block_js_4_1) {
                block_js_4 = block_js_4_1;
            },
            function (blockView_js_1_1) {
                blockView_js_1 = blockView_js_1_1;
            },
            function (zorkMap_js_1_1) {
                zorkMap_js_1 = zorkMap_js_1_1;
            },
            function (mapJSON_js_1_1) {
                mapJSON_js_1 = mapJSON_js_1_1;
            },
            function (adventureMap_js_1_1) {
                adventureMap_js_1 = adventureMap_js_1_1;
            },
            function (castleofdoomMap_js_1_1) {
                castleofdoomMap_js_1 = castleofdoomMap_js_1_1;
            },
            function (hhg_js_1_1) {
                hhg_js_1 = hhg_js_1_1;
            },
            function (hobbitMap_js_1_1) {
                hobbitMap_js_1 = hobbitMap_js_1_1;
            },
            function (controls_js_7_1) {
                controls_js_7 = controls_js_7_1;
            },
            function (rect_js_2_1) {
                rect_js_2 = rect_js_2_1;
            }
        ],
        execute: function () {
            Editor = /** @class */ (function () {
                function Editor() {
                    var _this = this;
                    this.grid = new grid_js_1.Grid();
                    this.hover = null;
                    this.copy = new Array();
                    // Track help system state:
                    this.roomsPlaced = 0;
                    // Scroll/drag:
                    this.mouseX = -100;
                    this.mouseY = -100;
                    this.dragOriginX = 0;
                    this.dragOriginY = 0;
                    this.refreshAll = true;
                    this.resfreshAlways = false;
                    this.render = function () {
                        _this.mainCanvas.save();
                        _this.bgCanvas.save();
                        // Clear the scene and draw the grid:
                        _this.clear();
                        // Translate/scale the entire canvas to conform to world coordinates:
                        _this.bgCanvas.translate(Math.floor(app_js_10.App.bgHTMLCanvas.offsetWidth / 2) + app_js_10.App.centerX, Math.floor(app_js_10.App.bgHTMLCanvas.offsetHeight / 2) + app_js_10.App.centerY);
                        _this.bgCanvas.scale(app_js_10.App.zoom, app_js_10.App.zoom);
                        _this.mainCanvas.translate(Math.floor(app_js_10.App.mainHTMLCanvas.offsetWidth / 2) + app_js_10.App.centerX, Math.floor(app_js_10.App.mainHTMLCanvas.offsetHeight / 2) + app_js_10.App.centerY);
                        _this.mainCanvas.scale(app_js_10.App.zoom, app_js_10.App.zoom);
                        // Draw all views:
                        _this.renderViews();
                        // Draw all handles:
                        _this.views.forEach(function (view) {
                            view.drawHandles(_this.mainCanvas, _this.mouseX, _this.mouseY, app_js_10.App.mouseMode == enums_js_11.MouseMode.Connect ? 0 : app_js_10.App.selection.size(), _this.hover == view && app_js_10.App.mouseMode != enums_js_11.MouseMode.Select);
                        });
                        if (app_js_10.App.mouseMode == enums_js_11.MouseMode.Select) {
                            _this.drawSelectionArea();
                        }
                        _this.mainCanvas.restore();
                        _this.bgCanvas.restore();
                        //window.requestAnimationFrame(this.render);
                    };
                    dispatcher_js_9.Dispatcher.subscribe(this);
                    // Access the main canvas:
                    this.mainCanvas = new canvas_js_1.Canvas(app_js_10.App.mainHTMLCanvas.getContext('2d'));
                    // Access the background canvas:
                    this.bgCanvas = new canvas_js_1.Canvas(app_js_10.App.bgHTMLCanvas.getContext('2d'));
                    // Access the 1x1 hittest canvas:
                    this.hitTestHtmlCanvas = document.getElementById('hittest');
                    this.hitTestCanvas = new canvas_js_1.Canvas(this.hitTestHtmlCanvas.getContext('2d'));
                    this.views = new Array();
                    // Global event listeners:
                    window.addEventListener('resize', function () { _this.resize(); });
                    window.addEventListener("beforeunload", function (e) { _this.unload(e); });
                    // Canvas event listeners:
                    app_js_10.App.mainHTMLCanvas.addEventListener('mousedown', function (e) { _this.canvasMouseDown(e); });
                    app_js_10.App.mainHTMLCanvas.addEventListener('mouseup', function (e) { _this.canvasMouseUp(e); });
                    app_js_10.App.mainHTMLCanvas.addEventListener('mousemove', function (e) { _this.canvasMouseMove(e); });
                    app_js_10.App.mainHTMLCanvas.addEventListener('wheel', function (e) { _this.canvasMouseWheel(e); });
                    app_js_10.App.mainHTMLCanvas.addEventListener('dblclick', function (e) { _this.canvasMouseDoubleClick(e); });
                    app_js_10.App.mainHTMLCanvas.addEventListener('contextmenu', function (e) { _this.canvasContextMenu(e); });
                    // Status bar event listeners:
                    document.getElementById('control-center').addEventListener('click', function () { _this.cmdCenterView(); });
                    document.getElementById('control-zoomin').addEventListener('click', function () { _this.cmdZoomIn(); });
                    document.getElementById('control-zoomout').addEventListener('click', function () { _this.cmdZoomOut(); });
                    this.ctrlZoom = document.getElementById('control-zoom');
                    this.ctrlZoom.addEventListener('change', function () { _this.cmdZoom(); });
                    this.updateZoomPercentage();
                    app_js_10.App.mainHTMLCanvas.addEventListener('keyup', function (e) { _this.keyUp(e); });
                    this.resize();
                    // Create a test map:
                    this.makeTestMap();
                    this.refresh(true);
                }
                Editor.prototype.refresh = function (all) {
                    if (all === void 0) { all = false; }
                    this.refreshAll = all;
                    window.requestAnimationFrame(this.render);
                };
                Editor.prototype.keyUp = function (e) {
                    //console.log("Key up: ", e);
                    if (!e.ctrlKey && !e.shiftKey) {
                        switch (e.key) {
                            case 'a':
                                this.cmdToggleOneWay();
                                break;
                            case 'v':
                                this.cmdReverseConnector();
                                break;
                            case 'k':
                                this.cmdToggleDarkness();
                                break;
                            case 'r':
                                this.cmdAddRoom();
                                break;
                            case 'n':
                                this.cmdAddNote();
                                break;
                            case 'b':
                                this.cmdAddBlock();
                                break;
                            case 'Escape':
                                this.cmdUnselectAll();
                                break;
                            case 'Delete':
                                this.cmdDelete();
                                break;
                            case 'Insert':
                                this.cmdCenterView();
                                break;
                            case '+':
                                this.cmdZoomIn();
                                break;
                            case '-':
                                this.cmdZoomOut();
                                break;
                            case '0':
                                this.cmdZoomNormal();
                                break;
                            case 'Enter': // Enter/F2 calls up room/connector/note panel
                            case 'F2':
                                this.cmdShowPanel();
                                break;
                            case 'ArrowRight':
                                this.moveCenter(1, 0);
                                break;
                            case 'ArrowLeft':
                                this.moveCenter(-1, 0);
                                break;
                            case 'ArrowUp':
                                this.moveCenter(0, -1);
                                break;
                            case 'ArrowDown':
                                this.moveCenter(0, 1);
                                break;
                            case 'PageUp':
                                this.moveCenter(1, -1);
                                break;
                            case 'PageDown':
                                this.moveCenter(1, 1);
                                break;
                            case 'End':
                                this.moveCenter(-1, 1);
                                break;
                            case 'Home':
                                this.moveCenter(-1, -1);
                                break;
                        }
                    }
                    if (e.ctrlKey) {
                        switch (e.key) {
                            case 'a':
                                this.cmdSelectAll();
                                break;
                            case 'c':
                                this.cmdCopySelection();
                                break;
                            case 'v':
                                this.cmdPaste();
                                break;
                            case 'z':
                                app_js_10.App.undo();
                                break;
                        }
                    }
                    if (e.shiftKey) {
                        switch (e.key) {
                            // Arrow keys create new room in direction, if there isn't a room connection
                            // in that direction already.
                            case 'ArrowRight':
                                this.cmdNewRoomInDir(enums_js_11.Direction.E);
                                break;
                            case 'ArrowLeft':
                                this.cmdNewRoomInDir(enums_js_11.Direction.W);
                                break;
                            case 'ArrowUp':
                                this.cmdNewRoomInDir(enums_js_11.Direction.N);
                                break;
                            case 'ArrowDown':
                                this.cmdNewRoomInDir(enums_js_11.Direction.S);
                                break;
                            case 'PageUp':
                                this.cmdNewRoomInDir(enums_js_11.Direction.NE);
                                break;
                            case 'PageDown':
                                this.cmdNewRoomInDir(enums_js_11.Direction.SE);
                                break;
                            case 'End':
                                this.cmdNewRoomInDir(enums_js_11.Direction.SW);
                                break;
                            case 'Home':
                                this.cmdNewRoomInDir(enums_js_11.Direction.NW);
                                break;
                            case 'Enter':
                                this.cmdCenterView();
                                break;
                        }
                    }
                    e.preventDefault();
                };
                Editor.prototype.notify = function (event, model) {
                    var _this = this;
                    if (event == enums_js_11.AppEvent.Delete) {
                        app_js_10.App.selection.clear();
                        for (var i = 0; i < this.views.length; i++) {
                            if (this.views[i].getModel() == model) {
                                this.views.splice(i, 1);
                                break;
                            }
                        }
                        this.refresh(true);
                    }
                    if (event == enums_js_11.AppEvent.Refresh) {
                        app_js_10.App.selection.unselectAll();
                        this.views.length = 0;
                        app_js_10.App.map.elements.forEach(function (model) {
                            _this.views.push(viewFactory_js_1.ViewFactory.create(model));
                        });
                        this.refresh(true);
                    }
                    if (event == enums_js_11.AppEvent.Redraw) {
                        this.refresh(true);
                    }
                    if (event == enums_js_11.AppEvent.Load) {
                        app_js_10.App.selection.unselectAll();
                        this.views.length = 0;
                        app_js_10.App.map.elements.forEach(function (model) {
                            _this.views.push(viewFactory_js_1.ViewFactory.create(model));
                        });
                        this.refresh(true);
                        this.cmdCenterView();
                        this.cmdZoomNormal();
                        app_js_10.App.header.title = app_js_10.App.map.title;
                        app_js_10.App.header.content = app_js_10.App.author(app_js_10.App.map.author);
                    }
                };
                Editor.prototype.getParameterByName = function (name) {
                    var url = window.location.href;
                    name = name.replace(/[\[\]]/g, '\\$&');
                    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
                    var results = regex.exec(url);
                    if (!results)
                        return null;
                    if (!results[2])
                        return '';
                    return decodeURIComponent(results[2].replace(/\+/g, ' '));
                };
                Editor.prototype.makeTestMap = function () {
                    /* let startRoom = new Room(App.map.settings);
                    App.map.add(startRoom);
                    startRoom.name = 'hello world this is a very long text';
                    startRoom.x = 0;
                    startRoom.y = 0;
                    this.views.push(ViewFactory.create(startRoom));
                
                    let connection = new Connector(App.map.settings);
                    App.map.add(connection);
                    connection.name = 'abc';
                    connection.dockStart = startRoom;
                    connection.startDir = Direction.E;
                    connection.isCurve = true;
                    connection.oneWay = true;
                    connection.startType = ConnectorType.In;
                    connection.endType = ConnectorType.Out;
                    this.views.push(ViewFactory.create(connection));
                    
                    let endRoom = new Room(App.map.settings);
                    App.map.add(endRoom);
                    endRoom.name = 'world';
                    endRoom.x = 320;
                    endRoom.y = 320;
                    this.views.push(ViewFactory.create(endRoom));
                
                    connection.dockEnd = endRoom;
                    connection.endDir = Direction.W; */
                    // The test map to load can be specified as a URL argument,
                    // i.e. trizbort.io/?map=zork
                    // If nothing is specified, then no wap will be loaded.
                    // Find map to load.
                    var map = null;
                    switch (this.getParameterByName('map')) {
                        case "adventure":
                            map = adventureMap_js_1.AdventureMap;
                            break;
                        case "castleofdoom":
                            map = castleofdoomMap_js_1.CastleofdoomMap;
                            break;
                        case "hhg":
                            map = hhg_js_1.HitchhikersguideMap;
                            break;
                        case "hobbit":
                            map = hobbitMap_js_1.HobbitMap;
                            break;
                        case "zork":
                            map = zorkMap_js_1.ZorkMap;
                            break;
                    }
                    // If a map was specified, load it.
                    if (map != null) {
                        app_js_10.App.map = mapJSON_js_1.MapJSON.load(map.json);
                        // Broadcast that we've loaded a new map:
                        dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.Load, null);
                    }
                };
                Editor.prototype.clear = function () {
                    if ((this.refreshAll) || (this.resfreshAlways)) {
                        this.bgCanvas
                            .fillStyle(app_js_10.App.map.settings.grid.background)
                            .fillRect(0, 0, app_js_10.App.bgHTMLCanvas.offsetWidth, app_js_10.App.bgHTMLCanvas.offsetHeight);
                        this.grid.draw(app_js_10.App.bgHTMLCanvas, this.bgCanvas);
                        this.mainCanvas.clearRect(0, 0, app_js_10.App.mainHTMLCanvas.width, app_js_10.App.mainHTMLCanvas.height);
                        //this.views.forEach((v: View) => v.clear(this.mainCanvas));
                    }
                };
                Object.defineProperty(Editor.prototype, "selX", {
                    get: function () {
                        return Math.min(this.mouseX, this.selectPosX);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Editor.prototype, "selY", {
                    get: function () {
                        return Math.min(this.mouseY, this.selectPosY);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Editor.prototype, "selW", {
                    get: function () {
                        return Math.abs(this.mouseX - this.selectPosX);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Editor.prototype, "selH", {
                    get: function () {
                        return Math.abs(this.mouseY - this.selectPosY);
                    },
                    enumerable: true,
                    configurable: true
                });
                Editor.prototype.drawSelectionArea = function () {
                    this.mainCanvas
                        .strokeStyle(enums_js_11.Values.COLOR_SELECTION_LINE)
                        .fillStyle(enums_js_11.Values.COLOR_SELECTION_AREA)
                        .fillRect(this.selX, this.selY, this.selW, this.selH)
                        .strokeRect(this.selX, this.selY, this.selW, this.selH);
                };
                Editor.prototype.renderView = function (view) {
                    var _this = this;
                    if ((!this.resfreshAlways) && (view.getModel().isChanged || this.refreshAll)) {
                        var rect_1;
                        //clearing the view and restoring the back area
                        if (!this.refreshAll) {
                            rect_1 = view.clear(this.mainCanvas);
                            if (rect_1) {
                                this.mainCanvas.save();
                                var reg = new Path2D();
                                reg.rect(rect_1.x, rect_1.y, rect_1.width, rect_1.height);
                                this.mainCanvas.clip(reg);
                                //console.log('Clearing view', view);
                                this.views.forEach(function (v) {
                                    if ((v != view) && (v instanceof blockView_js_1.BlockView)) {
                                        var isBack = v.getModel().isBackwardOf(view.getModel());
                                        var isIn = view.isIn(v.getModel().x, v.getModel().y, v.getModel().width, v.getModel().height);
                                        //console.log('Block: is back', isBack, '& view is in', isIn);
                                        if (isBack && (isIn || v.isIn(rect_1.x, rect_1.y, rect_1.width, rect_1.height)))
                                            v.draw(_this.mainCanvas, false);
                                    }
                                });
                                this.views.forEach(function (v) {
                                    if ((v != view) && ((v instanceof roomView_js_1.RoomView) || (v instanceof noteView_js_1.NoteView))) {
                                        var isBack = v.getModel().isBackwardOf(view.getModel());
                                        var isIn = view.isIn(v.getModel().x, v.getModel().y, v.getModel().width, v.getModel().height);
                                        //console.log('Room || Note: is back', isBack, '& view is in', isIn);
                                        if (isBack && (isIn || v.isIn(rect_1.x, rect_1.y, rect_1.width, rect_1.height)))
                                            v.draw(_this.mainCanvas, false);
                                    }
                                });
                                /* this.views.forEach((v: View) => {
                                  if((v != view) && (v instanceof ConnectorView) && view.isIn(v.getModel().x, v.getModel().y, v.getModel().width, v.getModel().height)) v.draw(this.mainCanvas, false);
                                }); */
                            }
                        }
                        view.draw(this.mainCanvas, this.hover == view && app_js_10.App.mouseMode != enums_js_11.MouseMode.Select);
                        view.getModel().unChanged();
                        // rendering all views 'isIn' in current view if not refreshAll
                        if (!this.refreshAll) {
                            var r_1 = rect_1 || ((view instanceof boxView_js_4.BoxView) ? new rect_js_2.Rect(view.getModel().x, view.getModel().y, view.getModel().x + view.getModel().width, view.getModel().y + view.getModel().height) : undefined);
                            if (r_1) {
                                this.views.forEach(function (v) {
                                    if ((v != view) && (v instanceof blockView_js_1.BlockView) && v.isIn(r_1.x, r_1.y, r_1.width, r_1.height) && view.getModel().isBackwardOf(v.getModel()))
                                        v.draw(_this.mainCanvas, false);
                                });
                                this.views.forEach(function (v) {
                                    if ((v != view) && ((v instanceof roomView_js_1.RoomView) || (v instanceof noteView_js_1.NoteView)) && v.isIn(r_1.x, r_1.y, r_1.width, r_1.height) && view.getModel().isBackwardOf(v.getModel()))
                                        v.draw(_this.mainCanvas, false);
                                });
                                this.views.forEach(function (v) {
                                    if ((v != view) && (v instanceof connectorView_js_1.ConnectorView) && v.isIn(r_1.x, r_1.y, r_1.width, r_1.height))
                                        v.draw(_this.mainCanvas, false);
                                });
                            }
                            this.mainCanvas.restore();
                            //this.renderViews(view);
                        }
                    }
                    else if (this.resfreshAlways)
                        view.draw(this.mainCanvas, this.hover == view && app_js_10.App.mouseMode != enums_js_11.MouseMode.Select);
                };
                Editor.prototype.renderViews = function (excludedView) {
                    var _this = this;
                    if (excludedView === void 0) { excludedView = undefined; }
                    // Draw all blocks:
                    this.views.forEach(function (view) {
                        if (view instanceof blockView_js_1.BlockView && (view != excludedView)) {
                            _this.renderView(view);
                        }
                    });
                    // Draw all rooms and notes:
                    this.views.forEach(function (view) {
                        if ((view instanceof roomView_js_1.RoomView || view instanceof noteView_js_1.NoteView) && (view != excludedView)) {
                            _this.renderView(view);
                        }
                    });
                    // Draw all connectors:
                    this.views.forEach(function (view) {
                        if (view instanceof connectorView_js_1.ConnectorView && (view != excludedView)) {
                            _this.renderView(view);
                        }
                    });
                };
                Editor.prototype.hitTest = function (x, y, view) {
                    this.hitTestCanvas
                        .save()
                        .clearRect(0, 0, 1, 1) // Clear the hit test canvas.
                        .scale(app_js_10.App.zoom, app_js_10.App.zoom) // Scale the canvas to the current zoom level
                        .translate(-x, -y); // Translate canvas to match world mouse coordinates
                    // Draw the view:
                    view.drawSimple(this.hitTestCanvas, this.hover == view);
                    this.hitTestCanvas.restore();
                    // See if the canvas contains a non-transparent pixel.
                    var myImageData = this.hitTestCanvas.getImageData(0, 0, 1, 1);
                    return myImageData.data[3] > 0;
                };
                Editor.prototype.resize = function () {
                    app_js_10.App.mainHTMLCanvas.setAttribute('width', app_js_10.App.mainHTMLCanvas.offsetWidth.toString());
                    app_js_10.App.mainHTMLCanvas.setAttribute('height', app_js_10.App.mainHTMLCanvas.offsetHeight.toString());
                    app_js_10.App.bgHTMLCanvas.setAttribute('width', app_js_10.App.bgHTMLCanvas.offsetWidth.toString());
                    app_js_10.App.bgHTMLCanvas.setAttribute('height', app_js_10.App.bgHTMLCanvas.offsetHeight.toString());
                    dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.Refresh, null);
                };
                //
                // Confirm that the user wants to leave when the page is about to be closed.
                // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event?redirectlocale=en-US&redirectslug=DOM%2FMozilla_event_reference%2Fbeforeunload
                // 
                Editor.prototype.unload = function (e) {
                    var confirmationMessage = 'You will lose all unsaved changes. Proceed?';
                    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
                    return confirmationMessage; // Webkit, Safari, Chrome
                };
                //
                // Find the coordinates of an HTML element relative to the top-left
                // corner of the document.
                //
                Editor.prototype.findObjCoordinates = function (obj) {
                    var curleft = 0;
                    var curtop = 0;
                    if (obj.offsetParent) {
                        do {
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop;
                        } while (obj = obj.offsetParent);
                    }
                    return {
                        x: curleft,
                        y: curtop
                    };
                };
                //
                // Find canvas mouse coordinates, taking into 
                // account scrolling and zooming.
                // 
                Editor.prototype.findMouseCoordinates = function (e) {
                    var _a = this.findObjCoordinates(app_js_10.App.mainHTMLCanvas), x = _a.x, y = _a.y;
                    return {
                        x: Math.floor((e.clientX - x - app_js_10.App.mainHTMLCanvas.offsetWidth / 2 - app_js_10.App.centerX) / app_js_10.App.zoom),
                        y: Math.floor((e.clientY - y - app_js_10.App.mainHTMLCanvas.offsetHeight / 2 - app_js_10.App.centerY) / app_js_10.App.zoom)
                    };
                };
                Editor.prototype.findViewByCoordinates = function (x, y) {
                    // Non-blocks first:
                    for (var i = 0; i < this.views.length; i++) {
                        if (!(this.views[i] instanceof blockView_js_1.BlockView)) {
                            if (this.hitTest(x, y, this.views[i]))
                                return this.views[i];
                        }
                    }
                    // Blocks next:
                    for (var i = 0; i < this.views.length; i++) {
                        if (this.views[i] instanceof blockView_js_1.BlockView) {
                            if (this.hitTest(x, y, this.views[i]))
                                return this.views[i];
                        }
                    }
                    return undefined;
                };
                Editor.prototype.canvasMouseDoubleClick = function (e) {
                    // See if a view was doubleclicked. If not, do nothing.
                    var _a = this.findMouseCoordinates(e), x = _a.x, y = _a.y;
                    var view = this.findViewByCoordinates(x, y);
                    if (view === undefined)
                        return;
                    // Select the view.
                    app_js_10.App.selection.unselectAll();
                    app_js_10.App.selection.add([view]);
                    view.select();
                    // Some HTML may be selected by the double-click. Try to unselect it.
                    window.getSelection().removeAllRanges();
                    // Call up the view's panel.
                    this.cmdShowPanel();
                };
                // Prevent context menu appearing on right mouse up.
                Editor.prototype.canvasContextMenu = function (e) {
                    e.preventDefault();
                };
                Editor.prototype.canvasMouseDown = function (e) {
                    // - Are we over a resize handle?
                    //   - MODE: RESIZE
                    // - Are we over a connector handle?
                    //   - MODE: CONNECT
                    // - Are we over any view?.
                    //   - Make view selected (ctrl applies)
                    //   - MODE: DRAG
                    // - Are we not over any view?
                    //   - Unselect all views
                    //   - MODE: SELECT
                    // --------------------------------
                    var _a = this.findMouseCoordinates(e), x = _a.x, y = _a.y;
                    // Mouse wheel OR right mouse button pressed. Start scrolling.
                    if (e.which == 2 || e.which == 3) {
                        app_js_10.App.mouseMode = enums_js_11.MouseMode.Scroll;
                        this.scrollOffsetX = e.clientX;
                        this.scrollOffsetY = e.clientY;
                        this.scrollOriginX = app_js_10.App.centerX;
                        this.scrollOriginY = app_js_10.App.centerY;
                        app_js_10.App.mainHTMLCanvas.style.cursor = 'move';
                        return;
                    }
                    if (app_js_10.App.mouseMode == enums_js_11.MouseMode.AddRoom) {
                        this.cmdAddRoom();
                        dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.Added, null);
                        return;
                    }
                    if (app_js_10.App.mouseMode == enums_js_11.MouseMode.AddNote) {
                        this.cmdAddNote();
                        dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.Added, null);
                        return;
                    }
                    if (app_js_10.App.mouseMode == enums_js_11.MouseMode.AddBlock) {
                        this.cmdAddBlock();
                        dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.Added, null);
                        return;
                    }
                    // Is the cursor over a view?
                    var view = this.findViewByCoordinates(x, y);
                    // No view clicked? Then unselect all unless CTRL is pressed.
                    // Also enter Select mode.
                    if (view === undefined) {
                        if (!e.ctrlKey)
                            app_js_10.App.selection.unselectAll();
                        app_js_10.App.mouseMode = enums_js_11.MouseMode.Select;
                        this.selectPosX = x;
                        this.selectPosY = y;
                        this.refresh(true);
                    }
                    // One connector selected and over a connector handle?
                    else if (app_js_10.App.selection.isSingle() && app_js_10.App.selection.first() instanceof connectorView_js_1.ConnectorView && app_js_10.App.selection.first().isConnectorHandle(x, y) !== undefined) {
                        app_js_10.App.pushUndo();
                        app_js_10.App.mouseMode = enums_js_11.MouseMode.Connect;
                        this.connectorHandle = app_js_10.App.selection.first().isConnectorHandle(x, y);
                        app_js_10.App.mainHTMLCanvas.style.cursor = 'crosshair';
                        this.refresh();
                    }
                    // One Room/Note selected and over a resize handle?
                    else if (view instanceof boxView_js_4.BoxView && app_js_10.App.selection.isSingle() && app_js_10.App.selection.first() == view && view.isResizeHandle(x, y) !== undefined) {
                        app_js_10.App.pushUndo();
                        app_js_10.App.mouseMode = enums_js_11.MouseMode.Resize;
                        this.roomHandle = view.isResizeHandle(x, y);
                        view.save();
                        app_js_10.App.mainHTMLCanvas.style.cursor = enums_js_11.Direction.toCursor(this.roomHandle);
                        this.refresh();
                    }
                    // Nothing selected and over a Room connector handle?
                    else if (view instanceof roomView_js_1.RoomView && app_js_10.App.selection.isEmpty() && view.isConnectorHandle(x, y) != undefined) {
                        app_js_10.App.pushUndo();
                        app_js_10.App.mouseMode = enums_js_11.MouseMode.Connect;
                        var handle = view.isConnectorHandle(x, y);
                        var connector = new connector_js_6.Connector(app_js_10.App.map.settings);
                        app_js_10.App.map.add(connector);
                        connector.dockStart = view.room;
                        connector.startDir = handle;
                        connector.endDir = handle;
                        connector.endX = x;
                        connector.endY = y;
                        var v = viewFactory_js_1.ViewFactory.create(connector);
                        this.views.push(v);
                        app_js_10.App.selection.add([v]);
                        this.connectorHandle = enums_js_11.ConnectorHandle.End; // End is being dragged.
                        app_js_10.App.mainHTMLCanvas.style.cursor = 'crosshair';
                        this.refresh();
                    }
                    // View clicked? Then add to selection if CTRL is pressed, or
                    // replace selection if CTRL not pressed.
                    else {
                        if (e.ctrlKey) {
                            if (!view.isSelected()) {
                                app_js_10.App.selection.add([view]);
                            }
                        }
                        else if (!view.isSelected()) {
                            app_js_10.App.selection.select(view);
                        }
                        this.refresh(true);
                        // Turn on drag mode:
                        app_js_10.App.mainHTMLCanvas.style.cursor = 'pointer';
                        app_js_10.App.pushUndo();
                        app_js_10.App.mouseMode = enums_js_11.MouseMode.Drag;
                        this.dragOriginX = x;
                        this.dragOriginY = y;
                        app_js_10.App.selection.get().forEach(function (view) {
                            if (view instanceof boxView_js_4.BoxView) {
                                view.save();
                            }
                        });
                    }
                };
                Editor.prototype.canvasMouseMove = function (e) {
                    // MODE: NONE
                    //   - Are we over any view where there is a selection?
                    //     - Do nothing
                    //   - Are over any view while there is NO selection?
                    //     - Turn that view into hover mode.
                    //       This means drawing handles
                    //       Are we over a handle? Highlight it in draw
                    //   - Are we NOT over any view?
                    //     - Turn hover mode off for all views.
                    //
                    // MODE: SELECT
                    //   - Draw selection area
                    //
                    // MODE: DRAG
                    //   - Drag views
                    //
                    // MODE: RESIZE
                    //   - Resize room
                    //
                    // MODE: CONNECT
                    //   - Create connection
                    // 
                    // --------------------------------
                    var _this = this;
                    // Hide the room popup if we're dragging/resizing:
                    if (app_js_10.App.mouseMode != enums_js_11.MouseMode.None) {
                        dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.MouseMove, null);
                    }
                    // Find world coordinates of mouse:
                    var _a = this.findMouseCoordinates(e), x = _a.x, y = _a.y;
                    this.mouseX = x;
                    this.mouseY = y;
                    // Update which view is currently hovered over:
                    // (but not while scrolling, that slows things down).
                    var view = undefined;
                    if (app_js_10.App.mouseMode != enums_js_11.MouseMode.Scroll) {
                        view = this.findViewByCoordinates(x, y);
                        app_js_10.App.mainHTMLCanvas.style.cursor = (view ? 'pointer' : 'default');
                        if (view && view != this.hover) {
                            if (this.hover && this.hover.movingSelectable)
                                this.hover.getModel().forceChanged();
                            if (view.movingSelectable)
                                view.getModel().forceChanged();
                            this.hover = view;
                            this.refresh();
                        }
                        else if (!view && this.hover) {
                            if (this.hover.movingSelectable)
                                this.hover.getModel().forceChanged();
                            this.hover = null;
                            this.refresh();
                        }
                        else if (view && view == this.hover)
                            this.refresh();
                    }
                    // We do different things for different mouse modes.
                    switch (app_js_10.App.mouseMode) {
                        case enums_js_11.MouseMode.Scroll:
                            app_js_10.App.centerX = this.scrollOriginX + (e.clientX - this.scrollOffsetX);
                            app_js_10.App.centerY = this.scrollOriginY + (e.clientY - this.scrollOffsetY);
                            this.refresh(true);
                            break;
                        // We are dragging a (set of) boxes.
                        case enums_js_11.MouseMode.Drag:
                            app_js_10.App.selection.get().forEach(function (view) {
                                if (view instanceof boxView_js_4.BoxView) {
                                    view.getModel().x = grid_js_1.Grid.snap(view.oldX - _this.dragOriginX + x);
                                    view.getModel().y = grid_js_1.Grid.snap(view.oldY - _this.dragOriginY + y);
                                }
                            });
                            this.refresh(true);
                            break;
                        case enums_js_11.MouseMode.Select:
                            this.refresh(true);
                            break;
                        // We are resizing a single box.
                        case enums_js_11.MouseMode.Resize:
                            var selectedView = app_js_10.App.selection.first();
                            if (selectedView instanceof boxView_js_4.BoxView) {
                                selectedView.resize(this.roomHandle, grid_js_1.Grid.snap(x), grid_js_1.Grid.snap(y));
                                this.refresh(true);
                            }
                            break;
                        // We are manipulating a connector endpoint.
                        case enums_js_11.MouseMode.Connect:
                            var connectorView = app_js_10.App.selection.first();
                            // Are we hovering over a room's target handle?
                            // Connect the connector to the handle.
                            if (view instanceof roomView_js_1.RoomView) {
                                var targetHandle = view.isConnectorHandle(x, y);
                                if (targetHandle !== undefined) {
                                    if (this.connectorHandle == enums_js_11.ConnectorHandle.Start) {
                                        connectorView.connector.dockStart = view.room;
                                        connectorView.connector.startDir = targetHandle;
                                    }
                                    else {
                                        connectorView.connector.dockEnd = view.room;
                                        connectorView.connector.endDir = targetHandle;
                                    }
                                }
                            }
                            // Not over a target handle. Just make the line follow
                            // the cursor.
                            else {
                                if (this.connectorHandle == enums_js_11.ConnectorHandle.Start) {
                                    connectorView.connector.dockStart = null;
                                    connectorView.connector.startX = grid_js_1.Grid.snap(x);
                                    connectorView.connector.startY = grid_js_1.Grid.snap(y);
                                }
                                else {
                                    connectorView.connector.dockEnd = null;
                                    connectorView.connector.endX = grid_js_1.Grid.snap(x);
                                    connectorView.connector.endY = grid_js_1.Grid.snap(y);
                                }
                            }
                            this.refresh(true);
                            break;
                    }
                };
                Editor.prototype.canvasMouseUp = function (e) {
                    //
                    // MODE: NONE
                    // - Do nothing
                    //
                    // MODE: SELECT
                    // - Select all views in selection area. Partially selected views are included. Lines are also included.
                    // 
                    // MODE: DRAG
                    // - End drag view mode. Views stay selected
                    //
                    // MODE: RESIZE
                    // - Go to NONE mode
                    // - Room stays selected
                    //
                    // MODE: CONNECT
                    // - Go to NONE mode
                    // - New connection stays selected
                    // 
                    // --------------------------------
                    switch (app_js_10.App.mouseMode) {
                        // Selection mode. Select all views that are in the selection area.
                        case enums_js_11.MouseMode.Select:
                            app_js_10.App.selection.unselectAll();
                            for (var i = 0; i < this.views.length; i++) {
                                if (this.views[i].isIn(this.selX, this.selY, this.selW, this.selH)) {
                                    app_js_10.App.selection.add([this.views[i]]);
                                }
                            }
                            this.refresh(true);
                            break;
                    }
                    app_js_10.App.mainHTMLCanvas.style.cursor = 'default';
                    app_js_10.App.mouseMode = enums_js_11.MouseMode.None;
                };
                Editor.prototype.canvasMouseWheel = function (e) {
                    if (e.deltaY < 0) {
                        this.cmdZoomIn();
                    }
                    if (e.deltaY > 0) {
                        this.cmdZoomOut();
                    }
                };
                //-----------------------------------------
                //
                //             EDITOR COMMANDS
                //
                //-----------------------------------------
                Editor.prototype.cmdSelectAll = function () {
                    app_js_10.App.selection.unselectAll();
                    app_js_10.App.selection.add(this.views);
                    this.refresh(true);
                };
                Editor.prototype.cmdShowPanel = function () {
                    if (app_js_10.App.selection.isSingle()) {
                        dispatcher_js_9.Dispatcher.notify(enums_js_11.AppEvent.More, app_js_10.App.selection.first().getModel());
                    }
                };
                Editor.prototype.cmdReverseConnector = function () {
                    if (app_js_10.App.selection.isSingle() && app_js_10.App.selection.first() instanceof connectorView_js_1.ConnectorView) {
                        var connector = app_js_10.App.selection.first().getModel();
                        if (connector.isDoubleDocked()) {
                            app_js_10.App.pushUndo();
                            connector.reverse();
                            this.refresh(true);
                        }
                    }
                };
                Editor.prototype.cmdToggleDarkness = function () {
                    if (app_js_10.App.selection.isSingle() && app_js_10.App.selection.first() instanceof roomView_js_1.RoomView) {
                        var room = app_js_10.App.selection.first().getModel();
                        app_js_10.App.pushUndo();
                        room.dark = !room.dark;
                        this.refresh(true);
                    }
                };
                Editor.prototype.cmdDelete = function () {
                    if (!app_js_10.App.selection.isEmpty()) {
                        app_js_10.App.pushUndo();
                        var toDelete_1 = new Array();
                        app_js_10.App.selection.get().forEach(function (view) { toDelete_1.push(view); });
                        toDelete_1.forEach(function (view) { view.getModel().delete(); });
                        this.refresh(true);
                    }
                };
                Editor.prototype.cmdUnselectAll = function () {
                    if (!app_js_10.App.selection.isEmpty()) {
                        app_js_10.App.selection.unselectAll();
                        this.refresh(true);
                    }
                };
                Editor.prototype.cmdToggleOneWay = function () {
                    if (app_js_10.App.selection.isSingle() && app_js_10.App.selection.first() instanceof connectorView_js_1.ConnectorView) {
                        var connector = app_js_10.App.selection.first().getModel();
                        app_js_10.App.pushUndo();
                        connector.oneWay = !connector.oneWay;
                        this.refresh(true);
                    }
                };
                Editor.prototype.cmdNewRoomInDir = function (dir) {
                    // Only works if a single room is selected.
                    if (!app_js_10.App.selection.isSingle() || !(app_js_10.App.selection.first() instanceof roomView_js_1.RoomView))
                        return;
                    // Get room model.
                    var room = app_js_10.App.selection.first().getModel();
                    // Abort if there is already a connection in the desired direction.
                    if (room.hasConnection(dir))
                        return;
                    app_js_10.App.pushUndo();
                    // Create new room in the specified direction.
                    var newRoom = new room_js_5.Room(app_js_10.App.map.settings);
                    app_js_10.App.map.add(newRoom);
                    var _a = enums_js_11.Direction.toVector(dir), dx = _a.x, dy = _a.y;
                    newRoom.x = room.x + room.width / 2 + dx * room.width + app_js_10.App.map.settings.grid.size * 2 * dx - newRoom.width / 2;
                    newRoom.y = room.y + room.height / 2 + dy * room.height + app_js_10.App.map.settings.grid.size * 2 * dy - newRoom.height / 2;
                    // Add new room view to editor.
                    this.views.push(viewFactory_js_1.ViewFactory.create(newRoom));
                    // Create connector.
                    var newConnector = new connector_js_6.Connector(app_js_10.App.map.settings);
                    app_js_10.App.map.add(newConnector);
                    newConnector.dockStart = room;
                    newConnector.dockEnd = newRoom;
                    newConnector.startDir = dir;
                    newConnector.endDir = enums_js_11.Direction.opposite(dir);
                    // Add new connector view to editor.
                    this.views.push(viewFactory_js_1.ViewFactory.create(newConnector));
                    this.refresh();
                };
                // 
                // Move the canvas center by (dx, dy)
                Editor.prototype.moveCenter = function (dx, dy) {
                    app_js_10.App.centerX += dx * app_js_10.App.map.settings.grid.size;
                    app_js_10.App.centerY += dy * app_js_10.App.map.settings.grid.size;
                    this.refresh(true);
                };
                Editor.prototype.cmdCopySelection = function () {
                    var _this = this;
                    // Clear the copy list.
                    this.copy.length = 0;
                    // For each non-connector in the selection, create a clone and store it in
                    // the copy list.
                    // The position of the first element in the copy list is saved as "offset",
                    // so that the whole group is offset relative from the center of the viewport.
                    var hasOffset = false;
                    var offsetX = 0;
                    var offsetY = 0;
                    app_js_10.App.selection.get().forEach(function (view) {
                        if (!(view instanceof connectorView_js_1.ConnectorView)) {
                            var box = view.getModel().clone();
                            _this.copy.push(box);
                            if (!hasOffset) {
                                hasOffset = true;
                                offsetX = box.x;
                                offsetY = box.y;
                            }
                            box.x = -app_js_10.App.centerX + box.x - offsetX;
                            box.y = -app_js_10.App.centerY + box.y - offsetY;
                        }
                    });
                    // For each connector in the selection,
                    app_js_10.App.selection.get().forEach(function (view) {
                        if (view instanceof connectorView_js_1.ConnectorView) {
                            var connector = view.getModel();
                            // Check that the connector is connected at both ends to room that
                            // are in the copy list. Otherwise, ignore the connector.
                            var dockStartIdx = -1;
                            var dockEndIdx = -1;
                            var roomIdx = 0;
                            for (var i = 0; i < app_js_10.App.selection.size(); i++) {
                                if (app_js_10.App.selection.get()[i] instanceof roomView_js_1.RoomView) {
                                    var roomView = app_js_10.App.selection.get()[i];
                                    if (connector.dockStart == roomView.getModel())
                                        dockStartIdx = roomIdx;
                                    if (connector.dockEnd == roomView.getModel())
                                        dockEndIdx = roomIdx;
                                    roomIdx++;
                                }
                            }
                            // If the connector is docked to rooms inside the copy list at both ends,
                            // clone it and store it in the copy list, pointing its connections to the
                            // new room clones in the copy list.
                            if (dockStartIdx >= 0 && dockEndIdx >= 0) {
                                var newConnector = connector.clone();
                                newConnector.dockStart = _this.copy[dockStartIdx];
                                newConnector.dockEnd = _this.copy[dockEndIdx];
                                _this.copy.push(newConnector);
                            }
                        }
                    });
                };
                Editor.prototype.cmdPaste = function () {
                    var _this = this;
                    app_js_10.App.pushUndo();
                    // Clear the current selection. The copied elements will be the new selection.
                    app_js_10.App.selection.unselectAll();
                    var viewCount = this.views.length;
                    // For each non-connector in the copy list:
                    this.copy.forEach(function (model) {
                        if (!(model instanceof connector_js_6.Connector)) {
                            // Clone the model and add it to the map:
                            var newModel = model.clone();
                            newModel.x += grid_js_1.Grid.snap(_this.mouseX);
                            newModel.y += grid_js_1.Grid.snap(_this.mouseY);
                            app_js_10.App.map.add(newModel);
                            // Create a view and add it to the selection:
                            var view = viewFactory_js_1.ViewFactory.create(newModel);
                            _this.views.push(view);
                            app_js_10.App.selection.add([view]);
                        }
                    });
                    // For each connector in the copy list:
                    this.copy.forEach(function (model) {
                        if (model instanceof connector_js_6.Connector) {
                            var connector = model;
                            // For each end, find the index of the Room it is connected to in the copy list.
                            var dockStartIdx = 0;
                            var dockEndIdx = 0;
                            var roomIdx = 0;
                            for (var i = 0; i < _this.copy.length; i++) {
                                if (!(_this.copy[i] instanceof room_js_5.Room))
                                    continue;
                                if (connector.dockStart == _this.copy[i])
                                    dockStartIdx = viewCount + roomIdx;
                                if (connector.dockEnd == _this.copy[i])
                                    dockEndIdx = viewCount + roomIdx;
                                roomIdx++;
                            }
                            // Actually copy the connector, and connect it to the copied rooms.
                            var newConnector = connector.clone();
                            app_js_10.App.map.add(newConnector);
                            newConnector.dockStart = _this.views[dockStartIdx].getModel();
                            newConnector.dockEnd = _this.views[dockEndIdx].getModel();
                            // Create a view and add it to the selection:
                            var view = viewFactory_js_1.ViewFactory.create(newConnector);
                            _this.views.push(view);
                            app_js_10.App.selection.add([view]);
                        }
                    });
                    this.refresh(true);
                };
                // Zoom = 1 is the standard zoom level.
                // Under 1, zoom is multiplied by a fraction (zoomFraction)
                // Above 1, zoom is increased by an addition (zoomAdditive)
                // This seems to give the smoothest result without giant steps
                // at higher/lower zoom levels.  
                Editor.prototype.updateZoomPercentage = function () {
                    this.ctrlZoom.value = Math.floor(app_js_10.App.zoom * 100) + '%';
                };
                Editor.prototype.cmdZoom = function () {
                    var zoomStr = this.ctrlZoom.value;
                    // Remove percentage sign if present
                    zoomStr.replace('%', ' ');
                    // Convert to number. Ignore result on failure.
                    var zoomPercentage = parseFloat(zoomStr);
                    if (!isNaN(zoomPercentage)) {
                        // Set zoom level (clamp range)
                        app_js_10.App.zoom = zoomPercentage / 100;
                        if (app_js_10.App.zoom >= 10)
                            app_js_10.App.zoom = 10;
                        if (app_js_10.App.zoom <= 0.1)
                            app_js_10.App.zoom = 0.1;
                    }
                    // Place new zoom percentage in control.
                    this.updateZoomPercentage();
                    this.refresh(true);
                };
                Editor.prototype.cmdZoomIn = function () {
                    if (app_js_10.App.zoom < 1) {
                        app_js_10.App.zoom = app_js_10.App.zoom * enums_js_11.Values.ZOOM_FRACTION;
                    }
                    else {
                        app_js_10.App.zoom += enums_js_11.Values.ZOOM_ADDITIVE;
                    }
                    // Clamp zoom level
                    if (app_js_10.App.zoom >= 10)
                        app_js_10.App.zoom = 10;
                    if (app_js_10.App.zoom <= 0.1)
                        app_js_10.App.zoom = 0.1;
                    this.updateZoomPercentage();
                    this.refresh(true);
                };
                Editor.prototype.cmdZoomOut = function () {
                    if (app_js_10.App.zoom <= 1) {
                        app_js_10.App.zoom = app_js_10.App.zoom / enums_js_11.Values.ZOOM_FRACTION;
                    }
                    else {
                        app_js_10.App.zoom -= enums_js_11.Values.ZOOM_ADDITIVE;
                    }
                    // Clamp zoom level
                    if (app_js_10.App.zoom >= 10)
                        app_js_10.App.zoom = 10;
                    if (app_js_10.App.zoom <= 0.1)
                        app_js_10.App.zoom = 0.1;
                    this.updateZoomPercentage();
                    this.refresh(true);
                };
                Editor.prototype.cmdZoomNormal = function () {
                    app_js_10.App.zoom = 1;
                    this.updateZoomPercentage();
                    this.refresh(true);
                };
                Editor.prototype.cmdCenterView = function () {
                    app_js_10.App.centerX = 0;
                    app_js_10.App.centerY = 0;
                    this.refresh(true);
                };
                Editor.prototype.cmdAddRoom = function () {
                    app_js_10.App.pushUndo();
                    var room = new room_js_5.Room(app_js_10.App.map.settings);
                    app_js_10.App.map.add(room);
                    room.x = grid_js_1.Grid.snap(this.mouseX);
                    room.y = grid_js_1.Grid.snap(this.mouseY);
                    this.views.push(viewFactory_js_1.ViewFactory.create(room));
                    if (this.roomsPlaced == 0) {
                        controls_js_7.IdToast.toast("Room details", "You've placed your first room. You can edit its <b>details</b> by clicking it once (room popup) or double-clicking it (room details panel).");
                    }
                    if (this.roomsPlaced == 1) {
                        controls_js_7.IdToast.toast("Connecting rooms", "Now that you've placed multiple rooms, you can create <b>connections</b> between them. Select a source room and create a connection to a target room by dragging a line from the little connector circles.");
                    }
                    this.roomsPlaced++;
                    this.refresh();
                };
                Editor.prototype.cmdAddNote = function () {
                    app_js_10.App.pushUndo();
                    var note = new note_js_4.Note(app_js_10.App.map.settings);
                    app_js_10.App.map.add(note);
                    note.x = grid_js_1.Grid.snap(this.mouseX);
                    note.y = grid_js_1.Grid.snap(this.mouseY);
                    this.views.push(viewFactory_js_1.ViewFactory.create(note));
                    this.refresh();
                };
                Editor.prototype.cmdAddBlock = function () {
                    app_js_10.App.pushUndo();
                    var block = new block_js_4.Block(app_js_10.App.map.settings);
                    app_js_10.App.map.add(block);
                    block.x = grid_js_1.Grid.snap(this.mouseX);
                    block.y = grid_js_1.Grid.snap(this.mouseY);
                    this.views.push(viewFactory_js_1.ViewFactory.create(block));
                    this.refresh();
                };
                return Editor;
            }());
            exports_85("Editor", Editor);
        }
    };
});
System.register("popups/popup", ["app"], function (exports_86, context_86) {
    "use strict";
    var app_3, Popup;
    var __moduleName = context_86 && context_86.id;
    return {
        setters: [
            function (app_3_1) {
                app_3 = app_3_1;
            }
        ],
        execute: function () {
            Popup = /** @class */ (function () {
                function Popup(id, template, args) {
                    this.id = id;
                    this.elem = document.getElementById(id);
                    this.elem.innerHTML = template(args);
                }
                Popup.prototype.showAt = function (x, y) {
                    this.elem.style.left = app_3.App.mainHTMLCanvas.offsetWidth / 2 + app_3.App.centerX + x * app_3.App.zoom + "px";
                    this.elem.style.top = app_3.App.mainHTMLCanvas.offsetHeight / 2 + app_3.App.centerY + y * app_3.App.zoom - 32 + "px";
                    this.elem.style.display = 'flex';
                    // Close any open overlays inside popup.
                    var overlays = this.elem.querySelectorAll(".popup-overlay");
                    for (var i = 0; i < overlays.length; i++) {
                        overlays[i].style.display = 'none';
                    }
                };
                Popup.prototype.hide = function () {
                    this.elem.style.display = 'none';
                };
                return Popup;
            }());
            exports_86("Popup", Popup);
        }
    };
});
System.register("popups/blockPopup/blockPopup", ["app", "dispatcher", "enums/enums", "views/blockView", "popups/popups", "controls/controls"], function (exports_87, context_87) {
    "use strict";
    var app_js_11, dispatcher_js_10, enums_js_12, blockView_js_2, popups_js_1, controls_js_8, BlockPopup;
    var __moduleName = context_87 && context_87.id;
    return {
        setters: [
            function (app_js_11_1) {
                app_js_11 = app_js_11_1;
            },
            function (dispatcher_js_10_1) {
                dispatcher_js_10 = dispatcher_js_10_1;
            },
            function (enums_js_12_1) {
                enums_js_12 = enums_js_12_1;
            },
            function (blockView_js_2_1) {
                blockView_js_2 = blockView_js_2_1;
            },
            function (popups_js_1_1) {
                popups_js_1 = popups_js_1_1;
            },
            function (controls_js_8_1) {
                controls_js_8 = controls_js_8_1;
            }
        ],
        execute: function () {
            BlockPopup = /** @class */ (function (_super) {
                __extends(BlockPopup, _super);
                function BlockPopup() {
                    var _this = _super.call(this, 'blockpopup', Handlebars.templates.blockPopup, { colors: enums_js_12.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_10.Dispatcher.subscribe(_this);
                    new controls_js_8.IdPopup('.js-fill', _this.elem);
                    new controls_js_8.IdPopup('.js-line', _this.elem);
                    new controls_js_8.IdPopup('.js-position', _this.elem);
                    new controls_js_8.IdPopup('.js-delete', _this.elem).addEventListener('click', function () { _this.delete(); });
                    new controls_js_8.IdPopup('.js-more', _this.elem).addEventListener('click', function () { _this.showMore(); });
                    _this.ctrlColor = new controls_js_8.IdQuickColor('.js-color', _this.elem).addEventListener('change', function () { _this.block.fillColor = _this.ctrlColor.value; });
                    _this.ctrlLineStyle = new controls_js_8.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.block.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLinewidth = new controls_js_8.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.block.lineWidth = _this.ctrlLinewidth.value; });
                    _this.elem.querySelector('.js-front').addEventListener('click', function () {
                        _this.block.bringToFront();
                        dispatcher_js_10.Dispatcher.notify(enums_js_12.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-forward').addEventListener('click', function () {
                        _this.block.bringForward();
                        dispatcher_js_10.Dispatcher.notify(enums_js_12.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-backward').addEventListener('click', function () {
                        _this.block.sendBackward();
                        dispatcher_js_10.Dispatcher.notify(enums_js_12.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-back').addEventListener('click', function () {
                        _this.block.sendToBack();
                        dispatcher_js_10.Dispatcher.notify(enums_js_12.AppEvent.Refresh, null);
                    });
                    return _this;
                }
                BlockPopup.prototype.notify = function (event, model) {
                    if (event == enums_js_12.AppEvent.MouseMove || event == enums_js_12.AppEvent.Select)
                        this.toggle();
                };
                BlockPopup.prototype.delete = function () {
                    app_js_11.App.pushUndo();
                    this.block.delete();
                    this.toggle();
                };
                BlockPopup.prototype.showMore = function () {
                    dispatcher_js_10.Dispatcher.notify(enums_js_12.AppEvent.More, this.block);
                };
                BlockPopup.prototype.toggle = function () {
                    if (app_js_11.App.selection.isSingle() && app_js_11.App.selection.first() instanceof blockView_js_2.BlockView && app_js_11.App.mouseMode == enums_js_12.MouseMode.None) {
                        this.block = app_js_11.App.selection.first().getModel();
                        this.showAt(this.block.x, this.block.y);
                        this.ctrlLineStyle.value = this.block.lineStyle;
                        this.ctrlLinewidth.value = this.block.lineWidth;
                    }
                    else {
                        this.hide();
                    }
                };
                return BlockPopup;
            }(popups_js_1.Popup));
            exports_87("BlockPopup", BlockPopup);
        }
    };
});
System.register("popups/connectorPopup/connectorPopup", ["app", "dispatcher", "enums/enums", "views/connectorView", "popups/popups", "controls/controls"], function (exports_88, context_88) {
    "use strict";
    var app_js_12, dispatcher_js_11, enums_js_13, connectorView_js_2, popups_js_2, controls_js_9, ConnectorPopup;
    var __moduleName = context_88 && context_88.id;
    return {
        setters: [
            function (app_js_12_1) {
                app_js_12 = app_js_12_1;
            },
            function (dispatcher_js_11_1) {
                dispatcher_js_11 = dispatcher_js_11_1;
            },
            function (enums_js_13_1) {
                enums_js_13 = enums_js_13_1;
            },
            function (connectorView_js_2_1) {
                connectorView_js_2 = connectorView_js_2_1;
            },
            function (popups_js_2_1) {
                popups_js_2 = popups_js_2_1;
            },
            function (controls_js_9_1) {
                controls_js_9 = controls_js_9_1;
            }
        ],
        execute: function () {
            ConnectorPopup = /** @class */ (function (_super) {
                __extends(ConnectorPopup, _super);
                function ConnectorPopup() {
                    var _this = _super.call(this, 'connectorpopup', Handlebars.templates.connectorPopup, { colors: enums_js_13.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_11.Dispatcher.subscribe(_this);
                    new controls_js_9.IdPopup('.js-fill', _this.elem);
                    new controls_js_9.IdPopup('.js-line', _this.elem);
                    new controls_js_9.IdPopup('.js-basic', _this.elem);
                    new controls_js_9.IdPopup('.js-delete', _this.elem).addEventListener('click', function () { _this.delete(); });
                    new controls_js_9.IdPopup('.js-more', _this.elem).addEventListener('click', function () { _this.showMore(); });
                    _this.ctrlName = new controls_js_9.IdInput('.js-name', _this.elem).addEventListener('input', function () { _this.connector.name = _this.ctrlName.value; });
                    _this.ctrlColor = new controls_js_9.IdQuickColor('.js-color', _this.elem).addEventListener('change', function () { _this.connector.color = _this.ctrlColor.value; });
                    _this.ctrlLineStyle = new controls_js_9.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.connector.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLinewidth = new controls_js_9.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.connector.lineWidth = _this.ctrlLinewidth.value; });
                    return _this;
                }
                ConnectorPopup.prototype.notify = function (event, model) {
                    if (event == enums_js_13.AppEvent.MouseMove || event == enums_js_13.AppEvent.Select)
                        this.toggle();
                };
                ConnectorPopup.prototype.delete = function () {
                    app_js_12.App.pushUndo();
                    this.connector.delete();
                    this.toggle();
                };
                ConnectorPopup.prototype.showMore = function () {
                    dispatcher_js_11.Dispatcher.notify(enums_js_13.AppEvent.More, this.connector);
                };
                ConnectorPopup.prototype.toggle = function () {
                    if (app_js_12.App.selection.isSingle() && app_js_12.App.selection.first() instanceof connectorView_js_2.ConnectorView && app_js_12.App.mouseMode == enums_js_13.MouseMode.None) {
                        this.connector = app_js_12.App.selection.first().getModel();
                        var x = this.connector.dockStart ? this.connector.dockStart.x : this.connector.startX;
                        var y = this.connector.dockStart ? this.connector.dockStart.y : this.connector.startY;
                        this.showAt(x, y);
                        this.ctrlName.value = this.connector.name;
                        this.ctrlLineStyle.value = this.connector.lineStyle;
                        this.ctrlLinewidth.value = this.connector.lineWidth;
                    }
                    else {
                        this.hide();
                    }
                };
                return ConnectorPopup;
            }(popups_js_2.Popup));
            exports_88("ConnectorPopup", ConnectorPopup);
        }
    };
});
System.register("popups/notePopup/notePopup", ["app", "dispatcher", "enums/enums", "views/noteView", "popups/popups", "controls/controls"], function (exports_89, context_89) {
    "use strict";
    var app_js_13, dispatcher_js_12, enums_js_14, noteView_js_2, popups_js_3, controls_js_10, NotePopup;
    var __moduleName = context_89 && context_89.id;
    return {
        setters: [
            function (app_js_13_1) {
                app_js_13 = app_js_13_1;
            },
            function (dispatcher_js_12_1) {
                dispatcher_js_12 = dispatcher_js_12_1;
            },
            function (enums_js_14_1) {
                enums_js_14 = enums_js_14_1;
            },
            function (noteView_js_2_1) {
                noteView_js_2 = noteView_js_2_1;
            },
            function (popups_js_3_1) {
                popups_js_3 = popups_js_3_1;
            },
            function (controls_js_10_1) {
                controls_js_10 = controls_js_10_1;
            }
        ],
        execute: function () {
            NotePopup = /** @class */ (function (_super) {
                __extends(NotePopup, _super);
                function NotePopup() {
                    var _this = _super.call(this, 'notepopup', Handlebars.templates.notePopup, { colors: enums_js_14.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_12.Dispatcher.subscribe(_this);
                    new controls_js_10.IdPopup('.js-basic', _this.elem);
                    new controls_js_10.IdPopup('.js-fill', _this.elem);
                    new controls_js_10.IdPopup('.js-line', _this.elem);
                    new controls_js_10.IdPopup('.js-position', _this.elem);
                    new controls_js_10.IdPopup('.js-delete', _this.elem).addEventListener('click', function () { _this.delete(); });
                    new controls_js_10.IdPopup('.js-more', _this.elem).addEventListener('click', function () { _this.showMore(); });
                    _this.ctrlText = new controls_js_10.IdInput('.js-text', _this.elem).addEventListener('input', function () { _this.note.text = _this.ctrlText.value; });
                    _this.ctrlColor = new controls_js_10.IdQuickColor('.js-color', _this.elem).addEventListener('change', function () { _this.note.fillColor = _this.ctrlColor.value; });
                    _this.ctrlLineStyle = new controls_js_10.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.note.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLinewidth = new controls_js_10.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.note.lineWidth = _this.ctrlLinewidth.value; });
                    _this.elem.querySelector('.js-front').addEventListener('click', function () {
                        _this.note.bringToFront();
                        dispatcher_js_12.Dispatcher.notify(enums_js_14.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-forward').addEventListener('click', function () {
                        _this.note.bringForward();
                        dispatcher_js_12.Dispatcher.notify(enums_js_14.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-backward').addEventListener('click', function () {
                        _this.note.sendBackward();
                        dispatcher_js_12.Dispatcher.notify(enums_js_14.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-back').addEventListener('click', function () {
                        _this.note.sendToBack();
                        dispatcher_js_12.Dispatcher.notify(enums_js_14.AppEvent.Refresh, null);
                    });
                    return _this;
                }
                NotePopup.prototype.notify = function (event, model) {
                    if (event == enums_js_14.AppEvent.MouseMove || event == enums_js_14.AppEvent.Select)
                        this.toggle();
                };
                NotePopup.prototype.delete = function () {
                    app_js_13.App.pushUndo();
                    this.note.delete();
                    this.toggle();
                };
                NotePopup.prototype.showMore = function () {
                    dispatcher_js_12.Dispatcher.notify(enums_js_14.AppEvent.More, this.note);
                };
                NotePopup.prototype.toggle = function () {
                    if (app_js_13.App.selection.isSingle() && app_js_13.App.selection.first() instanceof noteView_js_2.NoteView && app_js_13.App.mouseMode == enums_js_14.MouseMode.None) {
                        this.note = app_js_13.App.selection.first().getModel();
                        this.showAt(this.note.x, this.note.y);
                        this.ctrlText.value = this.note.text;
                        this.ctrlLineStyle.value = this.note.lineStyle;
                        this.ctrlLinewidth.value = this.note.lineWidth;
                    }
                    else {
                        this.hide();
                    }
                };
                return NotePopup;
            }(popups_js_3.Popup));
            exports_89("NotePopup", NotePopup);
        }
    };
});
System.register("popups/roomPopup/roomPopup", ["app", "dispatcher", "enums/enums", "views/roomView", "popups/popups", "controls/controls"], function (exports_90, context_90) {
    "use strict";
    var app_js_14, dispatcher_js_13, enums_js_15, roomView_js_2, popups_js_4, controls_js_11, RoomPopup;
    var __moduleName = context_90 && context_90.id;
    return {
        setters: [
            function (app_js_14_1) {
                app_js_14 = app_js_14_1;
            },
            function (dispatcher_js_13_1) {
                dispatcher_js_13 = dispatcher_js_13_1;
            },
            function (enums_js_15_1) {
                enums_js_15 = enums_js_15_1;
            },
            function (roomView_js_2_1) {
                roomView_js_2 = roomView_js_2_1;
            },
            function (popups_js_4_1) {
                popups_js_4 = popups_js_4_1;
            },
            function (controls_js_11_1) {
                controls_js_11 = controls_js_11_1;
            }
        ],
        execute: function () {
            RoomPopup = /** @class */ (function (_super) {
                __extends(RoomPopup, _super);
                function RoomPopup() {
                    var _this = _super.call(this, 'roompopup', Handlebars.templates.roomPopup, { colors: enums_js_15.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_13.Dispatcher.subscribe(_this);
                    new controls_js_11.IdPopup('.js-basic', _this.elem);
                    new controls_js_11.IdPopup('.js-fill', _this.elem);
                    new controls_js_11.IdPopup('.js-border', _this.elem);
                    new controls_js_11.IdPopup('.js-position', _this.elem);
                    new controls_js_11.IdPopup('.js-delete', _this.elem).addEventListener('click', function () { _this.delete(); });
                    new controls_js_11.IdPopup('.js-more', _this.elem).addEventListener('click', function () { _this.showMore(); }, false);
                    _this.elem.querySelector('.js-front').addEventListener('click', function () {
                        _this.room.bringToFront();
                        dispatcher_js_13.Dispatcher.notify(enums_js_15.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-forward').addEventListener('click', function () {
                        _this.room.bringForward();
                        dispatcher_js_13.Dispatcher.notify(enums_js_15.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-backward').addEventListener('click', function () {
                        _this.room.sendBackward();
                        dispatcher_js_13.Dispatcher.notify(enums_js_15.AppEvent.Refresh, null);
                    });
                    _this.elem.querySelector('.js-back').addEventListener('click', function () {
                        _this.room.sendToBack();
                        dispatcher_js_13.Dispatcher.notify(enums_js_15.AppEvent.Refresh, null);
                    });
                    _this.ctrlName = new controls_js_11.IdInput('.js-name', _this.elem).addEventListener('input', function () { _this.room.name = _this.ctrlName.value; });
                    _this.ctrlSubtitle = new controls_js_11.IdInput('.js-subtitle', _this.elem).addEventListener('input', function () { _this.room.subtitle = _this.ctrlSubtitle.value; });
                    _this.ctrlColor = new controls_js_11.IdQuickColor('.js-color', _this.elem).addEventListener('change', function () { _this.room.fillColor = _this.ctrlColor.value; });
                    _this.ctrlLineStyle = new controls_js_11.IdLineStyle('.js-linestyle', _this.elem).addEventListener('change', function () { _this.room.lineStyle = _this.ctrlLineStyle.value; });
                    _this.ctrlLinewidth = new controls_js_11.IdRange('.js-linewidth', _this.elem).addEventListener('input', function () { _this.room.lineWidth = _this.ctrlLinewidth.value; });
                    return _this;
                }
                RoomPopup.prototype.notify = function (event, model) {
                    if (event == enums_js_15.AppEvent.MouseMove || event == enums_js_15.AppEvent.Select)
                        this.toggle();
                };
                RoomPopup.prototype.delete = function () {
                    app_js_14.App.pushUndo();
                    this.room.delete();
                    this.toggle();
                };
                RoomPopup.prototype.showMore = function () {
                    dispatcher_js_13.Dispatcher.notify(enums_js_15.AppEvent.More, this.room);
                };
                RoomPopup.prototype.toggle = function () {
                    if (app_js_14.App.selection.isSingle() && app_js_14.App.selection.first() instanceof roomView_js_2.RoomView && app_js_14.App.mouseMode == enums_js_15.MouseMode.None) {
                        this.room = app_js_14.App.selection.first().getModel();
                        this.showAt(this.room.x, this.room.y);
                        this.ctrlLineStyle.value = this.room.lineStyle;
                        this.ctrlLinewidth.value = this.room.lineWidth;
                        this.ctrlName.value = this.room.name;
                        this.ctrlSubtitle.value = this.room.subtitle;
                    }
                    else {
                        this.hide();
                    }
                };
                return RoomPopup;
            }(popups_js_4.Popup));
            exports_90("RoomPopup", RoomPopup);
        }
    };
});
System.register("popups/popups", ["popups/popup", "popups/blockPopup/blockPopup", "popups/connectorPopup/connectorPopup", "popups/notePopup/notePopup", "popups/roomPopup/roomPopup"], function (exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    function exportStar_7(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_91(exports);
    }
    return {
        setters: [
            function (popup_js_1_1) {
                exportStar_7(popup_js_1_1);
            },
            function (blockPopup_js_1_1) {
                exportStar_7(blockPopup_js_1_1);
            },
            function (connectorPopup_js_1_1) {
                exportStar_7(connectorPopup_js_1_1);
            },
            function (notePopup_js_1_1) {
                exportStar_7(notePopup_js_1_1);
            },
            function (roomPopup_js_1_1) {
                exportStar_7(roomPopup_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("selection", ["dispatcher", "enums/enums"], function (exports_92, context_92) {
    "use strict";
    var dispatcher_js_14, enums_js_16, Selection;
    var __moduleName = context_92 && context_92.id;
    return {
        setters: [
            function (dispatcher_js_14_1) {
                dispatcher_js_14 = dispatcher_js_14_1;
            },
            function (enums_js_16_1) {
                enums_js_16 = enums_js_16_1;
            }
        ],
        execute: function () {
            //
            // Selection wraps the selection of Views in the app.
            // 
            Selection = /** @class */ (function () {
                function Selection() {
                    this.list = new Array();
                }
                // Is this a selection with no elements?
                Selection.prototype.isEmpty = function () {
                    return this.list.length == 0;
                };
                // Is this a selection with only one element?
                Selection.prototype.isSingle = function () {
                    return this.list.length == 1;
                };
                // Is this a selection with more than one element?
                Selection.prototype.isMultiple = function () {
                    return this.list.length > 1;
                };
                // Returns the number of elements in the selection.
                Selection.prototype.size = function () {
                    return this.list.length;
                };
                // Returns the first element in the selection.
                Selection.prototype.first = function () {
                    return this.list[0];
                };
                // Returns the selection as an array, so it can be looped over.
                Selection.prototype.get = function () {
                    return this.list;
                };
                // Clear the selection, without calling unselect() on its Views
                Selection.prototype.clear = function () {
                    this.list.length = 0;
                };
                // Clear the selection. Unselect is called on each View and a Select event is broadcast.
                Selection.prototype.unselectAll = function () {
                    this.list.forEach(function (view) { view.unselect(); });
                    this.list.length = 0;
                    dispatcher_js_14.Dispatcher.notify(enums_js_16.AppEvent.Select, null);
                };
                // Select is called on each View in selection.
                Selection.prototype.selectAll = function () {
                    this.list.forEach(function (view) { view.select(); });
                };
                // Select a view, clearing the selection first.
                Selection.prototype.select = function (view) {
                    this.unselectAll();
                    this.add([view]);
                };
                // Add an array of views to the selection.
                Selection.prototype.add = function (views) {
                    var _this = this;
                    views.forEach(function (view) {
                        view.select();
                        _this.list.push(view);
                    });
                    // Notify subscribers only if at least one view as selected.
                    if (views.length > 0) {
                        dispatcher_js_14.Dispatcher.notify(enums_js_16.AppEvent.Select, views[0].getModel());
                    }
                };
                return Selection;
            }());
            exports_92("Selection", Selection);
        }
    };
});
//
// Window class.
//
// Open a window by creating an instance of the Window class:
//
//     new Window('Error', 'An error occurred.', true, false);
//
// If the onOK argument is true, there will be an OK button. If the 
// onCancel argument is true, then there will be a cancel button.
// Any button closes the window when clicked.
//
// onOK and onCancel can also be functions. In this case, the function
// is called when the button is clicked (and the window also closes):
//
//     new Window('Delete room?', 'Are you sure...', () => { ... }, false);
//
System.register("controls/header", [], function (exports_93, context_93) {
    "use strict";
    var Header;
    var __moduleName = context_93 && context_93.id;
    return {
        setters: [],
        execute: function () {//
            // Window class.
            //
            // Open a window by creating an instance of the Window class:
            //
            //     new Window('Error', 'An error occurred.', true, false);
            //
            // If the onOK argument is true, there will be an OK button. If the 
            // onCancel argument is true, then there will be a cancel button.
            // Any button closes the window when clicked.
            //
            // onOK and onCancel can also be functions. In this case, the function
            // is called when the button is clicked (and the window also closes):
            //
            //     new Window('Delete room?', 'Are you sure...', () => { ... }, false);
            //
            Header = /** @class */ (function () {
                function Header(title, content) {
                    this.elem = document.getElementById('app-header');
                    this._title = this.elem.querySelector('#title');
                    this._content = this.elem.querySelector('#content');
                    this.title = title;
                    this.content = content;
                }
                Object.defineProperty(Header.prototype, "title", {
                    get: function () {
                        return this._title.innerHTML;
                    },
                    set: function (val) {
                        this._title.innerHTML = val || 'Trizbort.io';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Header.prototype, "content", {
                    get: function () {
                        return this._content.innerHTML;
                    },
                    set: function (val) {
                        this._content.innerHTML = val || '';
                    },
                    enumerable: true,
                    configurable: true
                });
                return Header;
            }());
            exports_93("Header", Header);
        }
    };
});
System.register("app", ["enums/Values", "models/map", "dispatcher", "enums/enums", "editor", "controls/controls", "popups/popups", "panels/panels", "io/mapJSON", "selection", "controls/header"], function (exports_94, context_94) {
    "use strict";
    var Values_1, map_js_5, dispatcher_js_15, enums_js_17, editor_js_1, controls_js_12, popups_js_5, panels_js_7, mapJSON_js_2, selection_js_1, header_js_1, App;
    var __moduleName = context_94 && context_94.id;
    return {
        setters: [
            function (Values_1_1) {
                Values_1 = Values_1_1;
            },
            function (map_js_5_1) {
                map_js_5 = map_js_5_1;
            },
            function (dispatcher_js_15_1) {
                dispatcher_js_15 = dispatcher_js_15_1;
            },
            function (enums_js_17_1) {
                enums_js_17 = enums_js_17_1;
            },
            function (editor_js_1_1) {
                editor_js_1 = editor_js_1_1;
            },
            function (controls_js_12_1) {
                controls_js_12 = controls_js_12_1;
            },
            function (popups_js_5_1) {
                popups_js_5 = popups_js_5_1;
            },
            function (panels_js_7_1) {
                panels_js_7 = panels_js_7_1;
            },
            function (mapJSON_js_2_1) {
                mapJSON_js_2 = mapJSON_js_2_1;
            },
            function (selection_js_1_1) {
                selection_js_1 = selection_js_1_1;
            },
            function (header_js_1_1) {
                header_js_1 = header_js_1_1;
            }
        ],
        execute: function () {
            App = /** @class */ (function () {
                function App() {
                }
                App.initialize = function () {
                    App.mainHTMLCanvas = document.getElementById('main-canvas');
                    App.bgHTMLCanvas = document.getElementById('bg-canvas');
                    App.selection = new selection_js_1.Selection();
                    // Intialize GUI components:
                    App.createComponents();
                    controls_js_12.Tabs.initialize();
                };
                // Create all GUI components:
                App.createComponents = function () {
                    new editor_js_1.Editor();
                    new panels_js_7.RenderPanel();
                    new panels_js_7.MapPanel();
                    new panels_js_7.MenuPanel();
                    new panels_js_7.NotePanel();
                    new popups_js_5.NotePopup();
                    new panels_js_7.ToolPanel();
                    new panels_js_7.BlockPanel();
                    new popups_js_5.RoomPopup();
                    new panels_js_7.RoomPanel();
                    new popups_js_5.BlockPopup();
                    new panels_js_7.ConnectorPanel();
                    new popups_js_5.ConnectorPopup();
                    controls_js_12.IdToast.toast("Welcome to Trizbort.io!", "To start building your map, click the <b>room icon</b> in the left-hand bar and click anywhere on the map to place your first room.");
                };
                App.pushUndo = function () {
                    this.undoStack.push(mapJSON_js_2.MapJSON.save(this.map));
                    if (this.undoStack.length > 100) {
                        this.undoStack.shift();
                    }
                };
                App.undo = function () {
                    if (this.undoStack.length == 0)
                        return;
                    var json = this.undoStack.pop();
                    this.map = mapJSON_js_2.MapJSON.load(json);
                    dispatcher_js_15.Dispatcher.notify(enums_js_17.AppEvent.Refresh, null);
                };
                App.author = function (val) {
                    return (val ? 'A map by ' + val : '');
                };
                App.getNewViewId = function () {
                    return ++this.viewID;
                };
                // - App holds the current map.
                // - App holds the current zoom and view center
                //   so that GUI components may access and change them globally.
                // - App also manages the selection of views.
                App.map = new map_js_5.Map();
                App.zoom = 1;
                App.centerX = 0;
                App.centerY = 0;
                App.mouseMode = enums_js_17.MouseMode.None;
                App.undoStack = new Array();
                App.header = new header_js_1.Header();
                App.viewID = Values_1.Values.VIEWS_FIRSTID;
                return App;
            }());
            exports_94("App", App);
        }
    };
});
//# sourceMappingURL=app.js.map