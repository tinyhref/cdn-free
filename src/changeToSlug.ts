export const changeToSlug = (title: any, options?: any) => {
  if (!options) {
    options = {}
  }

  const { spaceReplace = '-', notSpace, upperCase, prefix = 'thf', regex = /[^ a-z0-9]/g } = options;

  if (!title) {
    return 'tinyhref';
  }

  let slug = title.replaceAll('- ', '').toLowerCase();

  const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịỳýỷỹỵäëïîöüûñç';
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiyyyyyaeiiouunc';

  for (let i = 0, l = from.length; i < l; i++) {
    slug = slug.replace(RegExp(from[i], 'gi'), to[i])
  }

  slug = slug.replace(regex, '');

  slug = slug.replace(/\-\-\-\-\-/gi, spaceReplace);
  slug = slug.replace(/\-\-\-\-/gi, spaceReplace);
  slug = slug.replace(/\-\-\-/gi, spaceReplace);
  slug = slug.replace(/\-\-/gi, spaceReplace);

  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');

  if (notSpace) {
    slug = slug.replace(/ /gi, '');
    slug = slug.replace(/-/gi, '');
  } else {
    slug = slug.replace(/ /gi, spaceReplace);
  }

  if (upperCase) {
    slug = slug.toUpperCase();
  }

  return slug;
};