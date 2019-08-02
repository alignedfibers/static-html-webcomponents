# static-html-webcomponents

Creating an environment to easily convert web components authored in ES6 JS Module browser standard format
to static webcomponents rendered on the serverside and can be rehydrated on the client or within ac CF Worker
These components should load quickly and allow Graceful Enhancement / Progressive Enhancement
via Shadow Dom attachement and may allow enhancements through lazy-loading techniques. Completing mutltiple
experiments to get these all working.

##First experiment:
Headroom has been made in this area, I am following the example by Trey Shugart here: https://tinyurl.com/y22kuqfq
to PreRender my first vanilla webcomponents and compose them in consumable html documents.

##Second experiment:
Replace instances of custom-component tags with the pre generated static markup as they pass through cloudflare worker and rehydrate on the client. I will try to do this Using standard HTML markup we would normally use in an html document, I will use pregenerated list of components that need to be flattened by pathname and will be used in the CF Worker to complete the replacement. May use something like ReactDOM to complete the flattening of these elements on the CF Worker - Sevki Hasirci wrote a rough guide and interesting read on how to complete some easy server side rendering within a CF Worker and that writeup can be found here: 
https://blog.cloudflare.com/serverless-pwa-react-cloudflare-workers/

##Third experiment:
I have been thinking about Critical Rendering Paths, paths that are highly visited, and the importance of flattened html on first
visits as apposed to any subsequent visits. I would like to establish output from a pre-render process which processes any required dynamic or live pre-rendering of site content data at the time of request and fills any custom-elements with the full markup of that 
element. The resulting output should be `As Effective` for indexing algorithims used by google and other bots, as a static HTML file without javascript. When doing this I would like to preload and cache on the edge the most common requests and have a publish method that can be called to initiat reload of cache when that path's content updates. Can be a path to a single feed and it should only
recache if something changes, the CF Worker will pull some meta data on the path on everycall before defaulting to what is in cache,
A video on using the service worker within the browser with md5 checksums to identify an update via the manifest file can be found 
here: https://www.youtube.com/watch?v=3Tr-scf7trE    - I will attempt to adapt caching techniques in this video to keep a fresh cache on the edge, and will re-use what was already completed in experiments 1 and 2 to build the cached responses.

##Fourth Experiment:
Caching on the client and rehydrating the flattened elements by attaching the shadow dom and recording hot routes and client interaction
that will help prioritize rehydration. Also want to do stuff with element dependencies to ensure complete enabling and disabling of
component features. Specifically, not all components need to be ready before they can become interactive. My member login button should be prioritized over and advertisement scroller intended for a new visitor to join. - No experiment designed at this time, but when we
start really digging data about user interaction, we will only deliver that experience to visitors who are detected to be on fast 
reliable network and will switch it off as soon as there is any connectivity issues. That is about it for imagining these steps up

##*Hey, 
This is absolutely a project in the works, and as I work through these experiments, I may branch each experiment out into it's own repo. (This will be practice for creating branches with GIT)
