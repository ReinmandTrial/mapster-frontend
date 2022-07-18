export default function tagWork() {
   const CLASS = {
      hiden: 'hiden',
      addIcon: 'add-tag__icon-add',
      deleteIcon: 'add-tag__item-delete',
      openPopup: 'open',
      popupBody: 'popup__body',
      popupBtnAdd: 'popup__btn-add',
      popupBtnCancel: 'popup__btn-cancel',
   };

   const SELECTOR = {
      itemLi: '.add-tag__item',
   };

   const TEMP_ITEM = document.getElementById('tempTagItem').innerHTML;
   const mainEl = document.querySelector('.main-tag');
   const tagListEl = document.querySelector('.add-tag__list');
   const holderEl = document.querySelector('.add-tag__holder');
   const popupTagEL = document.querySelector('.popup');
   const popupInputEl = document.querySelector('.input-popup__input');

   let tagList = [];

   mainEl.addEventListener('click', (e) => {
      if (e.target.classList.contains(CLASS.addIcon)) {
         openPopup();
      }
      if (e.target.classList.contains(CLASS.popupBody) || e.target.classList.contains(CLASS.popupBtnCancel)) {
         e.preventDefault();
         closePopup();
      }
      if (e.target.classList.contains(CLASS.popupBtnAdd)) {
         e.preventDefault();
         addTag();
         checkHolder();
         closePopup();
         popupInputEl.value = '';
      }
      if (e.target.classList.contains(CLASS.deleteIcon)) {
         deleteTag(getLi(e.target));
         checkHolder();
      }
   });

   function checkHolder() {
      if (tagList.length > 0) {
         holderEl.classList.add(CLASS.hiden);
      } else {
         holderEl.classList.remove(CLASS.hiden);
      }
   }

   function addTag() {
      if (popupInputEl.value !== '') {
         const newTag = createTag();
         tagList.push(newTag);
         renderItem(newTag);
      }
   }

   function deleteTag(li) {
      const id = +li.dataset.id;
      tagList = tagList.filter((obj) => obj.id !== id);
      li.remove();
   }

   function interpolate(value) {
      return TEMP_ITEM.replace('{{tagName}}', value.tagName).replace('{{id}}', value.id);
   }

   function renderItem(newLi) {
      const createHtml = interpolate(newLi);
      tagListEl.insertAdjacentHTML('afterbegin', createHtml);
   }

   function createTag() {
      const value = popupInputEl.value;
      const newTag = {
         id: Date.now(),
         tagName: value,
      };
      return newTag;
   }

   function getLi(target) {
      return target.closest(SELECTOR.itemLi);
   }

   function openPopup() {
      popupTagEL.classList.add(CLASS.openPopup);
   }

   function closePopup() {
      popupTagEL.classList.remove(CLASS.openPopup);
   }
}
