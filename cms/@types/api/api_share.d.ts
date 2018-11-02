interface ShareStore {
  get: get;
  set: set;
}
function get(): object;
interface set {
  (name: string): object;
}
function api_share(): ShareStore;
