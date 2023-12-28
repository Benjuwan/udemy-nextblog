/** @type {import('next').NextConfig} */
const nextConfig = {
    // nextConfig によって、対象サイト（今回は unsplash ）からの画像データ取得許可を与える
    images: {
        'domains': ['source.unsplash.com']
    }
}

module.exports = nextConfig
