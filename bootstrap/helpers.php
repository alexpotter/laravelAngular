<?php

use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

if ( ! function_exists('versioned_asset'))
{
    /**
     * Get the path to a versioned Mix file.
     *
     * @param  string  $path
     * @param  string  $manifestDirectory
     * @return \Illuminate\Support\HtmlString
     *
     * @throws \Exception
     */
    function versioned_asset(string $path, string $manifestDirectory = '/assets'): HtmlString
    {
        static $manifests = [];

        if (app()->runningUnitTests()) {
            return new HtmlString(rtrim(app('config')->get('app.asset_url'), '/') . '/' . ltrim($path, '/'));
        }

        if (! Str::startsWith($path, '/')) {
            $path = "/{$path}";
        }

        if ($manifestDirectory && ! Str::startsWith($manifestDirectory, '/')) {
            $manifestDirectory = "/{$manifestDirectory}";
        }

        if (file_exists(public_path($manifestDirectory.'/hot'))) {
            $url = file_get_contents(public_path($manifestDirectory.'/hot'));

            if (Str::startsWith($url, ['http://', 'https://'])) {
                return new HtmlString(Str::after($url, ':').$path);
            }

            return new HtmlString("//localhost:8080{$path}");
        }

        $manifestPath = public_path($manifestDirectory.'/manifest.json');

        if (! isset($manifests[$manifestPath])) {
            if (! file_exists($manifestPath)) {
                throw new Exception('The manifest file does not exist.');
            }

            $manifests[$manifestPath] = json_decode(file_get_contents($manifestPath), true);
        }

        $manifest = $manifests[$manifestPath];

        if (! isset($manifest[$path])) {
            report(new Exception("Unable to locate asset file: {$path}."));

            if (! app('config')->get('app.debug')) {
                return $path;
            }
        }

        if (Str::startsWith($manifest[$path], ['http://', 'https://'])) {
            return new HtmlString($manifest[$path]);
        }

        $url = app('config')->get('app.asset_url');

        return new HtmlString(rtrim($url, '/') . $manifest[$path]);
    }
}
