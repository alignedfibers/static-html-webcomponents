# static-html-webcomponents
@skate/ssr is not outputing what is expected, considering alternatives to allow google to easily crawl by providing flat_html on the landingPoints which are the URLs for the pages the client will view. This means the element <\my-app> which acts as the shell for the whole application is the only element that needs to be flattened, and no data or information intended for human reading or use by the web indexing robots for indexing he site will be encapsulated within a component. Pretty much all of the experiments written below can be thrown in the trash. 

## A few points about creating custom-elements - I am defining my own build process and incorporating SASS into my component files, and would like to define multiple different types of builds useful for different purposes.

It is important to keep a build process that will extract encapsulated styles from the javascript components. I am not sure if there is yet a standard within CSS to define scoped styles without javascript, if so then that should be used.

Another point that needs to be clear when creating custom elements, is to enhance existing webstandards elements already existing in the browsers without defining new elements, this will give default functionality prior to loading javascript or when viewing with javascript disabled.

Dont flatten everything, use SASS and CSS techniques build css fragments and flatten only what is needed for initial view of landing points, do this flattening at the edge in cloudflare and log>>out the builds and dates of cache of the flat-landing and the frequency of times the cached version is accessed. Keep a running millisecond access accumulator and block those accumulations out when their is a gross change based on a (range percentage) in order to keep graphs small and usefull. Essentially I will dynamically change the frequency of times we take the action of recording, the average frequency a cached flat-landing is called. 

## LOL, I will continue using names that sound like free-style bicyle and x-games stunts for processees

## Below is the stuff I am going to cease working on, I may still use some of the concepts in the links but im going my own direction on this

I am using this project to house and build an environment where I can easily convert web components authored in ES6 JS Module browser standard format to static webcomponents rendered on the serverside and can be rehydrated on the client or within a CF Worker.
These components should load quickly and allow Progressive Enhancement via Shadow Dom attachement and "rehydration" and may someday allow shadow dom attachment and graceful enhancements through lazy-loading techniques. I will be Completing multiple
experiments shown below to help me get all of the goodness I want in my build and delivery environment working.

## First experiment: Server Side Rendering / Pre-Rendering of ES6 Web Components

Headroom has been made in this area, I am following the example by Trey Shugart here: https://tinyurl.com/y22kuqfq
to PreRender my first vanilla webcomponents and compose them in consumable html documents.

## Second experiment: Cache and insert static-components into an HTML response in cfworker, and cache that response. (Cache the cache)

From within cloudflare worker replace any custom-component tags found in the requested html file with the flattened html of that component fetched from a flat-components directory on the server (ghpages). The tooling used to generate the flattended components is: @skate/ssr.  Static HTML markup for each custom-component that exist in the list of flattened components will be inserted in place of the tags for that component. The contents or HTML within the component-tags in the HTML markup will automatically be inserted into the first <\slot><\/slot> element within the static html inserted in place of those tags. Considering something like ReactDOM to complete the insertion of these elements on the CF Worker. Sevki Hasirci wrote a rough guide and interesting read on how to complete some easy server side rendering within a CF Worker and that writeup can be found here: https://blog.cloudflare.com/serverless-pwa-react-cloudflare-workers/ -This resource can prove helpful even if I decide not to go with ReactDOM, Do to technicallities, ReactDOM may not be the best tool because I am serving HTML
files, hower I may be able to use .js files instead. The goal is to pre-render as much as possible and lower the workload in the CF Worker. We will cache the flat-components on CF. If components are requested via the custom domain they will be wrapped with <\html\></\html\> tags. If they are fetched from the ghpages subdomain, then they should not be wrapped and should be maluable within the CF Worker. *Need to complete some reading to see how I can cache files fetched, and compose multiple cached files together within the CF Worker. Technically, you could call this experiment, caching the cache.

## Third experiment: Initating Refresh of the Cache on CF

I have been thinking about Critical Rendering Paths, paths that are highly visited, and the importance of flattened html on first
visits as apposed to any subsequent visits. I would like to establish output from a pre-render process which processes any required dynamic or live pre-rendering of site content data at the time of request and fills any custom-elements with the full markup of that 
element. The resulting output should be `as effective` for indexing algorithims used by google and other bots, as a static HTML file without javascript. When doing this I would like to preload and cache on the edge the most common requests and have a publish method that can be called to initiate reload of cache when that path's content updates. Can be a path to a single feed and it should only
recache if something changes, the CF Worker will pull some meta data on the path on everycall before defaulting to what is in cache,
A video on using the service worker within the browser with md5 checksums to identify an update via the manifest file can be found 
here: https://www.youtube.com/watch?v=3Tr-scf7trE    - I will attempt to adapt caching techniques in this video to keep a fresh cache on the edge, and will re-use what was already completed in experiments 1 and 2 to build the cached responses.

## Fourth Experiment:

Caching on the client and rehydrating the flattened elements by attaching the shadow dom and recording hot routes and client interaction
that will help prioritize rehydration. Also want to do stuff with element dependencies to ensure complete enabling and disabling of
component features. Specifically, not all components need to be ready before they can become interactive. `Example: My member login button should be prioritized over an advertisement scroller intended for a new visitor to join.` - I do not have an experiment in mind for this yet at this time, however what I do know is: Once we start recording data about user interaction on the client, we will only deliver "Self Optimizing" experience to visitors who are detected to be on fast reliable network and will switch it off as soon as there is any connectivity issues. That is about it for imagining these steps up

## *Hey, 

This is absolutely a project in the works, and as I work through these experiments, I may branch each one out before moving on to the next branch. (This will be good practice for creating branches with GIT)
