## Getting Started

0. Install Ghost
   0. Follow the [official instructions](https://github.com/TryGhost/Ghost#getting-started-guide-for-developers)
0. Install Box Model
   0. Clone theme into separate directory from Ghost (a sibling directory to Ghost works well)
   0. Install dependencies: `$ npm install --development`
   0. Create a symlink to Box Model's build directory: `$ cd $GHOST_DIR/content/themes; ln -s ../../../$BOX_MODEL_DIR/build box-model; cd -`
   0. Open Ghost admin area and set theme to `box-model`

## Editing

Open two terminal windows. In one navigate to `$GHOST_DIR`, and start Ghost (likely `$ grunt dev`). In the other terminal, navigate to `$BOX_MODEL_DIR`.

0. Run `$ gulp watch` and edit files in `source` as usual
   * Appropriate files will be rebuilt into `build` whenever you save
0. Use `$ gulp -T` to list all available tasks

## Forking

Only edit files in `source`. All site-specific markup (Google Analytics code, navigation links, copyright notice) is in `source/partials`. If you decide to use this theme, please do not modify the theme's copyright notice, though for substantial changes, you may remove it.

## Deploying

You can produce a Zip file that is ready to upload to Ghost(pro) with `$ gulp build; gulp archive`. Note that you should take care to manually `build` first. This is due to an issue with the `build` command. The same issue also prevents reliably running both commands in the same process, so `$ gulp build archive` also doesn't work. Hopefully a future version of gulp will obliterate this requirement.
