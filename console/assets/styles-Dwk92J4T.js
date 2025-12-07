import{d as e,t,B as i}from"./index-B7gyiX60.js";const a=e.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0 50px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'header'
    'sidebar'
    'content';

  @media (min-width: 913px) {
    display: grid;
    grid-template-columns: 250px 1.3fr 1fr;
    grid-template-rows: 0 1.7fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      'header header header'
      'sidebar content content'
      'sidebar content content';
  }
`,o=e.div`
  position: fixed;
  width: 100%;
  background-color: ${t.primaryBlack};
  z-index: 2;
  @media (min-width: 913px) {
    grid-area: sidebar;
  }
`,d=e.div`
  grid-area: content;
  display: flex;
  width: 100%;
`,n=e.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${t.primaryBlack};
  color: ${t.grey100};
  z-index: 1;
  position: -webkit-sticky;
  position: sticky;
  top: 140px;
  @media (max-width: 912px) {
    position: fixed;
    top: 184px;
    width: 100%;
    border-bottom: 1px solid ${t.grey20};
    margin: 20px 0;
  }
`,p=e.div`
  display: flex;
  gap: 10px;
`,s=e.div`
  display: flex;
  align-items: center;
  padding: 2px;
  background-color: inherit;
  white-space: nowrap;
  gap: 10px;
  color: ${t.grey70};
  &:focus,
  &:hover:not(:disabled) {
    color: ${t.grey100};
    cursor: pointer;
    img {
      filter: brightness(150%);
    }
  }
  span {
    font-weight: 400;
  }
`,c=e(i)`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;export{c as A,d as C,a as G,p as H,s as I,n as O,o as S};
