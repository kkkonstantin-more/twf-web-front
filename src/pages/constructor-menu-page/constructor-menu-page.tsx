import React, { useState } from "react";
// hooks
import { useHistory } from "react-router-dom";
// components
import AppModal from "../../copmonents/app-modal/app-modal";
// icons
import Icon from "@mdi/react";
import { mdiPencil, mdiPlus } from "@mdi/js";
// styles
import "./constructor-menu-page.scss";

interface ConstructorMenuBlockProps {
  title: string;
  titleIconUrl: string;
  options: { name: string; action: () => any }[];
}

export const AllItemsList: React.FC<{ items: string[] }> = ({
  items,
}: {
  items: string[];
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(items);

  return (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        style={{ width: "100%", marginBottom: "2rem" }}
        onChange={(e) =>
          setSelectedItems(
            items.filter((item: string) => item.includes(e.target.value))
          )
        }
      />
      {selectedItems.map((item: string, i: number) => {
        return (
          <div key={i} style={{ marginBottom: "1rem", cursor: "pointer" }}>
            {item}
          </div>
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

const ConstructorMenuPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showAllItemsModal, setShowAllItemsModal] = useState(false);
  const history = useHistory();

  const gameBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новую игру",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/json-editor"),
        },
        {
          name: "На основе уже существующей",
          action: () => history.push("/json-editor"),
        },
      ],
    },
    {
      title: "Редактировать существующую игру",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: "Игра 3",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Игра 2",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Игра 1",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Смотреть все",
          action: () => setShowAllItemsModal(true),
        },
      ],
    },
  ];

  const gameSpaceBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый GameSpace",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/json-editor"),
        },
        {
          name: "На основе уже существующего",
          action: () => history.push("/json-editor"),
        },
      ],
    },
    {
      title: "Редактировать существующий GameSpace",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: "GameSpace 3",
          action: () => history.push("/json-editor"),
        },
        {
          name: "GameSpace 2",
          action: () => history.push("/json-editor"),
        },
        {
          name: "GameSpace 1",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Смотреть все",
          action: () => setShowAllItemsModal(true),
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
          action: () => history.push("/json-editor"),
        },
        {
          name: "На основе уже существующего",
          action: () => history.push("/json-editor"),
        },
      ],
    },
    {
      title: "Редактировать существующий пакет правил",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: "Пакет правил 3",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Пакет правил 2",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Пакет правил 1",
          action: () => history.push("/json-editor"),
        },
        {
          name: "Смотреть все",
          action: () => setShowAllItemsModal(true),
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
          Игры
        </li>
        <li
          className={`constructor-menu-page__tab ${
            currentTab === 1 && "constructor-menu-page__tab--active"
          }`}
          onClick={() => setCurrentTab(1)}
        >
          Game Spaces
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
        <AllItemsList items={demoList} />
      </AppModal>
    </div>
  );
};

export default ConstructorMenuPage;
