import React, { useState } from "react";
// hooks
import { Link, useHistory } from "react-router-dom";
// components
import AppModal from "../../copmonents/app-modal/app-modal";
// icons
import Icon from "@mdi/react";
import { mdiPencil, mdiPlus } from "@mdi/js";
// styles
import "./constructor-menu-page.scss";
import mockTaskSets from "../../mock-data/task-sets";
import { mockNamespaces } from "../../constructors/namespace-constructor/namespace-constructor.mock-data";
import { mockRulePacks } from "../../constructors/rule-pack-constructor/rule-pack-constructor.mock-data";

interface ConstructorMenuBlockProps {
  title: string;
  titleIconUrl: string;
  options: { name: string; action: () => any }[];
}

export const AllItemsList: React.FC<{
  items: { name: string; link: string }[];
  url: string;
}> = ({ items, url }) => {
  const [selectedItems, setSelectedItems] = useState<
    { name: string; link: string }[]
  >(items);

  return (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        style={{ width: "100%", marginBottom: "2rem" }}
        onChange={(e) =>
          setSelectedItems(
            items.filter((item) => {
              return item.name.includes(e.target.value);
            })
          )
        }
      />
      {selectedItems.map((item, i) => {
        return (
          <Link
            to={`${url}/${item.link}`}
            key={i}
            style={{
              marginBottom: "1rem",
              cursor: "pointer",
              display: "block",
              color: "black",
            }}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

const ConstructorMenuBlock: React.FC<ConstructorMenuBlockProps> = ({
  title,
  titleIconUrl,
  options,
}: ConstructorMenuBlockProps) => {
  return (
    <div className="constructor-menu-block">
      <div className="constructor-menu-block__title">
        <Icon path={titleIconUrl} size={2} className="u-mr-sm" />
        <h1>{title}</h1>
      </div>
      <div className="constructor-menu-block__options">
        {options.map(
          (option: { name: string; action: () => any }, i: number) => {
            return (
              <div
                key={i}
                className="constructor-menu-block__option"
                onClick={(): any => option.action()}
              >
                {option.name}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export const demoList = [
  "Alison Park",
  "Jackson Berger",
  "Keri Dawson",
  "Eva Gilbert",
  "Michael Edwards",
  "Delores Salazar",
  "Etta Tyson",
  "Nita Herrera",
  "Fields Chavez",
  "Aurelia Knapp",
  "Patel Hatfield",
  "Blackwell Gilmore",
  "Randolph Mayo",
  "Maureen Romero",
  "Elva Hopkins",
  "Allyson Sloan",
  "Jeri Grimes",
  "Myrtle Willis",
  "Mclean Hodges",
  "Lana Hayes",
];

export const usersDemoList = demoList.map((item: string) => ({
  label: item,
  value: item,
}));

export const demoTaskSetsLinks = mockTaskSets.map((e, i) => ({
  link: (i + 1).toString(),
  name: e.nameRu,
}));

export const namespacesLinks = Object.keys(mockNamespaces).map(
  (key: string, i: number) => ({
    link: key,
    name: mockNamespaces[key].nameRu,
  })
);

export const rulePacksLinks = Object.keys(mockRulePacks).map((key: string) => ({
  link: key,
  name: mockRulePacks[key].nameRu,
}));

const ConstructorMenuPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showAllItemsModal, setShowAllItemsModal] = useState(false);
  const history = useHistory();
  const [items, setItems] = useState<{ name: string; link: string }[]>([]);
  const [url, setUrl] = useState<string>("");

  const gameBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый набор задач",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/create-game"),
        },
        {
          name: "На основе уже существующей",
          action: () => {
            setItems(demoTaskSetsLinks);
            setShowAllItemsModal(true);
            setUrl("/create-game");
          },
        },
      ],
    },
    {
      title: "Редактировать мои наборы задач",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: mockTaskSets[2].nameRu,
          action: () => history.push("/create-game/3"),
        },
        {
          name: mockTaskSets[1].nameRu,
          action: () => history.push("/create-game/2"),
        },
        {
          name: mockTaskSets[0].nameRu,
          action: () => history.push("/create-game/1"),
        },
        {
          name: "Смотреть все",
          action: () => {
            setItems(demoTaskSetsLinks);
            setShowAllItemsModal(true);
            setUrl("/create-game");
          },
        },
      ],
    },
  ];

  const gameSpaceBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый Namespace",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/namespace-constructor"),
        },
        {
          name: "На основе уже существующего",
          action: () => {
            setItems(namespacesLinks);
            setShowAllItemsModal(true);
            setUrl("/namespace-constructor");
          },
        },
      ],
    },
    {
      title: "Редактировать существующий Namespace",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: mockNamespaces[3].nameRu,
          action: () => history.push("/namespace-constructor/3"),
        },
        {
          name: mockNamespaces[2].nameRu,
          action: () => history.push("/namespace-constructor/2"),
        },
        {
          name: mockNamespaces[1].nameRu,
          action: () => history.push("/namespace-constructor/1"),
        },
        {
          name: "Смотреть все",
          action: () => {
            setItems(namespacesLinks);
            setShowAllItemsModal(true);
            setUrl("/namespace-constructor");
          },
        },
      ],
    },
  ];

  const rulePacksBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый пакет правил",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/rule-pack-constructor"),
        },
        {
          name: "На основе уже существующего",
          action: () => {
            setItems(rulePacksLinks);
            setShowAllItemsModal(true);
            setUrl("/rule-pack-constructor");
          },
        },
      ],
    },
    {
      title: "Редактировать существующий пакет правил",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: mockRulePacks[3].nameRu,
          action: () => history.push("/rule-pack-constructor/3"),
        },
        {
          name: mockRulePacks[2].nameRu,
          action: () => history.push("/rule-pack-constructor/2"),
        },
        {
          name: mockRulePacks[1].nameRu,
          action: () => history.push("/rule-pack-constructor/1"),
        },
        {
          name: "Смотреть все",
          action: () => {
            setItems(rulePacksLinks);
            setShowAllItemsModal(true);
            setUrl("/rule-pack-constructor");
          },
        },
      ],
    },
  ];

  return (
    <div className="constructor-menu-page">
      <ul className="constructor-menu-page__tabs">
        <li
          className={`constructor-menu-page__tab ${
            currentTab === 0 && "constructor-menu-page__tab--active"
          }`}
          onClick={() => setCurrentTab(0)}
        >
          Наборы задач
        </li>
        <li
          className={`constructor-menu-page__tab ${
            currentTab === 1 && "constructor-menu-page__tab--active"
          }`}
          onClick={() => setCurrentTab(1)}
        >
          Namespaces
        </li>
        <li
          className={`constructor-menu-page__tab ${
            currentTab === 2 && "constructor-menu-page__tab--active"
          }`}
          onClick={() => setCurrentTab(2)}
        >
          Пакеты Правил
        </li>
      </ul>
      {currentTab === 0 &&
        gameBlocks.map((block: ConstructorMenuBlockProps, i: number) => {
          return <ConstructorMenuBlock key={i} {...block} />;
        })}
      {currentTab === 1 &&
        gameSpaceBlocks.map((block: ConstructorMenuBlockProps, i: number) => {
          return <ConstructorMenuBlock key={i} {...block} />;
        })}
      {currentTab === 2 &&
        rulePacksBlocks.map((block: ConstructorMenuBlockProps, i: number) => {
          return <ConstructorMenuBlock key={i} {...block} />;
        })}
      <AppModal
        isOpen={showAllItemsModal}
        close={() => setShowAllItemsModal(false)}
        width="50%"
        height="70%"
      >
        <AllItemsList items={items} url={url} />
      </AppModal>
    </div>
  );
};

export default ConstructorMenuPage;
