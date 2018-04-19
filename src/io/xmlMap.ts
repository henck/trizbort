class XmlField {
  klass: Object;
  property: string;
  path: string;
  defaultValue: any;
  transform: (s: string) => any;

  constructor(klass: Object, property: string, path: string, defaultValue: any, transform: (s: string) => any) {
    this.klass = klass;
    this.property = property;
    this.path = path;
    this.defaultValue = defaultValue;
    this.transform = transform;
  }

  load(instance: Object, node: Element) {
    // Get the node's attribute value:
    let value: string = node.getAttribute(this.path);
    // Use default value if attribute is empty
    if(!value) value = this.defaultValue;
    // Transform the value if a transform function was provided:
    if(this.transform) value = this.transform(value);
    // Assign the result to the property on the instance:
    (<any> instance)[this.property] = value;
  }
}

export class XmlMap {
  static fields: Array<XmlField> = new Array<XmlField>();
  static addField(klass: Object, property: string, path: string, defaultValue: any, transform: (s: string) => any) {
    this.fields.push(new XmlField(klass, property, path, defaultValue, transform));
  }
  
  // Load all the fields and attributes for a given object.
  static load(instance: Object, node: Element) {
    this.fields.forEach((field) => {
      // XMLMap contains rules for different classes. Only use
      // rules for the instance provided:
      if(instance instanceof field.klass.constructor) {
        field.load(instance, node);
      }
    });
  }
}

export function Xml(path: string, defaultValue: any, transform?: (s: string) => any) {
  return (target: Object, propertyKey: string) => {
    XmlMap.addField(target, propertyKey, path, defaultValue, transform);
  }
}