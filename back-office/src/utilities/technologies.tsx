import icons from "devicons-react";
import { FC } from "react";

// Fonction pour transformer les noms des icônes en noms de technologie
const getTechnologyName = (iconName: string) => {
  // Supprimer les préfixes et suffixes pour obtenir un nom plus propre
  const cleanName = iconName.replace(
    /(plain|original|wordmark|devicon|zig|line|color|alt|icon(ic)?|logo(-\w+)?)/gi,
    ""
  );
  // Remplacer les tirets par des espaces
  return cleanName.replace(/-/g, " ");
};

const deviconsNamesList = Object.keys(icons)
  .map((icon) => getTechnologyName(icon))
  .reduce((acc, current) => {
    if (!acc.includes(current)) {
      acc.push(current);
    }
    return acc;
  }, []);

type IconTuple = [string, FC];
const getIconFromName = (name: string): any => {
  let IconComponent: React.ElementType = (
    <div>❓</div>
  ) as unknown as React.ElementType;

  Object.entries(icons).forEach((icon: IconTuple) => {
    if (getTechnologyName(icon[0]) === name) {
      IconComponent = icon[1];
    }
  });

  return IconComponent ? <IconComponent /> : null;
};

export default {
  list: deviconsNamesList,
  languagesList: deviconsNamesList.filter((item) =>
    new RegExp(
      "\\b(R|C|Ceylon|Clojure|Clojurescript|Awk|Coffeescript|Crystal|Csharp|Dart|D|Erlang|Fsharp|Go|Groovy|Haskell|Java|Javascript|Julia|Kotlin|Lua|Matlab|Perl|Php|Python|Ruby|Rust|Scala|Scheme|Shell|Swift|Typescript|Vyper|Html5|Css3|Xml|Yaml|Mysql|Mariadb|Postgresql|Sqlite|Oracle|Mongodb|Neo4j|Cassandra|Couchbase|Redis|SqlServer|Dynamodb|Firebase|Cosmosdb)\\b"
    ).test(item)
  ),
  icons: icons,
  getIconFromName,
};
