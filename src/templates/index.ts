import Handlebars from 'handlebars';

// Import all handlebars templates as raw strings
// Code generators
import alan2 from '../codegen/alan2/alan2.handlebars?raw';
import alan3 from '../codegen/alan3/alan3.handlebars?raw';
import alan3Object from '../codegen/alan3/alan3Object.handlebars?raw';
import inform6 from '../codegen/inform6/inform6.handlebars?raw';
import inform6Object from '../codegen/inform6/inform6Object.handlebars?raw';
import inform7 from '../codegen/inform7/inform7.handlebars?raw';
import inform7Object from '../codegen/inform7/inform7Object.handlebars?raw';
import quest from '../codegen/quest/quest.handlebars?raw';
import questObject from '../codegen/quest/questObject.handlebars?raw';
import tads from '../codegen/tads/tads.handlebars?raw';
import tadsObject from '../codegen/tads/tadsObject.handlebars?raw';
import textadventurejs from '../codegen/textadventurejs/textadventurejs.handlebars?raw';
import yaml from '../codegen/yaml/yaml.handlebars?raw';
import yamlDescription from '../codegen/yaml/yamlDescription.handlebars?raw';
import yamlObject from '../codegen/yaml/yamlObject.handlebars?raw';
import zil from '../codegen/zil/zil.handlebars?raw';
import zilObject from '../codegen/zil/zilObject.handlebars?raw';

// Controls
import idCheck from '../controls/idCheck/idCheck.handlebars?raw';
import idColorPicker from '../controls/idColorPicker/idColorPicker.handlebars?raw';
import idConnectorType from '../controls/idConnectorType/idConnectorType.handlebars?raw';
import idInput from '../controls/idInput/idInput.handlebars?raw';
import idLineStyle from '../controls/idLineStyle/idLineStyle.handlebars?raw';
import idObjectEditor from '../controls/idObjectEditor/idObjectEditor.handlebars?raw';
import idPopup from '../controls/idPopup/idPopup.handlebars?raw';
import idQuickColor from '../controls/idQuickColor/idQuickColor.handlebars?raw';
import idRadio from '../controls/idRadio/idRadio.handlebars?raw';
import idRange from '../controls/idRange/idRange.handlebars?raw';
import idShape from '../controls/idShape/idShape.handlebars?raw';
import idTextarea from '../controls/idTextarea/idTextarea.handlebars?raw';
import idGuide from '../controls/idGuide/idGuide.handlebars?raw';

// Panels
import BlockPanel from '../panels/blockPanel/BlockPanel.handlebars?raw';
import closePanel from '../panels/closePanel.handlebars?raw';
import ConnectorPanel from '../panels/connectorPanel/ConnectorPanel.handlebars?raw';
import MapPanel from '../panels/mapPanel/MapPanel.handlebars?raw';
import MenuPanel from '../panels/menuPanel/MenuPanel.handlebars?raw';
import NotePanel from '../panels/notePanel/NotePanel.handlebars?raw';
import RenderPanel from '../panels/renderPanel/RenderPanel.handlebars?raw';
import RoomPanel from '../panels/roomPanel/RoomPanel.handlebars?raw';
import ToolPanel from '../panels/toolPanel/ToolPanel.handlebars?raw';

// Popups
import BlockPopup from '../popups/blockPopup/BlockPopup.handlebars?raw';
import ConnectorPopup from '../popups/connectorPopup/ConnectorPopup.handlebars?raw';
import NotePopup from '../popups/notePopup/NotePopup.handlebars?raw';
import RoomPopup from '../popups/roomPopup/RoomPopup.handlebars?raw';

// Compile and register templates
const templates: Record<string, string> = {
  // Code generators
  alan2,
  alan3,
  alan3Object,
  inform6,
  inform6Object,
  inform7,
  inform7Object,
  quest,
  questObject,
  tads,
  tadsObject,
  textadventurejs,
  yaml,
  yamlDescription,
  yamlObject,
  zil,
  zilObject,
  // Controls
  idCheck,
  idColorPicker,
  idConnectorType,
  idInput,
  idLineStyle,
  idObjectEditor,
  idPopup,
  idQuickColor,
  idRadio,
  idRange,
  idShape,
  idTextarea,
  idGuide,
  // Panels
  BlockPanel,
  closePanel,
  ConnectorPanel,
  MapPanel,
  MenuPanel,
  NotePanel,
  RenderPanel,
  RoomPanel,
  ToolPanel,
  // Popups
  BlockPopup,
  ConnectorPopup,
  NotePopup,
  RoomPopup,
};

// Initialize Handlebars.templates object
Handlebars.templates = Handlebars.templates || {};

// Compile and register each template
// Wrap templates to allow prototype property access (needed for class getters like map.rooms)
for (const [name, source] of Object.entries(templates)) {
  const compiled = Handlebars.compile(source);
  Handlebars.templates[name] = (context: unknown, options?: Handlebars.RuntimeOptions) => {
    return compiled(context, {
      ...options,
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    });
  };
}

// Declare Handlebars on window for backward compatibility
declare global {
  interface Window {
    Handlebars: typeof Handlebars;
  }
}

window.Handlebars = Handlebars;

export { Handlebars };
