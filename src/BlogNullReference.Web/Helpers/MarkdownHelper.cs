﻿using MarkdownSharp;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BlogNullReference.Web.Helpers
{
    public static class MarkdownHelper
    {
        private static Markdown MarkdownTransformer = new Markdown();

        public static IHtmlContent Markdown(this IHtmlHelper helper, string text)
        {
            var html = MarkdownTransformer.Transform(text);
            return helper.Raw(html);
        }
    }
}
