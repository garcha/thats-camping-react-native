export default function shortenName(name: string): string {
  return name.replace(" campground and picnic area", "")
    .replace(" large group campground", "")
    .replace(" campgrounds", "")
    .replace(" campground", "")
    .replace(" camping grounds", "")
    .replace(" camping ground", "")
    .replace(" picnic and camping area", "")
    .replace(" camping and picnic area", "")
    .replace(" Camping Area", "")
    .replace(" camping area", "")
    .replace(" rest area", "")
    .replace(" tourist park", "")
    .replace("Karst Conservation Reserve", "KCR")
    .replace("National Park", "NP")
    .replace("Nature Reserve", "NR")
    .replace("State Conservation Area", "SCA")
    .replace(" Historic Site", "")
    .replace(" campervan and camper trailer area", "")
}
