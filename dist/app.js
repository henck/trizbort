var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("enums/appEvent", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppEvent;
    return {
        setters: [],
        execute: function () {
            (function (AppEvent) {
                AppEvent[AppEvent["Select"] = 0] = "Select";
                AppEvent[AppEvent["MouseMove"] = 1] = "MouseMove";
                AppEvent[AppEvent["Delete"] = 2] = "Delete";
                AppEvent[AppEvent["Load"] = 3] = "Load";
                AppEvent[AppEvent["More"] = 4] = "More";
            })(AppEvent || (AppEvent = {}));
            exports_1("AppEvent", AppEvent);
        }
    };
});
System.register("dispatcher", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Dispatcher;
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
            exports_2("Dispatcher", Dispatcher);
        }
    };
});
System.register("io/xmlMap", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function Xml(path, defaultValue, transform) {
        return function (target, propertyKey) {
            XmlMap.addField(target, propertyKey, path, defaultValue, transform);
        };
    }
    exports_3("Xml", Xml);
    var XmlField, XmlMap;
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
            exports_3("XmlMap", XmlMap);
        }
    };
});
System.register("models/model", ["dispatcher", "enums/appEvent", "io/xmlMap"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var dispatcher_js_1, appEvent_js_1, xmlMap_1, Model;
    return {
        setters: [
            function (dispatcher_js_1_1) {
                dispatcher_js_1 = dispatcher_js_1_1;
            },
            function (appEvent_js_1_1) {
                appEvent_js_1 = appEvent_js_1_1;
            },
            function (xmlMap_1_1) {
                xmlMap_1 = xmlMap_1_1;
            }
        ],
        execute: function () {
            Model = /** @class */ (function () {
                function Model() {
                    this.id = 0;
                }
                Model.prototype.getType = function () {
                    return this.type;
                };
                Model.prototype.delete = function () {
                    this.map.remove(this);
                    dispatcher_js_1.Dispatcher.notify(appEvent_js_1.AppEvent.Delete, this);
                };
                Model.prototype.cloneToTarget = function (target) {
                    for (var key in this) {
                        if (this.hasOwnProperty(key)) {
                            target[key] = this[key];
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
                __decorate([
                    xmlMap_1.Xml('id', 0, function (s) { return parseInt(s); })
                ], Model.prototype, "id", void 0);
                return Model;
            }());
            exports_4("Model", Model);
        }
    };
});
System.register("enums/direction", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Direction;
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
            exports_5("Direction", Direction);
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
            exports_5("Direction", Direction);
        }
    };
});
System.register("enums/connectorHandle", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var ConnectorHandle;
    return {
        setters: [],
        execute: function () {
            (function (ConnectorHandle) {
                ConnectorHandle[ConnectorHandle["Start"] = 0] = "Start";
                ConnectorHandle[ConnectorHandle["End"] = 1] = "End";
            })(ConnectorHandle || (ConnectorHandle = {}));
            exports_6("ConnectorHandle", ConnectorHandle);
        }
    };
});
System.register("enums/connectorType", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var ConnectorType;
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
            exports_7("ConnectorType", ConnectorType);
            (function (ConnectorType) {
                function toString(type) {
                    switch (type) {
                        case ConnectorType.In: return 'in';
                        case ConnectorType.Out: return 'out';
                        case ConnectorType.Up: return 'u';
                        case ConnectorType.Down: return 'd';
                        default:
                            return '';
                    }
                }
                ConnectorType.toString = toString;
            })(ConnectorType || (ConnectorType = {}));
            exports_7("ConnectorType", ConnectorType);
        }
    };
});
System.register("enums/lineStyle", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var LineStyle;
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
            exports_8("LineStyle", LineStyle);
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
            exports_8("LineStyle", LineStyle);
        }
    };
});
System.register("enums/mouseMode", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var MouseMode;
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
            exports_9("MouseMode", MouseMode);
        }
    };
});
System.register("enums/roomShape", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var RoomShape;
    return {
        setters: [],
        execute: function () {
            (function (RoomShape) {
                RoomShape[RoomShape["Rectangle"] = 0] = "Rectangle";
                RoomShape[RoomShape["Ellipse"] = 1] = "Ellipse";
                RoomShape[RoomShape["Octagon"] = 2] = "Octagon";
            })(RoomShape || (RoomShape = {}));
            exports_10("RoomShape", RoomShape);
        }
    };
});
System.register("enums/values", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var Values;
    return {
        setters: [],
        execute: function () {
            Values = /** @class */ (function () {
                function Values() {
                }
                Values.ZOOM_FRACTION = 1.2;
                Values.ZOOM_ADDITIVE = 0.5;
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
                Values.BITMAP_ASSETS = ["paper", "metal", "wood"];
                return Values;
            }());
            exports_11("Values", Values);
        }
    };
});
System.register("enums/enums", ["enums/appEvent", "enums/direction", "enums/connectorHandle", "enums/connectorType", "enums/lineStyle", "enums/mouseMode", "enums/roomShape", "enums/values"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_12(exports);
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
System.register("models/mapSettings", ["enums/enums"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var enums_1, MapSettingsGrid, MapSettingsRoom, MapSettingsConnector, MapSettingsNote, MapSettingsBlock, MapSettings;
    return {
        setters: [
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }
        ],
        execute: function () {
            MapSettingsGrid = /** @class */ (function () {
                function MapSettingsGrid() {
                    this.visible = true;
                    this.origin = true;
                    this.snap = true;
                    this.size = 32;
                    this.color = '#f0f0f0';
                    this.lineWidth = 1;
                    this.originWidth = 5;
                }
                return MapSettingsGrid;
            }());
            MapSettingsRoom = /** @class */ (function () {
                function MapSettingsRoom() {
                    this.width = 96;
                    this.height = 64;
                    this.margin = 6; // todo
                    this.lineWidth = 1;
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
            MapSettings = /** @class */ (function () {
                function MapSettings() {
                    this.grid = new MapSettingsGrid();
                    this.room = new MapSettingsRoom();
                    this.connector = new MapSettingsConnector();
                    this.note = new MapSettingsNote();
                    this.block = new MapSettingsBlock();
                    this.background = 'wood';
                }
                return MapSettings;
            }());
            exports_13("MapSettings", MapSettings);
        }
    };
});
System.register("models/box", ["models/model", "enums/enums"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var model_js_1, enums_js_1, Box;
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
                    _this.x = 0;
                    _this.y = 0;
                    return _this;
                }
                Object.defineProperty(Box.prototype, "fillColor", {
                    get: function () {
                        return this._fillColor;
                    },
                    set: function (color) {
                        this._fillColor = color;
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
                        x = Math.floor(vx * (this.width / 2) + this.width / 2) + this.x;
                        y = Math.floor(vy * (this.height / 2) + this.height / 2) + this.y;
                        // Find room rounding radius. It must never be greater than 1/4 of the room's side.
                        // The following code does nothing if rounding = 0.
                        var r = this.rounding;
                        if (r > this.width * 0.25)
                            r = this.width * 0.25;
                        if (r > this.height * 0.25)
                            r = this.height * 0.25;
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
            exports_14("Box", Box);
        }
    };
});
System.register("models/connector", ["models/model", "enums/enums", "models/mapSettings", "enums/connectorType"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var model_js_2, enums_js_2, mapSettings_js_1, connectorType_js_2, Connector;
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
                    _this.type = "Connector";
                    _this.name = '';
                    _this.dockStart = null;
                    _this.dockEnd = null;
                    _this.startDir = enums_js_2.Direction.N;
                    _this.endDir = enums_js_2.Direction.S;
                    _this.startX = _this.startY = 0;
                    _this.endX = _this.endY = 0;
                    _this.oneWay = false;
                    _this.startType = connectorType_js_2.ConnectorType.Default;
                    _this.endType = connectorType_js_2.ConnectorType.Default;
                    _this.startLabel = '';
                    _this.endLabel = '';
                    return _this;
                }
                Object.defineProperty(Connector.prototype, "color", {
                    get: function () {
                        return this._color != null ? this._color : this.map.settings.connector.color;
                    },
                    set: function (c) {
                        this._color = c;
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Connector.prototype.reverse = function () {
                    if (!this.isDoubleDocked())
                        return;
                    _a = [this.dockStart, this.dockEnd], this.dockEnd = _a[0], this.dockStart = _a[1];
                    _b = [this.startDir, this.endDir], this.endDir = _b[0], this.startDir = _b[1];
                    var _a, _b;
                };
                Connector.prototype.isDoubleDocked = function () {
                    return this.dockStart && this.dockEnd;
                };
                Connector.prototype.clone = function () {
                    return this.cloneToTarget(new Connector(new mapSettings_js_1.MapSettings()));
                };
                return Connector;
            }(model_js_2.Model));
            exports_15("Connector", Connector);
        }
    };
});
System.register("models/room", ["models/box", "models/mapSettings", "models/connector"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var box_js_1, mapSettings_js_2, connector_js_1, Room;
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
                    _this.type = "Room";
                    _this.name = 'Room';
                    _this.subtitle = '';
                    _this.description = '';
                    _this.dark = false;
                    _this.endroom = false;
                    _this.width = settings.room.width;
                    _this.height = settings.room.height;
                    return _this;
                }
                Object.defineProperty(Room.prototype, "nameColor", {
                    get: function () {
                        if (!this._nameColor)
                            return this.map.settings.room.nameColor;
                        return this._nameColor;
                    },
                    set: function (color) {
                        this._nameColor = color;
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
                        if (this.isStartRoom())
                            this.map.setStartRoom(null);
                    }
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
                Room.prototype.clone = function () {
                    return this.cloneToTarget(new Room(new mapSettings_js_2.MapSettings()));
                };
                return Room;
            }(box_js_1.Box));
            exports_16("Room", Room);
        }
    };
});
System.register("models/map", ["models/mapSettings"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var mapSettings_js_3, Map;
    return {
        setters: [
            function (mapSettings_js_3_1) {
                mapSettings_js_3 = mapSettings_js_3_1;
            }
        ],
        execute: function () {
            Map = /** @class */ (function () {
                function Map() {
                    this.settings = new mapSettings_js_3.MapSettings();
                    this.title = "Untitled map";
                    this.author = "";
                    this.description = "";
                    this.elements = new Array();
                    this.startRoom = null;
                }
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
                return Map;
            }());
            exports_17("Map", Map);
        }
    };
});
System.register("drawing/IScreen", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var CapStyle, JoinStyle, TextAlign, TextBaseline;
    return {
        setters: [],
        execute: function () {
            (function (CapStyle) {
                CapStyle[CapStyle["Butt"] = 0] = "Butt";
                CapStyle[CapStyle["Round"] = 1] = "Round";
                CapStyle[CapStyle["Square"] = 2] = "Square";
            })(CapStyle || (CapStyle = {}));
            exports_18("CapStyle", CapStyle);
            (function (JoinStyle) {
                JoinStyle[JoinStyle["Miter"] = 0] = "Miter";
                JoinStyle[JoinStyle["Round"] = 1] = "Round";
                JoinStyle[JoinStyle["Bevel"] = 2] = "Bevel";
            })(JoinStyle || (JoinStyle = {}));
            exports_18("JoinStyle", JoinStyle);
            (function (TextAlign) {
                TextAlign[TextAlign["Start"] = 0] = "Start";
                TextAlign[TextAlign["End"] = 1] = "End";
                TextAlign[TextAlign["Left"] = 2] = "Left";
                TextAlign[TextAlign["Right"] = 3] = "Right";
                TextAlign[TextAlign["Center"] = 4] = "Center";
            })(TextAlign || (TextAlign = {}));
            exports_18("TextAlign", TextAlign);
            (function (TextBaseline) {
                TextBaseline[TextBaseline["Alphabetic"] = 0] = "Alphabetic";
                TextBaseline[TextBaseline["Top"] = 1] = "Top";
                TextBaseline[TextBaseline["Hanging"] = 2] = "Hanging";
                TextBaseline[TextBaseline["Middle"] = 3] = "Middle";
                TextBaseline[TextBaseline["Ideographic"] = 4] = "Ideographic";
                TextBaseline[TextBaseline["Bottom"] = 5] = "Bottom";
            })(TextBaseline || (TextBaseline = {}));
            exports_18("TextBaseline", TextBaseline);
        }
    };
});
System.register("views/view", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var View;
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
                View.prototype.draw = function (canvas, mouseX, mouseY, selectionSize, hover) {
                };
                View.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                };
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
                return View;
            }());
            exports_19("View", View);
        }
    };
});
System.register("drawing/canvas", ["drawing/IScreen", "enums/enums"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var IScreen_js_1, enums_js_3, Canvas;
    return {
        setters: [
            function (IScreen_js_1_1) {
                IScreen_js_1 = IScreen_js_1_1;
            },
            function (enums_js_3_1) {
                enums_js_3 = enums_js_3_1;
            }
        ],
        execute: function () {
            Canvas = /** @class */ (function () {
                function Canvas(ctx) {
                    this.ctx = ctx;
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
                    this.ctx.moveTo(x0, y0);
                    this.ctx.lineTo(x1, y1);
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
                    var kappa = .5522848, ox = (width / 2) * kappa, // control point offset horizontal
                    oy = (height / 2) * kappa, // control point offset vertical
                    xe = x + width, // x-end
                    ye = y + height, // y-end
                    xm = x + width / 2, // x-middle
                    ym = y + height / 2; // y-middle
                    this
                        .beginPath()
                        .moveTo(x, ym)
                        .bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
                        .bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
                        .bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
                        .bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                    return this;
                };
                Canvas.prototype.roundedRect = function (x, y, width, height, radius) {
                    if (width < 4 * radius)
                        radius = width / 4;
                    if (height < 4 * radius)
                        radius = height / 4;
                    this
                        .beginPath()
                        .moveTo(x + radius, y)
                        .arcTo(x + width, y, x + width, y + height, radius)
                        .arcTo(x + width, y + height, x, y + height, radius)
                        .arcTo(x, y + height, x, y, radius)
                        .arcTo(x, y, x + width, y, radius)
                        .closePath();
                    return this;
                };
                Canvas.prototype.octagon = function (x, y, width, height) {
                    this
                        .beginPath()
                        .moveTo(x, y + height * 0.25)
                        .lineTo(x + width * 0.25, y)
                        .lineTo(x + width * 0.75, y)
                        .lineTo(x + width, y + height * 0.25)
                        .lineTo(x + width, y + height * 0.75)
                        .lineTo(x + width * 0.75, y + height)
                        .lineTo(x + width * 0.25, y + height)
                        .lineTo(x, y + height * 0.75)
                        .closePath();
                    return this;
                };
                Canvas.prototype.quadraticCurveTo = function (cp1x, cp1y, x, y) {
                    this.ctx.quadraticCurveTo(cp1x, cp1y, x, y);
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
                    this.ctx.rect(x, y, width, height);
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
                    var lineHeight = Math.ceil(fontSize) + 1;
                    var lines = this.splitText(width, text);
                    var fontStr = fontSize + "px Roboto";
                    var xPos = x + width / 2;
                    var yPos = y - (lines.length - 1) * lineHeight / 2 + height / 2;
                    for (var i = 0; i < lines.length; i++) {
                        this.fillText(lines[i], xPos, yPos, fontStr, IScreen_js_1.TextAlign.Center, IScreen_js_1.TextBaseline.Middle);
                        yPos += lineHeight;
                    }
                    return this;
                };
                Canvas.prototype.drawTextBottom = function (x, y, width, height, fontSize, font, text) {
                    var lineHeight = Math.ceil(fontSize) + 1;
                    var lines = this.splitText(width, text);
                    var fontStr = fontSize + "px Roboto";
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
                Canvas.prototype.clip = function () {
                    this.ctx.clip();
                    return this;
                };
                Canvas.prototype.getImageData = function (x, y, width, height) {
                    return this.ctx.getImageData(x, y, width, height);
                };
                return Canvas;
            }());
            exports_20("Canvas", Canvas);
        }
    };
});
System.register("grid", ["app"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var app_js_1, Grid;
    return {
        setters: [
            function (app_js_1_1) {
                app_js_1 = app_js_1_1;
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
                    var settings = app_js_1.App.map.settings.grid;
                    if (!settings.visible)
                        return;
                    canvas
                        .save()
                        .strokeStyle(settings.color)
                        .lineWidth(settings.lineWidth);
                    var x = htmlCanvas.offsetWidth / 2 + app_js_1.App.centerX;
                    while (x > 0) {
                        this.drawGridLineV(htmlCanvas, canvas, x);
                        x -= settings.size * app_js_1.App.zoom;
                    }
                    var x = htmlCanvas.offsetWidth / 2 + app_js_1.App.centerX + settings.size * app_js_1.App.zoom;
                    while (x < htmlCanvas.offsetWidth) {
                        this.drawGridLineV(htmlCanvas, canvas, x);
                        x += settings.size * app_js_1.App.zoom;
                    }
                    var y = htmlCanvas.offsetHeight / 2 + app_js_1.App.centerY;
                    while (y > 0) {
                        this.drawGridLineH(htmlCanvas, canvas, y);
                        y -= settings.size * app_js_1.App.zoom;
                    }
                    var y = htmlCanvas.offsetHeight / 2 + app_js_1.App.centerY + settings.size * app_js_1.App.zoom;
                    while (y < htmlCanvas.offsetHeight) {
                        this.drawGridLineH(htmlCanvas, canvas, y);
                        y += settings.size * app_js_1.App.zoom;
                    }
                    // Draw origin if necessary
                    if (settings.origin) {
                        x = Math.floor(htmlCanvas.offsetWidth / 2) + app_js_1.App.centerX;
                        y = Math.floor(htmlCanvas.offsetHeight / 2) + app_js_1.App.centerY;
                        canvas
                            .beginPath()
                            .lineWidth(settings.originWidth)
                            .moveTo(x, y - settings.size * app_js_1.App.zoom)
                            .lineTo(x, y + settings.size * app_js_1.App.zoom)
                            .moveTo(x - settings.size * app_js_1.App.zoom, y)
                            .lineTo(x + settings.size * app_js_1.App.zoom, y)
                            .stroke();
                    }
                    canvas.restore();
                };
                Grid.snap = function (a) {
                    var settings = app_js_1.App.map.settings.grid;
                    if (!settings.snap)
                        return a;
                    return Math.floor(a / settings.size) * settings.size;
                };
                return Grid;
            }());
            exports_21("Grid", Grid);
        }
    };
});
System.register("util/rect", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var Rect;
    return {
        setters: [],
        execute: function () {
            Rect = /** @class */ (function () {
                // Create a rectangle given two coordinates.
                // Coordinates are automatically swapped if necessary.
                function Rect(x, y, x2, y2) {
                    this.x = Math.min(x, x2);
                    this.y = Math.min(y, y2);
                    this.width = Math.abs(x2 - x);
                    this.height = Math.abs(y2 - y);
                }
                // Returns true if the rectangle contains the coordinate.
                Rect.prototype.contains = function (x, y) {
                    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
                };
                return Rect;
            }());
            exports_22("Rect", Rect);
        }
    };
});
System.register("util/util", ["util/rect"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_23(exports);
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
System.register("views/boxView", ["views/view", "util/util", "enums/enums"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var view_js_1, util_js_1, enums_js_4, BoxView;
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
                // Used to determine if a Room is side a selection area. For simplicity,
                // a rectangular approximation of the Room is used.
                BoxView.prototype.isIn = function (x, y, width, height) {
                    var r = new util_js_1.Rect(x, y, width, height);
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
            exports_24("BoxView", BoxView);
        }
    };
});
System.register("views/roomView", ["views/boxView", "enums/enums"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var boxView_js_1, enums_js_5, RoomView;
    return {
        setters: [
            function (boxView_js_1_1) {
                boxView_js_1 = boxView_js_1_1;
            },
            function (enums_js_5_1) {
                enums_js_5 = enums_js_5_1;
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
                RoomView.prototype.draw = function (canvas, mouseX, mouseY, selectionSize, hover) {
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
                    canvas
                        .fillStyle(this.room.nameColor)
                        .drawText(0, 0, this.room.width, this.room.height, 14.4, 'Roboto', this.room.name);
                    // Room subtitle
                    canvas
                        .fillStyle(this.room.subtitle)
                        .drawTextBottom(0, 0, this.room.width, this.room.height - 5, 11.8, 'Roboto', this.room.subtitle);
                    canvas.restore();
                };
                RoomView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
                    this.drawConnectorHandles(canvas, mouseX, mouseY, selectionSize, hover);
                };
                return RoomView;
            }(boxView_js_1.BoxView));
            exports_25("RoomView", RoomView);
        }
    };
});
System.register("views/connectorView", ["app", "views/view", "util/util", "enums/enums", "drawing/IScreen"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var app_js_2, view_js_2, util_js_2, enums_js_6, IScreen_js_2, ConnectorView;
    return {
        setters: [
            function (app_js_2_1) {
                app_js_2 = app_js_2_1;
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
            function (IScreen_js_2_1) {
                IScreen_js_2 = IScreen_js_2_1;
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
                    var dx = rx + enums_js_6.Direction.toCardinalVector(dir).x * app_js_2.App.map.settings.connector.stalk;
                    var dy = ry + enums_js_6.Direction.toCardinalVector(dir).y * app_js_2.App.map.settings.connector.stalk;
                    return { x: x, y: y, dx: dx, dy: dy };
                };
                ConnectorView.prototype.drawArrow = function (canvas, x, y, angle) {
                    var arrowSize = app_js_2.App.map.settings.connector.arrowSize;
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
                ConnectorView.prototype.draw = function (canvas, mouseX, mouseY, selectionSize, hover) {
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
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_2.App.map.settings.connector.curveStrength;
                            var cp1x = startX + enums_js_6.Direction.toCardinalVector(this.connector.startDir).x * dist;
                            var cp1y = startY + enums_js_6.Direction.toCardinalVector(this.connector.startDir).y * dist;
                            var cp2x = endX + enums_js_6.Direction.toCardinalVector(this.connector.endDir).x * dist;
                            var cp2y = endY + enums_js_6.Direction.toCardinalVector(this.connector.endDir).y * dist;
                            canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
                            var _e = canvas.getBezierXY(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY), arrow1x = _e.x, arrow1y = _e.y;
                            var arrow1a = canvas.getBezierAngle(0.1, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
                            var _f = canvas.getBezierXY(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY), arrow2x = _f.x, arrow2y = _f.y;
                            var arrow2a = canvas.getBezierAngle(0.9, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY);
                            var _g = canvas.getBezierXY(0.5, startX, startY, cp1x, cp1y, cp2x, cp2y, endX, endY), centerx = _g.x, centery = _g.y;
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
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_2.App.map.settings.connector.curveStrength;
                            var cp1x = startX + enums_js_6.Direction.toCardinalVector(this.connector.startDir).x * dist;
                            var cp1y = startY + enums_js_6.Direction.toCardinalVector(this.connector.startDir).y * dist;
                            canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
                            for (var t = 0; t < 1; t = t + 0.1) {
                                var _h = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY), arrow1x = _h.x, arrow1y = _h.y;
                                var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
                                var _j = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY), arrow2x = _j.x, arrow2y = _j.y;
                                var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);
                                var _k = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY), centerx = _k.x, centery = _k.y;
                            }
                        }
                        else {
                            canvas.lineTo(endX, endY);
                        }
                    }
                    // Undocked to docked:
                    else {
                        canvas.moveTo(startX, startY);
                        if (this.connector.isCurve) {
                            var dist = Math.sqrt((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY)) * app_js_2.App.map.settings.connector.curveStrength;
                            var cp1x = endX + enums_js_6.Direction.toCardinalVector(this.connector.endDir).x * dist;
                            var cp1y = endY + enums_js_6.Direction.toCardinalVector(this.connector.endDir).y * dist;
                            canvas.quadraticCurveTo(cp1x, cp1y, endX, endY);
                            var _l = canvas.getQuadraticXY(0.1, startX, startY, cp1x, cp1y, endX, endY), arrow1x = _l.x, arrow1y = _l.y;
                            var arrow1a = canvas.getQuadraticAngle(0.1, startX, startY, cp1x, cp1y, endX, endY);
                            var _m = canvas.getQuadraticXY(0.9, startX, startY, cp1x, cp1y, endX, endY), arrow2x = _m.x, arrow2y = _m.y;
                            var arrow2a = canvas.getQuadraticAngle(0.9, startX, startY, cp1x, cp1y, endX, endY);
                            var _o = canvas.getQuadraticXY(0.5, startX, startY, cp1x, cp1y, endX, endY), centerx = _o.x, centery = _o.y;
                        }
                        else {
                            canvas.lineTo(endX, endY);
                        }
                        canvas.lineTo(dockEndX, dockEndY);
                    }
                    // Stroke path with wide, nearly transparent background (for selection purposes):
                    canvas
                        .lineWidth(20)
                        .lineCap(IScreen_js_2.CapStyle.Round)
                        .lineJoin(IScreen_js_2.JoinStyle.Round)
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
                        var textWidth = canvas.textWidth(this.connector.name, '12.8px Roboto');
                        canvas
                            .lineWidth(1)
                            .lineDash(enums_js_6.LineStyle.Solid)
                            .strokeStyle('#000')
                            .fillStyle('#fff')
                            .roundedRect(centerx - textWidth / 2 - 5, centery - 11, textWidth + 10, 20, 3)
                            .fill()
                            .stroke()
                            .fillStyle('#333')
                            .fillText(this.connector.name, centerx, centery, '12.8px Roboto', IScreen_js_2.TextAlign.Center, IScreen_js_2.TextBaseline.Middle);
                    }
                    // Draw start and end types
                    canvas
                        .beginPath()
                        .fillStyle('#333')
                        .fillText(this.connector.startLabel ? this.connector.startLabel : enums_js_6.ConnectorType.toString(this.connector.startType), arrow1x + Math.cos(arrow1a - Math.PI / 2) * app_js_2.App.map.settings.connector.labelDistance, arrow1y + Math.sin(arrow1a - Math.PI / 2) * app_js_2.App.map.settings.connector.labelDistance, '10.8px Roboto', IScreen_js_2.TextAlign.Center, IScreen_js_2.TextBaseline.Middle)
                        .fillText(this.connector.endLabel ? this.connector.endLabel : enums_js_6.ConnectorType.toString(this.connector.endType), arrow2x + Math.cos(arrow2a + Math.PI / 2) * app_js_2.App.map.settings.connector.labelDistance, arrow2y + Math.sin(arrow2a + Math.PI / 2) * app_js_2.App.map.settings.connector.labelDistance, '10.8px Roboto', IScreen_js_2.TextAlign.Center, IScreen_js_2.TextBaseline.Middle);
                    canvas.restore();
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
                    var r = new util_js_2.Rect(x, y, width, height);
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
                return ConnectorView;
            }(view_js_2.View));
            exports_26("ConnectorView", ConnectorView);
        }
    };
});
System.register("models/note", ["models/box", "models/mapSettings"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var box_js_2, mapSettings_js_4, Note;
    return {
        setters: [
            function (box_js_2_1) {
                box_js_2 = box_js_2_1;
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
                    _this.width = settings.note.width;
                    _this.height = settings.note.height;
                    return _this;
                }
                Object.defineProperty(Note.prototype, "textColor", {
                    get: function () {
                        if (!this._textColor)
                            return this.map.settings.note.textColor;
                        return this._textColor;
                    },
                    set: function (color) {
                        this._textColor = color;
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Note.prototype.clone = function () {
                    return this.cloneToTarget(new Note(new mapSettings_js_4.MapSettings()));
                };
                return Note;
            }(box_js_2.Box));
            exports_27("Note", Note);
        }
    };
});
System.register("views/noteView", ["views/boxView", "enums/enums"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var boxView_js_2, enums_js_7, NoteView;
    return {
        setters: [
            function (boxView_js_2_1) {
                boxView_js_2 = boxView_js_2_1;
            },
            function (enums_js_7_1) {
                enums_js_7 = enums_js_7_1;
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
                NoteView.prototype.draw = function (canvas, mouseX, mouseY, selectionSize, hover) {
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
                    canvas
                        .fillStyle(this.note.textColor)
                        .drawText(0, 0, this.note.width, this.note.height, 14.4, 'Roboto', this.note.text);
                    canvas.restore();
                };
                NoteView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
                };
                return NoteView;
            }(boxView_js_2.BoxView));
            exports_28("NoteView", NoteView);
        }
    };
});
System.register("models/block", ["models/box", "models/mapSettings"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var box_js_3, mapSettings_js_5, Block;
    return {
        setters: [
            function (box_js_3_1) {
                box_js_3 = box_js_3_1;
            },
            function (mapSettings_js_5_1) {
                mapSettings_js_5 = mapSettings_js_5_1;
            }
        ],
        execute: function () {
            Block = /** @class */ (function (_super) {
                __extends(Block, _super);
                function Block(settings) {
                    var _this = _super.call(this, settings) || this;
                    _this.type = 'Block';
                    _this.width = settings.block.width;
                    _this.height = settings.block.height;
                    return _this;
                }
                Object.defineProperty(Block.prototype, "fillColor", {
                    get: function () {
                        return this._fillColor ? this._fillColor : this.map.settings.block.fillColor;
                    },
                    set: function (color) {
                        this._fillColor = color;
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Block.prototype.clone = function () {
                    return this.cloneToTarget(new Block(new mapSettings_js_5.MapSettings()));
                };
                return Block;
            }(box_js_3.Box));
            exports_29("Block", Block);
        }
    };
});
System.register("views/blockView", ["views/boxView", "enums/enums"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var boxView_js_3, enums_js_8, BlockView;
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
                BlockView.prototype.draw = function (canvas, mouseX, mouseY, selectionSize, hover) {
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
                BlockView.prototype.drawHandles = function (canvas, mouseX, mouseY, selectionSize, hover) {
                    this.drawResizeHandles(canvas, mouseX, mouseY, selectionSize, hover);
                };
                return BlockView;
            }(boxView_js_3.BoxView));
            exports_30("BlockView", BlockView);
        }
    };
});
System.register("views/viewFactory", ["models/room", "models/note", "models/connector", "views/roomView", "views/noteView", "views/connectorView", "models/block", "views/blockView"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var room_1, note_1, connector_1, roomView_1, noteView_1, connectorView_1, block_1, blockView_1, ViewFactory;
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
            exports_31("ViewFactory", ViewFactory);
        }
    };
});
System.register("editor", ["app", "dispatcher", "enums/enums", "grid", "models/room", "models/connector", "views/roomView", "views/connectorView", "models/note", "views/noteView", "views/boxView", "views/viewFactory", "drawing/canvas", "models/block", "views/blockView", "enums/connectorType"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var app_js_3, dispatcher_js_2, enums_js_9, grid_js_1, room_js_1, connector_js_2, roomView_js_1, connectorView_js_1, note_js_1, noteView_js_1, boxView_js_4, viewFactory_js_1, canvas_js_1, block_js_1, blockView_js_1, connectorType_js_3, Editor;
    return {
        setters: [
            function (app_js_3_1) {
                app_js_3 = app_js_3_1;
            },
            function (dispatcher_js_2_1) {
                dispatcher_js_2 = dispatcher_js_2_1;
            },
            function (enums_js_9_1) {
                enums_js_9 = enums_js_9_1;
            },
            function (grid_js_1_1) {
                grid_js_1 = grid_js_1_1;
            },
            function (room_js_1_1) {
                room_js_1 = room_js_1_1;
            },
            function (connector_js_2_1) {
                connector_js_2 = connector_js_2_1;
            },
            function (roomView_js_1_1) {
                roomView_js_1 = roomView_js_1_1;
            },
            function (connectorView_js_1_1) {
                connectorView_js_1 = connectorView_js_1_1;
            },
            function (note_js_1_1) {
                note_js_1 = note_js_1_1;
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
            function (block_js_1_1) {
                block_js_1 = block_js_1_1;
            },
            function (blockView_js_1_1) {
                blockView_js_1 = blockView_js_1_1;
            },
            function (connectorType_js_3_1) {
                connectorType_js_3 = connectorType_js_3_1;
            }
        ],
        execute: function () {
            Editor = /** @class */ (function () {
                function Editor() {
                    var _this = this;
                    this.grid = new grid_js_1.Grid();
                    this.hover = null;
                    this.copy = new Array();
                    // Scroll/drag:
                    this.mouseX = -100;
                    this.mouseY = -100;
                    this.dragOriginX = 0;
                    this.dragOriginY = 0;
                    this.render = function () {
                        _this.canvas.save();
                        // Clear the scene and draw the grid:
                        _this.clear();
                        _this.grid.draw(_this.htmlCanvas, _this.canvas);
                        document.getElementById('debug-zoom').textContent = Math.floor(app_js_3.App.zoom * 100) + "%";
                        // Translate/scale the entire canvas to conform to world coordinates:
                        _this.canvas.translate(Math.floor(_this.htmlCanvas.offsetWidth / 2) + app_js_3.App.centerX, Math.floor(_this.htmlCanvas.offsetHeight / 2) + app_js_3.App.centerY);
                        _this.canvas.scale(app_js_3.App.zoom, app_js_3.App.zoom);
                        // Draw all blocks:
                        _this.views.forEach(function (view) {
                            if (view instanceof blockView_js_1.BlockView) {
                                view.draw(_this.canvas, _this.mouseX, _this.mouseY, app_js_3.App.mouseMode == enums_js_9.MouseMode.Connect ? 0 : app_js_3.App.selection.size(), _this.hover == view && app_js_3.App.mouseMode != enums_js_9.MouseMode.Select);
                            }
                        });
                        // Draw all connectors:
                        _this.views.forEach(function (view) {
                            if (view instanceof connectorView_js_1.ConnectorView) {
                                view.draw(_this.canvas, _this.mouseX, _this.mouseY, app_js_3.App.mouseMode == enums_js_9.MouseMode.Connect ? 0 : app_js_3.App.selection.size(), _this.hover == view && app_js_3.App.mouseMode != enums_js_9.MouseMode.Select);
                            }
                        });
                        // Draw all rooms and notes:
                        _this.views.forEach(function (view) {
                            if (view instanceof roomView_js_1.RoomView || view instanceof noteView_js_1.NoteView) {
                                view.draw(_this.canvas, _this.mouseX, _this.mouseY, app_js_3.App.mouseMode == enums_js_9.MouseMode.Connect ? 0 : app_js_3.App.selection.size(), _this.hover == view && app_js_3.App.mouseMode != enums_js_9.MouseMode.Select);
                            }
                        });
                        // Draw all handles:
                        _this.views.forEach(function (view) {
                            view.drawHandles(_this.canvas, _this.mouseX, _this.mouseY, app_js_3.App.mouseMode == enums_js_9.MouseMode.Connect ? 0 : app_js_3.App.selection.size(), _this.hover == view && app_js_3.App.mouseMode != enums_js_9.MouseMode.Select);
                        });
                        if (app_js_3.App.mouseMode == enums_js_9.MouseMode.Select) {
                            _this.drawSelectionArea();
                        }
                        _this.canvas.restore();
                        window.requestAnimationFrame(_this.render);
                    };
                    dispatcher_js_2.Dispatcher.subscribe(this);
                    // Access the main canvas:
                    this.htmlCanvas = document.getElementById('canvas');
                    this.canvas = new canvas_js_1.Canvas(this.htmlCanvas.getContext('2d'));
                    // Access the 1x1 hittest canvas:
                    this.hitTestHtmlCanvas = document.getElementById('hittest');
                    this.hitTestCanvas = new canvas_js_1.Canvas(this.hitTestHtmlCanvas.getContext('2d'));
                    this.views = new Array();
                    // Create a test map:
                    this.makeTestMap();
                    window.addEventListener('resize', function () { _this.resize(); });
                    this.htmlCanvas.addEventListener('mousedown', function (e) { _this.canvasMouseDown(e); });
                    this.htmlCanvas.addEventListener('mouseup', function (e) { _this.canvasMouseUp(e); });
                    this.htmlCanvas.addEventListener('mousemove', function (e) { _this.canvasMouseMove(e); });
                    this.htmlCanvas.addEventListener('wheel', function (e) { _this.canvasMouseWheel(e); });
                    document.getElementById('control-center').addEventListener('click', function () { _this.cmdCenterView(); });
                    document.getElementById('control-zoomin').addEventListener('click', function () { _this.cmdZoomIn(); });
                    document.getElementById('control-zoomout').addEventListener('click', function () { _this.cmdZoomOut(); });
                    this.resize();
                    window.requestAnimationFrame(this.render);
                    document.getElementById('canvas').addEventListener('keyup', function (e) { _this.keyUp(e); });
                }
                Editor.prototype.keyUp = function (e) {
                    console.log("Key up: ", e);
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
                                app_js_3.App.selection.unselectAll();
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
                                app_js_3.App.undo();
                                break;
                        }
                    }
                    if (e.shiftKey) {
                        switch (e.key) {
                            // Arrow keys create new room in direction, if there isn't a room connection
                            // in that direction already.
                            case 'ArrowRight':
                                this.cmdNewRoomInDir(enums_js_9.Direction.E);
                                break;
                            case 'ArrowLeft':
                                this.cmdNewRoomInDir(enums_js_9.Direction.W);
                                break;
                            case 'ArrowUp':
                                this.cmdNewRoomInDir(enums_js_9.Direction.N);
                                break;
                            case 'ArrowDown':
                                this.cmdNewRoomInDir(enums_js_9.Direction.S);
                                break;
                            case 'PageUp':
                                this.cmdNewRoomInDir(enums_js_9.Direction.NE);
                                break;
                            case 'PageDown':
                                this.cmdNewRoomInDir(enums_js_9.Direction.SE);
                                break;
                            case 'End':
                                this.cmdNewRoomInDir(enums_js_9.Direction.SW);
                                break;
                            case 'Home':
                                this.cmdNewRoomInDir(enums_js_9.Direction.NW);
                                break;
                        }
                    }
                    e.preventDefault();
                };
                Editor.prototype.notify = function (event, model) {
                    var _this = this;
                    if (event == enums_js_9.AppEvent.Delete) {
                        app_js_3.App.selection.clear();
                        for (var i = 0; i < this.views.length; i++) {
                            if (this.views[i].getModel() == model) {
                                this.views.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (event == enums_js_9.AppEvent.Load) {
                        app_js_3.App.selection.unselectAll();
                        this.views.length = 0;
                        app_js_3.App.map.elements.forEach(function (model) {
                            _this.views.push(viewFactory_js_1.ViewFactory.create(model));
                        });
                        this.cmdCenterView();
                    }
                };
                Editor.prototype.makeTestMap = function () {
                    var startRoom = new room_js_1.Room(app_js_3.App.map.settings);
                    app_js_3.App.map.add(startRoom);
                    startRoom.name = 'hello';
                    startRoom.x = 0;
                    startRoom.y = 0;
                    this.views.push(viewFactory_js_1.ViewFactory.create(startRoom));
                    var connection = new connector_js_2.Connector(app_js_3.App.map.settings);
                    app_js_3.App.map.add(connection);
                    connection.name = 'abc';
                    connection.dockStart = startRoom;
                    connection.startDir = enums_js_9.Direction.E;
                    connection.isCurve = true;
                    connection.oneWay = true;
                    connection.startType = connectorType_js_3.ConnectorType.In;
                    connection.endType = connectorType_js_3.ConnectorType.Out;
                    this.views.push(viewFactory_js_1.ViewFactory.create(connection));
                    var endRoom = new room_js_1.Room(app_js_3.App.map.settings);
                    app_js_3.App.map.add(endRoom);
                    endRoom.name = 'world';
                    endRoom.x = 320;
                    endRoom.y = 320;
                    this.views.push(viewFactory_js_1.ViewFactory.create(endRoom));
                    connection.dockEnd = endRoom;
                    connection.endDir = enums_js_9.Direction.W;
                };
                Editor.prototype.clear = function () {
                    this.canvas.clearRect(0, 0, this.htmlCanvas.offsetWidth, this.htmlCanvas.offsetHeight);
                };
                Editor.prototype.drawSelectionArea = function () {
                    var x = Math.min(this.mouseX, this.selectPosX);
                    var y = Math.min(this.mouseY, this.selectPosY);
                    var w = Math.abs(this.mouseX - this.selectPosX);
                    var h = Math.abs(this.mouseY - this.selectPosY);
                    this.canvas
                        .strokeStyle(enums_js_9.Values.COLOR_SELECTION_LINE)
                        .fillStyle(enums_js_9.Values.COLOR_SELECTION_AREA)
                        .fillRect(x, y, w, h)
                        .strokeRect(x, y, w, h);
                };
                Editor.prototype.hitTest = function (x, y, view) {
                    this.hitTestCanvas
                        .save()
                        .clearRect(0, 0, 1, 1) // Clear the hit test canvas.
                        .scale(app_js_3.App.zoom, app_js_3.App.zoom) // Scale the canvas to the current zoom level
                        .translate(-x, -y); // Translate canvas to match world mouse coordinates
                    // Draw the view:
                    view.draw(this.hitTestCanvas, 0, 0, app_js_3.App.selection.size(), this.hover == view);
                    this.hitTestCanvas.restore();
                    // See if the canvas contains a non-transparent pixel.
                    var myImageData = this.hitTestCanvas.getImageData(0, 0, 1, 1);
                    return myImageData.data[3] > 0;
                };
                Editor.prototype.resize = function () {
                    this.htmlCanvas.setAttribute('width', this.htmlCanvas.offsetWidth.toString());
                    this.htmlCanvas.setAttribute('height', this.htmlCanvas.offsetHeight.toString());
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
                    var _a = this.findObjCoordinates(this.htmlCanvas), x = _a.x, y = _a.y;
                    return {
                        x: Math.floor((e.clientX - x - this.htmlCanvas.offsetWidth / 2 - app_js_3.App.centerX) / app_js_3.App.zoom),
                        y: Math.floor((e.clientY - y - this.htmlCanvas.offsetHeight / 2 - app_js_3.App.centerY) / app_js_3.App.zoom)
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
                    if (app_js_3.App.mouseMode == enums_js_9.MouseMode.AddRoom) {
                        this.cmdAddRoom();
                        return;
                    }
                    if (app_js_3.App.mouseMode == enums_js_9.MouseMode.AddNote) {
                        this.cmdAddNote();
                        return;
                    }
                    if (app_js_3.App.mouseMode == enums_js_9.MouseMode.AddBlock) {
                        this.cmdAddBlock();
                        return;
                    }
                    // Mouse wheel button pressed. Start scrolling.
                    if (e.which == 2) {
                        app_js_3.App.mouseMode = enums_js_9.MouseMode.Scroll;
                        this.scrollOffsetX = e.clientX;
                        this.scrollOffsetY = e.clientY;
                        this.scrollOriginX = app_js_3.App.centerX;
                        this.scrollOriginY = app_js_3.App.centerY;
                        this.htmlCanvas.style.cursor = 'move';
                        return;
                    }
                    // Is the cursor over a view?
                    var view = this.findViewByCoordinates(x, y);
                    // No view clicked? Then unselect all unless CTRL is pressed.
                    // Also enter Select mode.
                    if (view === undefined) {
                        if (!e.ctrlKey)
                            app_js_3.App.selection.unselectAll();
                        app_js_3.App.mouseMode = enums_js_9.MouseMode.Select;
                        this.selectPosX = x;
                        this.selectPosY = y;
                    }
                    // One connector selected and over a connector handle?
                    else if (app_js_3.App.selection.isSingle() && app_js_3.App.selection.first() instanceof connectorView_js_1.ConnectorView && app_js_3.App.selection.first().isConnectorHandle(x, y) !== undefined) {
                        app_js_3.App.pushUndo();
                        app_js_3.App.mouseMode = enums_js_9.MouseMode.Connect;
                        this.connectorHandle = app_js_3.App.selection.first().isConnectorHandle(x, y);
                        this.htmlCanvas.style.cursor = 'crosshair';
                    }
                    // One Room/Note selected and over a resize handle?
                    else if (view instanceof boxView_js_4.BoxView && app_js_3.App.selection.isSingle() && app_js_3.App.selection.first() == view && view.isResizeHandle(x, y) !== undefined) {
                        app_js_3.App.pushUndo();
                        app_js_3.App.mouseMode = enums_js_9.MouseMode.Resize;
                        this.roomHandle = view.isResizeHandle(x, y);
                        view.save();
                        this.htmlCanvas.style.cursor = enums_js_9.Direction.toCursor(this.roomHandle);
                    }
                    // Nothing selected and over a Room connector handle?
                    else if (view instanceof roomView_js_1.RoomView && app_js_3.App.selection.isEmpty() && view.isConnectorHandle(x, y) != undefined) {
                        app_js_3.App.pushUndo();
                        app_js_3.App.mouseMode = enums_js_9.MouseMode.Connect;
                        var handle = view.isConnectorHandle(x, y);
                        var connector = new connector_js_2.Connector(app_js_3.App.map.settings);
                        app_js_3.App.map.add(connector);
                        connector.dockStart = view.room;
                        connector.startDir = handle;
                        connector.endDir = handle;
                        connector.endX = x;
                        connector.endY = y;
                        var v = viewFactory_js_1.ViewFactory.create(connector);
                        this.views.push(v);
                        app_js_3.App.selection.add([v]);
                        this.connectorHandle = enums_js_9.ConnectorHandle.End; // End is being dragged.
                        this.htmlCanvas.style.cursor = 'crosshair';
                    }
                    // View clicked? Then add to selection if CTRL is pressed, or
                    // replace selection if CTRL not pressed.
                    else {
                        if (e.ctrlKey) {
                            if (!view.isSelected()) {
                                app_js_3.App.selection.add([view]);
                            }
                        }
                        else if (!view.isSelected()) {
                            app_js_3.App.selection.select(view);
                        }
                        // Turn on drag mode:
                        this.htmlCanvas.style.cursor = 'pointer';
                        app_js_3.App.pushUndo();
                        app_js_3.App.mouseMode = enums_js_9.MouseMode.Drag;
                        this.dragOriginX = x;
                        this.dragOriginY = y;
                        app_js_3.App.selection.get().forEach(function (view) {
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
                    if (app_js_3.App.mouseMode != enums_js_9.MouseMode.None) {
                        dispatcher_js_2.Dispatcher.notify(enums_js_9.AppEvent.MouseMove, null);
                    }
                    // Find world coordinates of mouse:
                    var _a = this.findMouseCoordinates(e), x = _a.x, y = _a.y;
                    this.mouseX = x;
                    this.mouseY = y;
                    // Update which view is currently hovered over:
                    var view = this.findViewByCoordinates(x, y);
                    if (view != this.hover) {
                        this.hover = view;
                    }
                    // We do different things for different mouse modes.
                    switch (app_js_3.App.mouseMode) {
                        case enums_js_9.MouseMode.Scroll:
                            app_js_3.App.centerX = this.scrollOriginX + (e.clientX - this.scrollOffsetX);
                            app_js_3.App.centerY = this.scrollOriginY + (e.clientY - this.scrollOffsetY);
                            break;
                        // We are dragging a (set of) boxes.
                        case enums_js_9.MouseMode.Drag:
                            app_js_3.App.selection.get().forEach(function (view) {
                                if (view instanceof boxView_js_4.BoxView) {
                                    view.getModel().x = grid_js_1.Grid.snap(view.oldX - _this.dragOriginX + x);
                                    view.getModel().y = grid_js_1.Grid.snap(view.oldY - _this.dragOriginY + y);
                                }
                            });
                            break;
                        // We are resizing a single box.
                        case enums_js_9.MouseMode.Resize:
                            var selectedView = app_js_3.App.selection.first();
                            if (selectedView instanceof boxView_js_4.BoxView)
                                selectedView.resize(this.roomHandle, grid_js_1.Grid.snap(x), grid_js_1.Grid.snap(y));
                            break;
                        // We are manipulating a connector endpoint.
                        case enums_js_9.MouseMode.Connect:
                            var connectorView = app_js_3.App.selection.first();
                            // Are we hovering over a room's target handle?
                            // Connect the connector to the handle.
                            if (view instanceof roomView_js_1.RoomView) {
                                var targetHandle = view.isConnectorHandle(x, y);
                                if (targetHandle !== undefined) {
                                    if (this.connectorHandle == enums_js_9.ConnectorHandle.Start) {
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
                                if (this.connectorHandle == enums_js_9.ConnectorHandle.Start) {
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
                    switch (app_js_3.App.mouseMode) {
                        // Selection mode. Select all views that are in the selection area.
                        case enums_js_9.MouseMode.Select:
                            app_js_3.App.selection.unselectAll();
                            for (var i = 0; i < this.views.length; i++) {
                                if (this.views[i].isIn(this.mouseX, this.mouseY, this.selectPosX, this.selectPosY)) {
                                    app_js_3.App.selection.add([this.views[i]]);
                                }
                            }
                            break;
                    }
                    this.htmlCanvas.style.cursor = 'default';
                    app_js_3.App.mouseMode = enums_js_9.MouseMode.None;
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
                    app_js_3.App.selection.unselectAll();
                    app_js_3.App.selection.add(this.views);
                };
                Editor.prototype.cmdShowPanel = function () {
                    if (app_js_3.App.selection.isSingle()) {
                        dispatcher_js_2.Dispatcher.notify(enums_js_9.AppEvent.More, app_js_3.App.selection.first().getModel());
                    }
                };
                Editor.prototype.cmdReverseConnector = function () {
                    if (app_js_3.App.selection.isSingle() && app_js_3.App.selection.first() instanceof connectorView_js_1.ConnectorView) {
                        var connector = app_js_3.App.selection.first().getModel();
                        if (connector.isDoubleDocked()) {
                            app_js_3.App.pushUndo();
                            connector.reverse();
                        }
                    }
                };
                Editor.prototype.cmdToggleDarkness = function () {
                    if (app_js_3.App.selection.isSingle() && app_js_3.App.selection.first() instanceof roomView_js_1.RoomView) {
                        var room = app_js_3.App.selection.first().getModel();
                        app_js_3.App.pushUndo();
                        room.dark = !room.dark;
                    }
                };
                Editor.prototype.cmdDelete = function () {
                    if (!app_js_3.App.selection.isEmpty()) {
                        app_js_3.App.pushUndo();
                        var toDelete_1 = new Array();
                        app_js_3.App.selection.get().forEach(function (view) { toDelete_1.push(view); });
                        toDelete_1.forEach(function (view) { view.getModel().delete(); });
                    }
                };
                Editor.prototype.cmdToggleOneWay = function () {
                    if (app_js_3.App.selection.isSingle() && app_js_3.App.selection.first() instanceof connectorView_js_1.ConnectorView) {
                        var connector = app_js_3.App.selection.first().getModel();
                        app_js_3.App.pushUndo();
                        connector.oneWay = !connector.oneWay;
                    }
                };
                Editor.prototype.cmdNewRoomInDir = function (dir) {
                    // Only works if a single room is selected.
                    if (!app_js_3.App.selection.isSingle() || !(app_js_3.App.selection.first() instanceof roomView_js_1.RoomView))
                        return;
                    // Get room model.
                    var room = app_js_3.App.selection.first().getModel();
                    // Abort if there is already a connection in the desired direction.
                    if (room.hasConnection(dir))
                        return;
                    app_js_3.App.pushUndo();
                    // Create new room in the specified direction.
                    var newRoom = new room_js_1.Room(app_js_3.App.map.settings);
                    app_js_3.App.map.add(newRoom);
                    var _a = enums_js_9.Direction.toVector(dir), dx = _a.x, dy = _a.y;
                    newRoom.x = room.x + room.width / 2 + dx * room.width + app_js_3.App.map.settings.grid.size * 2 * dx - newRoom.width / 2;
                    newRoom.y = room.y + room.height / 2 + dy * room.height + app_js_3.App.map.settings.grid.size * 2 * dy - newRoom.height / 2;
                    // Add new room view to editor.
                    var view = viewFactory_js_1.ViewFactory.create(newRoom);
                    this.views.push(view);
                    // Create connector.
                    var newConnector = new connector_js_2.Connector(app_js_3.App.map.settings);
                    app_js_3.App.map.add(newConnector);
                    newConnector.dockStart = room;
                    newConnector.dockEnd = newRoom;
                    newConnector.startDir = dir;
                    newConnector.endDir = enums_js_9.Direction.opposite(dir);
                    // Add new connector view to editor.
                    view = viewFactory_js_1.ViewFactory.create(newConnector);
                    this.views.push(view);
                };
                // 
                // Move the canvas center by (dx, dy)
                Editor.prototype.moveCenter = function (dx, dy) {
                    app_js_3.App.centerX += dx * app_js_3.App.map.settings.grid.size;
                    app_js_3.App.centerY += dy * app_js_3.App.map.settings.grid.size;
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
                    app_js_3.App.selection.get().forEach(function (view) {
                        if (!(view instanceof connectorView_js_1.ConnectorView)) {
                            var box = view.getModel().clone();
                            _this.copy.push(box);
                            if (!hasOffset) {
                                hasOffset = true;
                                offsetX = box.x;
                                offsetY = box.y;
                            }
                            box.x = -app_js_3.App.centerX + box.x - offsetX;
                            box.y = -app_js_3.App.centerY + box.y - offsetY;
                        }
                    });
                    // For each connector in the selection,
                    app_js_3.App.selection.get().forEach(function (view) {
                        if (view instanceof connectorView_js_1.ConnectorView) {
                            var connector = view.getModel();
                            // Check that the connector is connected at both ends to room that
                            // are in the copy list. Otherwise, ignore the connector.
                            var dockStartIdx = -1;
                            var dockEndIdx = -1;
                            var roomIdx = 0;
                            for (var i = 0; i < app_js_3.App.selection.size(); i++) {
                                if (app_js_3.App.selection.get()[i] instanceof roomView_js_1.RoomView) {
                                    var roomView = app_js_3.App.selection.get()[i];
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
                    app_js_3.App.pushUndo();
                    app_js_3.App.selection.unselectAll();
                    var viewCount = this.views.length;
                    // For each non-connector in the copy list:
                    this.copy.forEach(function (model) {
                        if (!(model instanceof connector_js_2.Connector)) {
                            // Clone the model and add it to the map:
                            var newModel = model.clone();
                            app_js_3.App.map.add(newModel);
                            // Create a view and add it to the selection:
                            var view = viewFactory_js_1.ViewFactory.create(newModel);
                            _this.views.push(view);
                            app_js_3.App.selection.add([view]);
                        }
                    });
                    // For each connector in the copy list:
                    this.copy.forEach(function (model) {
                        if (model instanceof connector_js_2.Connector) {
                            var connector = model;
                            // For each end, find the index of the Room it is connected to in the copy list.
                            var dockStartIdx = 0;
                            var dockEndIdx = 0;
                            var roomIdx = 0;
                            for (var i = 0; i < _this.copy.length; i++) {
                                if (!(_this.copy[i] instanceof room_js_1.Room))
                                    continue;
                                if (connector.dockStart == _this.copy[i])
                                    dockStartIdx = viewCount + roomIdx;
                                if (connector.dockEnd == _this.copy[i])
                                    dockEndIdx = viewCount + roomIdx;
                                roomIdx++;
                            }
                            // Actually copy the connector, and connect it to the copied rooms.
                            var newConnector = connector.clone();
                            app_js_3.App.map.add(newConnector);
                            newConnector.dockStart = _this.views[dockStartIdx].getModel();
                            newConnector.dockEnd = _this.views[dockEndIdx].getModel();
                            // Create a view and add it to the selection:
                            var view = viewFactory_js_1.ViewFactory.create(newConnector);
                            _this.views.push(view);
                            app_js_3.App.selection.add([view]);
                        }
                    });
                };
                // Zoom = 1 is the standard zoom level.
                // Under 1, zoom is multiplied by a fraction (zoomFraction)
                // Above 1, zoom is increased by an addition (zoomAdditive)
                // This seems to give the smoothest result without giant steps
                // at higher/lower zoom levels.  
                Editor.prototype.cmdZoomIn = function () {
                    if (app_js_3.App.zoom >= 10)
                        return; // clamp zoom level
                    if (app_js_3.App.zoom < 1) {
                        app_js_3.App.zoom = app_js_3.App.zoom * enums_js_9.Values.ZOOM_FRACTION;
                    }
                    else {
                        app_js_3.App.zoom += enums_js_9.Values.ZOOM_ADDITIVE;
                    }
                };
                Editor.prototype.cmdZoomOut = function () {
                    if (app_js_3.App.zoom <= 0.1)
                        return; // clamp zoom level
                    if (app_js_3.App.zoom <= 1) {
                        app_js_3.App.zoom = app_js_3.App.zoom / enums_js_9.Values.ZOOM_FRACTION;
                    }
                    else {
                        app_js_3.App.zoom -= enums_js_9.Values.ZOOM_ADDITIVE;
                    }
                };
                Editor.prototype.cmdZoomNormal = function () {
                    app_js_3.App.zoom = 1;
                };
                Editor.prototype.cmdCenterView = function () {
                    app_js_3.App.centerX = 0;
                    app_js_3.App.centerY = 0;
                };
                Editor.prototype.cmdAddRoom = function () {
                    app_js_3.App.pushUndo();
                    var room = new room_js_1.Room(app_js_3.App.map.settings);
                    app_js_3.App.map.add(room);
                    room.x = grid_js_1.Grid.snap(this.mouseX);
                    room.y = grid_js_1.Grid.snap(this.mouseY);
                    this.views.push(viewFactory_js_1.ViewFactory.create(room));
                };
                Editor.prototype.cmdAddNote = function () {
                    app_js_3.App.pushUndo();
                    var note = new note_js_1.Note(app_js_3.App.map.settings);
                    app_js_3.App.map.add(note);
                    note.x = grid_js_1.Grid.snap(this.mouseX);
                    note.y = grid_js_1.Grid.snap(this.mouseY);
                    this.views.push(viewFactory_js_1.ViewFactory.create(note));
                };
                Editor.prototype.cmdAddBlock = function () {
                    app_js_3.App.pushUndo();
                    var block = new block_js_1.Block(app_js_3.App.map.settings);
                    app_js_3.App.map.add(block);
                    block.x = grid_js_1.Grid.snap(this.mouseX);
                    block.y = grid_js_1.Grid.snap(this.mouseY);
                    this.views.push(viewFactory_js_1.ViewFactory.create(block));
                };
                return Editor;
            }());
            exports_32("Editor", Editor);
        }
    };
});
System.register("controls/idInput/idInput", [], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var IdInput;
    return {
        setters: [],
        execute: function () {
            IdInput = /** @class */ (function () {
                // 
                // Create a new instance of IdInput by providing a query selector that
                // yields an id-input element.
                //
                function IdInput(selector) {
                    // Find element by selector:
                    this.elem = document.querySelector(selector);
                    if (!this.elem) {
                        throw ("Failed to instantiate idInput: selector " + selector + " not found in DOM.");
                    }
                    // Get label attribute:
                    var label = this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idInput({ label: label });
                    this.input = this.elem.querySelector('input');
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
                // Add an event listener to the inner <input>
                // Returns reference to self for easy chaining.
                // 
                IdInput.prototype.addEventListener = function (type, f) {
                    this.input.addEventListener(type, f);
                    return this;
                };
                return IdInput;
            }());
            exports_33("IdInput", IdInput);
        }
    };
});
System.register("controls/idTextarea/idTextarea", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var IdTextarea;
    return {
        setters: [],
        execute: function () {
            IdTextarea = /** @class */ (function () {
                // 
                // Create a new instance of IdTextarea by providing a query selector that
                // yields an id-textarea element.
                //
                function IdTextarea(selector) {
                    // Find element by selector:
                    this.elem = document.querySelector(selector);
                    if (!this.elem) {
                        throw ("Failed to instantiate idTextarea: selector " + selector + " not found in DOM.");
                    }
                    // Get label attribute:
                    var label = this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idTextarea({ label: label });
                    this.textarea = this.elem.querySelector('textarea');
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
                // Add an event listener to the inner <textarea>
                // Returns reference to self for easy chaining.
                // 
                IdTextarea.prototype.addEventListener = function (type, f) {
                    this.textarea.addEventListener(type, f);
                    return this;
                };
                return IdTextarea;
            }());
            exports_34("IdTextarea", IdTextarea);
        }
    };
});
System.register("controls/idCheck/idCheck", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var IdCheck;
    return {
        setters: [],
        execute: function () {
            IdCheck = /** @class */ (function () {
                // 
                // Create a new instance of IdCheck by providing a query selector that
                // yields an id-check element.
                //
                function IdCheck(selector) {
                    // Find element by selector:
                    this.elem = document.querySelector(selector);
                    if (!this.elem) {
                        throw ("Failed to instantiate idCheck: selector " + selector + " not found in DOM.");
                    }
                    // Get label attribute:
                    var label = this.elem.dataset.label;
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idCheck({ label: label });
                    this.input = this.elem.querySelector('input');
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
                IdCheck.prototype.addEventListener = function (type, f) {
                    this.input.addEventListener(type, f);
                    return this;
                };
                return IdCheck;
            }());
            exports_35("IdCheck", IdCheck);
        }
    };
});
System.register("controls/idRange/idRange", [], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var IdRange;
    return {
        setters: [],
        execute: function () {
            IdRange = /** @class */ (function () {
                // 
                // Create a new instance of IdRange by providing a query selector that
                // yields an id-range element.
                //
                function IdRange(selector) {
                    var _this = this;
                    // Find element by selector:
                    this.elem = document.querySelector(selector);
                    if (!this.elem) {
                        throw ("Failed to instantiate idRange: selector " + selector + " not found in DOM.");
                    }
                    // Get min/max values. If not specified, assume 0..100
                    var min = this.elem.dataset.min;
                    if (!min)
                        min = "0";
                    var max = this.elem.dataset.max;
                    if (!max)
                        max = "100";
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idRange({ min: min, max: max });
                    this.input = this.elem.querySelector('input');
                    this.label = this.elem.querySelector('.range-label');
                    // Default value is min.
                    this.input.value = min;
                    this.updateLabel();
                    // Whenever the input changes, update the label.
                    this.input.addEventListener('input', function () {
                        _this.updateLabel();
                    });
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
                IdRange.prototype.addEventListener = function (type, f) {
                    this.input.addEventListener(type, f);
                    return this;
                };
                return IdRange;
            }());
            exports_36("IdRange", IdRange);
        }
    };
});
System.register("controls/idColorPicker/idColorPicker", ["controls/controls", "enums/enums"], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var controls_1, enums_2, IdColorPicker;
    return {
        setters: [
            function (controls_1_1) {
                controls_1 = controls_1_1;
            },
            function (enums_2_1) {
                enums_2 = enums_2_1;
            }
        ],
        execute: function () {
            IdColorPicker = /** @class */ (function () {
                // 
                // Create a new instance of IdColorPicker by providing a query selector that
                // yields an id-colorpicker element.
                //
                function IdColorPicker(selector) {
                    var _this = this;
                    this.currentHue = 180;
                    this.currentHSLX = 150;
                    this.currentHSLY = 75;
                    // Find element by selector:
                    this.elem = document.querySelector(selector);
                    if (!this.elem) {
                        throw ("Failed to instantiate IdColorPicker: selector " + selector + " not found in DOM.");
                    }
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idColorPicker({
                        'recentcolors': IdColorPicker.recentColors,
                        'standardcolors': enums_2.Values.COLORS_STANDARD
                    });
                    // Get references to various sub-elements:
                    var canvases = this.elem.querySelectorAll('canvas');
                    this.canvasHue = canvases[1];
                    this.canvasHSL = canvases[0];
                    this.ctxHue = this.canvasHue.getContext('2d');
                    this.ctxHSL = this.canvasHSL.getContext('2d');
                    this.currentColorElem = this.elem.querySelector('.current-color');
                    this.hoverColorElem = this.elem.querySelector('.hover-color');
                    // Add recent colors:
                    var btns = this.elem.querySelectorAll('.recent id-popup');
                    this.recentButtons = new Array();
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
                    btns = this.elem.querySelectorAll('.standard id-popup');
                    var _loop_2 = function (i) {
                        var button = new controls_1.IdPopup(btns[i]);
                        button.backgroundColor = enums_2.Values.COLORS_STANDARD[i];
                        button.addEventListener('click', function () {
                            _this.addToRecent(enums_2.Values.COLORS_STANDARD[i]);
                            _this.pickColor(enums_2.Values.COLORS_STANDARD[i]);
                        });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_2(i);
                    }
                    // Draw colors into canvases:
                    this.drawHue();
                    this.drawHSL();
                    // When the hue canvas is clicked:
                    // hue canvas is redrawn (to show hue selection)
                    // hsl canvas is redrawn (to show new gradient)
                    this.canvasHue.addEventListener('click', function (e) {
                        _this.currentHue = 360 - (e.clientY - _this.findObjCoordinates(_this.canvasHue).y) * 360 / _this.canvasHue.clientHeight;
                        _this.currentHSLX = -100;
                        _this.currentHSLY = -100;
                        _this.drawHue();
                        _this.drawHSL();
                    });
                    // When the hsl canvas is hovered, the hovercolor is updated.
                    this.canvasHSL.addEventListener('mousemove', function (e) {
                        _this.hoverColorElem.style.backgroundColor = _this.getColorAtMouse(e.clientX, e.clientY, false);
                    });
                    // When the hsl canvas is clicked, the currentcolor is updated.
                    this.canvasHSL.addEventListener('click', function (e) {
                        var color = _this.getColorAtMouse(e.clientX, e.clientY, true);
                        _this.drawHSL();
                        _this.addToRecent(color);
                        _this.pickColor(color);
                    });
                    window.addEventListener('id-recent-colors-changed', function () { _this.updateRecentColors(); });
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
                //
                // Add an event listener to the element.
                // Returns reference to self for easy chaining.
                // 
                IdColorPicker.prototype.addEventListener = function (type, f) {
                    this.elem.addEventListener(type, f);
                    return this;
                };
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
            }());
            exports_37("IdColorPicker", IdColorPicker);
        }
    };
});
System.register("controls/idPopup/idPopup", [], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var IdPopup;
    return {
        setters: [],
        execute: function () {
            IdPopup = /** @class */ (function () {
                // 
                // Create a new instance of IdPopup by providing a query selector that
                // yields an id-popup element.
                //
                function IdPopup(selector) {
                    var _this = this;
                    // Find element by selector:
                    if (selector instanceof HTMLElement) {
                        this.elem = selector;
                    }
                    else {
                        this.elem = document.querySelector(selector);
                        if (!this.elem) {
                            throw ("Failed to instantiate idPopup: selector " + selector + " not found in DOM.");
                        }
                    }
                    // Find element's children and remove them.
                    var children = new Array();
                    for (var i = 0; i < this.elem.children.length; i++) {
                        children.push(this.elem.children[i]);
                    }
                    children.forEach(function (child) { child.remove(); });
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idPopup({});
                    // Get a reference to the button's div:
                    this.div = this.elem.querySelector('div');
                    // Add the children back:
                    children.forEach(function (child) { _this.div.appendChild(child); });
                    this.setupOverlay();
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
                //
                // Add an event listener to the element.
                // Returns reference to self for easy chaining.
                // 
                IdPopup.prototype.addEventListener = function (type, f) {
                    this.elem.addEventListener(type, f);
                    return this;
                };
                return IdPopup;
            }());
            exports_38("IdPopup", IdPopup);
        }
    };
});
System.register("controls/tabs", [], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Tabs, Tab;
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
            exports_39("Tabs", Tabs);
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
System.register("controls/window", [], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var Window;
    return {
        setters: [],
        execute: function () {
            Window = /** @class */ (function () {
                function Window(title, content, onOK, onCancel) {
                    var _this = this;
                    this.elem = document.getElementById('window');
                    this.elem.querySelector('.title').innerHTML = title;
                    this.elem.querySelector('.content').innerHTML = content;
                    var ok = this.elem.querySelector('.ok');
                    ok.style.display = onOK === false ? 'none' : 'block';
                    this.elem.querySelector('.ok').addEventListener('click', function () {
                        _this.close();
                        if (onOK instanceof Function)
                            onOK();
                    });
                    var cancel = this.elem.querySelector('.cancel');
                    cancel.style.display = onCancel === false ? 'none' : 'block';
                    this.elem.querySelector('.cancel').addEventListener('click', function () {
                        _this.close();
                        if (onCancel instanceof Function)
                            onCancel();
                    });
                    this.open();
                }
                Window.prototype.open = function () {
                    this.elem.style.display = 'flex';
                };
                Window.prototype.close = function () {
                    this.elem.style.display = 'none';
                };
                return Window;
            }());
            exports_40("Window", Window);
        }
    };
});
System.register("controls/controls", ["controls/idInput/idInput", "controls/idTextarea/idTextarea", "controls/idCheck/idCheck", "controls/idRange/idRange", "controls/idColorPicker/idColorPicker", "controls/idPopup/idPopup", "controls/tabs", "controls/window"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_41(exports);
    }
    return {
        setters: [
            function (idInput_js_1_1) {
                exportStar_3(idInput_js_1_1);
            },
            function (idTextarea_js_1_1) {
                exportStar_3(idTextarea_js_1_1);
            },
            function (idCheck_js_1_1) {
                exportStar_3(idCheck_js_1_1);
            },
            function (idRange_js_1_1) {
                exportStar_3(idRange_js_1_1);
            },
            function (idColorPicker_js_1_1) {
                exportStar_3(idColorPicker_js_1_1);
            },
            function (idPopup_js_1_1) {
                exportStar_3(idPopup_js_1_1);
            },
            function (tabs_js_1_1) {
                exportStar_3(tabs_js_1_1);
            },
            function (window_js_1_1) {
                exportStar_3(window_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("popups/popup", [], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var Popup;
    return {
        setters: [],
        execute: function () {
            Popup = /** @class */ (function () {
                function Popup(id, template, args) {
                    this.id = id;
                    this.elem = document.getElementById(id);
                    this.elem.innerHTML = template(args);
                }
                return Popup;
            }());
            exports_42("Popup", Popup);
        }
    };
});
System.register("popups/connectorPopup/connectorPopup", ["app", "dispatcher", "enums/enums", "views/connectorView", "popups/popups", "controls/controls"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var app_js_4, dispatcher_js_3, enums_js_10, connectorView_js_2, popups_js_1, controls_js_1, ConnectorPopup;
    return {
        setters: [
            function (app_js_4_1) {
                app_js_4 = app_js_4_1;
            },
            function (dispatcher_js_3_1) {
                dispatcher_js_3 = dispatcher_js_3_1;
            },
            function (enums_js_10_1) {
                enums_js_10 = enums_js_10_1;
            },
            function (connectorView_js_2_1) {
                connectorView_js_2 = connectorView_js_2_1;
            },
            function (popups_js_1_1) {
                popups_js_1 = popups_js_1_1;
            },
            function (controls_js_1_1) {
                controls_js_1 = controls_js_1_1;
            }
        ],
        execute: function () {
            ConnectorPopup = /** @class */ (function (_super) {
                __extends(ConnectorPopup, _super);
                function ConnectorPopup() {
                    var _this = _super.call(this, 'connectorpopup', Handlebars.templates.connectorPopup, { colors: enums_js_10.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_3.Dispatcher.subscribe(_this);
                    new controls_js_1.IdPopup('#connectorpopup .js-color');
                    new controls_js_1.IdPopup('#connectorpopup .js-line');
                    new controls_js_1.IdPopup('#connectorpopup .js-basic');
                    new controls_js_1.IdPopup('#connectorpopup .js-delete').addEventListener('click', function () { _this.deleteConnector(); });
                    new controls_js_1.IdPopup('#connectorpopup .js-more').addEventListener('click', function () { _this.showMore(); });
                    _this.ctrlName = new controls_js_1.IdInput('.js-name').addEventListener('input', function () { _this.connector.name = _this.ctrlName.value; });
                    var btns = _this.elem.querySelectorAll('.js-color id-popup');
                    var _loop_3 = function () {
                        var popup = new controls_js_1.IdPopup(btns[i]);
                        var color = enums_js_10.Values.COLORS_STANDARD[i];
                        popup.backgroundColor = color;
                        popup.addEventListener('click', function () { _this.setColor(color); });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_3();
                    }
                    new controls_js_1.IdPopup('#connectorpopup .js-linestyle-solid').addEventListener('click', function () { _this.connector.lineStyle = enums_js_10.LineStyle.Solid; });
                    new controls_js_1.IdPopup('#connectorpopup .js-linestyle-dash').addEventListener('click', function () { _this.connector.lineStyle = enums_js_10.LineStyle.Dash; });
                    new controls_js_1.IdPopup('#connectorpopup .js-linestyle-dashdot').addEventListener('click', function () { _this.connector.lineStyle = enums_js_10.LineStyle.DashDot; });
                    new controls_js_1.IdPopup('#connectorpopup .js-linestyle-dashdotdot').addEventListener('click', function () { _this.connector.lineStyle = enums_js_10.LineStyle.DashDotDot; });
                    new controls_js_1.IdPopup('#connectorpopup .js-linestyle-dot').addEventListener('click', function () { _this.connector.lineStyle = enums_js_10.LineStyle.Dot; });
                    _this.ctrlLinewidth = new controls_js_1.IdRange('#connectorpopup .js-linewidth').addEventListener('input', function () { _this.connector.lineWidth = _this.ctrlLinewidth.value; });
                    return _this;
                }
                ConnectorPopup.prototype.notify = function (event, model) {
                    if (event == enums_js_10.AppEvent.MouseMove || event == enums_js_10.AppEvent.Select)
                        this.toggle();
                };
                ConnectorPopup.prototype.setColor = function (color) {
                    this.connector.color = color;
                };
                ConnectorPopup.prototype.deleteConnector = function () {
                    app_js_4.App.pushUndo();
                    this.connector.delete();
                    this.toggle();
                };
                ConnectorPopup.prototype.showMore = function () {
                    dispatcher_js_3.Dispatcher.notify(enums_js_10.AppEvent.More, this.connector);
                };
                ConnectorPopup.prototype.toggle = function () {
                    if (app_js_4.App.selection.isSingle() && app_js_4.App.selection.first() instanceof connectorView_js_2.ConnectorView && app_js_4.App.mouseMode == enums_js_10.MouseMode.None) {
                        this.connector = app_js_4.App.selection.first().getModel();
                        var x = this.connector.dockStart ? this.connector.dockStart.x : this.connector.startX;
                        var y = this.connector.dockStart ? this.connector.dockStart.y : this.connector.startY;
                        this.elem.style.left = app_js_4.App.canvas.offsetWidth / 2 + app_js_4.App.centerX + x * app_js_4.App.zoom + "px";
                        this.elem.style.top = app_js_4.App.canvas.offsetHeight / 2 + app_js_4.App.centerY + y - 64 + "px";
                        this.elem.style.display = 'flex';
                        // Close any open overlays inside popup.
                        var overlays = this.elem.querySelectorAll(".popup-overlay");
                        for (var i = 0; i < overlays.length; i++) {
                            overlays[i].style.display = 'none';
                        }
                        this.ctrlName.value = this.connector.name;
                        this.ctrlLinewidth.value = this.connector.lineWidth;
                    }
                    else {
                        this.elem.style.display = 'none';
                    }
                };
                return ConnectorPopup;
            }(popups_js_1.Popup));
            exports_43("ConnectorPopup", ConnectorPopup);
        }
    };
});
System.register("popups/notePopup/notePopup", ["app", "dispatcher", "enums/enums", "views/noteView", "popups/popups", "controls/controls"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var app_js_5, dispatcher_js_4, enums_js_11, noteView_js_2, popups_js_2, controls_js_2, NotePopup;
    return {
        setters: [
            function (app_js_5_1) {
                app_js_5 = app_js_5_1;
            },
            function (dispatcher_js_4_1) {
                dispatcher_js_4 = dispatcher_js_4_1;
            },
            function (enums_js_11_1) {
                enums_js_11 = enums_js_11_1;
            },
            function (noteView_js_2_1) {
                noteView_js_2 = noteView_js_2_1;
            },
            function (popups_js_2_1) {
                popups_js_2 = popups_js_2_1;
            },
            function (controls_js_2_1) {
                controls_js_2 = controls_js_2_1;
            }
        ],
        execute: function () {
            NotePopup = /** @class */ (function (_super) {
                __extends(NotePopup, _super);
                function NotePopup() {
                    var _this = _super.call(this, 'notepopup', Handlebars.templates.notePopup, { colors: enums_js_11.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_4.Dispatcher.subscribe(_this);
                    new controls_js_2.IdPopup('#notepopup .js-basic');
                    new controls_js_2.IdPopup('#notepopup .js-color');
                    new controls_js_2.IdPopup('#notepopup .js-line');
                    new controls_js_2.IdPopup('#notepopup .js-position');
                    new controls_js_2.IdPopup('#notepopup .js-delete').addEventListener('click', function () { _this.deleteNote(); });
                    new controls_js_2.IdPopup('#notepopup .js-more').addEventListener('click', function () { _this.showMore(); });
                    _this.ctrlText = new controls_js_2.IdInput('.js-text').addEventListener('input', function () { _this.note.text = _this.ctrlText.value; });
                    var btns = _this.elem.querySelectorAll('.js-color id-popup');
                    var _loop_4 = function () {
                        var popup = new controls_js_2.IdPopup(btns[i]);
                        var color = enums_js_11.Values.COLORS_STANDARD[i];
                        popup.backgroundColor = color;
                        popup.addEventListener('click', function () { _this.setColor(color); });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_4();
                    }
                    new controls_js_2.IdPopup('#notepopup .js-linestyle-solid').addEventListener('click', function () { _this.note.lineStyle = enums_js_11.LineStyle.Solid; });
                    new controls_js_2.IdPopup('#notepopup .js-linestyle-dash').addEventListener('click', function () { _this.note.lineStyle = enums_js_11.LineStyle.Dash; });
                    new controls_js_2.IdPopup('#notepopup .js-linestyle-dashdot').addEventListener('click', function () { _this.note.lineStyle = enums_js_11.LineStyle.DashDot; });
                    new controls_js_2.IdPopup('#notepopup .js-linestyle-dashdotdot').addEventListener('click', function () { _this.note.lineStyle = enums_js_11.LineStyle.DashDotDot; });
                    new controls_js_2.IdPopup('#notepopup .js-linestyle-dot').addEventListener('click', function () { _this.note.lineStyle = enums_js_11.LineStyle.Dot; });
                    new controls_js_2.IdPopup('#notepopup .js-linestyle-none').addEventListener('click', function () { _this.note.lineStyle = enums_js_11.LineStyle.None; });
                    _this.ctrlLinewidth = new controls_js_2.IdRange('#notepopup .js-linewidth').addEventListener('input', function () { _this.note.lineWidth = _this.ctrlLinewidth.value; });
                    _this.elem.querySelector('.js-front').addEventListener('click', function () {
                        _this.note.bringToFront();
                        dispatcher_js_4.Dispatcher.notify(enums_js_11.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-forward').addEventListener('click', function () {
                        _this.note.bringForward();
                        dispatcher_js_4.Dispatcher.notify(enums_js_11.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-backward').addEventListener('click', function () {
                        _this.note.sendBackward();
                        dispatcher_js_4.Dispatcher.notify(enums_js_11.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-back').addEventListener('click', function () {
                        _this.note.sendToBack();
                        dispatcher_js_4.Dispatcher.notify(enums_js_11.AppEvent.Load, null);
                    });
                    return _this;
                }
                NotePopup.prototype.notify = function (event, model) {
                    if (event == enums_js_11.AppEvent.MouseMove || event == enums_js_11.AppEvent.Select)
                        this.toggle();
                };
                NotePopup.prototype.setColor = function (color) {
                    this.note.fillColor = color;
                };
                NotePopup.prototype.deleteNote = function () {
                    app_js_5.App.pushUndo();
                    this.note.delete();
                    this.toggle();
                };
                NotePopup.prototype.showMore = function () {
                    dispatcher_js_4.Dispatcher.notify(enums_js_11.AppEvent.More, this.note);
                };
                NotePopup.prototype.toggle = function () {
                    if (app_js_5.App.selection.isSingle() && app_js_5.App.selection.first() instanceof noteView_js_2.NoteView && app_js_5.App.mouseMode == enums_js_11.MouseMode.None) {
                        this.note = app_js_5.App.selection.first().getModel();
                        this.elem.style.left = app_js_5.App.canvas.offsetWidth / 2 + app_js_5.App.centerX + this.note.x * app_js_5.App.zoom + "px";
                        this.elem.style.top = app_js_5.App.canvas.offsetHeight / 2 + app_js_5.App.centerY + this.note.y - 64 + "px";
                        this.elem.style.display = 'flex';
                        // Close any open overlays inside popup.
                        var overlays = this.elem.querySelectorAll(".popup-overlay");
                        for (var i = 0; i < overlays.length; i++) {
                            overlays[i].style.display = 'none';
                        }
                        this.ctrlText.value = this.note.text;
                        this.ctrlLinewidth.value = this.note.lineWidth;
                    }
                    else {
                        this.elem.style.display = 'none';
                    }
                };
                return NotePopup;
            }(popups_js_2.Popup));
            exports_44("NotePopup", NotePopup);
        }
    };
});
System.register("popups/roomPopup/roomPopup", ["app", "dispatcher", "enums/enums", "views/roomView", "popups/popups", "controls/controls"], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var app_js_6, dispatcher_js_5, enums_js_12, roomView_js_2, popups_js_3, controls_js_3, RoomPopup;
    return {
        setters: [
            function (app_js_6_1) {
                app_js_6 = app_js_6_1;
            },
            function (dispatcher_js_5_1) {
                dispatcher_js_5 = dispatcher_js_5_1;
            },
            function (enums_js_12_1) {
                enums_js_12 = enums_js_12_1;
            },
            function (roomView_js_2_1) {
                roomView_js_2 = roomView_js_2_1;
            },
            function (popups_js_3_1) {
                popups_js_3 = popups_js_3_1;
            },
            function (controls_js_3_1) {
                controls_js_3 = controls_js_3_1;
            }
        ],
        execute: function () {
            RoomPopup = /** @class */ (function (_super) {
                __extends(RoomPopup, _super);
                function RoomPopup() {
                    var _this = _super.call(this, 'roompopup', Handlebars.templates.roomPopup, { colors: enums_js_12.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_5.Dispatcher.subscribe(_this);
                    new controls_js_3.IdPopup('#roompopup .js-basic');
                    new controls_js_3.IdPopup('#roompopup .js-fill');
                    new controls_js_3.IdPopup('#roompopup .js-border');
                    new controls_js_3.IdPopup('#roompopup .js-position');
                    new controls_js_3.IdPopup('#roompopup .js-delete').addEventListener('click', function () { _this.deleteRoom(); });
                    new controls_js_3.IdPopup('#roompopup .js-more').addEventListener('click', function () { _this.showMore(); });
                    _this.elem.querySelector('.js-front').addEventListener('click', function () {
                        _this.room.bringToFront();
                        dispatcher_js_5.Dispatcher.notify(enums_js_12.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-forward').addEventListener('click', function () {
                        _this.room.bringForward();
                        dispatcher_js_5.Dispatcher.notify(enums_js_12.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-backward').addEventListener('click', function () {
                        _this.room.sendBackward();
                        dispatcher_js_5.Dispatcher.notify(enums_js_12.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-back').addEventListener('click', function () {
                        _this.room.sendToBack();
                        dispatcher_js_5.Dispatcher.notify(enums_js_12.AppEvent.Load, null);
                    });
                    _this.ctrlName = new controls_js_3.IdInput('.js-name').addEventListener('input', function () { _this.room.name = _this.ctrlName.value; });
                    _this.ctrlSubtitle = new controls_js_3.IdInput('.js-subtitle').addEventListener('input', function () { _this.room.subtitle = _this.ctrlSubtitle.value; });
                    var btns = _this.elem.querySelectorAll('.js-fill id-popup');
                    var _loop_5 = function () {
                        var popup = new controls_js_3.IdPopup(btns[i]);
                        var color = enums_js_12.Values.COLORS_STANDARD[i];
                        popup.backgroundColor = color;
                        popup.addEventListener('click', function () { _this.setColor(color); });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_5();
                    }
                    new controls_js_3.IdPopup('#roompopup .js-linestyle-solid').addEventListener('click', function () { _this.room.lineStyle = enums_js_12.LineStyle.Solid; });
                    new controls_js_3.IdPopup('#roompopup .js-linestyle-dash').addEventListener('click', function () { _this.room.lineStyle = enums_js_12.LineStyle.Dash; });
                    new controls_js_3.IdPopup('#roompopup .js-linestyle-dashdot').addEventListener('click', function () { _this.room.lineStyle = enums_js_12.LineStyle.DashDot; });
                    new controls_js_3.IdPopup('#roompopup .js-linestyle-dashdotdot').addEventListener('click', function () { _this.room.lineStyle = enums_js_12.LineStyle.DashDotDot; });
                    new controls_js_3.IdPopup('#roompopup .js-linestyle-dot').addEventListener('click', function () { _this.room.lineStyle = enums_js_12.LineStyle.Dot; });
                    new controls_js_3.IdPopup('#roompopup .js-linestyle-none').addEventListener('click', function () { _this.room.lineStyle = enums_js_12.LineStyle.None; });
                    _this.ctrlLinewidth = new controls_js_3.IdRange('#roompopup .js-linewidth').addEventListener('input', function () { _this.room.lineWidth = _this.ctrlLinewidth.value; });
                    return _this;
                }
                RoomPopup.prototype.notify = function (event, model) {
                    if (event == enums_js_12.AppEvent.MouseMove || event == enums_js_12.AppEvent.Select)
                        this.toggle();
                };
                RoomPopup.prototype.setColor = function (color) {
                    this.room.fillColor = color;
                };
                RoomPopup.prototype.deleteRoom = function () {
                    app_js_6.App.pushUndo();
                    this.room.delete();
                    this.toggle();
                };
                RoomPopup.prototype.showMore = function () {
                    dispatcher_js_5.Dispatcher.notify(enums_js_12.AppEvent.More, this.room);
                };
                RoomPopup.prototype.toggle = function () {
                    if (app_js_6.App.selection.isSingle() && app_js_6.App.selection.first() instanceof roomView_js_2.RoomView && app_js_6.App.mouseMode == enums_js_12.MouseMode.None) {
                        this.room = app_js_6.App.selection.first().getModel();
                        this.elem.style.left = app_js_6.App.canvas.offsetWidth / 2 + app_js_6.App.centerX + this.room.x * app_js_6.App.zoom + "px";
                        this.elem.style.top = app_js_6.App.canvas.offsetHeight / 2 + app_js_6.App.centerY + this.room.y - 64 + "px";
                        this.elem.style.display = 'flex';
                        // Close any open overlays inside popup.
                        var overlays = this.elem.querySelectorAll(".popup-overlay");
                        for (var i = 0; i < overlays.length; i++) {
                            overlays[i].style.display = 'none';
                        }
                        this.ctrlLinewidth.value = this.room.lineWidth;
                        this.ctrlName.value = this.room.name;
                        this.ctrlSubtitle.value = this.room.subtitle;
                    }
                    else {
                        this.elem.style.display = 'none';
                    }
                };
                return RoomPopup;
            }(popups_js_3.Popup));
            exports_45("RoomPopup", RoomPopup);
        }
    };
});
System.register("popups/popups", ["popups/popup", "popups/connectorPopup/connectorPopup", "popups/notePopup/notePopup", "popups/roomPopup/roomPopup"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_46(exports);
    }
    return {
        setters: [
            function (popup_js_1_1) {
                exportStar_4(popup_js_1_1);
            },
            function (connectorPopup_js_1_1) {
                exportStar_4(connectorPopup_js_1_1);
            },
            function (notePopup_js_1_1) {
                exportStar_4(notePopup_js_1_1);
            },
            function (roomPopup_js_1_1) {
                exportStar_4(roomPopup_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("panels/panel", [], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var Panel;
    return {
        setters: [],
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
                    document.getElementById('canvas').addEventListener('mousedown', function () {
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
            exports_47("Panel", Panel);
        }
    };
});
System.register("controls/idRadio/idRadio", [], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var IdRadio;
    return {
        setters: [],
        execute: function () {
            IdRadio = /** @class */ (function () {
                // 
                // Create a new instance of IdRadio by providing a query selector that
                // yields an id-radio element.
                //
                function IdRadio(selector, base) {
                    // Find element by selector:
                    if (!base) {
                        this.elem = document.querySelector(selector);
                    }
                    else {
                        this.elem = base.querySelector(selector);
                    }
                    if (!this.elem) {
                        throw ("Failed to instantiate idRadio: selector " + selector + " not found in DOM.");
                    }
                    // Get label attribute:
                    var label = this.elem.dataset.label;
                    // Get name attribute:
                    var name = this.elem.dataset.name;
                    // Expand a handlebars template into the top element.
                    this.elem.innerHTML = Handlebars.templates.idRadio({ label: label, name: name });
                    this.input = this.elem.querySelector('input');
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
                IdRadio.prototype.addEventListener = function (type, f) {
                    this.input.addEventListener(type, f);
                    return this;
                };
                return IdRadio;
            }());
            exports_48("IdRadio", IdRadio);
        }
    };
});
System.register("controls/idConnectorType/idConnectorType", ["controls/idRadio/idRadio", "enums/connectorType"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var idRadio_1, connectorType_1, IdConnectorType;
    return {
        setters: [
            function (idRadio_1_1) {
                idRadio_1 = idRadio_1_1;
            },
            function (connectorType_1_1) {
                connectorType_1 = connectorType_1_1;
            }
        ],
        execute: function () {
            IdConnectorType = /** @class */ (function () {
                // 
                // Create a new instance of IdConnectorType by providing a query selector that
                // yields an id-connector-type element.
                //
                function IdConnectorType(selector) {
                    // Find element by selector:
                    this.elem = document.querySelector(selector);
                    if (!this.elem) {
                        throw ("Failed to instantiate idConnectorType: selector " + selector + " not found in DOM.");
                    }
                    // Expand a handlebars template into the top element.
                    // Every connectortype has a unique ID.
                    this.elem.innerHTML = Handlebars.templates.idConnectorType({ name: "connector" + IdConnectorType.id });
                    IdConnectorType.id++;
                    this.radioDefault = new idRadio_1.IdRadio('.js-default', this.elem);
                    this.radioIn = new idRadio_1.IdRadio('.js-in', this.elem);
                    this.radioOut = new idRadio_1.IdRadio('.js-out', this.elem);
                    this.radioUp = new idRadio_1.IdRadio('.js-up', this.elem);
                    this.radioDown = new idRadio_1.IdRadio('.js-down', this.elem);
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
                IdConnectorType.prototype.addEventListener = function (type, f) {
                    this.radioDefault.addEventListener(type, f);
                    this.radioIn.addEventListener(type, f);
                    this.radioOut.addEventListener(type, f);
                    this.radioUp.addEventListener(type, f);
                    this.radioDown.addEventListener(type, f);
                    return this;
                };
                IdConnectorType.id = 0;
                return IdConnectorType;
            }());
            exports_49("IdConnectorType", IdConnectorType);
        }
    };
});
System.register("panels/connectorPanel/connectorPanel", ["dispatcher", "enums/appEvent", "models/connector", "app", "panels/panels", "controls/controls", "controls/idConnectorType/idConnectorType"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var dispatcher_js_6, appEvent_js_3, connector_js_3, app_js_7, panels_js_1, controls_js_4, idConnectorType_js_1, ConnectorPanel;
    return {
        setters: [
            function (dispatcher_js_6_1) {
                dispatcher_js_6 = dispatcher_js_6_1;
            },
            function (appEvent_js_3_1) {
                appEvent_js_3 = appEvent_js_3_1;
            },
            function (connector_js_3_1) {
                connector_js_3 = connector_js_3_1;
            },
            function (app_js_7_1) {
                app_js_7 = app_js_7_1;
            },
            function (panels_js_1_1) {
                panels_js_1 = panels_js_1_1;
            },
            function (controls_js_4_1) {
                controls_js_4 = controls_js_4_1;
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
                    dispatcher_js_6.Dispatcher.subscribe(_this);
                    _this.ctrlName = new controls_js_4.IdInput('#connectorpanel .js-connector-name').addEventListener('input', function () { _this.connector.name = _this.ctrlName.value; });
                    _this.ctrlCurve = new controls_js_4.IdCheck('#connectorpanel .js-connector-curve').addEventListener('input', function () { _this.connector.isCurve = _this.ctrlCurve.checked; });
                    _this.ctrlOneWay = new controls_js_4.IdCheck('#connectorpanel .js-connector-oneway').addEventListener('input', function () { _this.connector.oneWay = _this.ctrlOneWay.checked; });
                    _this.ctrlColor = new controls_js_4.IdColorPicker('#connectorpanel .js-connector-color').addEventListener('change', function () { _this.connector.color = _this.ctrlColor.color; });
                    _this.btnReverse = _this.elem.querySelector('.js-reverse');
                    _this.btnReverse.addEventListener('click', function () { app_js_7.App.pushUndo(); _this.connector.reverse(); });
                    _this.ctrlStartType = new idConnectorType_js_1.IdConnectorType('#connectorpanel .js-connector-starttype').addEventListener('input', function () { _this.connector.startType = _this.ctrlStartType.value; });
                    _this.ctrlEndType = new idConnectorType_js_1.IdConnectorType('#connectorpanel .js-connector-endtype').addEventListener('input', function () { _this.connector.endType = _this.ctrlEndType.value; });
                    _this.ctrlStartLabel = new controls_js_4.IdInput('#connectorpanel .js-connector-startlabel').addEventListener('input', function () { _this.connector.startLabel = _this.ctrlStartLabel.value; });
                    _this.ctrlEndLabel = new controls_js_4.IdInput('#connectorpanel .js-connector-endlabel').addEventListener('input', function () { _this.connector.endLabel = _this.ctrlEndLabel.value; });
                    return _this;
                }
                ConnectorPanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_3.AppEvent.Select) {
                        this.close();
                    }
                    if (event == appEvent_js_3.AppEvent.More) {
                        if (obj instanceof connector_js_3.Connector) {
                            var connector = obj;
                            this.connector = connector;
                            this.open();
                            // Show connector data.
                            this.ctrlName.value = connector.name;
                            this.ctrlCurve.checked = connector.isCurve;
                            this.ctrlOneWay.checked = connector.oneWay;
                            this.ctrlColor.color = connector.color;
                            this.btnReverse.style.display = connector.isDoubleDocked() ? 'block' : 'none';
                            this.ctrlStartType.value = connector.startType;
                            this.ctrlEndType.value = connector.endType;
                            this.ctrlStartLabel.value = connector.startLabel;
                            this.ctrlEndLabel.value = connector.endLabel;
                        }
                        else {
                            this.close();
                        }
                    }
                };
                return ConnectorPanel;
            }(panels_js_1.Panel));
            exports_50("ConnectorPanel", ConnectorPanel);
        }
    };
});
System.register("panels/mapPanel/mapPanel", ["dispatcher", "enums/appEvent", "app", "enums/enums", "panels/panels", "controls/controls", "models/map"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var dispatcher_js_7, appEvent_js_4, app_js_8, enums_js_13, panels_js_2, controls_js_5, map_js_1, MapPanel;
    return {
        setters: [
            function (dispatcher_js_7_1) {
                dispatcher_js_7 = dispatcher_js_7_1;
            },
            function (appEvent_js_4_1) {
                appEvent_js_4 = appEvent_js_4_1;
            },
            function (app_js_8_1) {
                app_js_8 = app_js_8_1;
            },
            function (enums_js_13_1) {
                enums_js_13 = enums_js_13_1;
            },
            function (panels_js_2_1) {
                panels_js_2 = panels_js_2_1;
            },
            function (controls_js_5_1) {
                controls_js_5 = controls_js_5_1;
            },
            function (map_js_1_1) {
                map_js_1 = map_js_1_1;
            }
        ],
        execute: function () {
            MapPanel = /** @class */ (function (_super) {
                __extends(MapPanel, _super);
                function MapPanel() {
                    var _this = _super.call(this, 'mappanel', Handlebars.templates.mapPanel, { assets: enums_js_13.Values.BITMAP_ASSETS }) || this;
                    dispatcher_js_7.Dispatcher.subscribe(_this);
                    _this.ctrlTitle = new controls_js_5.IdInput('#mappanel .js-map-title').addEventListener('input', function () { app_js_8.App.map.title = _this.ctrlTitle.value; });
                    _this.ctrlAuthor = new controls_js_5.IdInput('#mappanel .js-map-author').addEventListener('input', function () { app_js_8.App.map.author = _this.ctrlAuthor.value; });
                    _this.ctrlDescription = new controls_js_5.IdTextarea('#mappanel .js-map-description').addEventListener('input', function () { app_js_8.App.map.description = _this.ctrlDescription.value; });
                    _this.ctrlGridVisible = new controls_js_5.IdCheck('#mappanel .js-map-grid-visible').addEventListener('input', function () { app_js_8.App.map.settings.grid.visible = _this.ctrlGridVisible.checked; });
                    _this.ctrlGridOrigin = new controls_js_5.IdCheck('#mappanel .js-map-grid-origin').addEventListener('input', function () { app_js_8.App.map.settings.grid.origin = _this.ctrlGridOrigin.checked; });
                    _this.ctrlGridSnap = new controls_js_5.IdCheck('#mappanel .js-map-grid-snap').addEventListener('input', function () { app_js_8.App.map.settings.grid.snap = _this.ctrlGridSnap.checked; });
                    _this.ctrlGridSize = new controls_js_5.IdRange('#mappanel .js-map-grid-size').addEventListener('input', function () { app_js_8.App.map.settings.grid.size = _this.ctrlGridSize.value; });
                    // Map backgrounds
                    new controls_js_5.IdPopup('#mappanel .js-map-bg-none').addEventListener('click', function () { app_js_8.App.map.settings.background = 'none'; });
                    enums_js_13.Values.BITMAP_ASSETS.forEach(function (asset) {
                        new controls_js_5.IdPopup("#mappanel .js-map-bg-" + asset).addEventListener('click', function () { app_js_8.App.map.settings.background = asset; });
                    });
                    _this.ctrlRoomWidth = new controls_js_5.IdRange('#mappanel .js-map-room-width').addEventListener('input', function () { app_js_8.App.map.settings.room.width = _this.ctrlRoomWidth.value; });
                    _this.ctrlRoomHeight = new controls_js_5.IdRange('#mappanel .js-map-room-height').addEventListener('input', function () { app_js_8.App.map.settings.room.height = _this.ctrlRoomHeight.value; });
                    _this.ctrlRoomLinewidth = new controls_js_5.IdRange('#mappanel .js-map-room-linewidth').addEventListener('input', function () { app_js_8.App.map.settings.room.lineWidth = _this.ctrlRoomLinewidth.value; });
                    _this.ctrlRoomRounding = new controls_js_5.IdRange('#mappanel .js-map-room-rounding').addEventListener('input', function () { app_js_8.App.map.settings.room.rounding = _this.ctrlRoomRounding.value; });
                    _this.ctrlRoomDarknessSize = new controls_js_5.IdRange('#mappanel .js-map-room-darkness-size').addEventListener('input', function () { app_js_8.App.map.settings.room.darknessSize = _this.ctrlRoomDarknessSize.value; });
                    new controls_js_5.IdPopup('#mappanel .js-room-shape-rectangle').addEventListener('click', function () { app_js_8.App.map.settings.room.shape = enums_js_13.RoomShape.Rectangle; });
                    new controls_js_5.IdPopup('#mappanel .js-room-shape-ellipse').addEventListener('click', function () { app_js_8.App.map.settings.room.shape = enums_js_13.RoomShape.Ellipse; });
                    new controls_js_5.IdPopup('#mappanel .js-room-shape-octagon').addEventListener('click', function () { app_js_8.App.map.settings.room.shape = enums_js_13.RoomShape.Octagon; });
                    new controls_js_5.IdPopup('#mappanel .js-room-linestyle-solid').addEventListener('click', function () { app_js_8.App.map.settings.room.lineStyle = enums_js_13.LineStyle.Solid; });
                    new controls_js_5.IdPopup('#mappanel .js-room-linestyle-dash').addEventListener('click', function () { app_js_8.App.map.settings.room.lineStyle = enums_js_13.LineStyle.Dash; });
                    new controls_js_5.IdPopup('#mappanel .js-room-linestyle-dashdot').addEventListener('click', function () { app_js_8.App.map.settings.room.lineStyle = enums_js_13.LineStyle.DashDot; });
                    new controls_js_5.IdPopup('#mappanel .js-room-linestyle-dashdotdot').addEventListener('click', function () { app_js_8.App.map.settings.room.lineStyle = enums_js_13.LineStyle.DashDotDot; });
                    new controls_js_5.IdPopup('#mappanel .js-room-linestyle-dot').addEventListener('click', function () { app_js_8.App.map.settings.room.lineStyle = enums_js_13.LineStyle.Dot; });
                    new controls_js_5.IdPopup('#mappanel .js-room-linestyle-none').addEventListener('click', function () { app_js_8.App.map.settings.room.lineStyle = enums_js_13.LineStyle.None; });
                    _this.roomColorPicker = new controls_js_5.IdColorPicker('#mappanel .js-map-room-color').addEventListener('change', function () { _this.setRoomColor(_this.roomColorPicker.color); });
                    // Find room color buttons:
                    var buttons = document.querySelectorAll("#mappanel .room-colortype");
                    _this.roomColorButtons = new Array();
                    var _loop_6 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.elem.classList.contains('selected'))
                            this_2.roomColorType = popup.elem.dataset.type;
                        this_2.roomColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onRoomColorButton(popup); });
                    };
                    var this_2 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_6(i);
                    }
                    _this.ctrlConnectorLinewidth = new controls_js_5.IdRange('#mappanel .js-map-connector-linewidth').addEventListener('input', function () { app_js_8.App.map.settings.connector.lineWidth = _this.ctrlConnectorLinewidth.value; });
                    _this.ctrlConnectorStalk = new controls_js_5.IdRange('#mappanel .js-map-connector-stalk').addEventListener('input', function () { app_js_8.App.map.settings.connector.stalk = _this.ctrlConnectorStalk.value; });
                    _this.ctrlConnectorLabelDistance = new controls_js_5.IdRange('#mappanel .js-map-connector-label-distance').addEventListener('input', function () { app_js_8.App.map.settings.connector.labelDistance = _this.ctrlConnectorLabelDistance.value; });
                    _this.ctrlConnectorArrowSize = new controls_js_5.IdRange('#mappanel .js-map-connector-arrow-size').addEventListener('input', function () { app_js_8.App.map.settings.connector.arrowSize = _this.ctrlConnectorArrowSize.value; });
                    _this.ctrlConnectorCurve = new controls_js_5.IdCheck('#mappanel .js-map-connector-curve').addEventListener('input', function () { app_js_8.App.map.settings.connector.isCurve = _this.ctrlConnectorCurve.checked; });
                    _this.ctrlConnectorCurveStrength = new controls_js_5.IdRange('#mappanel .js-map-connector-curve-strength').addEventListener('input', function () { app_js_8.App.map.settings.connector.curveStrength = _this.ctrlConnectorCurveStrength.value / 10; });
                    new controls_js_5.IdPopup('#mappanel .js-connector-linestyle-solid').addEventListener('click', function () { app_js_8.App.map.settings.connector.lineStyle = enums_js_13.LineStyle.Solid; });
                    new controls_js_5.IdPopup('#mappanel .js-connector-linestyle-dash').addEventListener('click', function () { app_js_8.App.map.settings.connector.lineStyle = enums_js_13.LineStyle.Dash; });
                    new controls_js_5.IdPopup('#mappanel .js-connector-linestyle-dashdot').addEventListener('click', function () { app_js_8.App.map.settings.connector.lineStyle = enums_js_13.LineStyle.DashDot; });
                    new controls_js_5.IdPopup('#mappanel .js-connector-linestyle-dashdotdot').addEventListener('click', function () { app_js_8.App.map.settings.connector.lineStyle = enums_js_13.LineStyle.DashDotDot; });
                    new controls_js_5.IdPopup('#mappanel .js-connector-linestyle-dot').addEventListener('click', function () { app_js_8.App.map.settings.connector.lineStyle = enums_js_13.LineStyle.Dot; });
                    _this.connectorColorPicker = new controls_js_5.IdColorPicker('#mappanel .js-map-connector-color').addEventListener('change', function () { app_js_8.App.map.settings.connector.color = _this.connectorColorPicker.color; });
                    _this.ctrlNoteWidth = new controls_js_5.IdRange('#mappanel .js-map-note-width').addEventListener('input', function () { app_js_8.App.map.settings.note.width = _this.ctrlNoteWidth.value; });
                    _this.ctrlNoteHeight = new controls_js_5.IdRange('#mappanel .js-map-note-height').addEventListener('input', function () { app_js_8.App.map.settings.note.height = _this.ctrlNoteHeight.value; });
                    _this.ctrlNoteLinewidth = new controls_js_5.IdRange('#mappanel .js-map-note-linewidth').addEventListener('input', function () { app_js_8.App.map.settings.note.lineWidth = _this.ctrlNoteLinewidth.value; });
                    _this.ctrlNoteRounding = new controls_js_5.IdRange('#mappanel .js-map-note-rounding').addEventListener('input', function () { app_js_8.App.map.settings.note.rounding = _this.ctrlNoteRounding.value; });
                    new controls_js_5.IdPopup('#mappanel .js-note-shape-rectangle').addEventListener('click', function () { app_js_8.App.map.settings.note.shape = enums_js_13.RoomShape.Rectangle; });
                    new controls_js_5.IdPopup('#mappanel .js-note-shape-ellipse').addEventListener('click', function () { app_js_8.App.map.settings.note.shape = enums_js_13.RoomShape.Ellipse; });
                    new controls_js_5.IdPopup('#mappanel .js-note-shape-octagon').addEventListener('click', function () { app_js_8.App.map.settings.note.shape = enums_js_13.RoomShape.Octagon; });
                    new controls_js_5.IdPopup('#mappanel .js-note-linestyle-solid').addEventListener('click', function () { app_js_8.App.map.settings.note.lineStyle = enums_js_13.LineStyle.Solid; });
                    new controls_js_5.IdPopup('#mappanel .js-note-linestyle-dash').addEventListener('click', function () { app_js_8.App.map.settings.note.lineStyle = enums_js_13.LineStyle.Dash; });
                    new controls_js_5.IdPopup('#mappanel .js-note-linestyle-dashdot').addEventListener('click', function () { app_js_8.App.map.settings.note.lineStyle = enums_js_13.LineStyle.DashDot; });
                    new controls_js_5.IdPopup('#mappanel .js-note-linestyle-dashdotdot').addEventListener('click', function () { app_js_8.App.map.settings.note.lineStyle = enums_js_13.LineStyle.DashDotDot; });
                    new controls_js_5.IdPopup('#mappanel .js-note-linestyle-dot').addEventListener('click', function () { app_js_8.App.map.settings.note.lineStyle = enums_js_13.LineStyle.Dot; });
                    new controls_js_5.IdPopup('#mappanel .js-note-linestyle-none').addEventListener('click', function () { app_js_8.App.map.settings.note.lineStyle = enums_js_13.LineStyle.None; });
                    _this.noteColorPicker = new controls_js_5.IdColorPicker('#mappanel .js-map-note-color').addEventListener('change', function () { _this.setNoteColor(_this.noteColorPicker.color); });
                    // Find note color buttons:
                    var buttons = document.querySelectorAll("#mappanel .note-colortype");
                    _this.noteColorButtons = new Array();
                    var _loop_7 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.elem.classList.contains('selected'))
                            this_3.noteColorType = popup.elem.dataset.type;
                        this_3.noteColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onNoteColorButton(popup); });
                    };
                    var this_3 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_7(i);
                    }
                    _this.ctrlBlockWidth = new controls_js_5.IdRange('#mappanel .js-map-block-width').addEventListener('input', function () { app_js_8.App.map.settings.block.width = _this.ctrlBlockWidth.value; });
                    _this.ctrlBlockHeight = new controls_js_5.IdRange('#mappanel .js-map-block-height').addEventListener('input', function () { app_js_8.App.map.settings.block.height = _this.ctrlBlockHeight.value; });
                    _this.ctrlBlockLinewidth = new controls_js_5.IdRange('#mappanel .js-map-block-linewidth').addEventListener('input', function () { app_js_8.App.map.settings.block.lineWidth = _this.ctrlBlockLinewidth.value; });
                    _this.ctrlBlockRounding = new controls_js_5.IdRange('#mappanel .js-map-block-rounding').addEventListener('input', function () { app_js_8.App.map.settings.block.rounding = _this.ctrlBlockRounding.value; });
                    new controls_js_5.IdPopup('#mappanel .js-block-shape-rectangle').addEventListener('click', function () { app_js_8.App.map.settings.block.shape = enums_js_13.RoomShape.Rectangle; });
                    new controls_js_5.IdPopup('#mappanel .js-block-shape-ellipse').addEventListener('click', function () { app_js_8.App.map.settings.block.shape = enums_js_13.RoomShape.Ellipse; });
                    new controls_js_5.IdPopup('#mappanel .js-block-shape-octagon').addEventListener('click', function () { app_js_8.App.map.settings.block.shape = enums_js_13.RoomShape.Octagon; });
                    new controls_js_5.IdPopup('#mappanel .js-block-linestyle-solid').addEventListener('click', function () { app_js_8.App.map.settings.block.lineStyle = enums_js_13.LineStyle.Solid; });
                    new controls_js_5.IdPopup('#mappanel .js-block-linestyle-dash').addEventListener('click', function () { app_js_8.App.map.settings.block.lineStyle = enums_js_13.LineStyle.Dash; });
                    new controls_js_5.IdPopup('#mappanel .js-block-linestyle-dashdot').addEventListener('click', function () { app_js_8.App.map.settings.block.lineStyle = enums_js_13.LineStyle.DashDot; });
                    new controls_js_5.IdPopup('#mappanel .js-block-linestyle-dashdotdot').addEventListener('click', function () { app_js_8.App.map.settings.block.lineStyle = enums_js_13.LineStyle.DashDotDot; });
                    new controls_js_5.IdPopup('#mappanel .js-block-linestyle-dot').addEventListener('click', function () { app_js_8.App.map.settings.block.lineStyle = enums_js_13.LineStyle.Dot; });
                    new controls_js_5.IdPopup('#mappanel .js-block-linestyle-none').addEventListener('click', function () { app_js_8.App.map.settings.block.lineStyle = enums_js_13.LineStyle.None; });
                    _this.blockColorPicker = new controls_js_5.IdColorPicker('#mappanel .js-map-block-color').addEventListener('change', function () { _this.setBlockColor(_this.blockColorPicker.color); });
                    // Find block color buttons:
                    var buttons = document.querySelectorAll("#mappanel .block-colortype");
                    _this.blockColorButtons = new Array();
                    var _loop_8 = function (i) {
                        var popup = new controls_js_5.IdPopup(buttons[i]);
                        if (popup.elem.classList.contains('selected'))
                            this_4.blockColorType = popup.elem.dataset.type;
                        this_4.blockColorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onBlockColorButton(popup); });
                    };
                    var this_4 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_8(i);
                    }
                    return _this;
                }
                MapPanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_4.AppEvent.More) {
                        if (obj instanceof map_js_1.Map) {
                            this.open();
                            // Place map data in controls:
                            this.ctrlTitle.value = app_js_8.App.map.title;
                            this.ctrlAuthor.value = app_js_8.App.map.author;
                            this.ctrlDescription.value = app_js_8.App.map.description;
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
                MapPanel.prototype.onRoomColorButton = function (button) {
                    // Unselect all buttons.
                    this.roomColorButtons.forEach(function (button) {
                        button.elem.classList.remove('selected');
                    });
                    // Select this button.
                    button.elem.classList.add('selected');
                    // Make the buttons' data-type the current color type.
                    this.roomColorType = button.elem.dataset.type;
                    // Set colorPicker to color.
                    this.setRoomPickerColor();
                };
                MapPanel.prototype.setRoomPickerColor = function () {
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
                };
                MapPanel.prototype.setRoomColor = function (color) {
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
                };
                MapPanel.prototype.onNoteColorButton = function (button) {
                    // Unselect all buttons.
                    this.noteColorButtons.forEach(function (button) {
                        button.elem.classList.remove('selected');
                    });
                    // Select this button.
                    button.elem.classList.add('selected');
                    // Make the buttons' data-type the current color type.
                    this.noteColorType = button.elem.dataset.type;
                    // Set colorPicker to color.
                    this.setNotePickerColor();
                };
                MapPanel.prototype.setNotePickerColor = function () {
                    if (this.noteColorType == 'fill')
                        this.noteColorPicker.color = app_js_8.App.map.settings.note.fillColor;
                    if (this.noteColorType == 'border')
                        this.noteColorPicker.color = app_js_8.App.map.settings.note.borderColor;
                    if (this.noteColorType == 'text')
                        this.noteColorPicker.color = app_js_8.App.map.settings.note.textColor;
                };
                MapPanel.prototype.setNoteColor = function (color) {
                    if (this.noteColorType == 'fill')
                        app_js_8.App.map.settings.note.fillColor = color;
                    if (this.noteColorType == 'border')
                        app_js_8.App.map.settings.note.borderColor = color;
                    if (this.noteColorType == 'text')
                        app_js_8.App.map.settings.note.textColor = color;
                };
                MapPanel.prototype.onBlockColorButton = function (button) {
                    // Unselect all buttons.
                    this.blockColorButtons.forEach(function (button) {
                        button.elem.classList.remove('selected');
                    });
                    // Select this button.
                    button.elem.classList.add('selected');
                    // Make the buttons' data-type the current color type.
                    this.blockColorType = button.elem.dataset.type;
                    // Set colorPicker to color.
                    this.setBlockPickerColor();
                };
                MapPanel.prototype.setBlockPickerColor = function () {
                    if (this.blockColorType == 'fill')
                        this.blockColorPicker.color = app_js_8.App.map.settings.block.fillColor;
                    if (this.blockColorType == 'border')
                        this.blockColorPicker.color = app_js_8.App.map.settings.block.borderColor;
                };
                MapPanel.prototype.setBlockColor = function (color) {
                    if (this.blockColorType == 'fill')
                        app_js_8.App.map.settings.block.fillColor = color;
                    if (this.blockColorType == 'border')
                        app_js_8.App.map.settings.block.borderColor = color;
                };
                return MapPanel;
            }(panels_js_2.Panel));
            exports_51("MapPanel", MapPanel);
        }
    };
});
System.register("io/mapXML", ["models/map", "models/room", "models/connector", "enums/enums"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var map_js_2, room_js_2, connector_js_4, enums_js_14, MapXMLLoader;
    return {
        setters: [
            function (map_js_2_1) {
                map_js_2 = map_js_2_1;
            },
            function (room_js_2_1) {
                room_js_2 = room_js_2_1;
            },
            function (connector_js_4_1) {
                connector_js_4 = connector_js_4_1;
            },
            function (enums_js_14_1) {
                enums_js_14 = enums_js_14_1;
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
                    var room = new room_js_2.Room(map.settings);
                    map.add(room);
                    room.id = this.getAttr(node, 'id', 0, parseInt);
                    room.x = this.getAttr(node, 'x', 0, parseFloat);
                    room.y = this.getAttr(node, 'y', 0, parseFloat);
                    room.name = this.getAttr(node, 'name', '');
                    room.subtitle = this.getAttr(node, 'subtitle', '');
                    room.description = this.getAttr(node, 'description', '');
                    room.width = this.getAttr(node, 'w', map.settings.room.width, parseFloat);
                    room.height = this.getAttr(node, 'h', map.settings.room.height, parseFloat);
                    room.lineStyle = this.getAttr(node, 'borderstyle', map.settings.room.lineStyle, function (s) { return enums_js_14.LineStyle.fromString(s); });
                    room.dark = this.getAttr(node, 'isDark', false, function (s) { return s == 'yes'; });
                    room.endroom = this.getAttr(node, 'isEndRoom', false, function (s) { return s == 'yes'; });
                    room.fillColor = this.getAttr(node, 'roomFill', map.settings.room.fillColor);
                    room.borderColor = this.getAttr(node, 'roomBorder', map.settings.room.borderColor);
                    room.nameColor = this.getAttr(node, 'roomLargeText', map.settings.room.nameColor);
                    room.subtitleColor = this.getAttr(node, 'roomSubtitleColor', map.settings.room.subtitleColor);
                    room.rounding = this.getAttr(node, 'cornerTopLeft', map.settings.room.rounding, parseInt);
                    // Room shapes:
                    if (node.getAttribute('ellipse') == 'yes')
                        room.shape = enums_js_14.RoomShape.Ellipse;
                    if (node.getAttribute('octagonal') == 'yes')
                        room.shape = enums_js_14.RoomShape.Octagon;
                };
                MapXMLLoader.loadConnector = function (map, node) {
                    var connector = new connector_js_4.Connector(map.settings);
                    map.add(connector);
                    connector.id = this.getAttr(node, 'id', 0, parseInt);
                    connector.name = this.getAttr(node, 'name', '');
                    // Trizbort seems to support only solid and dotted (called "dashed") lines.
                    connector.lineStyle = this.getAttr(node, 'style', map.settings.connector.lineStyle, function (s) { return s == 'dashed' ? enums_js_14.LineStyle.Dash : enums_js_14.LineStyle.Solid; });
                    var dockNodes = node.querySelectorAll('dock');
                    var startDone = false;
                    for (var d = 0; d < node.children.length; d++) {
                        var childNode = node.children[d];
                        if (childNode.nodeName == 'dock') {
                            var room = map.findById(parseInt(childNode.getAttribute('id')), room_js_2.Room);
                            var dir = enums_js_14.Direction.fromString(childNode.getAttribute('port'));
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
                    var map = new map_js_2.Map();
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
            exports_52("MapXMLLoader", MapXMLLoader);
        }
    };
});
System.register("io/mapJSON", ["models/map", "models/room", "models/note", "models/connector", "models/block"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var map_js_3, room_js_3, note_js_2, connector_js_5, block_js_2, MapJSON;
    return {
        setters: [
            function (map_js_3_1) {
                map_js_3 = map_js_3_1;
            },
            function (room_js_3_1) {
                room_js_3 = room_js_3_1;
            },
            function (note_js_2_1) {
                note_js_2 = note_js_2_1;
            },
            function (connector_js_5_1) {
                connector_js_5 = connector_js_5_1;
            },
            function (block_js_2_1) {
                block_js_2 = block_js_2_1;
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
                        if (key == 'dockStart') { // replace room references with IDs
                            if (this.dockStart == null)
                                return 0;
                            return this.dockStart.id;
                        }
                        if (key == 'dockEnd') { // replace room references with IDs
                            if (this.dockEnd == null)
                                return 0;
                            return this.dockEnd.id;
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
                    var map = this.clone(new map_js_3.Map(), JSON.parse(text));
                    // The elements array of the Map now contains a list of ordinary objects.
                    // We remove the list contents from the Map, then loop through the list
                    // to create a new list with Room and Connector instances based on the 
                    // "type" field of each list element.
                    var elements = map.elements;
                    map.elements = new Array();
                    elements.forEach(function (element) {
                        var model = null;
                        if (element.type == 'Room')
                            model = _this.clone(new room_js_3.Room(map.settings), element);
                        else if (element.type == 'Note')
                            model = _this.clone(new note_js_2.Note(map.settings), element);
                        else if (element.type == 'Block')
                            model = _this.clone(new block_js_2.Block(map.settings), element);
                        else if (element.type == 'Connector')
                            model = _this.clone(new connector_js_5.Connector(map.settings), element);
                        else {
                            throw (new TypeError("Element type " + element.type + " is unknown."));
                        }
                        map.add(model);
                    });
                    // The connectors still contain IDs for dockStart and dockEnd references.
                    // Loop through all map elements,converting Connectors' dockStart and 
                    // dockEnd IDs to references.
                    map.elements.forEach(function (elem) {
                        if (elem instanceof connector_js_5.Connector) {
                            if (elem.dockStart != 0) {
                                elem.dockStart = map.findById(elem.dockStart, room_js_3.Room);
                            }
                            else {
                                elem.dockStart = null;
                            }
                            if (elem.dockEnd != 0) {
                                elem.dockEnd = map.findById(elem.dockEnd, room_js_3.Room);
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
            exports_53("MapJSON", MapJSON);
        }
    };
});
System.register("panels/menuPanel/menuPanel", ["app", "controls/window", "io/mapXML", "dispatcher", "enums/enums", "io/mapJSON", "panels/panels", "models/map"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var app_js_9, window_js_2, mapXML_js_1, dispatcher_js_8, enums_js_15, mapJSON_js_1, panels_js_3, map_js_4, MenuPanel;
    return {
        setters: [
            function (app_js_9_1) {
                app_js_9 = app_js_9_1;
            },
            function (window_js_2_1) {
                window_js_2 = window_js_2_1;
            },
            function (mapXML_js_1_1) {
                mapXML_js_1 = mapXML_js_1_1;
            },
            function (dispatcher_js_8_1) {
                dispatcher_js_8 = dispatcher_js_8_1;
            },
            function (enums_js_15_1) {
                enums_js_15 = enums_js_15_1;
            },
            function (mapJSON_js_1_1) {
                mapJSON_js_1 = mapJSON_js_1_1;
            },
            function (panels_js_3_1) {
                panels_js_3 = panels_js_3_1;
            },
            function (map_js_4_1) {
                map_js_4 = map_js_4_1;
            }
        ],
        execute: function () {
            MenuPanel = /** @class */ (function (_super) {
                __extends(MenuPanel, _super);
                function MenuPanel() {
                    var _this = _super.call(this, 'menupanel', Handlebars.templates.menuPanel, {}) || this;
                    var btnMenu = document.querySelector('#menu');
                    btnMenu.addEventListener('click', function () {
                        _this.toggle();
                    });
                    _this.inputLoad = document.getElementById('inputLoad');
                    _this.inputImport = document.getElementById('inputImport');
                    _this.createMenuItem('#menu-new', function () { _this.actionNewMap(); });
                    _this.createMenuItem('#menu-load', function () { _this.actionLoadMap(); });
                    _this.createMenuItem('#menu-save', function () { _this.actionSaveMap(); });
                    _this.createMenuItem('#menu-import', function () { _this.actionImportMap(); });
                    _this.createMenuItem('#menu-map', function () { _this.actionMapSettings(); });
                    _this.createMenuItem('#menu-export');
                    _this.createMenuItem('#menu-export-tads', function () { _this.actionExportTads(); });
                    _this.inputLoad.addEventListener('change', function () { _this.load(_this.inputLoad.files, _this.loadMap); });
                    _this.inputImport.addEventListener('change', function () { _this.load(_this.inputImport.files, _this.importMap); });
                    return _this;
                }
                MenuPanel.prototype.createMenuItem = function (selector, f) {
                    var elem = document.querySelector(selector);
                    if (f)
                        elem.addEventListener('click', f);
                    elem.addEventListener('click', function () { elem.classList.toggle('open'); });
                };
                MenuPanel.prototype.actionNewMap = function () {
                    new window_js_2.Window('New map', 'This will erase all editor contents. Proceed?', function () {
                        // OK
                        app_js_9.App.map = new map_js_4.Map();
                        dispatcher_js_8.Dispatcher.notify(enums_js_15.AppEvent.Load, null);
                    }, function () {
                        // Cancel
                    });
                };
                MenuPanel.prototype.actionLoadMap = function () {
                    this.inputLoad.click();
                };
                MenuPanel.prototype.actionSaveMap = function () {
                    var json = mapJSON_js_1.MapJSON.save(app_js_9.App.map);
                    var blob = new Blob([json], { type: "text/plain; charset:utf-8" });
                    window.saveAs(blob, 'map.json');
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
                        map = mapJSON_js_1.MapJSON.load(text);
                    }
                    catch (_a) {
                        new window_js_2.Window('Map loading error', 'Unfortunately, an error occurred and map loading could not proceed. Perhaps the map file is in the wrong format?', true, false);
                        return;
                    }
                    app_js_9.App.map = map;
                    // Broadcast that we've loaded a new map:
                    dispatcher_js_8.Dispatcher.notify(enums_js_15.AppEvent.Load, null);
                };
                MenuPanel.prototype.importMap = function (text) {
                    var map = null;
                    try {
                        map = mapXML_js_1.MapXMLLoader.load(text);
                    }
                    catch (_a) {
                        new window_js_2.Window('Map import error', 'Unfortunately, an error occurred and map import could not proceed. Perhaps the map file is in the wrong format?', true, false);
                        return;
                    }
                    app_js_9.App.map = map;
                    // Broadcast that we've loaded a new map:
                    dispatcher_js_8.Dispatcher.notify(enums_js_15.AppEvent.Load, null);
                };
                MenuPanel.prototype.actionMapSettings = function () {
                    dispatcher_js_8.Dispatcher.notify(enums_js_15.AppEvent.More, app_js_9.App.map);
                };
                MenuPanel.prototype.actionExportTads = function () {
                };
                return MenuPanel;
            }(panels_js_3.Panel));
            exports_54("MenuPanel", MenuPanel);
        }
    };
});
System.register("panels/notePanel/notePanel", ["dispatcher", "enums/appEvent", "models/note", "enums/enums", "panels/panels", "controls/controls"], function (exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var dispatcher_js_9, appEvent_js_5, note_js_3, enums_js_16, panels_js_4, controls_js_6, NotePanel;
    return {
        setters: [
            function (dispatcher_js_9_1) {
                dispatcher_js_9 = dispatcher_js_9_1;
            },
            function (appEvent_js_5_1) {
                appEvent_js_5 = appEvent_js_5_1;
            },
            function (note_js_3_1) {
                note_js_3 = note_js_3_1;
            },
            function (enums_js_16_1) {
                enums_js_16 = enums_js_16_1;
            },
            function (panels_js_4_1) {
                panels_js_4 = panels_js_4_1;
            },
            function (controls_js_6_1) {
                controls_js_6 = controls_js_6_1;
            }
        ],
        execute: function () {
            NotePanel = /** @class */ (function (_super) {
                __extends(NotePanel, _super);
                function NotePanel() {
                    var _this = _super.call(this, 'notepanel', Handlebars.templates.notePanel, {}) || this;
                    dispatcher_js_9.Dispatcher.subscribe(_this);
                    _this.ctrlText = new controls_js_6.IdTextarea('#notepanel .js-note-text').addEventListener('input', function () { _this.note.text = _this.ctrlText.value; });
                    _this.colorPicker = new controls_js_6.IdColorPicker('#notepanel .js-note-color').addEventListener('change', function () { _this.setNoteColor(_this.colorPicker.color); });
                    _this.ctrlShapeRectangle = new controls_js_6.IdPopup('#notepanel .js-note-shape-rectangle').addEventListener('click', function () { _this.note.shape = enums_js_16.RoomShape.Rectangle; });
                    _this.ctrlShapeEllipse = new controls_js_6.IdPopup('#notepanel .js-note-shape-ellipse').addEventListener('click', function () { _this.note.shape = enums_js_16.RoomShape.Ellipse; });
                    _this.ctrlShapeOctagon = new controls_js_6.IdPopup('#notepanel .js-note-shape-octagon').addEventListener('click', function () { _this.note.shape = enums_js_16.RoomShape.Octagon; });
                    _this.ctrlRounding = new controls_js_6.IdRange('#notepanel .js-note-rounding').addEventListener('input', function () { _this.note.rounding = _this.ctrlRounding.value; });
                    // Find color buttons:
                    var buttons = document.querySelectorAll("#notepanel .colortype");
                    _this.colorButtons = new Array();
                    var _loop_9 = function (i) {
                        var popup = new controls_js_6.IdPopup(buttons[i]);
                        if (popup.elem.classList.contains('selected'))
                            this_5.colorType = popup.elem.dataset.type;
                        this_5.colorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onColorButton(popup); });
                    };
                    var this_5 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_9(i);
                    }
                    return _this;
                }
                NotePanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_5.AppEvent.Select) {
                        this.close();
                    }
                    if (event == appEvent_js_5.AppEvent.More) {
                        if (obj instanceof note_js_3.Note) {
                            var note = obj;
                            this.note = note;
                            this.open();
                            // Show room data.
                            this.ctrlText.value = note.text;
                            this.ctrlRounding.value = note.rounding;
                            // Set color from currently selected color button:
                            this.setColor();
                        }
                        else {
                            this.close();
                        }
                    }
                };
                NotePanel.prototype.onColorButton = function (button) {
                    // Unselect all buttons.
                    this.colorButtons.forEach(function (button) {
                        button.elem.classList.remove('selected');
                    });
                    // Select this button.
                    button.elem.classList.add('selected');
                    // Make the buttons' data-type the current color type.
                    this.colorType = button.elem.dataset.type;
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
                };
                NotePanel.prototype.setNoteColor = function (color) {
                    if (this.colorType == 'fill')
                        this.note.fillColor = color;
                    if (this.colorType == 'border')
                        this.note.borderColor = color;
                    if (this.colorType == 'text')
                        this.note.textColor = color;
                };
                return NotePanel;
            }(panels_js_4.Panel));
            exports_55("NotePanel", NotePanel);
        }
    };
});
System.register("panels/roomPanel/roomPanel", ["dispatcher", "enums/appEvent", "models/room", "enums/enums", "panels/panels", "controls/controls"], function (exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var dispatcher_js_10, appEvent_js_6, room_js_4, enums_js_17, panels_js_5, controls_js_7, RoomPanel;
    return {
        setters: [
            function (dispatcher_js_10_1) {
                dispatcher_js_10 = dispatcher_js_10_1;
            },
            function (appEvent_js_6_1) {
                appEvent_js_6 = appEvent_js_6_1;
            },
            function (room_js_4_1) {
                room_js_4 = room_js_4_1;
            },
            function (enums_js_17_1) {
                enums_js_17 = enums_js_17_1;
            },
            function (panels_js_5_1) {
                panels_js_5 = panels_js_5_1;
            },
            function (controls_js_7_1) {
                controls_js_7 = controls_js_7_1;
            }
        ],
        execute: function () {
            RoomPanel = /** @class */ (function (_super) {
                __extends(RoomPanel, _super);
                function RoomPanel() {
                    var _this = _super.call(this, 'roompanel', Handlebars.templates.roomPanel, {}) || this;
                    dispatcher_js_10.Dispatcher.subscribe(_this);
                    _this.ctrlName = new controls_js_7.IdInput('#roompanel .js-room-name').addEventListener('input', function () { _this.room.name = _this.ctrlName.value; });
                    _this.ctrlSubtitle = new controls_js_7.IdInput('#roompanel .js-room-subtitle').addEventListener('input', function () { _this.room.subtitle = _this.ctrlSubtitle.value; });
                    _this.ctrlDark = new controls_js_7.IdCheck('#roompanel .js-room-dark').addEventListener('input', function () { _this.room.dark = _this.ctrlDark.checked; });
                    _this.ctrlStartroom = new controls_js_7.IdCheck('#roompanel .js-room-startroom').addEventListener('input', function () { _this.room.setStartRoom(_this.ctrlStartroom.checked); });
                    _this.ctrlEndroom = new controls_js_7.IdCheck('#roompanel .js-room-endroom').addEventListener('input', function () { _this.room.endroom = _this.ctrlEndroom.checked; });
                    _this.ctrlDescription = new controls_js_7.IdTextarea('#roompanel .js-room-description').addEventListener('input', function () { _this.room.description = _this.ctrlDescription.value; });
                    _this.colorPicker = new controls_js_7.IdColorPicker('#roompanel .js-room-color').addEventListener('change', function () { _this.setRoomColor(_this.colorPicker.color); });
                    _this.ctrlShapeRectangle = new controls_js_7.IdPopup('#roompanel .js-room-shape-rectangle').addEventListener('click', function () { _this.room.shape = enums_js_17.RoomShape.Rectangle; });
                    _this.ctrlShapeEllipse = new controls_js_7.IdPopup('#roompanel .js-room-shape-ellipse').addEventListener('click', function () { _this.room.shape = enums_js_17.RoomShape.Ellipse; });
                    _this.ctrlShapeOctagon = new controls_js_7.IdPopup('#roompanel .js-room-shape-octagon').addEventListener('click', function () { _this.room.shape = enums_js_17.RoomShape.Octagon; });
                    _this.ctrlRounding = new controls_js_7.IdRange('#roompanel .js-room-rounding').addEventListener('input', function () { _this.room.rounding = _this.ctrlRounding.value; });
                    // Find color buttons:
                    var buttons = document.querySelectorAll("#roompanel .colortype");
                    _this.colorButtons = new Array();
                    var _loop_10 = function (i) {
                        var popup = new controls_js_7.IdPopup(buttons[i]);
                        if (popup.elem.classList.contains('selected'))
                            this_6.colorType = popup.elem.dataset.type;
                        this_6.colorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onColorButton(popup); });
                    };
                    var this_6 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_10(i);
                    }
                    return _this;
                }
                RoomPanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_6.AppEvent.Select) {
                        this.close();
                    }
                    if (event == appEvent_js_6.AppEvent.More) {
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
                            this.ctrlRounding.value = room.rounding;
                            this.ctrlDescription.value = room.description;
                            // Set color from currently selected color button:
                            this.setColor();
                        }
                        else {
                            this.close();
                        }
                    }
                };
                RoomPanel.prototype.onColorButton = function (button) {
                    // Unselect all buttons.
                    this.colorButtons.forEach(function (button) {
                        button.elem.classList.remove('selected');
                    });
                    // Select this button.
                    button.elem.classList.add('selected');
                    // Make the buttons' data-type the current color type.
                    this.colorType = button.elem.dataset.type;
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
                };
                return RoomPanel;
            }(panels_js_5.Panel));
            exports_56("RoomPanel", RoomPanel);
        }
    };
});
System.register("panels/toolPanel/toolPanel", ["enums/enums", "app", "controls/controls"], function (exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var enums_js_18, app_js_10, controls_js_8, ToolPanel;
    return {
        setters: [
            function (enums_js_18_1) {
                enums_js_18 = enums_js_18_1;
            },
            function (app_js_10_1) {
                app_js_10 = app_js_10_1;
            },
            function (controls_js_8_1) {
                controls_js_8 = controls_js_8_1;
            }
        ],
        execute: function () {
            ToolPanel = /** @class */ (function () {
                function ToolPanel() {
                    this.elem = document.getElementById('toolpanel');
                    this.elem.innerHTML = Handlebars.templates.toolPanel({});
                    new controls_js_8.IdPopup('#toolpanel .tool-none').addEventListener('click', function () { app_js_10.App.selection.unselectAll(); app_js_10.App.mouseMode = enums_js_18.MouseMode.None; });
                    new controls_js_8.IdPopup('#toolpanel .tool-room').addEventListener('click', function () { app_js_10.App.selection.unselectAll(); app_js_10.App.mouseMode = enums_js_18.MouseMode.AddRoom; });
                    new controls_js_8.IdPopup('#toolpanel .tool-note').addEventListener('click', function () { app_js_10.App.selection.unselectAll(); app_js_10.App.mouseMode = enums_js_18.MouseMode.AddNote; });
                    new controls_js_8.IdPopup('#toolpanel .tool-block').addEventListener('click', function () { app_js_10.App.selection.unselectAll(); app_js_10.App.mouseMode = enums_js_18.MouseMode.AddBlock; });
                }
                return ToolPanel;
            }());
            exports_57("ToolPanel", ToolPanel);
        }
    };
});
System.register("panels/panels", ["panels/panel", "panels/connectorPanel/connectorPanel", "panels/mapPanel/mapPanel", "panels/menuPanel/menuPanel", "panels/notePanel/notePanel", "panels/roomPanel/roomPanel", "panels/toolPanel/toolPanel"], function (exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    function exportStar_5(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_58(exports);
    }
    return {
        setters: [
            function (panel_js_1_1) {
                exportStar_5(panel_js_1_1);
            },
            function (connectorPanel_js_1_1) {
                exportStar_5(connectorPanel_js_1_1);
            },
            function (mapPanel_js_1_1) {
                exportStar_5(mapPanel_js_1_1);
            },
            function (menuPanel_js_1_1) {
                exportStar_5(menuPanel_js_1_1);
            },
            function (notePanel_js_1_1) {
                exportStar_5(notePanel_js_1_1);
            },
            function (roomPanel_js_1_1) {
                exportStar_5(roomPanel_js_1_1);
            },
            function (toolPanel_js_1_1) {
                exportStar_5(toolPanel_js_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("selection", ["dispatcher", "enums/enums"], function (exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var dispatcher_js_11, enums_js_19, Selection;
    return {
        setters: [
            function (dispatcher_js_11_1) {
                dispatcher_js_11 = dispatcher_js_11_1;
            },
            function (enums_js_19_1) {
                enums_js_19 = enums_js_19_1;
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
                    dispatcher_js_11.Dispatcher.notify(enums_js_19.AppEvent.Select, null);
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
                    dispatcher_js_11.Dispatcher.notify(enums_js_19.AppEvent.Select, views[0].getModel());
                };
                return Selection;
            }());
            exports_59("Selection", Selection);
        }
    };
});
System.register("popups/blockPopup/blockPopup", ["app", "dispatcher", "enums/enums", "views/blockView", "popups/popups", "controls/controls"], function (exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var app_js_11, dispatcher_js_12, enums_js_20, blockView_js_2, popups_js_4, controls_js_9, BlockPopup;
    return {
        setters: [
            function (app_js_11_1) {
                app_js_11 = app_js_11_1;
            },
            function (dispatcher_js_12_1) {
                dispatcher_js_12 = dispatcher_js_12_1;
            },
            function (enums_js_20_1) {
                enums_js_20 = enums_js_20_1;
            },
            function (blockView_js_2_1) {
                blockView_js_2 = blockView_js_2_1;
            },
            function (popups_js_4_1) {
                popups_js_4 = popups_js_4_1;
            },
            function (controls_js_9_1) {
                controls_js_9 = controls_js_9_1;
            }
        ],
        execute: function () {
            BlockPopup = /** @class */ (function (_super) {
                __extends(BlockPopup, _super);
                function BlockPopup() {
                    var _this = _super.call(this, 'blockpopup', Handlebars.templates.blockPopup, { colors: enums_js_20.Values.COLORS_STANDARD }) || this;
                    dispatcher_js_12.Dispatcher.subscribe(_this);
                    new controls_js_9.IdPopup('#blockpopup .js-color');
                    new controls_js_9.IdPopup('#blockpopup .js-line');
                    new controls_js_9.IdPopup('#blockpopup .js-position');
                    new controls_js_9.IdPopup('#blockpopup .js-delete').addEventListener('click', function () { _this.deleteBlock(); });
                    new controls_js_9.IdPopup('#blockpopup .js-more').addEventListener('click', function () { _this.showMore(); });
                    var btns = _this.elem.querySelectorAll('.js-color id-popup');
                    var _loop_11 = function () {
                        var popup = new controls_js_9.IdPopup(btns[i]);
                        var color = enums_js_20.Values.COLORS_STANDARD[i];
                        popup.backgroundColor = color;
                        popup.addEventListener('click', function () { _this.setColor(color); });
                    };
                    for (var i = 0; i < btns.length; i++) {
                        _loop_11();
                    }
                    new controls_js_9.IdPopup('#blockpopup .js-linestyle-solid').addEventListener('click', function () { _this.block.lineStyle = enums_js_20.LineStyle.Solid; });
                    new controls_js_9.IdPopup('#blockpopup .js-linestyle-dash').addEventListener('click', function () { _this.block.lineStyle = enums_js_20.LineStyle.Dash; });
                    new controls_js_9.IdPopup('#blockpopup .js-linestyle-dashdot').addEventListener('click', function () { _this.block.lineStyle = enums_js_20.LineStyle.DashDot; });
                    new controls_js_9.IdPopup('#blockpopup .js-linestyle-dashdotdot').addEventListener('click', function () { _this.block.lineStyle = enums_js_20.LineStyle.DashDotDot; });
                    new controls_js_9.IdPopup('#blockpopup .js-linestyle-dot').addEventListener('click', function () { _this.block.lineStyle = enums_js_20.LineStyle.Dot; });
                    new controls_js_9.IdPopup('#blockpopup .js-linestyle-none').addEventListener('click', function () { _this.block.lineStyle = enums_js_20.LineStyle.None; });
                    _this.ctrlLinewidth = new controls_js_9.IdRange('#blockpopup .js-linewidth').addEventListener('input', function () { _this.block.lineWidth = _this.ctrlLinewidth.value; });
                    _this.elem.querySelector('.js-front').addEventListener('click', function () {
                        _this.block.bringToFront();
                        dispatcher_js_12.Dispatcher.notify(enums_js_20.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-forward').addEventListener('click', function () {
                        _this.block.bringForward();
                        dispatcher_js_12.Dispatcher.notify(enums_js_20.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-backward').addEventListener('click', function () {
                        _this.block.sendBackward();
                        dispatcher_js_12.Dispatcher.notify(enums_js_20.AppEvent.Load, null);
                    });
                    _this.elem.querySelector('.js-back').addEventListener('click', function () {
                        _this.block.sendToBack();
                        dispatcher_js_12.Dispatcher.notify(enums_js_20.AppEvent.Load, null);
                    });
                    return _this;
                }
                BlockPopup.prototype.notify = function (event, model) {
                    if (event == enums_js_20.AppEvent.MouseMove || event == enums_js_20.AppEvent.Select)
                        this.toggle();
                };
                BlockPopup.prototype.setColor = function (color) {
                    this.block.fillColor = color;
                };
                BlockPopup.prototype.deleteBlock = function () {
                    app_js_11.App.pushUndo();
                    this.block.delete();
                    this.toggle();
                };
                BlockPopup.prototype.showMore = function () {
                    dispatcher_js_12.Dispatcher.notify(enums_js_20.AppEvent.More, this.block);
                };
                BlockPopup.prototype.toggle = function () {
                    if (app_js_11.App.selection.isSingle() && app_js_11.App.selection.first() instanceof blockView_js_2.BlockView && app_js_11.App.mouseMode == enums_js_20.MouseMode.None) {
                        this.block = app_js_11.App.selection.first().getModel();
                        this.elem.style.left = app_js_11.App.canvas.offsetWidth / 2 + app_js_11.App.centerX + this.block.x * app_js_11.App.zoom + "px";
                        this.elem.style.top = app_js_11.App.canvas.offsetHeight / 2 + app_js_11.App.centerY + this.block.y - 64 + "px";
                        this.elem.style.display = 'flex';
                        // Close any open overlays inside popup.
                        var overlays = this.elem.querySelectorAll(".popup-overlay");
                        for (var i = 0; i < overlays.length; i++) {
                            overlays[i].style.display = 'none';
                        }
                        this.ctrlLinewidth.value = this.block.lineWidth;
                    }
                    else {
                        this.elem.style.display = 'none';
                    }
                };
                return BlockPopup;
            }(popups_js_4.Popup));
            exports_60("BlockPopup", BlockPopup);
        }
    };
});
System.register("panels/blockPanel/blockPanel", ["dispatcher", "enums/appEvent", "models/block", "enums/enums", "panels/panels", "controls/controls"], function (exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var dispatcher_js_13, appEvent_js_7, block_js_3, enums_js_21, panels_js_6, controls_js_10, BlockPanel;
    return {
        setters: [
            function (dispatcher_js_13_1) {
                dispatcher_js_13 = dispatcher_js_13_1;
            },
            function (appEvent_js_7_1) {
                appEvent_js_7 = appEvent_js_7_1;
            },
            function (block_js_3_1) {
                block_js_3 = block_js_3_1;
            },
            function (enums_js_21_1) {
                enums_js_21 = enums_js_21_1;
            },
            function (panels_js_6_1) {
                panels_js_6 = panels_js_6_1;
            },
            function (controls_js_10_1) {
                controls_js_10 = controls_js_10_1;
            }
        ],
        execute: function () {
            BlockPanel = /** @class */ (function (_super) {
                __extends(BlockPanel, _super);
                function BlockPanel() {
                    var _this = _super.call(this, 'blockpanel', Handlebars.templates.blockPanel, {}) || this;
                    dispatcher_js_13.Dispatcher.subscribe(_this);
                    _this.colorPicker = new controls_js_10.IdColorPicker('#blockpanel .js-block-color').addEventListener('change', function () { _this.setNoteColor(_this.colorPicker.color); });
                    _this.ctrlShapeRectangle = new controls_js_10.IdPopup('#blockpanel .js-block-shape-rectangle').addEventListener('click', function () { _this.block.shape = enums_js_21.RoomShape.Rectangle; });
                    _this.ctrlShapeEllipse = new controls_js_10.IdPopup('#blockpanel .js-block-shape-ellipse').addEventListener('click', function () { _this.block.shape = enums_js_21.RoomShape.Ellipse; });
                    _this.ctrlShapeOctagon = new controls_js_10.IdPopup('#blockpanel .js-block-shape-octagon').addEventListener('click', function () { _this.block.shape = enums_js_21.RoomShape.Octagon; });
                    _this.ctrlRounding = new controls_js_10.IdRange('#blockpanel .js-block-rounding').addEventListener('input', function () { _this.block.rounding = _this.ctrlRounding.value; });
                    // Find color buttons:
                    var buttons = document.querySelectorAll("#blockpanel .colortype");
                    _this.colorButtons = new Array();
                    var _loop_12 = function (i) {
                        var popup = new controls_js_10.IdPopup(buttons[i]);
                        if (popup.elem.classList.contains('selected'))
                            this_7.colorType = popup.elem.dataset.type;
                        this_7.colorButtons.push(popup);
                        buttons[i].addEventListener('click', function () { _this.onColorButton(popup); });
                    };
                    var this_7 = this;
                    for (var i = 0; i < buttons.length; i++) {
                        _loop_12(i);
                    }
                    return _this;
                }
                BlockPanel.prototype.notify = function (event, obj) {
                    if (event == appEvent_js_7.AppEvent.Select) {
                        this.close();
                    }
                    if (event == appEvent_js_7.AppEvent.More) {
                        if (obj instanceof block_js_3.Block) {
                            var block = obj;
                            this.block = block;
                            this.open();
                            // Show block data.
                            this.ctrlRounding.value = block.rounding;
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
                        button.elem.classList.remove('selected');
                    });
                    // Select this button.
                    button.elem.classList.add('selected');
                    // Make the buttons' data-type the current color type.
                    this.colorType = button.elem.dataset.type;
                    // Set colorPicker to color.
                    this.setColor();
                };
                BlockPanel.prototype.setColor = function () {
                    if (this.colorType == 'fill')
                        this.colorPicker.color = this.block.fillColor;
                    if (this.colorType == 'border')
                        this.colorPicker.color = this.block.borderColor;
                };
                BlockPanel.prototype.setNoteColor = function (color) {
                    if (this.colorType == 'fill')
                        this.block.fillColor = color;
                    if (this.colorType == 'border')
                        this.block.borderColor = color;
                };
                return BlockPanel;
            }(panels_js_6.Panel));
            exports_61("BlockPanel", BlockPanel);
        }
    };
});
System.register("app", ["models/map", "dispatcher", "enums/enums", "editor", "controls/controls", "popups/popups", "panels/panels", "io/mapJSON", "selection", "popups/blockPopup/blockPopup", "panels/blockPanel/blockPanel"], function (exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var map_js_5, dispatcher_js_14, enums_js_22, editor_js_1, controls_js_11, popups_js_5, panels_js_7, mapJSON_js_2, selection_js_1, blockPopup_js_1, blockPanel_js_1, App;
    return {
        setters: [
            function (map_js_5_1) {
                map_js_5 = map_js_5_1;
            },
            function (dispatcher_js_14_1) {
                dispatcher_js_14 = dispatcher_js_14_1;
            },
            function (enums_js_22_1) {
                enums_js_22 = enums_js_22_1;
            },
            function (editor_js_1_1) {
                editor_js_1 = editor_js_1_1;
            },
            function (controls_js_11_1) {
                controls_js_11 = controls_js_11_1;
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
            function (blockPopup_js_1_1) {
                blockPopup_js_1 = blockPopup_js_1_1;
            },
            function (blockPanel_js_1_1) {
                blockPanel_js_1 = blockPanel_js_1_1;
            }
        ],
        execute: function () {
            App = /** @class */ (function () {
                function App() {
                }
                App.initialize = function () {
                    App.canvas = document.getElementById('canvas');
                    App.selection = new selection_js_1.Selection();
                    // Intialize GUI components:
                    var editor = new editor_js_1.Editor();
                    var connectorPanel = new panels_js_7.ConnectorPanel();
                    var connectorPopup = new popups_js_5.ConnectorPopup;
                    var mapPanel = new panels_js_7.MapPanel();
                    var menuPanel = new panels_js_7.MenuPanel();
                    var notePanel = new panels_js_7.NotePanel();
                    var notePopup = new popups_js_5.NotePopup();
                    var toolPanel = new panels_js_7.ToolPanel();
                    var blockPanel = new blockPanel_js_1.BlockPanel();
                    var roomPopup = new popups_js_5.RoomPopup();
                    var roomPanel = new panels_js_7.RoomPanel();
                    var blockPopup = new blockPopup_js_1.BlockPopup();
                    enums_js_22.Values.BITMAP_ASSETS.forEach(function (asset) {
                        var img = new Image();
                        img.src = "assets/" + asset + ".jpg";
                    });
                    controls_js_11.Tabs.initialize();
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
                    dispatcher_js_14.Dispatcher.notify(enums_js_22.AppEvent.Load, null);
                };
                // - App holds the current map.
                // - App holds the current zoom and view center
                //   so that GUI components may access and change them globally.
                // - App also manages the selection of views.
                App.map = new map_js_5.Map();
                App.zoom = 1;
                App.centerX = 0;
                App.centerY = 0;
                App.mouseMode = enums_js_22.MouseMode.None;
                App.undoStack = new Array();
                return App;
            }());
            exports_62("App", App);
        }
    };
});
/* export class DrawContext {
  static ctx: CanvasRenderingContext2D = null;
  static handdrawn = true;

  private static fuzz(x: number, f: number) {
    return x + Math.random()*f - f/2;
  }

  private static handDrawMovement(x0: number, x1: number, t: number){
    return x0 + (x0-x1)*(
            15*Math.pow(t, 4) -
            6*Math.pow(t, 5) -
            10*Math.pow(t,3)
    );
  }

  static line(x0: number, y0: number, x1: number, y1: number) {
    if(!this.handdrawn) {
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
    } else {
      this.ctx.moveTo(x0, y0);

      var d = Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0));

      var steps = d/25;
      if(steps < 4) {
          steps = 4;
      }

      // fuzzyness
      var f = 8.0;
      for(var i = 1; i <= steps; i++)
      {
          var t1 = i/steps;
          var t0 = t1-1/steps
          var xt0 = this.handDrawMovement(x0, x1, t0);
          var yt0 = this.handDrawMovement(y0, y1, t0);
          var xt1 = this.handDrawMovement(x0, x1, t1);
          var yt1 = this.handDrawMovement(y0, y1, t1);
          this.ctx.quadraticCurveTo(this.fuzz(xt0, f), this.fuzz(yt0, f), xt1, yt1);
          this.ctx.moveTo(xt1, yt1);
      }
    }
  }
} */ 
//# sourceMappingURL=app.js.map